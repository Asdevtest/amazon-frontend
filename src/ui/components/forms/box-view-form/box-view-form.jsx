/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Checkbox, Divider, Grid, Link, Typography, Tooltip} from '@mui/material'

import {React, useState} from 'react'

import {observer} from 'mobx-react'

import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {CustomCarousel} from '@components/custom-carousel'
import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field/field'
import {Modal} from '@components/modal'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
import {UserLink} from '@components/user-link'

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {checkIsBuyer, checkIsClient, checkIsStorekeeper} from '@utils/checks'
import {formatShortDateTime} from '@utils/date-time'
import {
  getShortenStringIfLongerThanCount,
  checkAndMakeAbsoluteUrl,
  getFullTariffTextForBoxOrOrder,
  shortAsin,
  toFixed,
  toFixedWithKg,
} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './box-view-form.style'

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
    const {classes: classNames} = useClassNames()

    const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})
    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const isClient = checkIsClient(UserRoleCodeMap[userInfo?.role])
    const isStorekeeper = checkIsStorekeeper(UserRoleCodeMap[userInfo?.role])
    const isBuyer = checkIsBuyer(UserRoleCodeMap[userInfo?.role])

    const isEdit = isClient || isStorekeeper || isBuyer

    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const handleChange = (event, newAlignment) => {
      setSizeSetting(newAlignment)
    }

    const [formFields, setFormFields] = useState({...box, tmpTrackNumberFile: []})

    const onChangeField = fieldName => event => {
      const newFormFields = {...formFields}
      newFormFields[fieldName] = event.target.value

      setFormFields(newFormFields)
    }

    const onChangeHsCode = index => event => {
      const newFormFields = {...formFields}
      newFormFields.items[index].product.hsCode = event.target.value

      setFormFields(newFormFields)
    }

    const setTmpTrackNumberFile = () => value => {
      onChangeField('tmpTrackNumberFile')({target: {value}})
    }

    const finalWeightForBox = calcFinalWeightForBoxFunction
      ? calcFinalWeightForBoxFunction(box, volumeWeightCoefficient)
      : calcFinalWeightForBox(box, volumeWeightCoefficient)

    return (
      <div className={classNames.formContainer}>
        <div className={classNames.titleWrapper}>
          <Typography variant="h6" className={classNames.title}>{`${t(TranslationKey.Box)} № ${
            box.humanFriendlyId
          }`}</Typography>

          <div className={classNames.titleSubWrapper}>
            <div className={classNames.storekeeperFieldWrapper}>
              <Field
                oneLine
                label={`${t(TranslationKey['Int warehouse'])}:`}
                containerClasses={classNames.storekeeperField}
                inputComponent={
                  <div className={classNames.userLinkWrapper}>
                    <UserLink
                      blackText
                      name={storekeeper ? storekeeper?.name : box.storekeeper?.name}
                      userId={storekeeper ? storekeeper?._id : box.storekeeper?._id}
                    />
                  </div>
                }
              />
            </div>

            <div className={classNames.batchIdWrapper}>
              <Typography className={classNames.batchId}>{`${t(TranslationKey.Batch)} № ${
                (batchHumanFriendlyId ? batchHumanFriendlyId : box.batch?.humanFriendlyId) ||
                t(TranslationKey['Not available'])
              }`}</Typography>
            </div>

            <div className={classNames.UpdatedWrapper}>
              <Field
                oneLine
                label={`${t(TranslationKey.Updated)}:`}
                containerClasses={classNames.UpdatedField}
                inputComponent={
                  <Typography className={classNames.updatedAt}>{formatShortDateTime(box.updatedAt)}</Typography>
                }
              />
            </div>
          </div>
        </div>

        <Divider className={classNames.divider} />

        <div className={classNames.blocksWrapper}>
          <div className={classNames.blockWrapper}>
            <Grid container className={classNames.deliveryInfoWrapper}>
              <Grid item>
                <Field
                  disabled
                  inputClasses={classNames.deliveryInfoField}
                  labelClasses={classNames.label}
                  label={t(TranslationKey.Destination)}
                  value={box.destination?.name || t(TranslationKey['Not available'])}
                  placeholder={t(TranslationKey['Not available'])}
                />
              </Grid>

              <Grid item>
                <Field
                  disabled
                  inputClasses={classNames.deliveryInfoField}
                  labelClasses={classNames.label}
                  label={t(TranslationKey.Tariff)}
                  value={getFullTariffTextForBoxOrOrder(box) || ''}
                  placeholder={t(TranslationKey['Not available'])}
                />
              </Grid>
            </Grid>

            <div className={classNames.productsWrapper}>
              <CustomCarousel alignButtons="end">
                {formFields.items.map((item, index) => (
                  <div key={index} className={classNames.productWrapper}>
                    <div className={classNames.leftColumn}>
                      <div className={classNames.photoWrapper}>
                        <PhotoCarousel isAmazonPhoto files={item.product.images} />
                      </div>
                      <Tooltip placement={'right-start'} title={item.product.amazonTitle}>
                        <Typography className={classNames.amazonTitle}>
                          {getShortenStringIfLongerThanCount(item.product.amazonTitle, 225)}
                        </Typography>
                      </Tooltip>

                      <div className={classNames.copyAsin}>
                        <div className={classNames.asinWrapper}>
                          <Typography>{t(TranslationKey.ASIN)}</Typography>
                          {item.product.asin ? (
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`https://www.amazon.com/dp/${item.product.asin}`}
                              className={classNames.normalizeLink}
                            >
                              <span className={classNames.linkSpan}>{shortAsin(item.product.asin)}</span>
                            </a>
                          ) : (
                            <span className={classNames.typoSpan}>{t(TranslationKey.Missing)}</span>
                          )}
                        </div>
                        {item.product.asin ? <CopyValue text={item.product.asin} /> : null}
                      </div>
                    </div>

                    <div className={classNames.rightColumn}>
                      <Field
                        inputClasses={classNames.countField}
                        labelClasses={classNames.label}
                        label={t(TranslationKey['HS code'])}
                        inputProps={{maxLength: 255}}
                        value={item.product.hsCode}
                        placeholder={t(TranslationKey['Not available'])}
                        inputComponent={
                          <Button className={classNames.hsCodeBtn} onClick={() => onClickHsCode(item.product._id)}>
                            {t(TranslationKey['HS code'])}
                          </Button>
                        }
                        onChange={onChangeHsCode(index)}
                      />
                      <Field
                        label={t(TranslationKey.BarCode)}
                        labelClasses={classNames.label}
                        inputComponent={
                          item.barCode ? (
                            <div className={classNames.barCode}>
                              <Typography className={classNames.linkWrapper}>
                                <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item.barCode)}>
                                  {t(TranslationKey.View)}
                                </Link>
                              </Typography>

                              <CopyValue text={item.barCode} />
                            </div>
                          ) : (
                            <Typography className={classNames.linkField}>
                              {t(TranslationKey['Not available'])}
                            </Typography>
                          )
                        }
                      />

                      {item.isBarCodeAlreadyAttachedByTheSupplier ? (
                        <Field
                          oneLine
                          containerClasses={classNames.checkboxContainer}
                          labelClasses={classNames.label}
                          label={t(TranslationKey['BarCode is glued by supplier'])}
                          inputComponent={<Checkbox disabled checked={item.isBarCodeAlreadyAttachedByTheSupplier} />}
                        />
                      ) : (
                        <Field
                          oneLine
                          containerClasses={classNames.checkboxContainer}
                          labelClasses={classNames.label}
                          label={t(TranslationKey['BarCode is glued by storekeeper'])}
                          inputComponent={<Checkbox disabled checked={item.isBarCodeAttachedByTheStorekeeper} />}
                        />
                      )}
                      <Field
                        disabled
                        inputClasses={classNames.countField}
                        containerClasses={classNames.countContainer}
                        labelClasses={classNames.label}
                        label={t(TranslationKey.Quantity)}
                        value={(box.amount > 1 ? `${item.amount} * ${box.amount}` : item.amount) || 0}
                        placeholder={t(TranslationKey['Not available'])}
                      />

                      <Field
                        disabled
                        inputClasses={classNames.countField}
                        containerClasses={classNames.countContainer}
                        labelClasses={classNames.label}
                        label={t(TranslationKey['Order number/Item'])}
                        value={`${item.order?.id} / ${item.order?.item ? item.order?.item : '-'}`}
                      />
                    </div>
                  </div>
                ))}
              </CustomCarousel>
            </div>
          </div>

          <div className={classNames.blockWrapper}>
            <div className={classNames.imgSizesWrapper}>
              <div className={classNames.imgWrapper}>
                <Typography className={classNames.label}>{t(TranslationKey['Box photos:'])}</Typography>
                <div className={classNames.imgBoxWrapper}>
                  <PhotoCarousel small files={box.images} />
                </div>
              </div>

              <div className={classNames.sizesWrapper}>
                <div className={classNames.demensionsWrapper}>
                  <div className={classNames.sizesSubWrapper}>
                    <Typography className={classNames.label}>{t(TranslationKey.Demensions) + ':'}</Typography>

                    <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                      <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                        {'In'}
                      </ToggleBtn>
                      <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                        {'Cm'}
                      </ToggleBtn>
                    </ToggleBtnGroup>
                  </div>
                  <Typography className={classNames.standartText}>
                    {t(TranslationKey.Length) + ': '}
                    {toFixed(box.lengthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>
                  <Typography className={classNames.standartText}>
                    {t(TranslationKey.Width) + ': '}
                    {toFixed(box.widthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>
                  <Typography className={classNames.standartText}>
                    {t(TranslationKey.Height) + ': '}
                    {toFixed(box.heightCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                  </Typography>

                  <Typography className={classNames.standartText}>
                    {t(TranslationKey.Weight) + ': '}
                    {toFixedWithKg(box.weighGrossKgWarehouse, 2)}
                  </Typography>
                  <Typography className={classNames.standartText}>
                    {t(TranslationKey['Volume weight']) + ': '}
                    {toFixedWithKg(calcVolumeWeightForBox(box, volumeWeightCoefficient), 2)}
                  </Typography>
                  <Typography
                    className={cx(classNames.standartText, {
                      [classNames.alertText]: finalWeightForBox < 12,
                    })}
                  >
                    {t(TranslationKey['Final weight']) + ': '}
                    {toFixedWithKg(finalWeightForBox, 2)}
                  </Typography>

                  {finalWeightForBox < 12 ? (
                    // eslint-disable-next-line react/jsx-indent
                    <span className={classNames.alertText}>{t(TranslationKey['Weight less than 12 kg!'])}</span>
                  ) : null}

                  {box.amount > 1 ? (
                    <Typography className={classNames.standartText}>
                      {t(TranslationKey['Total final weight']) + ': '}
                      {toFixedWithKg(finalWeightForBox * box.amount, 2)}
                    </Typography>
                  ) : null}
                </div>
              </div>
            </div>

            <div>
              <div className={cx(classNames.labelsInfoWrapper, classNames.checkboxWrapper)}>
                <div className={classNames.checkboxContainer}>
                  <Checkbox
                    disabled
                    className={classNames.checkbox}
                    checked={box.isShippingLabelAttachedByStorekeeper}
                  />

                  <Typography className={classNames.label}>
                    {t(TranslationKey['Shipping label was glued to the warehouse'])}
                  </Typography>
                </div>

                <div className={classNames.checkboxContainer}>
                  <Checkbox disabled className={classNames.checkbox} checked={box.isFormed} />
                  <Typography className={classNames.label}>{t(TranslationKey.Formed)}</Typography>
                </div>

                {/* <Field
                  oneLine
                  containerClasses={classNames.checkboxContainer}
                  labelClasses={classNames.label}
                  label={t(TranslationKey['Shipping label was glued to the warehouse'])}
                  inputComponent={<Checkbox disabled checked={box.isShippingLabelAttachedByStorekeeper} />}
                />
                <Field
                  oneLine
                  containerClasses={classNames.checkboxContainer}
                  labelClasses={classNames.label}
                  label={t(TranslationKey.Formed)}
                  inputComponent={<Checkbox disabled checked={box.isFormed} />}
                /> */}
              </div>

              <div className={classNames.labelsInfoWrapper}>
                <Field
                  label={t(TranslationKey['Shipping label'])}
                  labelClasses={classNames.label}
                  containerClasses={classNames.containerField}
                  inputComponent={
                    <div className={classNames.barCodeWrapper}>
                      {box.shippingLabel ? (
                        <div className={classNames.barCode}>
                          <Typography className={classNames.linkWrapper}>
                            <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
                              {t(TranslationKey.View)}
                            </Link>
                          </Typography>

                          <CopyValue text={box.shippingLabel} />
                        </div>
                      ) : (
                        <Typography className={classNames.linkField}>{t(TranslationKey['Not available'])}</Typography>
                      )}
                    </div>
                  }
                />

                <Field
                  disabled
                  labelClasses={classNames.label}
                  containerClasses={classNames.containerField}
                  inputClasses={classNames.inputField}
                  label={t(TranslationKey['FBA Shipment'])}
                  value={box.fbaShipment || t(TranslationKey['Not available'])}
                />
              </div>

              <div className={classNames.labelsInfoWrapper}>
                <Field
                  disabled={!isEdit || isBuyer}
                  labelClasses={classNames.label}
                  containerClasses={classNames.containerField}
                  inputClasses={classNames.shortInputField}
                  inputProps={{maxLength: 250}}
                  label={t(TranslationKey['Reference id'])}
                  value={formFields.referenceId}
                  onChange={onChangeField('referenceId')}
                />

                <Field
                  disabled={!isEdit || isBuyer}
                  labelClasses={classNames.label}
                  containerClasses={classNames.containerField}
                  inputClasses={classNames.shortInputField}
                  inputProps={{maxLength: 250}}
                  label={'FBA number'}
                  value={formFields.fbaNumber}
                  onChange={onChangeField('fbaNumber')}
                />

                <Field
                  disabled={isClient || isBuyer}
                  labelClasses={classNames.label}
                  containerClasses={classNames.containerField}
                  inputClasses={classNames.inputField}
                  inputProps={{maxLength: 250}}
                  label={'UPS Track number'}
                  value={formFields.upsTrackNumber}
                  onChange={onChangeField('upsTrackNumber')}
                />
              </div>

              {!isClient ? (
                <div className={classNames.labelsInfoWrapper}>
                  <div>
                    <Field
                      disabled={!isEdit}
                      labelClasses={classNames.label}
                      containerClasses={classNames.containerField}
                      inputClasses={classNames.inputField}
                      inputProps={{maxLength: 250}}
                      label={t(TranslationKey['Track number'])}
                      value={formFields.trackNumberText}
                      onChange={onChangeField('trackNumberText')}
                    />

                    <Button
                      disabled={!isEdit}
                      className={classNames.trackNumberPhotoBtn}
                      onClick={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
                    >
                      {formFields.tmpTrackNumberFile[0] ? t(TranslationKey['File added']) : 'Photo track numbers'}
                    </Button>
                  </div>

                  <div className={classNames.trackNumberPhotoWrapper}>
                    {formFields.trackNumberFile || formFields.tmpTrackNumberFile[0] ? (
                      <img
                        className={classNames.trackNumberPhoto}
                        src={
                          formFields.tmpTrackNumberFile[0]
                            ? typeof formFields.tmpTrackNumberFile[0] === 'string'
                              ? formFields.tmpTrackNumberFile[0]
                              : formFields.tmpTrackNumberFile[0]?.data_url
                            : formFields.trackNumberFile
                        }
                        // variant="square"
                        onClick={() => {
                          setShowPhotosModal(!showPhotosModal)
                          setBigImagesOptions({
                            ...bigImagesOptions,

                            images: [
                              formFields.tmpTrackNumberFile[0]
                                ? typeof formFields.tmpTrackNumberFile[0] === 'string'
                                  ? formFields.tmpTrackNumberFile[0]
                                  : formFields.tmpTrackNumberFile[0]?.data_url
                                : formFields.trackNumberFile,
                            ],
                          })
                        }}
                      />
                    ) : (
                      <Typography>{'no photo track number...'}</Typography>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className={classNames.commentsWrapper}>
          <Field
            multiline
            disabled={!isClient || !onSubmitChangeFields}
            minRows={3}
            maxRows={3}
            label={t(TranslationKey['Client comment'])}
            placeholder={isClient && onSubmitChangeFields && t(TranslationKey['Add comment'])}
            className={classNames.commentField}
            labelClasses={classNames.label}
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
            className={classNames.commentField}
            labelClasses={classNames.label}
            value={formFields.storekeeperComment}
            onChange={onChangeField('storekeeperComment')}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          {isEdit && (
            <Button success onClick={() => onSubmitChangeFields(formFields)}>
              {t(TranslationKey.Save)}
            </Button>
          )}

          <Button variant="text" className={classNames.closeBtn} onClick={setOpenModal}>
            {t(TranslationKey.Close)}
          </Button>
        </div>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            title={'Track number'}
            tmpCode={formFields.tmpTrackNumberFile}
            item={formFields}
            onClickSaveBarcode={value => {
              setTmpTrackNumberFile()(value)
              setShowSetBarcodeModal(!showSetBarcodeModal)
            }}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>

        <BigImagesModal
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
        />
      </div>
    )
  },
)
