/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Checkbox, Container, Divider, Grid, Link, Typography } from '@mui/material'

import { React, useState } from 'react'

import { observer } from 'mobx-react'

import {
  inchesCoefficient,
  poundsCoefficient,
  poundsWeightCoefficient,
  sizesType,
} from '@constants/configs/sizes-settings'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSelectPaymentDetails } from '@components/custom-select-payment-details'
import { SupplierApproximateCalculationsForm } from '@components/forms/supplier-approximate-calculations-form'
import { BigImagesModal } from '@components/modals/big-images-modal'
import { Button } from '@components/shared/buttons/button'
import { ToggleBtnGroup } from '@components/shared/buttons/toggle-btn-group/toggle-btn-group'
import { ToggleBtn } from '@components/shared/buttons/toggle-btn-group/toggle-btn/toggle-btn'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './add-or-edit-supplier-modal-content.style'
import { SupplierPriceVariationSelector } from '@components/product/suplier-price-variation-selector'

export const AddOrEditSupplierModalContent = observer(
  ({
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
  }) => {
    const { classes: classNames } = useClassNames()

    const [showSupplierApproximateCalculationsModal, setShowSupplierApproximateCalculationsModal] = useState(false)

    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

    const handleChange = (event, newAlignment) => {
      setSizeSetting(newAlignment)

      if (newAlignment === sizesType.INCHES) {
        setTmpSupplier({
          ...tmpSupplier,
          boxProperties: {
            ...tmpSupplier.boxProperties,
            boxLengthCm: toFixed(tmpSupplier.boxProperties.boxLengthCm / inchesCoefficient, 2),
            boxWidthCm: toFixed(tmpSupplier.boxProperties.boxWidthCm / inchesCoefficient, 2),
            boxHeightCm: toFixed(tmpSupplier.boxProperties.boxHeightCm / inchesCoefficient, 2),
          },
        })
      } else {
        setTmpSupplier({
          ...tmpSupplier,
          boxProperties: {
            ...tmpSupplier.boxProperties,
            boxLengthCm: toFixed(tmpSupplier.boxProperties.boxLengthCm * inchesCoefficient, 2),
            boxWidthCm: toFixed(tmpSupplier.boxProperties.boxWidthCm * inchesCoefficient, 2),
            boxHeightCm: toFixed(tmpSupplier.boxProperties.boxHeightCm * inchesCoefficient, 2),
          },
        })
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
      // batchDeliveryCostInDollar: supplier?.batchDeliveryCostInDollar || 0,
      batchDeliveryCostInDollar:
        supplier?.batchDeliveryCostInYuan / (supplier?.yuanRate || sourceYuanToDollarRate) || 0,
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

      priceVariations: supplier?.priceVariations || [],
    })

    const calculateFieldsToSubmit = () => {
      let res = {
        ...tmpSupplier,
        batchTotalCostInYuan:
          +tmpSupplier.priceInYuan * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInYuan,

        batchTotalCostInDollar:
          +tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar,

        // lotcost: toFixed(+tmpSupplier.price * (+tmpSupplier.amount || 0) + +tmpSupplier.batchDeliveryCostInDollar, 2),

        boxProperties: {
          ...tmpSupplier.boxProperties,
          boxLengthCm:
            (sizeSetting === sizesType.INCHES
              ? tmpSupplier.boxProperties.boxLengthCm * inchesCoefficient
              : tmpSupplier.boxProperties.boxLengthCm) || 0,
          boxWidthCm:
            (sizeSetting === sizesType.INCHES
              ? tmpSupplier.boxProperties.boxWidthCm * inchesCoefficient
              : tmpSupplier.boxProperties.boxWidthCm) || 0,
          boxHeightCm:
            (sizeSetting === sizesType.INCHES
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
    const [editPhotosOfSupplier, setEditPhotosOfSupplier] = useState(supplier?.images || [])

    const onChangeDetailsPhotosToLoad = value => {
      setEditPhotosOfSupplier(value)
    }

    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const renderFooterModalButtons = () => {
      if (outsideProduct) {
        return (
          <div className={classNames.buttonsWrapperClient}>
            <Button className={classNames.prevBtnClient} onClick={() => onClickPrevButton()}>
              {t(TranslationKey.Back)}
            </Button>
            <div>
              <Button
                success
                tooltipInfoContent={t(TranslationKey['Saves the current supplier to the selected product'])}
                disabled={diasabledSubmit}
                className={classNames.saveBtnClient}
                variant="contained"
                onClick={() => {
                  onClickSaveBtn({
                    supplier: { ...calculateFieldsToSubmit(), _id: supplier && supplier._id },
                    photosOfSupplier,
                    addMore: false,
                    makeMainSupplier,
                    editPhotosOfSupplier,
                  })
                }}
              >
                {t(TranslationKey['Save and bind'])}
              </Button>
              <Button
                success
                tooltipInfoContent={t(TranslationKey['Saves the supplier and opens the form for adding a new one'])}
                disabled={diasabledSubmit}
                className={classNames.saveBtnClient}
                onClick={() => {
                  onClickSaveBtn({
                    supplier: { ...calculateFieldsToSubmit(), _id: supplier && supplier._id },
                    photosOfSupplier,
                    addMore: false,
                    makeMainSupplier,
                    editPhotosOfSupplier,
                  })
                  // setTmpSupplier({
                  //   amount: '',
                  //   comment: '',
                  //   link: '',
                  //   lotcost: '',
                  //   minlot: '',
                  //   name: '',
                  //   price: '',
                  //   images: [],

                  //   paymentMethods: [],

                  //   priceInYuan: '',
                  //   batchDeliveryCostInDollar: 0,
                  //   batchDeliveryCostInYuan: 0,
                  //   batchTotalCostInDollar: '',
                  //   batchTotalCostInYuan: '',

                  //   boxProperties: {
                  //     amountInBox: '',
                  //     boxLengthCm: '',
                  //     boxWidthCm: '',
                  //     boxHeightCm: '',
                  //     boxWeighGrossKg: '',
                  //   },
                  // })

                  // setPhotosOfSupplier(() => [])
                  // setMakeMainSupplier(false)
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
          <div className={classNames.buttonsWrapper}>
            <Button className={classNames.cancelBtn} variant="text" onClick={onTriggerShowModal}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        )
      } else {
        return (
          <div className={classNames.buttonsWrapper}>
            <Button
              tooltipInfoContent={t(TranslationKey['Saves data about the supplier'])}
              disabled={diasabledSubmit}
              className={classNames.saveBtn}
              color="primary"
              variant="contained"
              onClick={() => {
                onClickSaveBtn({
                  supplier: { ...calculateFieldsToSubmit(), _id: supplier && supplier._id },
                  photosOfSupplier,
                  editPhotosOfSupplier,
                })

                setPhotosOfSupplier(() => [])
              }}
            >
              {t(TranslationKey.Save)}
            </Button>
            <Button
              disableElevation
              tooltipInfoContent={t(TranslationKey['Cancel supplier creation/change'])}
              className={classNames.cancelBtn}
              variant="text"
              onClick={onTriggerShowModal}
            >
              {t(TranslationKey.Cancel)}
            </Button>
          </div>
        )
      }
    }

    // const onChangePaymentMethod = event => {
    //   if (Array.isArray(event)) {
    //     if (tmpSupplier.paymentMethods.length === paymentMethods.length) {
    //       setTmpSupplier({
    //         ...tmpSupplier,
    //         paymentMethods: [],
    //       })
    //     } else {
    //       setTmpSupplier({
    //         ...tmpSupplier,
    //         paymentMethods: [...event],
    //       })
    //     }
    //   } else {
    //     if (tmpSupplier?.paymentMethods?.some(item => item?._id === event?._id)) {
    //       setTmpSupplier({
    //         ...tmpSupplier,
    //         paymentMethods: tmpSupplier?.paymentMethods?.filter(item => item?._id !== event?._id),
    //       })
    //     } else {
    //       setTmpSupplier({
    //         ...tmpSupplier,
    //         paymentMethods: [...tmpSupplier.paymentMethods, event],
    //       })
    //     }
    //   }
    // }

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
          [fieldName]: !tmpSupplier.multiplicity,
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

    const diasabledSubmit =
      itHaveBigInt ||
      '' === tmpSupplier.name ||
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
      requestStatus === loadingStatuses.isLoading ||
      ((tmpSupplier.boxProperties?.amountInBox ||
        tmpSupplier.boxProperties?.boxLengthCm ||
        tmpSupplier.boxProperties?.boxWidthCm ||
        tmpSupplier.boxProperties?.boxHeightCm ||
        tmpSupplier.boxProperties?.boxWeighGrossKg) &&
        !boxPropertiesIsFullAndMainsValues)

    return (
      <Container disableGutters className={classNames.modalContainer}>
        {onlyRead ? (
          <Typography className={classNames.modalTitle}>{t(TranslationKey['Viewing Supplier'])}</Typography>
        ) : (
          <Typography className={classNames.modalTitle}>{title}</Typography>
        )}
        <Divider className={classNames.titleDivider} />

        <div>
          <Typography className={classNames.modalTitle}>{t(TranslationKey['Basic information'])}</Typography>

          <div className={classNames.nameBlock}>
            <Field
              disabled={onlyRead}
              tooltipInfoContent={t(TranslationKey['Enter the name of the supplier'])}
              inputProps={{ maxLength: 100 }}
              label={t(TranslationKey.Title) + '*'}
              containerClasses={classNames.nameContainer}
              labelClasses={classNames.normalLabel}
              value={tmpSupplier.name}
              onChange={onChangeField('name')}
            />

            <Field
              disabled={onlyRead}
              tooltipInfoContent={t(TranslationKey['Enter the amount of goods to be purchased'])}
              label={t(TranslationKey['Purchase quantity for the current price']) + '*'}
              inputProps={{ maxLength: 10 }}
              containerClasses={classNames.middleContainer}
              labelClasses={classNames.normalLabel}
              value={tmpSupplier.amount}
              error={parseInt(tmpSupplier.amount) === 0 && t(TranslationKey["can't be zero"])}
              onChange={onChangeField('amount')}
            />
            <Field
              disabled={onlyRead}
              tooltipInfoContent={t(TranslationKey['Minimum quantity of goods needed to order'])}
              label={t(TranslationKey['Minimum batch']) + '*'}
              inputProps={{ maxLength: 10 }}
              containerClasses={classNames.middleContainer}
              labelClasses={classNames.normalLabel}
              value={tmpSupplier.minlot}
              error={parseInt(tmpSupplier.minlot) === 0 && t(TranslationKey["can't be zero"])}
              onChange={onChangeField('minlot')}
            />
          </div>

          <div className={classNames.nameBlock}>
            {onlyRead ? (
              <Field
                tooltipInfoContent={t(TranslationKey['Link to supplier site'])}
                label={t(TranslationKey.Link) + '*'}
                inputProps={{ maxLength: 2000 }}
                containerClasses={classNames.linkContainerOnlyRead}
                labelClasses={classNames.normalLabel}
                inputComponent={
                  <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(tmpSupplier.link)}>
                    <Typography disabled className={classNames.link}>
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
                containerClasses={classNames.linkContainer}
                labelClasses={classNames.normalLabel}
                value={tmpSupplier.link}
                onChange={onChangeField('link')}
              />
            )}

            <Field
              disabled={onlyRead}
              inputProps={{ maxLength: 10 }}
              label={t(TranslationKey['Production time'])}
              containerClasses={classNames.middleContainer}
              labelClasses={classNames.normalLabel}
              value={tmpSupplier?.productionTerm}
              onChange={onChangeField('productionTerm')}
            />
          </div>
        </div>

        <div>
          <div className={classNames.costBlock}>
            <Typography className={classNames.modalTitle}>{t(TranslationKey['Total price'])}</Typography>

            <Field
              oneLine
              disabled
              label={t(TranslationKey['Actual course'])}
              inputProps={{ maxLength: 8 }}
              containerClasses={classNames.rateContainer}
              labelClasses={cx(classNames.rateLabel)}
              inputClasses={classNames.courseInput}
              value={sourceYuanToDollarRate}
            />

            <Field
              oneLine
              error={`${sourceYuanToDollarRate}` !== `${tmpSupplier?.yuanRate}`}
              disabled={onlyRead}
              tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
              label={t(TranslationKey['Current supplier course'])}
              inputProps={{ maxLength: 8 }}
              containerClasses={classNames.rateContainer}
              labelClasses={cx(classNames.rateLabel)}
              inputClasses={classNames.courseInput}
              value={tmpSupplier?.yuanRate}
              onChange={onChangeYuanToDollarRate}
            />
          </div>

          <div className={classNames.calculationMainWrapper}>
            <div>
              <Typography className={classNames.modalTitle}>{'¥'}</Typography>

              <Grid container spacing={1} direction="row" justifyContent="flex-end" alignItems="flex-start">
                <Grid item>
                  <Field
                    error={tmpSupplier.priceInYuan >= 1000000 && '> 1000000 !'}
                    disabled={onlyRead}
                    tooltipInfoContent={t(TranslationKey['Price per unit'])}
                    label={t(TranslationKey['price per unit']) + ', ¥*'}
                    inputProps={{ maxLength: 10 }}
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
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
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
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
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
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
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
                    value={toFixed(tmpSupplier.batchDeliveryCostInYuan, 2)}
                    onChange={onChangeField('batchDeliveryCostInYuan')}
                  />
                </Grid>
              </Grid>
            </div>

            <Divider flexItem orientation="vertical" className={classNames.divider} />

            <div>
              <Typography className={classNames.modalTitle}>{'$'}</Typography>

              <Grid container spacing={1} direction="row" justifyContent="flex-end" alignItems="flex-start">
                <Grid item>
                  <Field
                    disabled={onlyRead}
                    tooltipInfoContent={t(TranslationKey['Price per unit'])}
                    label={t(TranslationKey['price per unit']) + ', $*'}
                    inputProps={{ maxLength: 10 }}
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
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
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
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
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
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
                    containerClasses={classNames.middleContainer}
                    labelClasses={classNames.normalLabel}
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

          <div className={classNames.paymentsBlock}>
            <CustomSelectPaymentDetails
              currentPaymentMethods={tmpSupplier?.paymentMethods}
              paymentMethods={paymentMethods}
              onlyRead={onlyRead}
              onChangePaymentMethod={onChangePaymentMethod}
            />
          </div>

          <div>
            <Typography className={classNames.modalTitle}>{t(TranslationKey['Box info'])}</Typography>

            <div className={classNames.boxInfoWrapper}>
              <div className={classNames.sizesWrapper}>
                <div className={classNames.sizesSubWrapper}>
                  <Typography className={classNames.standartText}>{t(TranslationKey.Dimensions)}</Typography>

                  <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                    <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                      {'In'}
                    </ToggleBtn>
                    <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                      {'Cm'}
                    </ToggleBtn>
                  </ToggleBtnGroup>
                </div>

                <div className={classNames.sizesBottomWrapper}>
                  <Field
                    disabled={onlyRead}
                    label={t(TranslationKey.H)}
                    inputProps={{ maxLength: 6 }}
                    containerClasses={classNames.sizeContainer}
                    labelClasses={cx(classNames.rateLabel)}
                    inputClasses={classNames.sizeInput}
                    value={tmpSupplier.boxProperties.boxHeightCm}
                    onChange={onChangeField('boxHeightCm')}
                  />

                  <Field
                    disabled={onlyRead}
                    label={t(TranslationKey.W)}
                    inputProps={{ maxLength: 6 }}
                    containerClasses={classNames.sizeContainer}
                    labelClasses={cx(classNames.rateLabel)}
                    inputClasses={classNames.sizeInput}
                    value={tmpSupplier.boxProperties.boxWidthCm}
                    onChange={onChangeField('boxWidthCm')}
                  />

                  <Field
                    disabled={onlyRead}
                    label={t(TranslationKey.L)}
                    inputProps={{ maxLength: 6 }}
                    containerClasses={classNames.sizeContainer}
                    labelClasses={cx(classNames.rateLabel)}
                    inputClasses={classNames.sizeInput}
                    value={tmpSupplier.boxProperties.boxLengthCm}
                    onChange={onChangeField('boxLengthCm')}
                  />
                </div>
              </div>

              <div className={classNames.boxInfoSubWrapper}>
                <div>
                  <Field
                    disabled
                    label={t(TranslationKey['Weight, Lbs'])}
                    inputProps={{ maxLength: 10 }}
                    containerClasses={classNames.shortContainer}
                    labelClasses={classNames.normalLabel}
                    value={toFixed(tmpSupplier.boxProperties.boxWeighGrossKg / poundsWeightCoefficient, 2) || ''}
                  />

                  <Field
                    disabled={onlyRead}
                    label={t(TranslationKey['Weight, kg'])}
                    inputProps={{ maxLength: 10 }}
                    containerClasses={classNames.shortContainer}
                    labelClasses={classNames.normalLabel}
                    value={tmpSupplier.boxProperties.boxWeighGrossKg}
                    onChange={onChangeField('boxWeighGrossKg')}
                  />
                </div>

                <div>
                  <div
                    className={cx(classNames.checkboxWrapper, {
                      [classNames.disabledCheckboxWrapper]: onlyRead || !boxPropertiesIsFull,
                    })}
                    onClick={!onlyRead && boxPropertiesIsFull && onChangeField('multiplicity')}
                  >
                    <Checkbox
                      disabled={onlyRead || !boxPropertiesIsFull}
                      className={classNames.checkbox}
                      checked={tmpSupplier.multiplicity}
                      color="primary"
                    />
                    <Typography className={classNames.normalLabel}>
                      {t(TranslationKey['Use multiples of items when creating boxes'])}
                    </Typography>
                  </div>

                  <div className={classNames.boxInfoExtraSubWrapper}>
                    <Field
                      disabled={onlyRead}
                      label={t(TranslationKey['Number of units in box'])}
                      inputProps={{ maxLength: 10 }}
                      containerClasses={classNames.shortContainer}
                      labelClasses={classNames.normalLabel}
                      value={tmpSupplier.boxProperties.amountInBox}
                      onChange={onChangeField('amountInBox')}
                    />

                    <Field
                      disabled
                      tooltipInfoContent={t(TranslationKey['Calculated from the dimensions of the box'])}
                      label={t(TranslationKey['Volume weight, kg'])}
                      inputProps={{ maxLength: 15 }}
                      containerClasses={classNames.shortContainer}
                      labelClasses={classNames.normalLabel}
                      value={toFixed(
                        (sizeSetting === sizesType.INCHES
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
            </div>
          </div>
        </div>

        {product && storekeepersData.length ? (
          <div className={classNames.calculationBtnWrapper}>
            <Button
              tooltipAttentionContent={
                !product ||
                !storekeepersData?.length ||
                (!boxPropertiesIsFullAndMainsValues && t(TranslationKey['Not enough data']))
              }
              disabled={!product || !storekeepersData || !boxPropertiesIsFullAndMainsValues}
              variant="contained"
              color="primary"
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
          className={classNames.commentField}
          labelClasses={classNames.normalLabel}
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
            containerClasses={classNames.makeMainSupplierСheckboxWrapper}
            inputComponent={
              <Checkbox
                color="primary"
                checked={makeMainSupplier}
                onChange={() => setMakeMainSupplier(!makeMainSupplier)}
              />
            }
          />
        )}

        <div className={classNames.bottomWrapper}>
          <div>
            {!onlyRead ? (
              <div className={classNames.imageFileInputWrapper}>
                <UploadFilesInput
                  images={photosOfSupplier}
                  setImages={setPhotosOfSupplier}
                  maxNumber={supplier?.images ? 50 - supplier?.images?.length : 50}
                  className={classNames.imageFileInput}
                />
              </div>
            ) : null}
            <div className={classNames.photoAndFilesWrapper}>
              <PhotoAndFilesCarousel
                small
                withoutMakeMainImage
                isEditable={!onlyRead}
                files={tmpSupplier.images}
                width="300px"
                imagesForLoad={editPhotosOfSupplier}
                onChangeImagesForLoad={onChangeDetailsPhotosToLoad}
              />
            </div>
          </div>
        </div>

        <Divider className={classNames.fieldsDivider} />

        {renderFooterModalButtons()}

        {showProgress && (
          <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
        )}

        <BigImagesModal
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={tmpSupplier.images}
        />

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
      </Container>
    )
  },
)
