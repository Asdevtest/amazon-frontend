import { memo, useEffect, useMemo, useState } from 'react'

import { Divider } from '@mui/material'

import {
  inchesCoefficient,
  poundsCoefficient,
  poundsWeightCoefficient,
  unitWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { SupplierModel } from '@models/supplier-model'

import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { SupplierPriceVariationSelector } from '@components/product/suplier-price-variation-selector'
import { Checkbox } from '@components/shared/checkbox'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomButton } from '@components/shared/custom-button'
import { CustomSelectPaymentDetails } from '@components/shared/custom-select-payment-details'
import { Field } from '@components/shared/field'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './add-or-edit-supplier-modal-content.style'

import { Dimensions } from './dimensions'

export const AddOrEditSupplierModalContent = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    isIdea,
    paymentMethods,
    product,
    storekeepersData,
    onlyRead,
    platformSettings,
    title,
    onTriggerShowModal,
    supplierId,
    onClickSaveBtn,
    showProgress,
    progressValue,
    requestStatus,
    outsideProduct,
    onClickPrevButton,
  } = props

  const [supplier, setSupplier] = useState(undefined)

  const getFullSupplier = async id => {
    try {
      const response = await SupplierModel.getSupplier(id)

      if (response) {
        setSupplier(response)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (supplierId) {
      getFullSupplier(supplierId)
    }
  }, [supplierId])

  const getInitialState = () => ({
    amount: supplier?.amount || '',
    comment: supplier?.comment || '',
    link: supplier?.link || '',
    minlot: supplier?.minlot || '',
    name: supplier?.name || '',
    price: supplier?.price || '',
    images: supplier?.images || [],
    multiplicity: supplier?.multiplicity || false,
    minProductionTerm: supplier?.minProductionTerm || '',
    maxProductionTerm: supplier?.maxProductionTerm || '',
    paymentMethods: supplier?.paymentMethods || [],
    yuanRate: supplier?.yuanRate || platformSettings?.yuanToDollarRate,
    priceInYuan: supplier?.priceInYuan || '',
    batchDeliveryCostInDollar:
      supplier?.batchDeliveryCostInYuan / (supplier?.yuanRate || platformSettings?.yuanToDollarRate) || 0,
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
    _id: supplier?._id || '',
  })

  const [tmpSupplier, setTmpSupplier] = useState(getInitialState())

  useEffect(() => {
    if (supplier) {
      setTmpSupplier(getInitialState())
    }
  }, [supplier])

  const [showSupplierApproximateCalculationsModal, setShowSupplierApproximateCalculationsModal] = useState(false)

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)
  const [unitSetting, setUnitSetting] = useState(unitsOfChangeOptions.EU)

  const handleChange = isUnit => newAlignment => {
    const multiplier = newAlignment === unitsOfChangeOptions.US ? inchesCoefficient : 1 / inchesCoefficient
    const weightMultiplier =
      newAlignment === unitsOfChangeOptions.US ? 1 / poundsWeightCoefficient : poundsWeightCoefficient

    if (isUnit) {
      if (newAlignment !== unitSetting) {
        setTmpSupplier(prev => ({
          ...prev,

          heightUnit: toFixed(prev?.heightUnit / multiplier || '', 2),
          widthUnit: toFixed(prev?.widthUnit / multiplier || '', 2),
          lengthUnit: toFixed(prev?.lengthUnit / multiplier || '', 2),
          weighUnit: toFixed(prev?.weighUnit * weightMultiplier || '', 2),
        }))

        setUnitSetting(newAlignment)
      }
    } else {
      if (newAlignment !== sizeSetting) {
        setTmpSupplier(prev => ({
          ...prev,
          boxProperties: {
            ...prev.boxProperties,
            boxLengthCm: toFixed(prev.boxProperties.boxLengthCm / multiplier || '', 2),
            boxWidthCm: toFixed(prev.boxProperties.boxWidthCm / multiplier || '', 2),
            boxHeightCm: toFixed(prev.boxProperties.boxHeightCm / multiplier || '', 2),
          },
        }))

        setSizeSetting(newAlignment)
      }
    }
  }

  const calculateFieldsToSubmit = () => {
    const multiplier = unitSetting === unitsOfChangeOptions.US ? inchesCoefficient : 1
    const weightMultiplier = unitSetting === unitsOfChangeOptions.US ? poundsCoefficient : 1

    let res = {
      ...tmpSupplier,
      batchTotalCostInYuan:
        +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInYuan,

      batchTotalCostInDollar: +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar,

      heightUnit: toFixed(tmpSupplier?.heightUnit * multiplier || '', 2),
      widthUnit: toFixed(tmpSupplier?.widthUnit * multiplier || '', 2),
      lengthUnit: toFixed(tmpSupplier?.lengthUnit * multiplier || '', 2),
      weighUnit: toFixed(tmpSupplier?.weighUnit / weightMultiplier || '', 2),

      boxProperties: {
        ...tmpSupplier.boxProperties,
        boxLengthCm:
          (sizeSetting === unitsOfChangeOptions.US
            ? toFixed(tmpSupplier.boxProperties.boxLengthCm * inchesCoefficient, 2)
            : tmpSupplier.boxProperties.boxLengthCm) || 0,
        boxWidthCm:
          (sizeSetting === unitsOfChangeOptions.US
            ? toFixed(tmpSupplier.boxProperties.boxWidthCm * inchesCoefficient, 2)
            : tmpSupplier.boxProperties.boxWidthCm) || 0,
        boxHeightCm:
          (sizeSetting === unitsOfChangeOptions.US
            ? toFixed(tmpSupplier.boxProperties.boxHeightCm * inchesCoefficient, 2)
            : tmpSupplier.boxProperties.boxHeightCm) || 0,

        amountInBox: tmpSupplier.boxProperties.amountInBox || 0,
        boxWeighGrossKg: tmpSupplier.boxProperties.boxWeighGrossKg || 0,
      },

      minProductionTerm: tmpSupplier?.minProductionTerm || 0,
      maxProductionTerm: tmpSupplier?.maxProductionTerm || 0,

      _id: supplier?._id,
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
  const [editPhotosOfSupplier, setEditPhotosOfSupplier] = useState([])
  const [editPhotosOfUnit, setEditPhotosOfUnit] = useState([])

  useEffect(() => {
    if (supplier?.images?.length > 0) {
      setEditPhotosOfSupplier(supplier?.images)
    }
    if (supplier?.imageUnit?.length > 0) {
      setEditPhotosOfUnit(supplier?.imageUnit)
    }
  }, [supplier])

  const renderFooterModalButtons = () => {
    if (outsideProduct) {
      return (
        <div className={styles.buttonsWrapperClient}>
          <CustomButton onClick={() => onClickPrevButton()}>{t(TranslationKey.Back)}</CustomButton>
          <div className={styles.saveBtnWrapperClient}>
            <CustomButton
              type="primary"
              disabled={diasabledSubmit}
              onClick={() => {
                onClickSaveBtn({
                  supplier: calculateFieldsToSubmit(),
                  editPhotosOfSupplier,
                  editPhotosOfUnit,
                  itemId: product?._id,
                })
                onTriggerShowModal()
              }}
            >
              {t(TranslationKey['Save and bind'])}
            </CustomButton>
            <CustomButton
              type="primary"
              disabled={diasabledSubmit}
              onClick={() => {
                onClickSaveBtn({
                  supplier: calculateFieldsToSubmit(),
                  editPhotosOfSupplier,
                  editPhotosOfUnit,
                  itemId: product?._id,
                })
                onTriggerShowModal()
              }}
            >
              {t(TranslationKey['Save and add more'])}
            </CustomButton>
          </div>
        </div>
      )
    } else if (onlyRead) {
      return (
        <div className={styles.buttonsWrapper}>
          <CustomButton onClick={onTriggerShowModal}>{t(TranslationKey.Close)}</CustomButton>
        </div>
      )
    } else {
      return (
        <div className={styles.buttonsWrapper}>
          <CustomButton
            disabled={diasabledSubmit}
            onClick={() => {
              onClickSaveBtn({
                supplier: calculateFieldsToSubmit(),
                editPhotosOfSupplier,
                editPhotosOfUnit,
                itemId: product?._id,
              })
              onTriggerShowModal()
            }}
          >
            {t(TranslationKey.Save)}
          </CustomButton>
          <CustomButton onClick={onTriggerShowModal}>{t(TranslationKey.Close)}</CustomButton>
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
    } else if (['minlot', 'amount', 'minProductionTerm', 'maxProductionTerm'].includes(fieldName)) {
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
    (tmpSupplier.heightUnit * tmpSupplier.widthUnit * tmpSupplier.lengthUnit) /
      (unitSetting === unitsOfChangeOptions.EU ? platformSettings?.volumeWeightCoefficient : unitWeightCoefficient),
    2,
  )

  const isNormalLength = useMemo(
    () => maxBoxSizeFromOption(sizeSetting, Number(tmpSupplier.boxProperties?.boxLengthCm)),
    [tmpSupplier.boxProperties?.boxLengthCm],
  )
  const isNormalWidth = useMemo(
    () => maxBoxSizeFromOption(sizeSetting, Number(tmpSupplier.boxProperties?.boxWidthCm)),
    [tmpSupplier.boxProperties?.boxWidthCm],
  )
  const isNormalHeight = useMemo(
    () => maxBoxSizeFromOption(sizeSetting, Number(tmpSupplier.boxProperties?.boxHeightCm)),
    [tmpSupplier.boxProperties?.boxHeightCm],
  )

  const boxPropertiesIsFull =
    tmpSupplier.boxProperties?.amountInBox &&
    tmpSupplier.boxProperties?.boxLengthCm &&
    tmpSupplier.boxProperties?.boxWidthCm &&
    tmpSupplier.boxProperties?.boxHeightCm &&
    tmpSupplier.boxProperties?.boxWeighGrossKg &&
    !isNormalHeight &&
    !isNormalWidth &&
    !isNormalLength

  const boxPropertiesIsFullAndMainsValues =
    boxPropertiesIsFull && tmpSupplier.amount && tmpSupplier.minlot && tmpSupplier.priceInYuan && tmpSupplier.price

  const itHaveBigInt =
    +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInYuan >= 1000000 ||
    tmpSupplier.batchDeliveryCostInYuan >= 1000000 ||
    tmpSupplier.priceInYuan >= 1000000 ||
    +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar >= 1000000

  const isNeedUnitInfo =
    (tmpSupplier?.heightUnit || tmpSupplier?.widthUnit || tmpSupplier?.lengthUnit || tmpSupplier?.weighUnit) &&
    (!tmpSupplier?.heightUnit ||
      !tmpSupplier?.widthUnit ||
      !tmpSupplier?.weighUnit ||
      !tmpSupplier?.lengthUnit ||
      editPhotosOfUnit?.length < 4)

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
    requestStatus === loadingStatus.IS_LOADING ||
    ((tmpSupplier.boxProperties?.amountInBox ||
      tmpSupplier.boxProperties?.boxLengthCm ||
      tmpSupplier.boxProperties?.boxWidthCm ||
      tmpSupplier.boxProperties?.boxHeightCm ||
      tmpSupplier.boxProperties?.boxWeighGrossKg) &&
      !boxPropertiesIsFullAndMainsValues) ||
    isNeedUnitInfo ||
    ('' !== tmpSupplier.minProductionTerm &&
      '' !== tmpSupplier.maxProductionTerm &&
      Number(tmpSupplier.minProductionTerm) > Number(tmpSupplier.maxProductionTerm))

  return (
    <div className={styles.modalContainer}>
      {onlyRead ? (
        <p className={styles.modalTitle}>{t(TranslationKey['Viewing Supplier'])}</p>
      ) : (
        <p className={styles.modalTitle}>{title}</p>
      )}
      <Divider className={styles.titleDivider} />

      <div>
        <p className={styles.modalTitle}>{t(TranslationKey['Basic information'])}</p>

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
              containerClasses={styles.nameContainer}
              labelClasses={styles.normalLabel}
              inputComponent={
                <a
                  href={checkAndMakeAbsoluteUrl(tmpSupplier.link)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.link}
                >
                  {tmpSupplier.link}
                </a>
              }
            />
          ) : (
            <Field
              tooltipInfoContent={t(TranslationKey['Link to supplier site'])}
              label={t(TranslationKey.Link) + '*'}
              inputProps={{ maxLength: 2000 }}
              containerClasses={styles.nameContainer}
              labelClasses={styles.normalLabel}
              value={tmpSupplier.link}
              onChange={onChangeField('link')}
            />
          )}

          <Field
            disabled={onlyRead}
            inputProps={{ maxLength: 10 }}
            label={t(TranslationKey['Min. production time, days'])}
            containerClasses={styles.middleContainer}
            labelClasses={styles.normalLabel}
            value={tmpSupplier?.minProductionTerm}
            onChange={onChangeField('minProductionTerm')}
          />

          <Field
            disabled={onlyRead}
            inputProps={{ maxLength: 10 }}
            label={t(TranslationKey['Max. production time, days'])}
            containerClasses={styles.middleContainer}
            className={cx(styles.weightInput, {
              [styles.error]:
                tmpSupplier.minProductionTerm &&
                tmpSupplier.maxProductionTerm &&
                Number(tmpSupplier.minProductionTerm) > Number(tmpSupplier.maxProductionTerm),
            })}
            labelClasses={styles.normalLabel}
            value={tmpSupplier?.maxProductionTerm}
            onChange={onChangeField('maxProductionTerm')}
          />
        </div>
      </div>

      <div>
        <div className={styles.costBlock}>
          <p className={styles.modalTitle}>{t(TranslationKey['Total price'])}</p>

          <Field
            oneLine
            disabled
            label={t(TranslationKey['Actual course'])}
            inputProps={{ maxLength: 8 }}
            containerClasses={styles.rateContainer}
            labelClasses={cx(styles.rateLabel)}
            inputClasses={styles.courseInput}
            value={platformSettings?.yuanToDollarRate}
          />

          <Field
            oneLine
            error={`${platformSettings?.yuanToDollarRate}` !== `${tmpSupplier?.yuanRate}`}
            disabled={onlyRead}
            tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
            label={t(TranslationKey['Current supplier course'])}
            inputProps={{ maxLength: 8 }}
            containerClasses={styles.rateContainer}
            labelClasses={styles.rateLabel}
            inputClasses={styles.courseInput}
            value={tmpSupplier?.yuanRate}
            onChange={onChangeYuanToDollarRate}
          />
        </div>

        <div className={styles.calculationMainWrapper}>
          <div>
            <p className={styles.modalTitle}>{'¥'}</p>

            <div className={styles.flexContainer}>
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
                          +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInYuan,
                          2,
                        ) / +tmpSupplier.amount,
                        2,
                      )
                    : '-'
                }
              />

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
            </div>
          </div>

          <Divider flexItem orientation="vertical" className={styles.divider} />

          <div>
            <p className={styles.modalTitle}>{'$'}</p>

            <div className={styles.flexContainer}>
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

              <Field
                disabled
                error={
                  +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar >= 1000000 &&
                  '> 1000000 !'
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
            </div>
          </div>
        </div>

        {(!onlyRead || !!tmpSupplier.priceVariations?.length) && (
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
            allPayments={paymentMethods}
            onlyRead={onlyRead}
            onChangePaymentMethod={onChangePaymentMethod}
          />
        </div>

        <div className={styles.boxInfoMainWrapper}>
          <p className={styles.modalTitle}>{t(TranslationKey['Box info'])}</p>

          <div className={styles.boxInfoWrapper}>
            <Dimensions
              title={t(TranslationKey.Dimensions)}
              onlyRead={onlyRead}
              sizeMode={sizeSetting}
              errorLength={isNormalLength}
              errorWidth={isNormalWidth}
              errorHeight={isNormalHeight}
              height={tmpSupplier.boxProperties.boxHeightCm}
              width={tmpSupplier.boxProperties.boxWidthCm}
              length={tmpSupplier.boxProperties.boxLengthCm}
              grossWeigh={tmpSupplier.boxProperties.boxWeighGrossKg}
              optionalWeight={toFixed(tmpSupplier.boxProperties.boxWeighGrossKg / poundsWeightCoefficient || '', 2)}
              optionalWeightTitle={`${t(TranslationKey.Weight)}, ${t(TranslationKey.lb)}`}
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
                        tmpSupplier.boxProperties.boxLengthCm) / platformSettings?.volumeWeightCoefficient,
                    2,
                  )}
                />
              </div>
            </div>
          </div>

          <div className={styles.unitDimensionsWrapper}>
            <Dimensions
              weighUnit
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
              {onlyRead ? (
                <SlideshowGallery
                  slidesToShow={3}
                  files={editPhotosOfUnit}
                  onChangeImagesForLoad={setEditPhotosOfUnit}
                />
              ) : (
                <div style={{ width: '100%' }}>
                  <p className={styles.normalLabel}>{t(TranslationKey['Attach files (dimensions)'])}</p>
                  {isNeedUnitInfo ? (
                    <p className={cx(styles.normalLabel, styles.needAddPhotos)}>
                      {t(TranslationKey['Add at least 4 photos'])}
                    </p>
                  ) : null}
                  <UploadFilesInput
                    withoutLinks
                    withoutTitles
                    images={editPhotosOfUnit}
                    setImages={setEditPhotosOfUnit}
                    dragAndDropButtonHeight={34}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {product && storekeepersData?.length ? (
        <div className={styles.calculationBtnWrapper}>
          <CustomButton
            disabled={!product || !storekeepersData || !boxPropertiesIsFullAndMainsValues}
            onClick={() => setShowSupplierApproximateCalculationsModal(!showSupplierApproximateCalculationsModal)}
          >
            {t(TranslationKey['View an oriented calculation'])}
          </CustomButton>
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
        {onlyRead ? (
          <SlideshowGallery files={editPhotosOfSupplier} onChangeImagesForLoad={setEditPhotosOfSupplier} />
        ) : (
          <UploadFilesInput images={editPhotosOfSupplier} setImages={setEditPhotosOfSupplier} />
        )}
      </div>

      <Divider className={styles.titleDivider} />

      {renderFooterModalButtons()}

      {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}

      {showSupplierApproximateCalculationsModal ? (
        <SupplierApproximateCalculationsModal
          openModal={showSupplierApproximateCalculationsModal}
          productId={isIdea ? '' : product?._id}
          ideaId={isIdea ? product?._id : ''}
          currentSupplierId={tmpSupplier?._id || ''}
          setOpenModal={setShowSupplierApproximateCalculationsModal}
        />
      ) : null}
    </div>
  )
})
