import { observer } from 'mobx-react'
import { useState } from 'react'

import { Checkbox, Link } from '@mui/material'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal } from '@components/modals/image-modal/image-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { CustomSlider } from '@components/shared/custom-slider'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { TabPanel } from '@components/shared/tab-panel'
import { UserLink } from '@components/user/user-link'

import { calcFinalWeightForBox, calcVolumeWeightForBox } from '@utils/calculation'
import { checkIsBuyer, checkIsClient, checkIsStorekeeper } from '@utils/checks'
import { formatShortDateTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl, getNewTariffTextForBoxOrOrder, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './box-view-form.style'

import { OrderInfoTab } from './order-info-tab/order-info-tab'

const tabNames = {
  BOX_INFO: 0,
  ORDER_INFO: 1,
}

export const BoxViewForm = observer(
  ({
    box,
    setOpenModal,
    volumeWeightCoefficient,
    batchHumanFriendlyId,
    storekeeper,
    userInfo,
    onSubmitChangeFields,
    onClickHsCode,
    calcFinalWeightForBoxFunction,
  }) => {
    const { classes: styles, cx } = useClassNames()

    const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })
    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const sourceFormFields = {
      ...box,
      prepId: box.prepId || '',
      tmpTrackNumberFile: [],
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    const onChangeField = fieldName => event => {
      const newFormFields = { ...formFields }
      newFormFields[fieldName] = event.target.value

      setFormFields(newFormFields)
    }

    const onChangeHsCode = index => event => {
      const newFormFields = { ...formFields }
      newFormFields.items[index].product.hsCode = event.target.value

      setFormFields(newFormFields)
    }

    const setTmpTrackNumberFile = () => value => {
      onChangeField('tmpTrackNumberFile')({ target: { value } })
    }

    const finalWeightForBox = calcFinalWeightForBoxFunction
      ? calcFinalWeightForBoxFunction(box, volumeWeightCoefficient)
      : calcFinalWeightForBox(box, volumeWeightCoefficient)

    const isClient = checkIsClient(UserRoleCodeMap[userInfo?.role])
    const isStorekeeper = checkIsStorekeeper(UserRoleCodeMap[userInfo?.role])
    const isBuyer = checkIsBuyer(UserRoleCodeMap[userInfo?.role])
    const isEdit = isClient || isStorekeeper || isBuyer
    const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
    const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
    const totalWeightConversion = getConversion(sizeSetting, 12 / poundsWeightCoefficient, 12)
    const weightSizesType = getWeightSizesType(sizeSetting)

    const boxAndPrepIdTitle = `${t(TranslationKey.Box)} № ${box.humanFriendlyId}/ prep id:`

    const [activeTab, setActiveTab] = useState(tabNames.BOX_INFO)

    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.boxAndPrepIdContainer}>
              <p className={styles.boxAndPrepIdTitle}>{boxAndPrepIdTitle}</p>

              <Input
                disabled={!(isClient || isStorekeeper)}
                className={styles.boxAndPrepIdInput}
                classes={{ input: styles.input }}
                inputProps={{ maxLength: 20 }}
                value={formFields.prepId}
                onChange={onChangeField('prepId')}
              />
            </div>

            {box.amount ? (
              <div className={styles.superBoxContainer}>
                <div className={styles.superBoxIconContainer}>
                  <img src="/assets/icons/big-box.svg" className={styles.superBoxIcon} alt="super box" />
                  <span className={styles.superBoxText}>SB</span>
                </div>
                <p className={styles.superBoxText}>{`x${box.amount}`}</p>
              </div>
            ) : null}

            <div className={styles.updatedContainer}>
              <p className={styles.updatedText}>{`${t(TranslationKey.Updated)}:`}</p>
              <p className={styles.updatedTitle}>{formatShortDateTime(box.updatedAt)}</p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.information}>
            <div className={styles.informationContainer}>
              <p className={styles.informationTitle}>{t(TranslationKey.Destination)}</p>
              <p className={styles.informationText}>{box.destination?.name || t(TranslationKey['Not available'])}</p>
            </div>

            <div className={styles.informationContainer}>
              <p className={styles.informationTitle}>{t(TranslationKey.Tariff)}</p>
              <p className={styles.informationText}>
                {getNewTariffTextForBoxOrOrder(box) || t(TranslationKey['Not available'])}
              </p>
            </div>

            <div className={cx(styles.informationContainer, styles.informationContainerMinGap)}>
              <p className={styles.informationTitle}>{t(TranslationKey['Int warehouse'])}</p>
              <UserLink
                blackText
                withAvatar
                name={storekeeper ? storekeeper?.name : box.storekeeper?.name}
                userId={storekeeper ? storekeeper?._id : box.storekeeper?._id}
                customClassNames={styles.informationUser}
              />
            </div>

            <div className={styles.informationContainer}>
              <p className={styles.informationTitle}>{t(TranslationKey.Batch)}</p>
              <p className={styles.informationText}>
                {(batchHumanFriendlyId ? batchHumanFriendlyId : box.batch?.humanFriendlyId) ||
                  t(TranslationKey['Not available'])}
              </p>
            </div>
          </div>

          <div className={styles.switcherWrapper}>
            <CustomSwitcher
              switchMode="medium"
              condition={activeTab}
              switcherSettings={[
                {
                  label: () => t(TranslationKey['Box info']),
                  value: tabNames.BOX_INFO,
                },

                {
                  label: () => t(TranslationKey['Order info']),
                  value: tabNames.ORDER_INFO,
                },
              ]}
              changeConditionHandler={value => setActiveTab(value)}
            />

            <p className={cx(styles.informationTitle, styles.informationTitleMargin)}>
              {`${t(TranslationKey['Products in a box'])}: `}
              <span className={styles.blueColor}>{formFields.items?.length}</span>
            </p>

            <TabPanel value={activeTab} index={tabNames.BOX_INFO}>
              <OrderInfoTab box={box} items={formFields.items} onClickHsCode={onClickHsCode} />
            </TabPanel>
            <TabPanel value={activeTab} index={tabNames.ORDER_INFO}>
              11111111
            </TabPanel>
          </div>

          <div className={styles.blocksWrapper}>
            <div className={styles.blockWrapper}>
              <div className={styles.imgSizesWrapper}>
                <div className={styles.imgWrapper}>
                  <p className={styles.label}>{t(TranslationKey['Box photos:'])}</p>
                  <div className={styles.imgBoxWrapper}>
                    <PhotoAndFilesSlider withoutFiles files={box.images} />
                  </div>
                </div>

                <div className={styles.sizesWrapper}>
                  <div className={styles.demensionsWrapper}>
                    <div className={styles.sizesSubWrapper}>
                      <p className={styles.label}>{t(TranslationKey.Dimensions) + ':'}</p>

                      <div>
                        <CustomSwitcher
                          condition={sizeSetting}
                          switcherSettings={[
                            { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                            { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
                          ]}
                          changeConditionHandler={condition => setSizeSetting(condition)}
                        />
                      </div>
                    </div>
                    <p className={styles.standartText}>
                      {t(TranslationKey.Length) + ': '}
                      {toFixed(box.lengthCmWarehouse / lengthConversion, 2)}
                    </p>
                    <p className={styles.standartText}>
                      {t(TranslationKey.Width) + ': '}
                      {toFixed(box.widthCmWarehouse / lengthConversion, 2)}
                    </p>
                    <p className={styles.standartText}>
                      {t(TranslationKey.Height) + ': '}
                      {toFixed(box.heightCmWarehouse / lengthConversion, 2)}
                    </p>

                    <p className={styles.standartText}>
                      {t(TranslationKey.Weight) + ': '}
                      {toFixed(box.weighGrossKgWarehouse / weightConversion, 2)}
                    </p>
                    <p className={styles.standartText}>
                      {t(TranslationKey['Volume weight']) + ': '}
                      {toFixed(calcVolumeWeightForBox(box, volumeWeightCoefficient) / weightConversion, 2)}
                    </p>
                    <p
                      className={cx(styles.standartText, {
                        [styles.alertText]: finalWeightForBox / weightConversion < totalWeightConversion,
                      })}
                    >
                      {t(TranslationKey['Final weight']) + ': '}
                      {`${toFixed(finalWeightForBox / weightConversion, 2)} ${weightSizesType}!`}
                    </p>

                    {finalWeightForBox / weightConversion < totalWeightConversion ? (
                      // eslint-disable-next-line react/jsx-indent
                      <span className={styles.alertText}>{`${t(TranslationKey['Weight less than'])} ${toFixed(
                        totalWeightConversion,
                        2,
                      )} ${weightSizesType}!`}</span>
                    ) : null}

                    {box.amount > 1 ? (
                      <p className={styles.standartText}>
                        {t(TranslationKey['Total final weight']) + ': '}
                        {toFixed((finalWeightForBox / weightConversion) * box.amount, 2)}
                        {' ' + weightSizesType}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div>
                <div className={cx(styles.labelsInfoWrapper, styles.checkboxWrapper)}>
                  <div className={styles.checkboxContainer}>
                    <Checkbox disabled className={styles.checkbox} checked={box.isShippingLabelAttachedByStorekeeper} />

                    <p className={styles.label}>{t(TranslationKey['Shipping label was glued to the warehouse'])}</p>
                  </div>

                  <div className={styles.checkboxContainer}>
                    <Checkbox disabled className={styles.checkbox} checked={box.isFormed} />
                    <p className={styles.label}>{t(TranslationKey.Formed)}</p>
                  </div>

                  {/* <Field
                  oneLine
                  containerClasses={styles.checkboxContainer}
                  labelClasses={styles.label}
                  label={t(TranslationKey['Shipping label was glued to the warehouse'])}
                  inputComponent={<Checkbox disabled checked={box.isShippingLabelAttachedByStorekeeper} />}
                />
                <Field
                  oneLine
                  containerClasses={styles.checkboxContainer}
                  labelClasses={styles.label}
                  label={t(TranslationKey.Formed)}
                  inputComponent={<Checkbox disabled checked={box.isFormed} />}
                /> */}
                </div>

                <div className={styles.labelsInfoWrapper}>
                  <Field
                    label={t(TranslationKey['Shipping label'])}
                    labelClasses={styles.label}
                    containerClasses={styles.containerField}
                    inputComponent={
                      <div className={styles.barCodeWrapper}>
                        {box.shippingLabel ? (
                          <div className={styles.barCode}>
                            <p className={styles.linkWrapper}>
                              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
                                {t(TranslationKey.View)}
                              </Link>
                            </p>

                            <CopyValue text={box.shippingLabel} />
                          </div>
                        ) : (
                          <p className={styles.linkField}>{t(TranslationKey['Not available'])}</p>
                        )}
                      </div>
                    }
                  />

                  <Field
                    disabled
                    labelClasses={styles.label}
                    containerClasses={styles.containerField}
                    inputClasses={styles.inputField}
                    label={t(TranslationKey['FBA Shipment'])}
                    value={box.fbaShipment || t(TranslationKey['Not available'])}
                  />
                </div>

                <div className={styles.labelsInfoWrapper}>
                  <Field
                    disabled={!isEdit || isBuyer}
                    labelClasses={styles.label}
                    containerClasses={styles.containerField}
                    inputClasses={styles.shortInputField}
                    inputProps={{ maxLength: 250 }}
                    label={t(TranslationKey['Reference id'])}
                    value={formFields.referenceId}
                    onChange={onChangeField('referenceId')}
                  />

                  <Field
                    disabled={!isEdit || isBuyer}
                    labelClasses={styles.label}
                    containerClasses={styles.containerField}
                    inputClasses={styles.shortInputField}
                    inputProps={{ maxLength: 250 }}
                    label={'FBA number'}
                    value={formFields.fbaNumber}
                    onChange={onChangeField('fbaNumber')}
                  />

                  <Field
                    disabled={isClient || isBuyer}
                    labelClasses={styles.label}
                    containerClasses={styles.containerField}
                    inputClasses={styles.inputField}
                    inputProps={{ maxLength: 250 }}
                    label={'UPS Track number'}
                    value={formFields.upsTrackNumber}
                    onChange={onChangeField('upsTrackNumber')}
                  />
                </div>

                {!isClient ? (
                  <div className={styles.labelsInfoWrapper}>
                    <div>
                      <Field
                        disabled={!isEdit}
                        labelClasses={styles.label}
                        containerClasses={styles.containerField}
                        inputClasses={styles.inputField}
                        inputProps={{ maxLength: 250 }}
                        label={t(TranslationKey['Track number'])}
                        value={formFields.trackNumberText}
                        onChange={onChangeField('trackNumberText')}
                      />

                      <Button
                        disabled={!isEdit}
                        className={styles.trackNumberPhotoBtn}
                        onClick={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
                      >
                        {formFields.tmpTrackNumberFile[0]
                          ? t(TranslationKey['File added'])
                          : t(TranslationKey['Photo track numbers'])}
                      </Button>
                    </div>

                    <div className={styles.trackNumberPhotoWrapper}>
                      {formFields.trackNumberFile[0] || formFields.tmpTrackNumberFile[0] ? (
                        <CustomSlider>
                          {(formFields.trackNumberFile.length
                            ? formFields.trackNumberFile
                            : formFields.tmpTrackNumberFile
                          ).map((el, index) => (
                            <img
                              key={index}
                              className={styles.trackNumberPhoto}
                              src={
                                formFields.tmpTrackNumberFile[index]
                                  ? typeof formFields.tmpTrackNumberFile[index] === 'string'
                                    ? formFields.tmpTrackNumberFile[index]
                                    : formFields.tmpTrackNumberFile[index]?.data_url
                                  : formFields.trackNumberFile[index]
                              }
                              // variant="square"
                              onClick={() => {
                                setShowPhotosModal(!showPhotosModal)
                                setBigImagesOptions({
                                  ...bigImagesOptions,

                                  images: [...formFields.tmpTrackNumberFile, ...formFields.trackNumberFile],
                                })
                              }}
                            />
                          ))}
                        </CustomSlider>
                      ) : (
                        <p>{`${t(TranslationKey['no photo track number'])}...`}</p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className={styles.commentsWrapper}>
            <Field
              multiline
              disabled={!isClient || !onSubmitChangeFields}
              minRows={3}
              maxRows={3}
              label={t(TranslationKey['Client comment'])}
              placeholder={isClient && onSubmitChangeFields && t(TranslationKey['Add comment'])}
              className={styles.commentField}
              labelClasses={styles.label}
              value={formFields.clientComment}
              onChange={onChangeField('clientComment')}
            />

            <Field
              multiline
              disabled={!isStorekeeper || !onSubmitChangeFields}
              minRows={3}
              maxRows={3}
              label={t(TranslationKey['Storekeeper comment'])}
              placeholder={isStorekeeper && onSubmitChangeFields && t(TranslationKey['Add comment'])}
              className={styles.commentField}
              labelClasses={styles.label}
              value={formFields.storekeeperComment}
              onChange={onChangeField('storekeeperComment')}
            />
          </div>

          <div className={styles.buttonsWrapper}>
            {isEdit && (
              <Button success onClick={() => onSubmitChangeFields(formFields)}>
                {t(TranslationKey.Save)}
              </Button>
            )}

            <Button variant="text" className={styles.closeBtn} onClick={setOpenModal}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            title={'Track number'}
            maxNumber={50 - formFields.tmpTrackNumberFile.length - formFields.trackNumberFile.length}
            tmpCode={formFields.tmpTrackNumberFile}
            item={formFields}
            onClickSaveBarcode={value => {
              setTmpTrackNumberFile()(value)
              setShowSetBarcodeModal(!showSetBarcodeModal)
            }}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>
        <ImageModal
          isOpenModal={showPhotosModal}
          handleOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          currentImageIndex={bigImagesOptions.imgIndex}
          imageList={bigImagesOptions.images}
          handleCurrentImageIndex={index => setBigImagesOptions({ ...bigImagesOptions, imgIndex: index })}
        />
      </>
    )
  },
)
