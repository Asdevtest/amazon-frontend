/* eslint-disable no-unused-vars */
import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import {useState} from 'react'

import {Button, Divider, Typography, IconButton, Checkbox} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {observer} from 'mobx-react'

import {getOrderStatusOptionByCode} from '@constants/order-status'
import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'

import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {LabelField} from '@components/label-field/label-field'

import {roundSafely} from '@utils/calculation'
import {checkIsPositiveNum} from '@utils/checks'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './create-box-form.style'

const BlockOfNewBox = ({
  order,
  orderBoxIndex,
  orderBox,
  setFormField,
  setAmountField,
  setDimensionsOfSupplierField,
  onRemoveBox,
  sizeSetting,
  volumeWeightCoefficient,
  sizeValue,
}) => {
  const classNames = useClassNames()

  const translateSize = size => {
    switch (size) {
      case 'cm':
        return t(TranslationKey.cm)
      case 'inches':
        return t(TranslationKey.inches)
    }
  }
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          containerClasses={classNames.numberInputField}
          inputProps={{maxLength: 4}}
          label={`${t(TranslationKey['Box length in '])}${translateSize(sizeValue) || t(TranslationKey.cm)}`}
          value={orderBox.lengthCmSupplier}
          onChange={setFormField('lengthCmSupplier', orderBoxIndex)}
        />
        <Field
          containerClasses={classNames.numberInputField}
          inputProps={{maxLength: 4}}
          label={`${t(TranslationKey['Box width in '])}${translateSize(sizeValue) || t(TranslationKey.cm)}`}
          value={orderBox.widthCmSupplier}
          onChange={setFormField('widthCmSupplier', orderBoxIndex)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          containerClasses={classNames.numberInputField}
          inputProps={{maxLength: 4}}
          label={`${t(TranslationKey['Box height in '])}${translateSize(sizeValue) || t(TranslationKey.cm)}`}
          value={orderBox.heightCmSupplier}
          onChange={setFormField('heightCmSupplier', orderBoxIndex)}
        />
        <Field
          containerClasses={classNames.numberInputField}
          inputProps={{maxLength: 4}}
          label={t(TranslationKey['Real weight'])}
          value={orderBox.weighGrossKgSupplier}
          onChange={setFormField('weighGrossKgSupplier', orderBoxIndex)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Volume weight, kg'])}
          value={toFixed(
            (sizeSetting === sizesType.INCHES
              ? orderBox.heightCmSupplier *
                inchesCoefficient *
                orderBox.widthCmSupplier *
                inchesCoefficient *
                orderBox.lengthCmSupplier *
                inchesCoefficient
              : orderBox.heightCmSupplier * orderBox.widthCmSupplier * orderBox.lengthCmSupplier) /
              volumeWeightCoefficient,
            2,
          )}
        />
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Final weight, kg'])}
          value={toFixed(
            Math.max(
              toFixed(
                (sizeSetting === sizesType.INCHES
                  ? roundSafely(orderBox.heightCmSupplier * inchesCoefficient) *
                    roundSafely(orderBox.widthCmSupplier * inchesCoefficient) *
                    roundSafely(orderBox.lengthCmSupplier * inchesCoefficient)
                  : roundSafely(orderBox.heightCmSupplier * orderBox.widthCmSupplier * orderBox.lengthCmSupplier)) /
                  volumeWeightCoefficient,
                2,
              ),
              orderBox.weighGrossKgSupplier,
            ),
            2,
          )}
        />
      </div>

      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Quantity of boxes'])}
          value={1}
        />
        <Field
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Products in a box'])}
          value={orderBox.items[0].amount}
          onChange={setAmountField(orderBoxIndex)}
        />
      </div>
      <div className={classNames.checkboxWithLabelWrapper}>
        <Checkbox
          color="primary"
          disabled={!order.orderSupplier.boxProperties}
          checked={orderBox.tmpUseCurrentSupplierDimensions}
          onChange={setDimensionsOfSupplierField(orderBoxIndex)}
        />
        <Typography>{t(TranslationKey['Use the supplier standard'])}</Typography>
      </div>

      <IconButton className={classNames.iconBtn} onClick={() => onRemoveBox(orderBoxIndex)}>
        <DeleteIcon className={classNames.deleteBtn} />
      </IconButton>
    </div>
  )
}

export const CreateBoxForm = observer(
  ({
    currentSupplier,
    formItem,
    boxesForCreation,
    onTriggerOpenModal,
    setBoxesForCreation,
    volumeWeightCoefficient,
    order,
  }) => {
    const classNames = useClassNames()

    const sourceBox = {
      lengthCmSupplier: formItem?.lengthCmSupplier || '',
      widthCmSupplier: formItem?.widthCmSupplier || '',
      heightCmSupplier: formItem?.heightCmSupplier || '',
      weighGrossKgSupplier: formItem?.weighGrossKgSupplier || '',
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

    const [formFieldsArr, setFormFieldsArr] = useState([sourceBox])

    const setFormField = (fieldName, orderBoxIndex) => e => {
      if (isNaN(e.target.value) || Number(e.target.value) < 0) {
        return
      }

      const newFormFields = {...formFieldsArr[orderBoxIndex]}
      newFormFields[fieldName] = e.target.value
      newFormFields.tmpUseCurrentSupplierDimensions = false

      const updatedNewBoxes = formFieldsArr.map((oldBox, index) => (index === orderBoxIndex ? newFormFields : oldBox))
      setFormFieldsArr(updatedNewBoxes)
    }

    const onSubmit = () => {
      const newArr = formFieldsArr.map(editingBox => ({
        ...editingBox,

        lengthCmSupplier:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.lengthCmSupplier * inchesCoefficient * 100) / 100
            : editingBox.lengthCmSupplier) || 0,

        widthCmSupplier:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.widthCmSupplier * inchesCoefficient * 100) / 100
            : editingBox.widthCmSupplier) || 0,

        heightCmSupplier:
          (sizeSetting === sizesType.INCHES
            ? Math.round(editingBox.heightCmSupplier * inchesCoefficient * 100) / 100
            : editingBox.heightCmSupplier) || 0,
      }))

      setBoxesForCreation([...boxesForCreation, ...newArr])
      onTriggerOpenModal()
    }

    const setDimensionsOfSupplierField = orderBoxIndex => e => {
      const newStateFormFields = [...formFieldsArr]
      newStateFormFields[orderBoxIndex] = {
        ...newStateFormFields[orderBoxIndex],
        tmpUseCurrentSupplierDimensions: e.target.checked,

        lengthCmSupplier: e.target.checked
          ? (sizeSetting === sizesType.INCHES
              ? roundSafely(currentSupplier.boxProperties.boxLengthCm / inchesCoefficient)
              : currentSupplier.boxProperties.boxLengthCm) || 0
          : '',

        widthCmSupplier: e.target.checked
          ? (sizeSetting === sizesType.INCHES
              ? roundSafely(currentSupplier.boxProperties.boxWidthCm / inchesCoefficient)
              : currentSupplier.boxProperties.boxWidthCm) || 0
          : '',

        heightCmSupplier: e.target.checked
          ? (sizeSetting === sizesType.INCHES
              ? roundSafely(currentSupplier.boxProperties.boxHeightCm / inchesCoefficient)
              : currentSupplier.boxProperties.boxHeightCm) || 0
          : '',

        weighGrossKgSupplier: e.target.checked ? roundSafely(currentSupplier.boxProperties.boxWeighGrossKg) || 0 : '',
        items: [
          {
            ...newStateFormFields[orderBoxIndex].items[0],
            amount: e.target.checked ? currentSupplier.boxProperties.amountInBox || 0 : '',
          },
        ],
      }

      setFormFieldsArr(newStateFormFields)
    }

    const setAmountField = orderBoxIndex => e => {
      if (!checkIsPositiveNum(e.target.value)) {
        return
      }

      const newStateFormFields = [...formFieldsArr]
      newStateFormFields[orderBoxIndex] = {
        ...newStateFormFields[orderBoxIndex],
        items: [
          {
            ...newStateFormFields[orderBoxIndex].items[0],
            amount: Number(e.target.value),
          },
        ],
        tmpUseCurrentSupplierDimensions: false,
      }
      setFormFieldsArr(newStateFormFields)
    }

    const onRemoveBox = boxIndex => {
      const updatedNewBoxes = formFieldsArr.filter((box, i) => i !== boxIndex)
      setFormFieldsArr(updatedNewBoxes)
    }

    const disableSubmit = formFieldsArr.length < 1 || formFieldsArr.some(el => el.items[0].amount < 1)

    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)
    const [sizeValue, setSizeValue] = useState('')

    const handleChange = (event, newAlignment) => {
      setSizeSetting(newAlignment)

      if (newAlignment === sizesType.INCHES) {
        setFormFieldsArr(
          formFieldsArr.map(editingBox => ({
            ...editingBox,
            lengthCmSupplier: toFixed(roundSafely(editingBox.lengthCmSupplier / inchesCoefficient), 2),
            widthCmSupplier: toFixed(roundSafely(editingBox.widthCmSupplier / inchesCoefficient), 2),
            heightCmSupplier: toFixed(roundSafely(editingBox.heightCmSupplier / inchesCoefficient), 2),
          })),
        )
      } else {
        setFormFieldsArr(
          formFieldsArr.map(editingBox => ({
            ...editingBox,
            lengthCmSupplier: toFixed(roundSafely(editingBox.lengthCmSupplier * inchesCoefficient), 2),
            widthCmSupplier: toFixed(roundSafely(editingBox.widthCmSupplier * inchesCoefficient), 2),
            heightCmSupplier: toFixed(roundSafely(editingBox.heightCmSupplier * inchesCoefficient), 2),
          })),
        )
      }
    }

    return (
      <div className={classNames.root}>
        <div className={classNames.form}>
          <Typography paragraph className={classNames.subTitle}>
            {t(TranslationKey['Creating new boxes!'])}
          </Typography>

          <div className={classNames.labelFieldsWrapper}>
            <LabelField
              containerClasses={classNames.field}
              label={t(TranslationKey.Warehouse)}
              value={formItem.destination?.name}
            />

            <LabelField
              containerClasses={classNames.field}
              label={t(TranslationKey.Status)}
              value={formItem.status && getOrderStatusOptionByCode(formItem.status).label}
            />
          </div>

          <Divider className={classNames.divider} />

          <div className={classNames.sizesSubWrapper}>
            <ToggleButtonGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
              <ToggleButton
                disabled={sizeSetting === sizesType.INCHES}
                value={sizesType.INCHES}
                onClick={e => setSizeValue(e.target.value.toLowerCase())}
              >
                {'In'}
              </ToggleButton>
              <ToggleButton
                disabled={sizeSetting === sizesType.CM}
                value={sizesType.CM}
                onClick={e => setSizeValue(e.target.value.toLowerCase())}
              >
                {'Cm'}
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className={classNames.blockOfNewBoxWrapper}>
            {formFieldsArr.map((orderBox, orderBoxIndex) => (
              <BlockOfNewBox
                key={orderBoxIndex}
                order={order}
                volumeWeightCoefficient={volumeWeightCoefficient}
                sizeSetting={sizeSetting}
                sizeValue={sizeValue}
                orderBoxIndex={orderBoxIndex}
                orderBox={orderBox}
                setFormField={setFormField}
                setAmountField={setAmountField}
                setDimensionsOfSupplierField={setDimensionsOfSupplierField}
                onRemoveBox={onRemoveBox}
              />
            ))}
          </div>

          <div className={classNames.buttonsWrapper}>
            <Button
              disableElevation
              className={classNames.button}
              color="primary"
              variant="contained"
              onClick={() => {
                setFormFieldsArr(formFieldsArr.concat({...sourceBox}))
              }}
            >
              {t(TranslationKey['Add another box'])}
            </Button>
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          <SuccessButton
            disableElevation
            disabled={disableSubmit}
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            {t(TranslationKey.Add)}
          </SuccessButton>

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
