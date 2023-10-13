import { observer } from 'mobx-react'
import { useState } from 'react'

import { Typography } from '@mui/material'

import {
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
  volumePoundsWeightCoefficient,
} from '@constants/configs/sizes-settings'
import {
  OrderStatus,
  OrderStatusByKey,
  OrderStatusTranslate,
  getOrderStatusOptionByCode,
} from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'

import { calcFinalWeightForBox, calcVolumeWeightForBox, roundSafely } from '@utils/calculation'
import { checkIsPositiveNum } from '@utils/checks'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './create-box-form.style'

import { OrderBox } from './order-box'

export const CreateBoxForm = observer(
  ({
    currentSupplier,
    formItem,
    boxesForCreation,
    onTriggerOpenModal,
    setBoxesForCreation,
    volumeWeightCoefficient,
    order,
    isEdit,
  }) => {
    const { classes: classNames, cx } = useClassNames()
    const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

    const weightCoefficient =
      sizeSetting === unitsOfChangeOptions.EU ? volumeWeightCoefficient : volumePoundsWeightCoefficient

    const sourceBox = {
      lengthCmSupplier: formItem?.lengthCmSupplier || 0,
      widthCmSupplier: formItem?.widthCmSupplier || 0,
      heightCmSupplier: formItem?.heightCmSupplier || 0,
      weighGrossKgSupplier: formItem?.weighGrossKgSupplier || 0,
      volumeWeightKgSupplier: formItem ? calcVolumeWeightForBox(formItem, weightCoefficient) : 0,
      weightFinalAccountingKgSupplier: formItem ? calcFinalWeightForBox(formItem, weightCoefficient) : 0,

      warehouse: formItem?.warehouse || '',
      deliveryMethod: formItem?.deliveryMethod || '',
      amount: 1,
      items: formItem?.items || [
        {
          product: formItem?.product,
          amount: formItem?.amount,
          order: formItem,

          isBarCodeAlreadyAttachedByTheSupplier: false,
        },
      ],

      tmpUseToUpdateSupplierBoxDimensions: false,
      tmpUseCurrentSupplierDimensions: false,
    }

    const [formFieldsArr, setFormFieldsArr] = useState(isEdit ? boxesForCreation : [sourceBox])

    const setFormField = (fieldName, orderBoxIndex) => e => {
      const newFormFields = { ...formFieldsArr[orderBoxIndex] }

      if (['lengthCmSupplier', 'widthCmSupplier', 'heightCmSupplier', 'weighGrossKgSupplier'].includes(fieldName)) {
        if (isNaN(e.target.value) || Number(e.target.value) < 0) {
          return
        }
      }

      newFormFields[fieldName] = e.target.value

      if (fieldName === 'amount') {
        newFormFields[fieldName] = isNaN(parseInt(e.target.value)) ? '' : parseInt(e.target.value)
      } else {
        newFormFields[fieldName] = e.target.value
        newFormFields.tmpUseCurrentSupplierDimensions = false
      }

      const updatedNewBoxes = formFieldsArr.map((oldBox, index) => (index === orderBoxIndex ? newFormFields : oldBox))

      setFormFieldsArr(updatedNewBoxes)
    }

    const setAmountField = orderBoxIndex => e => {
      if (!checkIsPositiveNum(e.target.value)) {
        return
      }
      let newFormFields = { ...formFieldsArr[orderBoxIndex] }

      newFormFields = {
        ...newFormFields,
        items: [
          {
            ...newFormFields.items[0],
            amount: Number(e.target.value),
          },
        ],
        tmpUseCurrentSupplierDimensions: false,
      }

      const updatedNewBoxes = formFieldsArr.map((oldBox, index) => (index === orderBoxIndex ? newFormFields : oldBox))

      setFormFieldsArr([...updatedNewBoxes])
    }

    const onRemoveBox = boxIndex => {
      const updatedNewBoxes = formFieldsArr.filter((box, i) => i !== boxIndex)
      setFormFieldsArr(updatedNewBoxes)
    }

    const disableSubmit =
      formFieldsArr?.length < 1 ||
      formFieldsArr.some(
        el =>
          el?.items?.[0]?.amount < 1 ||
          el?.amount < 1 ||
          (currentSupplier?.multiplicity && el?.items?.[0]?.amount % currentSupplier?.boxProperties?.amountInBox !== 0),
      )

    const handleChange = newAlignment => {
      if (newAlignment !== sizeSetting) {
        const convertedFormFieldsArr = formFieldsArr.map(editingBox => {
          const multiplier = newAlignment === unitsOfChangeOptions.US ? 1 / inchesCoefficient : inchesCoefficient
          const weightMultiplier =
            newAlignment === unitsOfChangeOptions.US ? 1 / poundsWeightCoefficient : poundsWeightCoefficient

          return {
            ...editingBox,
            lengthCmSupplier: toFixed(editingBox.lengthCmSupplier * multiplier, 2),
            widthCmSupplier: toFixed(editingBox.widthCmSupplier * multiplier, 2),
            heightCmSupplier: toFixed(editingBox.heightCmSupplier * multiplier, 2),
            weighGrossKgSupplier: toFixed(editingBox.weighGrossKgSupplier * weightMultiplier, 2),
          }
        })

        setFormFieldsArr(convertedFormFieldsArr)
        setSizeSetting(newAlignment)
      }
    }

    const onSubmit = () => {
      const newArr = formFieldsArr.map(editingBox => ({
        ...editingBox,

        lengthCmSupplier:
          (sizeSetting === unitsOfChangeOptions.EU
            ? editingBox.lengthCmSupplier
            : toFixed(editingBox.lengthCmSupplier * inchesCoefficient, 2)) || 0,

        widthCmSupplier:
          (sizeSetting === unitsOfChangeOptions.EU
            ? editingBox.widthCmSupplier
            : toFixed(editingBox.widthCmSupplier * inchesCoefficient, 2)) || 0,

        heightCmSupplier:
          (sizeSetting === unitsOfChangeOptions.EU
            ? editingBox.heightCmSupplier
            : toFixed(editingBox.heightCmSupplier * inchesCoefficient, 2)) || 0,

        weighGrossKgSupplier:
          (sizeSetting === unitsOfChangeOptions.EU
            ? editingBox.weighGrossKgSupplier
            : toFixed(editingBox.weighGrossKgSupplier * poundsWeightCoefficient, 2)) || 0,
      }))

      setBoxesForCreation(isEdit ? [...newArr] : [...boxesForCreation, ...newArr])
      onTriggerOpenModal()
    }

    const setDimensionsOfSupplierField = orderBoxIndex => e => {
      const newStateFormFields = [...formFieldsArr]

      newStateFormFields[orderBoxIndex] = {
        ...newStateFormFields[orderBoxIndex],
        tmpUseCurrentSupplierDimensions: e.target.checked,

        lengthCmSupplier: e.target.checked
          ? (sizeSetting === unitsOfChangeOptions.EU
              ? toFixed(currentSupplier?.boxProperties.boxLengthCm, 2)
              : roundSafely(currentSupplier?.boxProperties.boxLengthCm / inchesCoefficient)) || 0
          : '',

        widthCmSupplier: e.target.checked
          ? (sizeSetting === unitsOfChangeOptions.EU
              ? toFixed(currentSupplier?.boxProperties.boxWidthCm, 2)
              : roundSafely(currentSupplier?.boxProperties.boxWidthCm / inchesCoefficient)) || 0
          : '',

        heightCmSupplier: e.target.checked
          ? (sizeSetting === unitsOfChangeOptions.EU
              ? toFixed(currentSupplier?.boxProperties.boxHeightCm, 2)
              : roundSafely(currentSupplier?.boxProperties.boxHeightCm / inchesCoefficient)) || 0
          : '',

        weighGrossKgSupplier: e.target.checked ? roundSafely(currentSupplier?.boxProperties.boxWeighGrossKg) || 0 : '',
        items: [
          {
            ...newStateFormFields[orderBoxIndex].items[0],
            amount: e.target.checked ? currentSupplier?.boxProperties.amountInBox || 0 : formItem?.amount,
          },
        ],
      }

      setFormFieldsArr(newStateFormFields)
    }

    return (
      <div className={classNames.root}>
        <div className={classNames.form}>
          <Typography paragraph className={classNames.subTitle}>
            {isEdit ? t(TranslationKey['Editing the box']) : t(TranslationKey['Creating new boxes'])}
          </Typography>

          <div className={classNames.labelFieldsWrapper}>
            <Field
              tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
              label={t(TranslationKey.Warehouse)}
              inputComponent={
                <Typography className={classNames.destinationWrapper}>
                  {formItem.destination?.name || t(TranslationKey.Missing)}
                </Typography>
              }
            />

            <Field
              tooltipInfoContent={t(TranslationKey['Current order status'])}
              label={t(TranslationKey.Status)}
              inputComponent={
                <Typography
                  className={cx({
                    [classNames.orange]:
                      `${formItem.status}` === `${OrderStatusByKey[OrderStatus.AT_PROCESS]}` ||
                      `${formItem.status}` === `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}` ||
                      `${formItem.status}` === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`,

                    [classNames.green]:
                      `${formItem.status}` === `${OrderStatusByKey[OrderStatus.IN_STOCK]}` ||
                      `${formItem.status}` === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,

                    [classNames.red]:
                      `${formItem.status}` === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}` ||
                      `${formItem.status}` === `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
                  })}
                >
                  {/* {formItem.status && getOrderStatusOptionByCode(formItem.status).label} */}
                  {OrderStatusTranslate(getOrderStatusOptionByCode(formItem.status).key)}
                </Typography>
              }
            />
          </div>

          <div className={classNames.divider} />

          <div className={classNames.sizesSubWrapper}>
            <CustomSwitcher
              condition={sizeSetting}
              switcherSettings={[
                { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
              ]}
              changeConditionHandler={condition => handleChange(condition)}
            />
          </div>

          {formFieldsArr ? (
            <div className={classNames.blockOfNewBoxWrapper}>
              {formFieldsArr.map((orderBox, orderBoxIndex) => (
                <OrderBox
                  key={orderBoxIndex}
                  currentSupplier={currentSupplier}
                  order={order}
                  volumeWeightCoefficient={weightCoefficient}
                  orderBoxIndex={orderBoxIndex}
                  orderBox={orderBox}
                  setFormField={setFormField}
                  setAmountField={setAmountField}
                  setDimensionsOfSupplierField={setDimensionsOfSupplierField}
                  onRemoveBox={onRemoveBox}
                />
              ))}
            </div>
          ) : null}
          {!isEdit ? (
            <div className={classNames.buttonsWrapper}>
              <Button
                disableElevation
                tooltipInfoContent={t(TranslationKey['Allows you to create the required number of boxes to the order'])}
                className={classNames.button}
                color="primary"
                variant="contained"
                onClick={() => {
                  setFormFieldsArr(formFieldsArr.concat({ ...sourceBox }))
                }}
              >
                {t(TranslationKey['Add another box'])}
              </Button>
            </div>
          ) : null}
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            success
            disabled={disableSubmit}
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            {isEdit ? t(TranslationKey.Edit) : t(TranslationKey.Add)}
          </Button>

          <Button
            disableElevation
            color="primary"
            className={classNames.button}
            variant="contained"
            onClick={() => onTriggerOpenModal()}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  },
)
