import { memo, useState } from 'react'

import { Divider, Grid, Link, Typography } from '@mui/material'

import { inchesCoefficient, poundsWeightCoefficient, unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { SupplierApproximateCalculationsForm } from '@components/forms/supplier-approximate-calculations-form'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { SupplierPriceVariationSelector } from '@components/product/suplier-price-variation-selector'
import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomSelectPaymentDetails } from '@components/shared/custom-select-payment-details'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './add-or-edit-supplier-modal-content.style'

import { Dimensions } from './dimensions'

export const AddOrEditSupplierModalContent = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    paymentMethods,
    product,
    storekeepersData,
    onlyRead,
    sourceYuanToDollarRate,
    volumeWeightCoefficient,
    title,
    onTriggerShowModal,
    supplier,
    onClickSaveBtn,
    showProgress,
    progressValue,
    requestStatus,
    outsideProduct,
    onClickPrevButton,
  } = props

  const [showSupplierApproximateCalculationsModal, setShowSupplierApproximateCalculationsModal] = useState(false)

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)
  const [unitSetting, setUnitSetting] = useState(unitsOfChangeOptions.EU)

  const handleChange = isUnit => newAlignment => {
    const multiplier = newAlignment === unitsOfChangeOptions.US ? inchesCoefficient : 1 / inchesCoefficient

    if (isUnit) {
      if (newAlignment !== unitSetting) {
        setTmpSupplier(prev => ({
          ...prev,

          heightUnit: toFixed(prev?.heightUnit / multiplier, 2),
          widthUnit: toFixed(prev?.widthUnit / multiplier, 2),
          lengthUnit: toFixed(prev?.lengthUnit / multiplier, 2),
          weighUnit: toFixed(prev?.weighUnit / multiplier, 2),
        }))

        setUnitSetting(newAlignment)
      }
    } else {
      if (newAlignment !== sizeSetting) {
        setTmpSupplier(prev => ({
          ...prev,
          boxProperties: {
            ...prev.boxProperties,
            boxLengthCm: toFixed(prev.boxProperties.boxLengthCm / multiplier, 2),
            boxWidthCm: toFixed(prev.boxProperties.boxWidthCm / multiplier, 2),
            boxHeightCm: toFixed(prev.boxProperties.boxHeightCm / multiplier, 2),
          },
        }))

        setSizeSetting(newAlignment)
      }
    }
  }

  const [tmpSupplier, setTmpSupplier] = useState({
    amount: supplier?.amount || '',
    comment: supplier?.comment || '',
    link: supplier?.link || '',
    // lotcost: supplier?.lotcost || '',
    minlot: supplier?.minlot || '',
    name: supplier?.name || '',
    price: supplier?.price || '',
    images: supplier?.images || [],
    multiplicity: supplier?.multiplicity || false,

    productionTerm: supplier?.productionTerm || '',
    paymentMethods: supplier?.paymentMethods || [],

    yuanRate: supplier?.yuanRate || sourceYuanToDollarRate,

    priceInYuan: supplier?.priceInYuan || '',

    batchDeliveryCostInDollar: supplier?.batchDeliveryCostInYuan / (supplier?.yuanRate || sourceYuanToDollarRate) || 0,
    batchDeliveryCostInYuan: supplier?.batchDeliveryCostInYuan || 0,
    batchTotalCostInDollar: supplier?.batchTotalCostInDollar || '',
    batchTotalCostInYuan: supplier?.batchTotalCostInYuan || '',

    boxProperties: {
      amountInBox: supplier?.boxProperties?.amountInBox || '',
      boxLengthCm: supplier?.boxProperties?.boxLengthCm || '',
      boxWidthCm: supplier?.boxProperties?.boxWidthCm || '',
      boxHeightCm: supplier?.boxProperties?.boxHeightCm || '',
      boxWeighGrossKg: supplier?.boxProperties?.boxWeighGrossKg || '',
    },

    heightUnit: supplier?.heightUnit || '',
    widthUnit: supplier?.widthUnit || '',
    lengthUnit: supplier?.lengthUnit || '',
    weighUnit: supplier?.weighUnit || '',
    imageUnit: supplier?.imageUnit || [],

    priceVariations: supplier?.priceVariations || [],
  })

  const calculateFieldsToSubmit = () => {
    let res = {
      ...tmpSupplier,
      batchTotalCostInYuan:
        +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInYuan,

      batchTotalCostInDollar: +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar,

      boxProperties: {
        ...tmpSupplier.boxProperties,
        boxLengthCm:
          (sizeSetting === unitsOfChangeOptions.US
            ? tmpSupplier.boxProperties.boxLengthCm * inchesCoefficient
            : tmpSupplier.boxProperties.boxLengthCm) || 0,
        boxWidthCm:
          (sizeSetting === unitsOfChangeOptions.US
            ? tmpSupplier.boxProperties.boxWidthCm * inchesCoefficient
            : tmpSupplier.boxProperties.boxWidthCm) || 0,
        boxHeightCm:
          (sizeSetting === unitsOfChangeOptions.US
            ? tmpSupplier.boxProperties.boxHeightCm * inchesCoefficient
            : tmpSupplier.boxProperties.boxHeightCm) || 0,

        amountInBox: tmpSupplier.boxProperties.amountInBox || 0,
        boxWeighGrossKg: tmpSupplier.boxProperties.boxWeighGrossKg || 0,
      },

      productionTerm: tmpSupplier?.productionTerm ? tmpSupplier?.productionTerm : 0,
    }

    if (
      !tmpSupplier.boxProperties.amountInBox ||
      !tmpSupplier.boxProperties.boxLengthCm ||
      !tmpSupplier.boxProperties.boxWidthCm ||
      !tmpSupplier.boxProperties.boxHeightCm ||
      !tmpSupplier.boxProperties.boxWeighGrossKg
    ) {
      res = { ...res, boxProperties: null }
    }

    return res
  }

  const [makeMainSupplier, setMakeMainSupplier] = useState(false)

  const [photosOfSupplier, setPhotosOfSupplier] = useState([])
  const [photosOfUnit, setPhotosOfUnit] = useState([])

  const [editPhotosOfSupplier, setEditPhotosOfSupplier] = useState(supplier?.images || [])
  const [editPhotosOfUnit, setEditPhotosOfUnit] = useState(supplier?.imageUnit || [])

  const onChangeDetailsPhotosToLoad = value => setEditPhotosOfSupplier(value)
  const onChangePhotosOfUnit = value => setEditPhotosOfUnit(value)

  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [curImageIndex, setCurImageIndex] = useState(0)

  const renderFooterModalButtons = () => {
    if (outsideProduct) {
      return (
        <div className={styles.buttonsWrapperClient}>
          <Button className={styles.prevBtnClient} onClick={() => onClickPrevButton()}>
            {t(TranslationKey.Back)}
          </Button>
          <div>
            <Button
              styleType={ButtonStyle.SUCCESS}
              tooltipInfoContent={t(TranslationKey['Saves the current supplier to the selected product'])}
              disabled={diasabledSubmit}
              className={styles.saveBtnClient}
              onClick={() => {
                onClickSaveBtn({
                  supplier: { ...calculateFieldsToSubmit(), _id: supplier && supplier._id },
                  photosOfSupplier,
                  photosOfUnit,
                  addMore: false,
                  makeMainSupplier,
                  editPhotosOfSupplier,
                  editPhotosOfUnit,
                })
              }}
            >
              {t(TranslationKey['Save and bind'])}
            </Button>
            <Button
              styleType={ButtonStyle.SUCCESS}
              tooltipInfoContent={t(TranslationKey['Saves the supplier and opens the form for adding a new one'])}
              disabled={diasabledSubmit}
              className={styles.saveBtnClient}
              onClick={() => {
                onClickSaveBtn({
                  supplier: { ...calculateFieldsToSubmit(), _id: supplier && supplier._id },
                  photosOfSupplier,
                  photosOfUnit,
                  addMore: false,
                  makeMainSupplier,
                  editPhotosOfSupplier,
                  editPhotosOfUnit,
                })
                onTriggerShowModal()
              }}
            >
              {t(TranslationKey['Save and add more'])}
            </Button>
          </div>
        </div>
      )
    } else if (onlyRead) {
      return (
        <div className={styles.buttonsWrapper}>
          <Button className={styles.cancelBtn} variant={ButtonVariant.OUTLINED} onClick={onTriggerShowModal}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      )
    } else {
      return (
        <div className={styles.buttonsWrapper}>
          <Button
            tooltipInfoContent={t(TranslationKey['Saves data about the supplier'])}
            disabled={diasabledSubmit}
            className={styles.saveBtn}
            onClick={() => {
              onClickSaveBtn({
                supplier: { ...calculateFieldsToSubmit(), _id: supplier && supplier._id },
                photosOfSupplier,
                photosOfUnit,
                editPhotosOfSupplier,
                editPhotosOfUnit,
              })

              setPhotosOfSupplier(() => [])
              setPhotosOfUnit(() => [])
            }}
          >
            {t(TranslationKey.Save)}
          </Button>
          <Button
            variant={ButtonVariant.OUTLINED}
            tooltipInfoContent={t(TranslationKey['Cancel supplier creation/change'])}
            className={styles.cancelBtn}
            onClick={onTriggerShowModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      )
    }
  }

  const onChangePaymentMethod = event => {
    const selectedValues = event
    const valueToAddOrRemove = selectedValues[selectedValues?.length - 1]
    if (valueToAddOrRemove?._id === 'SELECT_ALL') {
      if (tmpSupplier?.paymentMethods?.length === paymentMethods?.length) {
        setTmpSupplier({
          ...tmpSupplier,
          paymentMethods: [],
        })
      } else {
        setTmpSupplier({
          ...tmpSupplier,
          paymentMethods: [...paymentMethods],
        })
      }
    } else {
      if (tmpSupplier?.paymentMethods?.some(value => value._id === valueToAddOrRemove._id)) {
        setTmpSupplier({
          ...tmpSupplier,
          paymentMethods: tmpSupplier?.paymentMethods?.filter(value => value?._id !== valueToAddOrRemove?._id),
        })
      } else {
        setTmpSupplier({
          ...tmpSupplier,
          paymentMethods: [...tmpSupplier.paymentMethods, valueToAddOrRemove],
        })
      }
    }
  }

  const onChangeField = fieldName => event => {
    if (
      fieldName !== 'name' &&
      fieldName !== 'comment' &&
      fieldName !== 'link' &&
      fieldName !== 'multiplicity' &&
      (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(event.target.value) || +event.target.value >= 1000000)
    ) {
      return
    } else if ('multiplicity' === fieldName) {
      setTmpSupplier({
        ...tmpSupplier,
        [fieldName]: event?.target?.checked,
      })
    } else if (['minlot', 'amount', 'productionTerm'].includes(fieldName)) {
      setTmpSupplier({ ...tmpSupplier, [fieldName]: parseInt(event.target.value) || '' })
    } else if (['amountInBox'].includes(fieldName)) {
      setTmpSupplier({
        ...tmpSupplier,
        boxProperties: { ...tmpSupplier.boxProperties, [fieldName]: parseInt(event.target.value) || '' },
      })
    } else if (['boxLengthCm', 'boxWidthCm', 'boxHeightCm', 'boxWeighGrossKg'].includes(fieldName)) {
      setTmpSupplier({
        ...tmpSupplier,
        boxProperties: { ...tmpSupplier.boxProperties, [fieldName]: event.target.value || '' },
      })
    } else if (['price'].includes(fieldName)) {
      setTmpSupplier({
        ...tmpSupplier,
        [fieldName]: event.target.value,
        priceInYuan: event.target.value * tmpSupplier?.yuanRate,
      })
    } else if (['priceInYuan'].includes(fieldName)) {
      setTmpSupplier({
        ...tmpSupplier,
        [fieldName]: event.target.value,
        price:
          event.target.value /
          (tmpSupplier?.yuanRate === '' || parseFloat(tmpSupplier?.yuanRate) === 0 ? 1 : tmpSupplier?.yuanRate),
      })
    } else if (['batchDeliveryCostInDollar'].includes(fieldName)) {
      setTmpSupplier({
        ...tmpSupplier,
        [fieldName]: event.target.value,
        batchDeliveryCostInYuan:
          event.target.value * (tmpSupplier?.yuanRate === ('' || '0') ? 1 : tmpSupplier?.yuanRate),
      })
    } else if (['batchDeliveryCostInYuan'].includes(fieldName)) {
      setTmpSupplier({
        ...tmpSupplier,
        [fieldName]: event.target.value,
        batchDeliveryCostInDollar:
          event.target.value /
          (tmpSupplier?.yuanRate === '' || parseFloat(tmpSupplier?.yuanRate) === 0 ? 1 : tmpSupplier?.yuanRate),
      })
    } else {
      setTmpSupplier({ ...tmpSupplier, [fieldName]: event.target.value })
    }
  }

  const onChangeYuanToDollarRate = e => {
    if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
      setTmpSupplier({
        ...tmpSupplier,
        yuanRate: e.target.value,
        batchDeliveryCostInDollar:
          tmpSupplier.batchDeliveryCostInYuan /
          (e.target.value === '' || parseFloat(e.target.value) === 0 ? 1 : e.target.value),
        price:
          tmpSupplier.priceInYuan / (e.target.value === '' || parseFloat(e.target.value) === 0 ? 1 : e.target.value),
      })
    }
  }

  const unitVolumeWeight = toFixed(
    (tmpSupplier.heightUnit * tmpSupplier.widthUnit * tmpSupplier.lengthUnit) / volumeWeightCoefficient,
    2,
  )

  const boxPropertiesIsFull =
    tmpSupplier.boxProperties?.amountInBox &&
    tmpSupplier.boxProperties?.boxLengthCm &&
    tmpSupplier.boxProperties?.boxWidthCm &&
    tmpSupplier.boxProperties?.boxHeightCm &&
    tmpSupplier.boxProperties?.boxWeighGrossKg

  const boxPropertiesIsFullAndMainsValues =
    boxPropertiesIsFull && tmpSupplier.amount && tmpSupplier.minlot && tmpSupplier.priceInYuan && tmpSupplier.price

  const itHaveBigInt =
    +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInYuan >= 1000000 ||
    tmpSupplier.batchDeliveryCostInYuan >= 1000000 ||
    tmpSupplier.priceInYuan >= 1000000 ||
    +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar >= 1000000

  const isNeedUnitInfo =
    (tmpSupplier?.heightUnit || tmpSupplier?.widthUnit || tmpSupplier?.lengthUnit) &&
    (!tmpSupplier?.heightUnit ||
      !tmpSupplier?.widthUnit ||
      !tmpSupplier?.lengthUnit ||
      (photosOfUnit?.length || 0) + (editPhotosOfUnit?.length || 0) < 4)

  const diasabledSubmit =
    itHaveBigInt ||
    '' === !tmpSupplier.name ||
    '' === tmpSupplier.price ||
    '' === tmpSupplier.link ||
    '' === tmpSupplier.amount ||
    '' === tmpSupplier.minlot ||
    '' === tmpSupplier.priceInYuan ||
    '' === tmpSupplier.batchDeliveryCostInDollar ||
    '' === tmpSupplier.batchDeliveryCostInYuan ||
    '' === tmpSupplier?.yuanRate ||
    '0' === tmpSupplier?.yuanRate ||
    0 === parseFloat(tmpSupplier.price) ||
    0 === parseInt(tmpSupplier.amount) ||
    0 === parseInt(tmpSupplier.minlot) ||
    requestStatus === loadingStatuses.IS_LOADING ||
    ((tmpSupplier.boxProperties?.amountInBox ||
      tmpSupplier.boxProperties?.boxLengthCm ||
      tmpSupplier.boxProperties?.boxWidthCm ||
      tmpSupplier.boxProperties?.boxHeightCm ||
      tmpSupplier.boxProperties?.boxWeighGrossKg) &&
      !boxPropertiesIsFullAndMainsValues) ||
    isNeedUnitInfo

  const allPaymentMethods = paymentMethods.map(payment => payment?.paymentMethod)

  return (
    <div className={styles.modalContainer}>
      {onlyRead ? (
        <Typography className={styles.modalTitle}>{t(TranslationKey['Viewing Supplier'])}</Typography>
      ) : (
        <Typography className={styles.modalTitle}>{title}</Typography>
      )}
      <Divider className={styles.titleDivider} />

      <div>
        <Typography className={styles.modalTitle}>{t(TranslationKey['Basic information'])}</Typography>

        <div className={styles.nameBlock}>
          <Field
            disabled={onlyRead}
            tooltipInfoContent={t(TranslationKey['Enter the name of the supplier'])}
            inputProps={{ maxLength: 100 }}
            label={t(TranslationKey.Title) + '*'}
            containerClasses={styles.nameContainer}
            labelClasses={styles.normalLabel}
            value={tmpSupplier.name}
            onChange={onChangeField('name')}
          />

          <Field
            disabled={onlyRead}
            tooltipInfoContent={t(TranslationKey['Enter the amount of goods to be purchased'])}
            label={t(TranslationKey['Purchase quantity for the current price']) + '*'}
            inputProps={{ maxLength: 10 }}
            containerClasses={styles.middleContainer}
            labelClasses={styles.normalLabel}
            value={tmpSupplier.amount}
            error={parseInt(tmpSupplier.amount) === 0 && t(TranslationKey["can't be zero"])}
            onChange={onChangeField('amount')}
          />
          <Field
            disabled={onlyRead}
            tooltipInfoContent={t(TranslationKey['Minimum quantity of goods needed to order'])}
            label={t(TranslationKey['Minimum batch']) + '*'}
            inputProps={{ maxLength: 10 }}
            containerClasses={styles.middleContainer}
            labelClasses={styles.normalLabel}
            value={tmpSupplier.minlot}
            error={parseInt(tmpSupplier.minlot) === 0 && t(TranslationKey["can't be zero"])}
            onChange={onChangeField('minlot')}
          />
        </div>

        <div className={cx(styles.nameBlock, styles.nameBlockFlexStart)}>
          {onlyRead ? (
            <Field
              tooltipInfoContent={t(TranslationKey['Link to supplier site'])}
              label={t(TranslationKey.Link) + '*'}
              inputProps={{ maxLength: 2000 }}
              containerClasses={styles.linkContainer}
              labelClasses={styles.normalLabel}
              inputComponent={
                <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(tmpSupplier.link)}>
                  <Typography disabled className={styles.link}>
                    {tmpSupplier.link}
                  </Typography>
                </Link>
              }
            />
          ) : (
            <Field
              tooltipInfoContent={t(TranslationKey['Link to supplier site'])}
              label={t(TranslationKey.Link) + '*'}
              inputProps={{ maxLength: 2000 }}
              containerClasses={styles.linkContainer}
              labelClasses={styles.normalLabel}
              value={tmpSupplier.link}
              onChange={onChangeField('link')}
            />
          )}

          <Field
            disabled={onlyRead}
            inputProps={{ maxLength: 10 }}
            label={t(TranslationKey['Production time'])}
            containerClasses={styles.middleContainer}
            labelClasses={styles.normalLabel}
            value={tmpSupplier?.productionTerm}
            onChange={onChangeField('productionTerm')}
          />
        </div>
      </div>

      <div>
        <div className={styles.costBlock}>
          <Typography className={styles.modalTitle}>{t(TranslationKey['Total price'])}</Typography>

          <Field
            oneLine
            disabled
            label={t(TranslationKey['Actual course'])}
            inputProps={{ maxLength: 8 }}
            containerClasses={styles.rateContainer}
            labelClasses={cx(styles.rateLabel)}
            inputClasses={styles.courseInput}
            value={sourceYuanToDollarRate}
          />

          <Field
            oneLine
            error={`${sourceYuanToDollarRate}` !== `${tmpSupplier?.yuanRate}`}
            disabled={onlyRead}
            tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
            label={t(TranslationKey['Current supplier course'])}
            inputProps={{ maxLength: 8 }}
            containerClasses={styles.rateContainer}
            labelClasses={cx(styles.rateLabel)}
            inputClasses={styles.courseInput}
            value={tmpSupplier?.yuanRate}
            onChange={onChangeYuanToDollarRate}
          />
        </div>

        <div className={styles.calculationMainWrapper}>
          <div>
            <Typography className={styles.modalTitle}>{'¥'}</Typography>

            <Grid container spacing={1} direction="row" justifyContent="flex-end" alignItems="flex-start">
              <Grid item>
                <Field
                  error={tmpSupplier.priceInYuan >= 1000000 && '> 1000000 !'}
                  disabled={onlyRead}
                  tooltipInfoContent={t(TranslationKey['Price per unit'])}
                  label={t(TranslationKey['price per unit']) + ', ¥*'}
                  inputProps={{ maxLength: 10 }}
                  containerClasses={styles.middleContainer}
                  labelClasses={styles.normalLabel}
                  value={toFixed(tmpSupplier.priceInYuan, 2)}
                  onChange={onChangeField('priceInYuan')}
                />
              </Grid>

              <Grid item>
                <Field
                  disabled
                  error={
                    +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInYuan >=
                      1000000 && '> 1000000 !'
                  }
                  tooltipInfoContent={t(
                    TranslationKey['Calculated from the price per unit multiplied by the number of purchases'],
                  )}
                  label={t(TranslationKey['Batch price']) + ', ¥*'}
                  inputProps={{ maxLength: 10 }}
                  containerClasses={styles.middleContainer}
                  labelClasses={styles.normalLabel}
                  value={toFixed(
                    +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInYuan,
                    2,
                  )}
                />
              </Grid>

              <Grid item>
                <Field
                  disabled
                  label={t(TranslationKey['Price with delivery per unit']) + ', ¥*'}
                  inputProps={{ maxLength: 10 }}
                  containerClasses={styles.middleContainer}
                  labelClasses={styles.normalLabel}
                  value={
                    tmpSupplier.amount
                      ? toFixed(
                          toFixed(
                            +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) +
                              +tmpSupplier.batchDeliveryCostInYuan,
                            2,
                          ) / +tmpSupplier.amount,
                          2,
                        )
                      : '-'
                  }
                />
              </Grid>

              <Grid item>
                <Field
                  disabled={onlyRead}
                  error={tmpSupplier.batchDeliveryCostInYuan >= 1000000 && '> 1000000 !'}
                  tooltipInfoContent={t(
                    TranslationKey['Shipping price for a batch in China for a specified number of purchases'],
                  )}
                  label={t(TranslationKey['Batch delivery']) + ', ¥*'}
                  inputProps={{ maxLength: 10 }}
                  containerClasses={styles.middleContainer}
                  labelClasses={styles.normalLabel}
                  value={toFixed(tmpSupplier.batchDeliveryCostInYuan, 2)}
                  onChange={onChangeField('batchDeliveryCostInYuan')}
                />
              </Grid>
            </Grid>
          </div>

          <Divider flexItem orientation="vertical" className={styles.divider} />

          <div>
            <Typography className={styles.modalTitle}>{'$'}</Typography>

            <Grid container spacing={1} direction="row" justifyContent="flex-end" alignItems="flex-start">
              <Grid item>
                <Field
                  disabled={onlyRead}
                  tooltipInfoContent={t(TranslationKey['Price per unit'])}
                  label={t(TranslationKey['price per unit']) + ', $*'}
                  inputProps={{ maxLength: 10 }}
                  containerClasses={styles.middleContainer}
                  labelClasses={styles.normalLabel}
                  value={toFixed(tmpSupplier.price, 2)}
                  onChange={onChangeField('price')}
                />
              </Grid>

              <Grid item>
                <Field
                  disabled
                  error={
                    +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar >=
                      1000000 && '> 1000000 !'
                  }
                  tooltipInfoContent={t(
                    TranslationKey['Calculated from the price per unit multiplied by the number of purchases'],
                  )}
                  label={t(TranslationKey['Batch price']) + ', $*'}
                  inputProps={{ maxLength: 15 }}
                  containerClasses={styles.middleContainer}
                  labelClasses={styles.normalLabel}
                  value={toFixed(
                    +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar,
                    2,
                  )}
                />
              </Grid>

              <Grid item>
                <Field
                  disabled
                  label={t(TranslationKey['Price with delivery per unit']) + ', $*'}
                  inputProps={{ maxLength: 10 }}
                  containerClasses={styles.middleContainer}
                  labelClasses={styles.normalLabel}
                  value={
                    tmpSupplier.amount
                      ? toFixed(
                          toFixed(
                            +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar,
                            2,
                          ) / +tmpSupplier.amount,
                          2,
                        )
                      : '-'
                  }
                />
              </Grid>

              <Grid item>
                <Field
                  disabled={onlyRead}
                  tooltipInfoContent={t(
                    TranslationKey['Shipping price for a batch in China for a specified number of purchases'],
                  )}
                  label={t(TranslationKey['Batch delivery']) + ', $*'}
                  inputProps={{ maxLength: 15 }}
                  containerClasses={styles.middleContainer}
                  labelClasses={styles.normalLabel}
                  value={toFixed(tmpSupplier.batchDeliveryCostInDollar, 2)}
                  onChange={onChangeField('batchDeliveryCostInDollar')}
                />
              </Grid>
            </Grid>
          </div>
        </div>

        {(!onlyRead || !!tmpSupplier.priceVariations.length) && (
          <SupplierPriceVariationSelector
            isEditMode={!onlyRead}
            currentVariations={tmpSupplier.priceVariations}
            updateVariationList={newVariations => {
              setTmpSupplier(prevState => ({
                ...prevState,
                priceVariations: newVariations,
              }))
            }}
          />
        )}

        <div className={styles.paymentsBlock}>
          <CustomSelectPaymentDetails
            orderPayments={tmpSupplier?.paymentMethods}
            allPayments={allPaymentMethods}
            onlyRead={onlyRead}
            onChangePaymentMethod={onChangePaymentMethod}
          />
        </div>

        <div className={styles.boxInfoMainWrapper}>
          <Typography className={styles.modalTitle}>{t(TranslationKey['Box info'])}</Typography>

          <div className={styles.boxInfoWrapper}>
            <Dimensions
              title={t(TranslationKey.Dimensions)}
              onlyRead={onlyRead}
              sizeMode={sizeSetting}
              height={tmpSupplier.boxProperties.boxHeightCm}
              width={tmpSupplier.boxProperties.boxWidthCm}
              length={tmpSupplier.boxProperties.boxLengthCm}
              grossWeigh={tmpSupplier.boxProperties.boxWeighGrossKg}
              optionalWeight={toFixed(tmpSupplier.boxProperties.boxWeighGrossKg / poundsWeightCoefficient, 2) || ''}
              optionalWeightTitle={t(TranslationKey['Weight, Lbs'])}
              onChangeSizeMode={handleChange(false)}
              onChangeHeight={onChangeField('boxHeightCm')}
              onChangeWidth={onChangeField('boxWidthCm')}
              onChangeLength={onChangeField('boxLengthCm')}
              onChangeWeighGross={onChangeField('boxWeighGrossKg')}
            />

            <div className={styles.boxInfoSubWrapper}>
              <div
                className={cx(styles.checkboxWrapper, {
                  [styles.disabledCheckboxWrapper]: onlyRead || !boxPropertiesIsFull,
                })}
              >
                <Checkbox
                  disabled={onlyRead || !boxPropertiesIsFull}
                  className={styles.checkbox}
                  checked={tmpSupplier.multiplicity}
                  color="primary"
                  onChange={onChangeField('multiplicity')}
                >
                  <p>{t(TranslationKey['Use multiples of items when creating boxes'])}</p>
                </Checkbox>
              </div>

              <div className={styles.boxInfoExtraSubWrapper}>
                <Field
                  disabled={onlyRead}
                  label={t(TranslationKey['Number of units in box'])}
                  inputProps={{ maxLength: 10 }}
                  containerClasses={styles.shortContainer}
                  labelClasses={styles.normalLabel}
                  value={tmpSupplier.boxProperties.amountInBox}
                  onChange={onChangeField('amountInBox')}
                />

                <Field
                  disabled
                  tooltipInfoContent={t(TranslationKey['Calculated from the dimensions of the box'])}
                  label={t(TranslationKey['Volume weight, kg'])}
                  inputProps={{ maxLength: 15 }}
                  containerClasses={styles.shortContainer}
                  labelClasses={styles.normalLabel}
                  value={toFixed(
                    (sizeSetting === unitsOfChangeOptions.US
                      ? tmpSupplier.boxProperties.boxHeightCm *
                        inchesCoefficient *
                        tmpSupplier.boxProperties.boxWidthCm *
                        inchesCoefficient *
                        tmpSupplier.boxProperties.boxLengthCm *
                        inchesCoefficient
                      : tmpSupplier.boxProperties.boxHeightCm *
                        tmpSupplier.boxProperties.boxWidthCm *
                        tmpSupplier.boxProperties.boxLengthCm) / volumeWeightCoefficient,
                    2,
                  )}
                />
              </div>
            </div>
          </div>

          <div className={styles.unitDimensionsWrapper}>
            <Dimensions
              title={t(TranslationKey['Package dimensions'])}
              onlyRead={onlyRead}
              sizeMode={unitSetting}
              height={tmpSupplier.heightUnit}
              width={tmpSupplier.widthUnit}
              length={tmpSupplier.lengthUnit}
              grossWeigh={tmpSupplier.weighUnit}
              optionalWeight={unitVolumeWeight}
              optionalWeightTitle={t(TranslationKey['Volume weight'])}
              onChangeSizeMode={handleChange(true)}
              onChangeHeight={onChangeField('heightUnit')}
              onChangeWidth={onChangeField('widthUnit')}
              onChangeLength={onChangeField('lengthUnit')}
              onChangeWeighGross={onChangeField('weighUnit')}
            />

            <div className={styles.unitDimensionsSubWrapper}>
              {!onlyRead ? (
                <div>
                  <p className={styles.normalLabel}>{t(TranslationKey['Attach files (dimensions)'])}</p>
                  {isNeedUnitInfo && (
                    <p className={cx(styles.normalLabel, styles.needAddPhotos)}>
                      {t(TranslationKey['Add at least 4 photos'])}
                    </p>
                  )}
                  <UploadFilesInput
                    withoutLinks
                    fullWidth
                    minimized
                    images={photosOfUnit}
                    setImages={setPhotosOfUnit}
                    dragAndDropBtnHeight={'34px'}
                    maxNumber={supplier?.imageUnit ? 50 - supplier?.imageUnit?.length : 50}
                  />
                </div>
              ) : null}

              <PhotoAndFilesSlider
                smallSlider
                showPreviews
                withoutMakeMainImage
                isEditable={!onlyRead}
                files={editPhotosOfUnit}
                onChangeImagesForLoad={onChangePhotosOfUnit}
              />
            </div>
          </div>
        </div>
      </div>

      {product && storekeepersData.length ? (
        <div className={styles.calculationBtnWrapper}>
          <Button
            tooltipAttentionContent={
              !product ||
              !storekeepersData?.length ||
              (!boxPropertiesIsFullAndMainsValues && t(TranslationKey['Not enough data']))
            }
            disabled={!product || !storekeepersData || !boxPropertiesIsFullAndMainsValues}
            onClick={() => setShowSupplierApproximateCalculationsModal(!showSupplierApproximateCalculationsModal)}
          >
            {t(TranslationKey['View an oriented calculation'])}
          </Button>
        </div>
      ) : null}

      <Field
        multiline
        disabled={onlyRead}
        tooltipInfoContent={t(TranslationKey['The comment indicated for this supplier'])}
        className={styles.commentField}
        labelClasses={styles.normalLabel}
        inputProps={{ maxLength: 2000 }}
        minRows={4}
        maxRows={6}
        label={t(TranslationKey.Comment)}
        value={tmpSupplier.comment}
        onChange={onChangeField('comment')}
      />

      {outsideProduct && (
        <Field
          oneLine
          disabled={onlyRead}
          tooltipInfoContent={t(TranslationKey['Make the current supplier on which the order will be made'])}
          label={t(TranslationKey['Make the main supplier'])}
          containerClasses={styles.makeMainSupplierСheckboxWrapper}
          inputComponent={
            <Checkbox
              color="primary"
              checked={makeMainSupplier}
              onChange={() => setMakeMainSupplier(!makeMainSupplier)}
            />
          }
        />
      )}

      <div className={styles.bottomWrapper}>
        <div>
          {!onlyRead ? (
            <div className={styles.imageFileInputWrapper}>
              <UploadFilesInput
                images={photosOfSupplier}
                setImages={setPhotosOfSupplier}
                maxNumber={supplier?.images ? 50 - supplier?.images?.length : 50}
                className={styles.imageFileInput}
              />
            </div>
          ) : null}
          <div className={styles.photoAndFilesWrapper}>
            <PhotoAndFilesSlider
              smallSlider
              showPreviews
              withoutMakeMainImage
              isEditable={!onlyRead}
              files={tmpSupplier.images}
              onChangeImagesForLoad={onChangeDetailsPhotosToLoad}
            />
          </div>
        </div>
      </div>

      <Divider className={styles.fieldsDivider} />

      {renderFooterModalButtons()}

      {showProgress && (
        <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
      )}

      {showPhotosModal && (
        <ImageModal
          isOpenModal={showPhotosModal}
          files={tmpSupplier.images}
          currentFileIndex={curImageIndex}
          onOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          onCurrentFileIndex={index => setCurImageIndex(index)}
        />
      )}

      <Modal
        openModal={showSupplierApproximateCalculationsModal}
        setOpenModal={() => setShowSupplierApproximateCalculationsModal(!showSupplierApproximateCalculationsModal)}
      >
        <SupplierApproximateCalculationsForm
          volumeWeightCoefficient={volumeWeightCoefficient}
          product={product}
          supplier={tmpSupplier}
          storekeepers={storekeepersData}
          onClose={() => setShowSupplierApproximateCalculationsModal(!showSupplierApproximateCalculationsModal)}
        />
      </Modal>
    </div>
  )
})
