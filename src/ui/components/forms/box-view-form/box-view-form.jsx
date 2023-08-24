/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useState } from 'react'

import { Checkbox, Divider, Grid, Link, Tooltip, Typography } from '@mui/material'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { orderPriority } from '@constants/orders/order-priority'
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
import { PhotoAndFilesCarouselTest } from '@components/shared/photo-and-files-carousel-test'
import { PhotoCarousel } from '@components/shared/photo-carousel'
import { UserLink } from '@components/user/user-link'

import { calcFinalWeightForBox, calcVolumeWeightForBox } from '@utils/calculation'
import { checkIsBuyer, checkIsClient, checkIsStorekeeper } from '@utils/checks'
import { formatShortDateTime } from '@utils/date-time'
import {
  checkAndMakeAbsoluteUrl,
  getNewTariffTextForBoxOrOrder,
  getShortenStringIfLongerThanCount,
  shortAsin,
  toFixed,
} from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './box-view-form.style'

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
    const { classes: classNames } = useClassNames()

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

    return (
      <div className={classNames.formContainer}>
        <div className={classNames.titleWrapper}>
          <div className={classNames.titlePrepIdWrapper}>
            <Typography variant="h6" className={classNames.title}>{`${t(TranslationKey.Box)} № ${
              box.humanFriendlyId
            } `}</Typography>

            <div className={classNames.titlePrepIdSubWrapper}>
              <Typography variant="h6" className={classNames.title}>{`ID:`}</Typography>
              <Input
                disabled={!(isClient || isStorekeeper)}
                className={classNames.itemInput}
                classes={{ input: classNames.input }}
                inputProps={{ maxLength: 25 }}
                value={formFields.prepId}
                onChange={onChangeField('prepId')}
              />
            </div>
          </div>

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
                  value={getNewTariffTextForBoxOrOrder(box) || ''}
                  placeholder={t(TranslationKey['Not available'])}
                />
              </Grid>
            </Grid>

            <div className={classNames.productsWrapper}>
              <Content
                items={formFields.items}
                box={box}
                onClickHsCode={onClickHsCode}
                onChangeHsCode={onChangeHsCode}
              />
            </div>
          </div>

          <div className={classNames.blockWrapper}>
            <div className={classNames.imgSizesWrapper}>
              <div className={classNames.imgWrapper}>
                <Typography className={classNames.label}>{t(TranslationKey['Box photos:'])}</Typography>
                <div className={classNames.imgBoxWrapper}>
                  <PhotoAndFilesCarouselTest whithoutFiles files={box.images} />
                </div>
              </div>

              <div className={classNames.sizesWrapper}>
                <div className={classNames.demensionsWrapper}>
                  <div className={classNames.sizesSubWrapper}>
                    <Typography className={classNames.label}>{t(TranslationKey.Dimensions) + ':'}</Typography>

                    <CustomSwitcher
                      condition={sizeSetting}
                      nameFirstArg={unitsOfChangeOptions.EU}
                      nameSecondArg={unitsOfChangeOptions.US}
                      firstArgValue={unitsOfChangeOptions.EU}
                      secondArgValue={unitsOfChangeOptions.US}
                      changeConditionHandler={condition => setSizeSetting(condition)}
                    />
                  </div>
                  <Typography className={classNames.standartText}>
                    {t(TranslationKey.Length) + ': '}
                    {toFixed(box.lengthCmWarehouse / lengthConversion, 2)}
                  </Typography>
                  <Typography className={classNames.standartText}>
                    {t(TranslationKey.Width) + ': '}
                    {toFixed(box.widthCmWarehouse / lengthConversion, 2)}
                  </Typography>
                  <Typography className={classNames.standartText}>
                    {t(TranslationKey.Height) + ': '}
                    {toFixed(box.heightCmWarehouse / lengthConversion, 2)}
                  </Typography>

                  <Typography className={classNames.standartText}>
                    {t(TranslationKey.Weight) + ': '}
                    {toFixed(box.weighGrossKgWarehouse / weightConversion, 2)}
                  </Typography>
                  <Typography className={classNames.standartText}>
                    {t(TranslationKey['Volume weight']) + ': '}
                    {toFixed(calcVolumeWeightForBox(box, volumeWeightCoefficient) / weightConversion, 2)}
                  </Typography>
                  <Typography
                    className={cx(classNames.standartText, {
                      [classNames.alertText]: finalWeightForBox / weightConversion < totalWeightConversion,
                    })}
                  >
                    {t(TranslationKey['Final weight']) + ': '}
                    {`${toFixed(finalWeightForBox / weightConversion, 2)} ${weightSizesType}!`}
                  </Typography>

                  {finalWeightForBox / weightConversion < totalWeightConversion ? (
                    // eslint-disable-next-line react/jsx-indent
                    <span className={classNames.alertText}>{`${t(TranslationKey['Weight less than'])} ${toFixed(
                      totalWeightConversion,
                      2,
                    )} ${weightSizesType}!`}</span>
                  ) : null}

                  {box.amount > 1 ? (
                    <Typography className={classNames.standartText}>
                      {t(TranslationKey['Total final weight']) + ': '}
                      {toFixed((finalWeightForBox / weightConversion) * box.amount, 2)}
                      {' ' + weightSizesType}
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
                  inputProps={{ maxLength: 250 }}
                  label={t(TranslationKey['Reference id'])}
                  value={formFields.referenceId}
                  onChange={onChangeField('referenceId')}
                />

                <Field
                  disabled={!isEdit || isBuyer}
                  labelClasses={classNames.label}
                  containerClasses={classNames.containerField}
                  inputClasses={classNames.shortInputField}
                  inputProps={{ maxLength: 250 }}
                  label={'FBA number'}
                  value={formFields.fbaNumber}
                  onChange={onChangeField('fbaNumber')}
                />

                <Field
                  disabled={isClient || isBuyer}
                  labelClasses={classNames.label}
                  containerClasses={classNames.containerField}
                  inputClasses={classNames.inputField}
                  inputProps={{ maxLength: 250 }}
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
                      inputProps={{ maxLength: 250 }}
                      label={t(TranslationKey['Track number'])}
                      value={formFields.trackNumberText}
                      onChange={onChangeField('trackNumberText')}
                    />

                    <Button
                      disabled={!isEdit}
                      className={classNames.trackNumberPhotoBtn}
                      onClick={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
                    >
                      {formFields.tmpTrackNumberFile[0]
                        ? t(TranslationKey['File added'])
                        : t(TranslationKey['Photo track numbers'])}
                    </Button>
                  </div>

                  <div className={classNames.trackNumberPhotoWrapper}>
                    {formFields.trackNumberFile[0] || formFields.tmpTrackNumberFile[0] ? (
                      <CustomSlider>
                        {(formFields.trackNumberFile.length
                          ? formFields.trackNumberFile
                          : formFields.tmpTrackNumberFile
                        ).map((el, index) => (
                          <img
                            key={index}
                            className={classNames.trackNumberPhoto}
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
                      <Typography>{`${t(TranslationKey['no photo track number'])}...`}</Typography>
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
      </div>
    )
  },
)

const Content = React.memo(
  ({ items, box, onClickHsCode, onChangeHsCode }) => {
    const { classes: classNames } = useClassNames()

    return (
      <CustomSlider alignButtons="end">
        {items.map((item, index) => (
          <div key={index} className={classNames.productWrapper}>
            <div className={classNames.leftColumn}>
              <div className={classNames.photoWrapper}>
                <PhotoAndFilesCarouselTest whithoutFiles files={item.product.images} />
              </div>
              <Tooltip placement={'right-start'} title={item.product.amazonTitle}>
                <Typography className={classNames.amazonTitle}>
                  {getShortenStringIfLongerThanCount(item.product.amazonTitle, 100)}
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
                labelClasses={classNames.label}
                label={t(TranslationKey['HS code'])}
                inputProps={{ maxLength: 255 }}
                value={item.product.hsCode}
                placeholder={t(TranslationKey['Not available'])}
                inputComponent={
                  <Button className={classNames.hsCodeBtn} onClick={() => onClickHsCode(item.product._id, true)}>
                    {t(TranslationKey['HS code'])}
                  </Button>
                }
                onChange={onChangeHsCode(index)}
              />

              <div className={classNames.priorityWrapper}>
                <Typography className={classNames.label}>{`${t(TranslationKey.Priority)}:`}</Typography>
                {item.order.priority === orderPriority.urgentPriority ? (
                  <div className={classNames.rushOrderWrapper}>
                    <img className={classNames.rushOrderImg} src="/assets/icons/fire.svg" />
                    <Typography className={classNames.rushOrder}>{t(TranslationKey['Rush order'])}</Typography>
                  </div>
                ) : null}
                {item.order.priority !== orderPriority.urgentPriority && !item.order.expressChinaDelivery ? (
                  <div className={classNames.rushOrderWrapper}>
                    <Typography className={classNames.rushOrder}>{t(TranslationKey['Medium priority'])}</Typography>
                  </div>
                ) : null}
              </div>

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
                    <Typography className={classNames.linkField}>{t(TranslationKey['Not available'])}</Typography>
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
                containerClasses={classNames.countContainer}
                labelClasses={classNames.label}
                label={t(TranslationKey.Quantity)}
                value={(box.amount > 1 ? `${item.amount} * ${box.amount}` : item.amount) || 0}
                placeholder={t(TranslationKey['Not available'])}
              />

              <Field
                disabled
                containerClasses={classNames.countContainer}
                labelClasses={classNames.label}
                label={t(TranslationKey['Order number/Item'])}
                value={`${item.order?.id} / ${item.order?.item ? item.order?.item : '-'}`}
              />
            </div>
          </div>
        ))}
      </CustomSlider>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.items === nextProps.items && prevProps.box === nextProps.box) {
      return true
    }
    return false
  },
)
