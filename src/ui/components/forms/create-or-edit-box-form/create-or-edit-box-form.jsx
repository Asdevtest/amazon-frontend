import {useState} from 'react'

import {Button, Divider, NativeSelect, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {DeliveryTypeByCode, getDeliveryOptionByCode} from '@constants/delivery-options'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {LabelField} from '@components/label-field/label-field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BoxOrder} from './box-order'
import {useClassNames} from './create-or-edit-box-form.style'

const textConsts = getLocalizedTexts(texts, 'en').clientEditBoxForm

export const CreateOrEditBoxForm = observer(
  ({box, order, onSubmit, onCloseModal, onTriggerOpenModal, selectFieldsArePreDefined}) => {
    const classNames = useClassNames()

    const [formFields, setFormFields] = useState(
      {
        lengthCmSupplier: (box && box.lengthCmSupplier) || '',
        widthCmSupplier: (box && box.widthCmSupplier) || '',
        heightCmSupplier: (box && box.heightCmSupplier) || '',
        weighGrossKgSupplier: (box && box.weighGrossKgSupplier) || '',
        volumeWeightKgSupplier: (box && box.volumeWeightKgSupplier) || '',
        weightFinalAccountingKgSupplier: (box && box.weightFinalAccountingKgSupplier) || '',
        warehouse: (box && box.warehouse) || (order && order.warehouse) || '',
        deliveryMethod: (box && box.deliveryMethod) || (order && order.deliveryMethod) || '',
        // shipmentPlanId: (box && box.shipmentPlanId) || '',
        // scheduledDispatchDate: "2021-06-22",
        // factDispatchDate: "2021-06-22",
        items: (box && box.items) || [
          {
            product: order && order.product,
            amount: (order && order.amount) || 10,
            order: order && order,
          },
        ],
        // clientId: '607dceac3551e3fa7e7fbb69'
      },
      // {
      //   "lengthCm": 10,
      //   "widthCm": 10,
      //   "heightCm": 10,
      //   "weighGrossKg": 15.5,
      //   "volumeWeightKg": 25.5,
      //   "weightFinalAccountingKg": 25.5,

      //   "lengthCmSupplier": 25,
      //   "widthCmSupplier": 35,
      //   "heightCmSupplier": 45,
      //   "weighGrossKgSupplier": 45,
      //   "volumeWeightKgSupplier": 15,
      //   "weightFinalAccountingKgSupplier": 25,
      //   "shipmentPlanId": "12WEER234",
      //   "warehouse": 25,
      //   "deliveryMethod": 25
      // }
    )

    const setFormField = fieldName => e => {
      const newFormFields = {...formFields}
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
      setFormFields(newFormFields)
    }

    return (
      <div className={classNames.root}>
        <div className={classNames.form}>
          <Typography paragraph className={classNames.subTitle}>
            {box && box._id ? textConsts.updateBoxTitle : textConsts.newBoxTitle}
          </Typography>
          {selectFieldsArePreDefined ? (
            <LabelField
              containerClasses={classNames.field}
              label={textConsts.warehouseLabel}
              value={formFields.warehouse && warehouses[formFields.warehouse]}
            />
          ) : (
            <Field
              containerClasses={classNames.field}
              label={textConsts.warehouseLabel}
              inputComponent={
                <NativeSelect
                  disabled={selectFieldsArePreDefined}
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
          )}
          {selectFieldsArePreDefined ? (
            <LabelField
              containerClasses={classNames.field}
              label={textConsts.deliveryMethodLabel}
              value={formFields.deliveryMethod && getDeliveryOptionByCode(formFields.deliveryMethod).label}
            />
          ) : (
            <Field
              containerClasses={classNames.field}
              label={textConsts.deliveryMethodLabel}
              inputComponent={
                <NativeSelect
                  disabled={selectFieldsArePreDefined}
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
          )}
          <div className={classNames.numberInputFieldsBlocksWrapper}>
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
            </div>
            <div className={classNames.numberInputFieldsWrapper}>
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
            </div>
            <div className={classNames.numberInputFieldsWrapper}>
              <Field
                disabled
                type="number"
                min="0"
                containerClasses={classNames.numberInputField}
                label={textConsts.volumeWeightKgSupplier}
                value={formFields.volumeWeightKgSupplier}
                onChange={setFormField('volumeWeightKgSupplier')}
              />
              <Field
                disabled
                type="number"
                min="0"
                containerClasses={classNames.numberInputField}
                label={textConsts.weightFinalAccountingKgSupplier}
                value={formFields.weightFinalAccountingKgSupplier}
                onChange={setFormField('weightFinalAccountingKgSupplier')}
              />
            </div>
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
          <SuccessButton
            disableElevation
            color="primary"
            variant="contained"
            onClick={() => {
              onSubmit(box && box._id, formFields)
              if (onTriggerOpenModal) {
                onTriggerOpenModal('showEditBoxModal')
              }
            }}
          >
            {textConsts.saveChangesBtn}
          </SuccessButton>
          {onCloseModal || onTriggerOpenModal ? (
            <Button
              disableElevation
              color="primary"
              className={classNames.cancelBtn}
              variant="contained"
              onClick={onCloseModal || onTriggerOpenModal}
            >
              {textConsts.cancelChangesBtn}
            </Button>
          ) : undefined}
        </div>
      </div>
    )
  },
)
