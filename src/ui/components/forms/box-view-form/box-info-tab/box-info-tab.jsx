import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import {
  getConversion,
  getDimensionsSizesType,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { NoPhotoIcon } from '@components/shared/svg-icons'

import { calcFinalWeightForBox, calcVolumeWeightForBox } from '@utils/calculation'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './box-info-tab.style'

export const BoxInfoTab = observer(
  ({
    isEdit,
    isBuyer,
    isClient,
    formFields,
    volumeWeightCoefficient,
    calcFinalWeightForBoxFunction,
    onChangeField,
  }) => {
    const { classes: styles, cx } = useStyles()

    const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)
    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
    const [trackNumbers, setTrackNumbers] = useState(formFields?.trackNumberFile)

    useEffect(() => {
      if (formFields?.tmpTrackNumberFile && formFields?.trackNumberFile) {
        setTrackNumbers([...formFields.trackNumberFile, ...formFields.tmpTrackNumberFile])
      }
    }, [formFields?.trackNumberFile, formFields?.tmpTrackNumberFile])

    const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
    const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
    const totalWeightConversion = getConversion(sizeSetting, 12 / poundsWeightCoefficient, 12)
    const weightSizesType = getWeightSizesType(sizeSetting)
    const dimensionsSizesType = getDimensionsSizesType(sizeSetting)
    const finalWeightForBox = calcFinalWeightForBoxFunction
      ? calcFinalWeightForBoxFunction(formFields, volumeWeightCoefficient)
      : calcFinalWeightForBox(formFields, volumeWeightCoefficient)

    const setTmpTrackNumberFile = value => onChangeField('tmpTrackNumberFile')({ target: { value } })

    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.infosWrapper}>
            <div className={styles.dimensionsAndPhotosWrapper}>
              <div className={styles.photos}>
                <PhotoAndFilesSlider withoutFiles files={formFields?.images} />
              </div>

              <div className={styles.dimensions}>
                <div className={styles.switcherWrapper}>
                  <p className={cx(styles.text, styles.textSecond)}>{t(TranslationKey['Sizes from storekeeper'])}</p>
                  <CustomSwitcher
                    condition={sizeSetting}
                    switcherSettings={[
                      { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                      { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
                    ]}
                    changeConditionHandler={condition => setSizeSetting(condition)}
                  />
                </div>

                <p className={styles.text}>
                  {t(TranslationKey.Length) + ': '}
                  {toFixed(formFields?.lengthCmWarehouse / lengthConversion, 2)}
                  {' ' + dimensionsSizesType}
                </p>
                <p className={styles.text}>
                  {t(TranslationKey.Width) + ': '}
                  {toFixed(formFields?.widthCmWarehouse / lengthConversion, 2)}
                  {' ' + dimensionsSizesType}
                </p>
                <p className={styles.text}>
                  {t(TranslationKey.Height) + ': '}
                  {toFixed(formFields?.heightCmWarehouse / lengthConversion, 2)}
                  {' ' + dimensionsSizesType}
                </p>
                <p className={styles.text}>
                  {t(TranslationKey.Weight) + ': '}
                  {toFixed(formFields?.weighGrossKgWarehouse / weightConversion, 2)}
                  {' ' + weightSizesType}
                </p>
                <p className={styles.text}>
                  {t(TranslationKey['Volume weight']) + ': '}
                  {toFixed(calcVolumeWeightForBox(formFields, volumeWeightCoefficient) / weightConversion, 2)}
                  {' ' + weightSizesType}
                </p>
                <p className={cx(styles.text, styles.twoLines)}>
                  {t(TranslationKey['Final weight']) + ': '}
                  {`${toFixed(finalWeightForBox / weightConversion, 2)} ${weightSizesType} `}
                  <span className={styles.textAlert}>
                    {finalWeightForBox / weightConversion < totalWeightConversion
                      ? `< ${toFixed(totalWeightConversion, 2)} ${weightSizesType}`
                      : ''}
                  </span>
                </p>
              </div>
            </div>

            <div className={styles.fieldsWrapper}>
              <LabelWithCopy
                direction="column"
                labelTitle={t(TranslationKey['Shipping label'])}
                labelValue={formFields?.shippingLabel}
                lableLinkTitle={t(TranslationKey.View)}
              />

              <div className={styles.fields}>
                <Field
                  disabled={!isEdit || isBuyer}
                  inputClasses={styles.input}
                  containerClasses={styles.field}
                  labelClasses={cx(styles.text, styles.label)}
                  inputProps={{ maxLength: 250 }}
                  label={t(TranslationKey['Reference id'])}
                  value={formFields?.referenceId || ''}
                  onChange={onChangeField('referenceId')}
                />

                <Field
                  disabled={!isEdit || isBuyer}
                  inputClasses={styles.input}
                  containerClasses={styles.field}
                  labelClasses={cx(styles.text, styles.label)}
                  inputProps={{ maxLength: 250 }}
                  label={'FBA number'}
                  value={formFields?.fbaNumber || ''}
                  onChange={onChangeField('fbaNumber')}
                />
              </div>
            </div>
          </div>

          <div className={cx(styles.infosWrapper, { [styles.infosWrapperNoClient]: isClient })}>
            <div className={styles.flexContainer}>
              <div className={styles.checkboxContainer}>
                {formFields?.sub ? (
                  <img
                    src={getUserAvatarSrc(formFields?.sub._id)}
                    alt="user"
                    className={styles.userIcon}
                    title={formFields?.sub.name}
                  />
                ) : (
                  <NoPhotoIcon className={styles.userIcon} />
                )}
                <Checkbox disabled className={styles.checkbox} checked={formFields?.isFormed} />
                <p className={styles.text}>{t(TranslationKey.Formed)}</p>
              </div>

              <div className={styles.checkboxContainer}>
                <Checkbox
                  disabled
                  className={styles.checkbox}
                  checked={formFields?.isShippingLabelAttachedByStorekeeper}
                />

                <p className={styles.text}>{t(TranslationKey['Shipping label was glued to the warehouse'])}</p>
              </div>
            </div>

            {!isClient ? (
              <div className={styles.flexContainer}>
                <div className={styles.trackNumberFields}>
                  <Field
                    disabled={!isEdit}
                    placeholder={t(TranslationKey['Not available'])}
                    inputClasses={styles.input}
                    // containerClasses={styles.field}
                    labelClasses={cx(styles.text, styles.label)}
                    inputProps={{ maxLength: 250 }}
                    label={t(TranslationKey['Track number'])}
                    value={formFields?.trackNumberText || ''}
                    onChange={onChangeField('trackNumberText')}
                  />

                  <Button
                    disabled={!isEdit}
                    className={styles.trackNumberBtn}
                    onClick={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
                  >
                    {trackNumbers.length ? t(TranslationKey['File added']) : t(TranslationKey['Photo track numbers'])}
                  </Button>
                </div>

                <div className={styles.trackNumberPhoto}>
                  {trackNumbers.length ? (
                    <PhotoAndFilesSlider showPreviews withAllFiles customSlideHeight={76} files={trackNumbers} />
                  ) : (
                    <p className={styles.text}>{`${t(TranslationKey['no photo track number'])}...`}</p>
                  )}
                </div>
              </div>
            ) : null}

            <div className={styles.flexContainer}>
              <Field
                disabled={isClient || isBuyer}
                placeholder={t(TranslationKey['Not available'])}
                inputClasses={styles.input}
                containerClasses={cx(styles.field, styles.bigField)}
                labelClasses={cx(styles.text, styles.label)}
                inputProps={{ maxLength: 250 }}
                label={'UPS Track number'}
                value={formFields?.upsTrackNumber || ''}
                onChange={onChangeField('upsTrackNumber')}
              />
              <Field
                disabled
                placeholder={t(TranslationKey['Not available'])}
                inputClasses={styles.input}
                containerClasses={cx(styles.field, styles.bigField)}
                labelClasses={cx(styles.text, styles.label)}
                label={t(TranslationKey['FBA Shipment'])}
                value={formFields?.fbaShipment || ''}
              />
            </div>
          </div>
        </div>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            title={'Track number'}
            maxNumber={50 - trackNumbers.length}
            tmpCode={formFields?.tmpTrackNumberFile}
            onClickSaveBarcode={value => {
              setTmpTrackNumberFile(value)
              setShowSetBarcodeModal(!showSetBarcodeModal)
            }}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>
      </>
    )
  },
)
