import {useState} from 'react'

import {Button, Divider, NativeSelect, Typography} from '@material-ui/core'

import {DeliveryTypeByCode, getDeliveryOptionByCode} from '@constants/delivery-options'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BoxOrder} from './box-order'
import {useClassNames} from './create-or-edit-box-form.style'

const textConsts = getLocalizedTexts(texts, 'en').clientEditBoxForm

export const CreateOrEditBoxForm = ({order, box, onSubmit}) => {
  const classNames = useClassNames()

  const [formFields, setFormFields] = useState({
    lengthCmSupplier: (box && box.lengthCmSupplier) || '',
    widthCmSupplier: (box && box.widthCmSupplier) || '',
    heightCmSupplier: (box && box.heightCmSupplier) || '',
    weighGrossKgSupplier: (box && box.weighGrossKgSupplier) || '',
    volumeWeightKgSupplier: (box && box.volumeWeightKgSupplier) || '',
    weightFinalAccountingKgSupplier: (box && box.weightFinalAccountingKgSupplier) || '',
    warehouse: (box && box.warehouse) || '',
    deliveryMethod: (box && box.deliveryMethod) || '',
    // scheduledDispatchDate: "2021-06-22",
    // factDispatchDate: "2021-06-22",
    items: (box && box.items) || [
      {
        product: order && order.product,
        amount: (order && order.amount) || 10,
        order: order && order,
      },
    ],
    clientId: '607dceac3551e3fa7e7fbb69',
  })

  const setFormField = fieldName => e => {
    const newFormFields = {...formFields, [fieldName]: e.target.value}
    setFormFields(newFormFields)
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.form}>
        <Typography paragraph className={classNames.subTitle}>
          {box && box._id ? textConsts.updateBoxTitle : textConsts.newBoxTitle}
        </Typography>

        <Field
          containerClasses={classNames.field}
          label={textConsts.warehouseLabel}
          inputComponent={
            <NativeSelect
              variant="filled"
              value={formFields.warehouse}
              input={<Input fullWidth />}
              onChange={setFormField('warehouse')}
            >
              {Object.keys(warehouses).map((warehouseCode, index) => (
                <option key={index} value={warehouseCode}>
                  {warehouses[warehouseCode]}
                </option>
              ))}
            </NativeSelect>
          }
        />
        <Field
          containerClasses={classNames.field}
          label={textConsts.deliveryMethodLabel}
          inputComponent={
            <NativeSelect
              variant="filled"
              value={formFields.deliveryMethod}
              input={<Input fullWidth />}
              onChange={setFormField('deliveryMethod')}
            >
              {Object.keys(DeliveryTypeByCode).map((deliveryOptionCode, index) => (
                <option key={index} value={deliveryOptionCode}>
                  {getDeliveryOptionByCode(deliveryOptionCode).label}
                </option>
              ))}
            </NativeSelect>
          }
        />
        <div className={classNames.numberInputFieldsWrapper}>
          <Field
            type="number"
            min="0"
            containerClasses={classNames.numberInputField}
            label={textConsts.lengthCmSupplier}
            value={formFields.lengthCmSupplier}
            onChange={setFormField('lengthCmSupplier')}
          />
          <Field
            type="number"
            min="0"
            containerClasses={classNames.numberInputField}
            label={textConsts.widthCmSupplier}
            value={formFields.widthCmSupplier}
            onChange={setFormField('widthCmSupplier')}
          />
          <Field
            type="number"
            min="0"
            containerClasses={classNames.numberInputField}
            label={textConsts.heightCmSupplier}
            value={formFields.heightCmSupplier}
            onChange={setFormField('heightCmSupplier')}
          />
          <Field
            type="number"
            min="0"
            containerClasses={classNames.numberInputField}
            label={textConsts.weighGrossKgSupplier}
            value={formFields.weighGrossKgSupplier}
            onChange={setFormField('weighGrossKgSupplier')}
          />
          <Field
            type="number"
            min="0"
            containerClasses={classNames.numberInputField}
            label={textConsts.volumeWeightKgSupplier}
            value={formFields.volumeWeightKgSupplier}
            onChange={setFormField('volumeWeightKgSupplier')}
          />
          <Field
            type="number"
            min="0"
            containerClasses={classNames.numberInputField}
            label={textConsts.weightFinalAccountingKgSupplier}
            value={formFields.weightFinalAccountingKgSupplier}
            onChange={setFormField('weightFinalAccountingKgSupplier')}
          />
        </div>

        <Divider className={classNames.divider} />

        <div className={classNames.ordersWrapper}>
          {box && box._id ? (
            <Typography paragraph className={classNames.subTitle}>
              {`${textConsts.boxTitle} #${box._id}`}
            </Typography>
          ) : undefined}
          {formFields.items &&
            formFields.items.map((orderItem, orderIndex) => <BoxOrder key={orderIndex} order={orderItem} />)}
        </div>
      </div>

      <div className={classNames.buttonsWrapper}>
        <SuccessButton disableElevation color="primary" variant="contained" onClick={() => onSubmit(formFields)}>
          {textConsts.saveChangesBtn}
        </SuccessButton>
        <Button disableElevation color="primary" className={classNames.cancelBtn} variant="contained">
          {textConsts.cancelChangesBtn}
        </Button>
      </div>
    </div>
  )
}
