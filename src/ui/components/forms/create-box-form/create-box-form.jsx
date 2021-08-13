import {useState} from 'react'

import {Button, Divider, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode, OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {LabelField} from '@components/label-field/label-field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './create-box-form.style'

const textConsts = getLocalizedTexts(texts, 'en').clientEditBoxForm

const BlockOfNewBox = ({orderBoxIndex, orderBox, setFormField, setAmountField}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.lengthCmSupplier}
          value={orderBox.lengthCmSupplier}
          onChange={setFormField('lengthCmSupplier', orderBoxIndex)}
        />
        <Field
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.widthCmSupplier}
          value={orderBox.widthCmSupplier}
          onChange={setFormField('widthCmSupplier', orderBoxIndex)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.heightCmSupplier}
          value={orderBox.heightCmSupplier}
          onChange={setFormField('heightCmSupplier', orderBoxIndex)}
        />
        <Field
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.weighGrossKgSupplier}
          value={orderBox.weighGrossKgSupplier}
          onChange={setFormField('weighGrossKgSupplier', orderBoxIndex)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.volumeWeightKgSupplier}
          value={orderBox.volumeWeightKgSupplier}
          onChange={setFormField('volumeWeightKgSupplier', orderBoxIndex)}
        />
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.weightFinalAccountingKgSupplier}
          value={orderBox.weightFinalAccountingKgSupplier}
          onChange={setFormField('weightFinalAccountingKgSupplier', orderBoxIndex)}
        />
      </div>

      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.amountOfSubBoxes}
          value={1}
        />
        <Field
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.amountIfItemsInBox}
          value={orderBox.items[0].amount}
          onChange={setAmountField(orderBoxIndex)}
        />
      </div>
    </div>
  )
}

export const CreateBoxForm = observer(({formItem, onSubmit, onTriggerOpenModal}) => {
  const classNames = useClassNames()

  const sourceBox = {
    lengthCmSupplier: formItem?.lengthCmSupplier || 0,
    widthCmSupplier: formItem?.widthCmSupplier || 0,
    heightCmSupplier: formItem?.heightCmSupplier || 0,
    weighGrossKgSupplier: formItem?.weighGrossKgSupplier || 0,
    volumeWeightKgSupplier: formItem?.volumeWeightKgSupplier || 0,
    weightFinalAccountingKgSupplier: formItem?.weightFinalAccountingKgSupplier || 0,
    warehouse: formItem?.warehouse || '',
    deliveryMethod: formItem?.deliveryMethod || '',
    amount: 1, // formItem?.amount || 1,
    items: formItem?.items || [
      {
        product: formItem?.product,
        amount: formItem?.amount,
        order: formItem,
      },
    ],
  }

  const [formFieldsArr, setFormFieldsArr] = useState([])

  const setFormField = (fieldName, orderBoxIndex) => e => {
    const newFormFields = {...formFieldsArr[orderBoxIndex]}
    newFormFields[fieldName] = Number(e.target.value)
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
    const newStateFormFields = [...formFieldsArr]
    newStateFormFields[orderBoxIndex] = {
      ...newStateFormFields[orderBoxIndex],
      items: [
        {
          ...newStateFormFields[orderBoxIndex].items[0],
          amount: e.target.value,
        },
      ],
    }
    setFormFieldsArr(newStateFormFields)
  }

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
            />
          ))}
        </div>

        {formItem.status !== OrderStatusByKey[OrderStatus.PAID] &&
          formItem.status !== OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED] && (
            <div className={classNames.buttonsWrapper}>
              <Button
                disableElevation
                className={classNames.button}
                color="primary"
                variant="contained"
                onClick={() => {
                  setFormFieldsArr(formFieldsArr.concat({...sourceBox}))
                  onTriggerOpenModal('showWarningNewBoxesModal')
                }}
              >
                {textConsts.addBoxBtn}
              </Button>

              <Button
                disableElevation
                className={classNames.button}
                disabled={formFieldsArr.length < 1}
                color="primary"
                variant="contained"
                onClick={() => {
                  setFormFieldsArr([...formFieldsArr.slice(0, -1)])
                }}
              >
                {textConsts.removeBtn}
              </Button>
            </div>
          )}
      </div>

      <div className={classNames.buttonsWrapper}>
        <SuccessButton
          disableElevation
          className={classNames.button}
          color="primary"
          variant="contained"
          onClick={() => {
            onSubmit(formItem && formItem._id, formFieldsArr)
          }}
        >
          {textConsts.saveChangesBtn}
        </SuccessButton>

        <Button
          disableElevation
          color="primary"
          className={classNames.button}
          variant="contained"
          onClick={() => onTriggerOpenModal('showOrderModal')}
        >
          {textConsts.cancelChangesBtn}
        </Button>
      </div>
    </div>
  )
})
