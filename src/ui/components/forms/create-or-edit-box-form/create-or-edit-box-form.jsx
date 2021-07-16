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

const BlockOfNewBox = ({orderBoxIndex, orderBox, setFormField, setAmountField, canBeMasterBox}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.lengthCmSupplier}
          value={orderBox.lengthCmSupplier}
          onChange={setFormField('lengthCmSupplier', orderBoxIndex)}
        />
        <Field
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.widthCmSupplier}
          value={orderBox.widthCmSupplier}
          onChange={setFormField('widthCmSupplier', orderBoxIndex)}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.heightCmSupplier}
          value={orderBox.heightCmSupplier}
          onChange={setFormField('heightCmSupplier', orderBoxIndex)}
        />
        <Field
          type="number"
          min="0"
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
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.volumeWeightKgSupplier}
          value={orderBox.volumeWeightKgSupplier}
          onChange={setFormField('volumeWeightKgSupplier', orderBoxIndex)}
        />
        <Field
          disabled
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.weightFinalAccountingKgSupplier}
          value={orderBox.weightFinalAccountingKgSupplier}
          onChange={setFormField('weightFinalAccountingKgSupplier', orderBoxIndex)}
        />
      </div>
      {canBeMasterBox ? (
        <div className={classNames.numberInputFieldsWrapper}>
          <Field
            type="number"
            min="0"
            containerClasses={classNames.numberInputField}
            label={textConsts.amountOfSubBoxes}
            value={orderBox.amount}
            onChange={setFormField('amount', orderBoxIndex)}
          />
          <Field
            type="number"
            min="0"
            containerClasses={classNames.numberInputField}
            label={textConsts.amountIfItemsInBox}
            value={orderBox.items[0].amount}
            onChange={setAmountField(orderBoxIndex)}
          />
        </div>
      ) : undefined}
    </div>
  )
}

export const CreateOrEditBoxForm = observer(
  ({box, order, onSubmit, onCloseModal, onTriggerOpenModal, selectFieldsArePreDefined, canBeMasterBox}) => {
    const classNames = useClassNames()

    const sourceBox = {
      lengthCmSupplier: box?.lengthCmSupplier || '',
      widthCmSupplier: box?.widthCmSupplier || '',
      heightCmSupplier: box?.heightCmSupplier || '',
      weighGrossKgSupplier: box?.weighGrossKgSupplier || '',
      volumeWeightKgSupplier: box?.volumeWeightKgSupplier || '',
      weightFinalAccountingKgSupplier: box?.weightFinalAccountingKgSupplier || '',
      warehouse: order?.warehouse || '',
      deliveryMethod: order?.deliveryMethod || '',
      amount: order?.amount || 0,
      items: box?.items || [
        {
          product: order?.product,
          amount: order?.amount,
          order,
        },
      ],
    }

    const [formFieldsArr, setFormFieldsArr] = useState([sourceBox])

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
            {box && box._id ? textConsts.updateBoxTitle : textConsts.newBoxTitle}
          </Typography>
          {selectFieldsArePreDefined ? (
            <LabelField
              containerClasses={classNames.field}
              label={textConsts.warehouseLabel}
              value={formFieldsArr[0].warehouse && warehouses[formFieldsArr[0].warehouse]}
            />
          ) : (
            <Field
              containerClasses={classNames.field}
              label={textConsts.warehouseLabel}
              inputComponent={
                <NativeSelect
                  disabled={selectFieldsArePreDefined}
                  variant="filled"
                  value={formFieldsArr[0].warehouse}
                  input={<Input fullWidth />}
                  onChange={setFormField('warehouse', 0)}
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
              value={formFieldsArr[0].deliveryMethod && getDeliveryOptionByCode(formFieldsArr[0].deliveryMethod).label}
            />
          ) : (
            <Field
              containerClasses={classNames.field}
              label={textConsts.deliveryMethodLabel}
              inputComponent={
                <NativeSelect
                  disabled={selectFieldsArePreDefined}
                  variant="filled"
                  value={formFieldsArr[0].deliveryMethod}
                  input={<Input fullWidth />}
                  onChange={setFormField('deliveryMethod', 0)}
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
          <div className={classNames.blockOfNewBoxWrapper}>
            {formFieldsArr.map((orderBox, orderBoxIndex) => (
              <BlockOfNewBox
                key={orderBoxIndex}
                orderBoxIndex={orderBoxIndex}
                orderBox={orderBox}
                setFormField={setFormField}
                setAmountField={setAmountField}
                canBeMasterBox={canBeMasterBox}
              />
            ))}
          </div>

          <Divider className={classNames.divider} />

          <div className={classNames.ordersWrapper}>
            {box && box._id ? (
              <Typography paragraph className={classNames.subTitle}>
                {`${textConsts.boxTitle} #${box._id}`}
              </Typography>
            ) : undefined}
            {formFieldsArr[0].items &&
              formFieldsArr[0].items.map((orderItem, orderIndex) => <BoxOrder key={orderIndex} order={orderItem} />)}
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          {canBeMasterBox && (
            <Button
              disableElevation
              color="primary"
              variant="contained"
              onClick={() => {
                setFormFieldsArr(formFieldsArr.concat({...sourceBox}))
              }}
            >
              {textConsts.addBoxBtn}
            </Button>
          )}

          <SuccessButton
            disableElevation
            color="primary"
            variant="contained"
            onClick={() => {
              onSubmit(box && box._id, formFieldsArr)

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
