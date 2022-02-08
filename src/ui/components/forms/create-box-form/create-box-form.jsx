import {useState} from 'react'

import {Button, Divider, Typography, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {observer} from 'mobx-react'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {LabelField} from '@components/label-field/label-field'

import {checkIsPositiveNum} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './create-box-form.style'

const textConsts = getLocalizedTexts(texts, 'en').buyerCreateBoxForm

const BlockOfNewBox = ({orderBoxIndex, orderBox, setFormField, setAmountField, onRemoveBox}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          containerClasses={classNames.numberInputField}
          label={textConsts.lengthCmSupplier}
          value={orderBox.lengthCmSupplier}
          onChange={setFormField('lengthCmSupplier', orderBoxIndex)}
        />
        <Field
          containerClasses={classNames.numberInputField}
          label={textConsts.widthCmSupplier}
          value={orderBox.widthCmSupplier}
          onChange={setFormField('widthCmSupplier', orderBoxIndex)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          containerClasses={classNames.numberInputField}
          label={textConsts.heightCmSupplier}
          value={orderBox.heightCmSupplier}
          onChange={setFormField('heightCmSupplier', orderBoxIndex)}
        />
        <Field
          containerClasses={classNames.numberInputField}
          label={textConsts.weighGrossKgSupplier}
          value={orderBox.weighGrossKgSupplier}
          onChange={setFormField('weighGrossKgSupplier', orderBoxIndex)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.volumeWeightKgSupplier}
          value={orderBox.volumeWeightKgSupplier}
          onChange={setFormField('volumeWeightKgSupplier', orderBoxIndex)}
        />
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={textConsts.weightFinalAccountingKgSupplier}
          value={orderBox.weightFinalAccountingKgSupplier}
        />
      </div>

      <div className={classNames.numberInputFieldsWrapper}>
        <Field disabled containerClasses={classNames.numberInputField} label={textConsts.amountOfSubBoxes} value={1} />
        <Field
          containerClasses={classNames.numberInputField}
          label={textConsts.amountIfItemsInBox}
          value={orderBox.items[0].amount}
          onChange={setAmountField(orderBoxIndex)}
        />
      </div>
      <IconButton className={classNames.iconBtn} onClick={() => onRemoveBox(orderBoxIndex)}>
        <DeleteIcon className={classNames.deleteBtn} />
      </IconButton>
    </div>
  )
}

export const CreateBoxForm = observer(({formItem, boxesForCreation, onTriggerOpenModal, setBoxesForCreation}) => {
  const classNames = useClassNames()

  const sourceBox = {
    lengthCmSupplier: formItem?.lengthCmSupplier || '',
    widthCmSupplier: formItem?.widthCmSupplier || '',
    heightCmSupplier: formItem?.heightCmSupplier || '',
    weighGrossKgSupplier: formItem?.weighGrossKgSupplier || '',
    volumeWeightKgSupplier: formItem?.volumeWeightKgSupplier || '',
    warehouse: formItem?.warehouse || '',
    deliveryMethod: formItem?.deliveryMethod || '',
    amount: 1,
    items: formItem?.items || [
      {
        product: formItem?.product,
        amount: formItem?.amount,
        order: formItem,
      },
    ],
  }

  const [formFieldsArr, setFormFieldsArr] = useState([sourceBox])

  const setFormField = (fieldName, orderBoxIndex) => e => {
    if (isNaN(e.target.value) || Number(e.target.value) < 0) {
      return
    }

    const newFormFields = {...formFieldsArr[orderBoxIndex]}
    newFormFields[fieldName] = e.target.value
    newFormFields.volumeWeightKgSupplier =
      ((parseFloat(newFormFields.lengthCmSupplier) || 0) *
        (parseFloat(newFormFields.heightCmSupplier) || 0) *
        (parseFloat(newFormFields.widthCmSupplier) || 0)) /
      5000
    newFormFields.weightFinalAccountingKgSupplier = Math.max(
      parseFloat(newFormFields.volumeWeightKgSupplier) || 0,
      parseFloat(newFormFields.weighGrossKgSupplier) || 0,
    )

    const updatedNewBoxes = formFieldsArr.map((oldBox, index) => (index === orderBoxIndex ? newFormFields : oldBox))
    setFormFieldsArr(updatedNewBoxes)
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
    }
    setFormFieldsArr(newStateFormFields)
  }

  const onRemoveBox = boxIndex => {
    const updatedNewBoxes = formFieldsArr.filter((box, i) => i !== boxIndex)
    setFormFieldsArr(updatedNewBoxes)
  }

  const disableSubmit = formFieldsArr.length < 1 || formFieldsArr.some(el => el.items[0].amount < 1)

  return (
    <div className={classNames.root}>
      <div className={classNames.form}>
        <Typography paragraph className={classNames.subTitle}>
          {textConsts.newBoxTitle}
        </Typography>

        <div className={classNames.labelFieldsWrapper}>
          <LabelField
            containerClasses={classNames.field}
            label={textConsts.warehouseLabel}
            value={formItem.warehouse && warehouses[formItem.warehouse]}
          />

          <LabelField
            containerClasses={classNames.field}
            label={textConsts.deliveryMethodLabel}
            value={formItem.deliveryMethod && getDeliveryOptionByCode(formItem.deliveryMethod).label}
          />

          <LabelField
            containerClasses={classNames.field}
            label={textConsts.statusLabel}
            value={formItem.status && getOrderStatusOptionByCode(formItem.status).label}
          />
        </div>

        <Divider className={classNames.divider} />

        <div className={classNames.blockOfNewBoxWrapper}>
          {formFieldsArr.map((orderBox, orderBoxIndex) => (
            <BlockOfNewBox
              key={orderBoxIndex}
              orderBoxIndex={orderBoxIndex}
              orderBox={orderBox}
              setFormField={setFormField}
              setAmountField={setAmountField}
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
            {textConsts.addBoxBtn}
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
          onClick={() => {
            setBoxesForCreation([...boxesForCreation, ...formFieldsArr])
            onTriggerOpenModal()
          }}
        >
          {textConsts.saveChangesBtn}
        </SuccessButton>

        <Button
          disableElevation
          color="primary"
          className={classNames.button}
          variant="contained"
          onClick={() => onTriggerOpenModal()}
        >
          {textConsts.cancelChangesBtn}
        </Button>
      </div>
    </div>
  )
})
