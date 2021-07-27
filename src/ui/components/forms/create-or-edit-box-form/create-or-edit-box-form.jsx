import {useState} from 'react'

import {Button, Chip, Divider, NativeSelect, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {DeliveryTypeByCode, getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode, OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {LabelField} from '@components/label-field/label-field'
import {Modal} from '@components/modal'
import {SetShippingLabelModal} from '@components/modals/set-shipping-label-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {trimBarcode} from '@utils/text'

import {BoxOrder} from './box-order'
import {useClassNames} from './create-or-edit-box-form.style'

const textConsts = getLocalizedTexts(texts, 'en').clientEditBoxForm

const BlockOfNewBox = ({orderBoxIndex, orderBox, setFormField, setAmountField, isEditModal, editInClientWarehouse}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled={editInClientWarehouse}
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.lengthCmSupplier}
          value={orderBox.lengthCmSupplier}
          onChange={setFormField('lengthCmSupplier', orderBoxIndex)}
        />
        <Field
          disabled={editInClientWarehouse}
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
          disabled={editInClientWarehouse}
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.heightCmSupplier}
          value={orderBox.heightCmSupplier}
          onChange={setFormField('heightCmSupplier', orderBoxIndex)}
        />
        <Field
          disabled={editInClientWarehouse}
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

      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.amountOfSubBoxes}
          value={isEditModal ? orderBox.amount : 1}
        />
        <Field
          disabled={editInClientWarehouse}
          type="number"
          min="0"
          containerClasses={classNames.numberInputField}
          label={textConsts.amountIfItemsInBox}
          value={orderBox.items[0].amount}
          onChange={setAmountField(orderBoxIndex)}
        />
      </div>
    </div>
  )
}

export const CreateOrEditBoxForm = observer(
  ({
    formItem,
    onSubmit,
    onCloseModal,
    onTriggerOpenModal,
    selectFieldsArePreDefined,
    canBeMasterBox,
    isEditModal,
    editInClientWarehouse,
  }) => {
    const classNames = useClassNames()

    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)

    const sourceBox = isEditModal
      ? {
          lengthCmSupplier: formItem?.lengthCmSupplier || '',
          widthCmSupplier: formItem?.widthCmSupplier || '',
          heightCmSupplier: formItem?.heightCmSupplier || '',
          weighGrossKgSupplier: formItem?.weighGrossKgSupplier || '',
          volumeWeightKgSupplier: formItem?.volumeWeightKgSupplier || '',
          weightFinalAccountingKgSupplier: formItem?.weightFinalAccountingKgSupplier || '',
          warehouse: formItem?.warehouse || '',
          deliveryMethod: formItem?.deliveryMethod || '',
          amount: 1, // formItem?.amount || 1,
          shippingLabel: formItem?.shippingLabel || '',
          items: formItem?.items || [
            {
              product: formItem?.product,
              amount: formItem?.amount,
              order: formItem,
            },
          ],
        }
      : {
          lengthCmSupplier: formItem?.lengthCmSupplier || '',
          widthCmSupplier: formItem?.widthCmSupplier || '',
          heightCmSupplier: formItem?.heightCmSupplier || '',
          weighGrossKgSupplier: formItem?.weighGrossKgSupplier || '',
          volumeWeightKgSupplier: formItem?.volumeWeightKgSupplier || '',
          weightFinalAccountingKgSupplier: formItem?.weightFinalAccountingKgSupplier || '',
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

    console.log('sourceBox', sourceBox)

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

    const setShippingLabel = () => value => {
      const newFormFields = {...formFieldsArr[0]}
      newFormFields.shippingLabel = value

      const updatedNewBoxes = formFieldsArr.map((oldBox, index) => (index === 0 ? newFormFields : oldBox))
      setFormFieldsArr(updatedNewBoxes)
    }

    const onClickShippingLabel = () => {
      setShowSetShippingLabelModal(!showSetShippingLabelModal)
    }

    const onDeleteShippingLabel = () => {
      const newFormFields = {...formFieldsArr[0]}
      newFormFields.shippingLabel = ''
      const updatedNewBoxes = formFieldsArr.map((oldBox, index) => (index === 0 ? newFormFields : oldBox))
      setFormFieldsArr(updatedNewBoxes)
    }

    return (
      <div className={classNames.root}>
        <div className={classNames.form}>
          <Typography paragraph className={classNames.subTitle}>
            {formItem && formItem._id ? textConsts.updateBoxTitle : textConsts.newBoxTitle}
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
                  disabled={selectFieldsArePreDefined || editInClientWarehouse}
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
                  disabled={selectFieldsArePreDefined || editInClientWarehouse}
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

          {selectFieldsArePreDefined && (
            <LabelField
              containerClasses={classNames.field}
              label={textConsts.statusLabel}
              value={
                formFieldsArr[0].items[0].order.status &&
                getOrderStatusOptionByCode(formFieldsArr[0].items[0].order.status).label
              }
            />
          )}

          {editInClientWarehouse && (
            <div>
              <Chip
                classes={{
                  root: classNames.barcodeChip,
                  clickable: classNames.barcodeChipHover,
                  deletable: classNames.barcodeChipHover,
                  deleteIcon: classNames.barcodeChipIcon,
                }}
                className={clsx({[classNames.barcodeChipExists]: formFieldsArr[0].shippingLabel})}
                size="small"
                label={
                  formFieldsArr[0].shippingLabel ? trimBarcode(formFieldsArr[0].shippingLabel) : 'Set shipping label'
                }
                onClick={() => onClickShippingLabel()}
                onDelete={!formFieldsArr[0].shippingLabel ? undefined : () => onDeleteShippingLabel()}
              />
              <Divider className={classNames.divider} />
            </div>
          )}

          <div className={classNames.blockOfNewBoxWrapper}>
            {formFieldsArr.map((orderBox, orderBoxIndex) => (
              <BlockOfNewBox
                key={orderBoxIndex}
                editInClientWarehouse={editInClientWarehouse}
                isEditModal={isEditModal}
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
            {formItem && formItem._id ? (
              <Typography paragraph className={classNames.subTitle}>
                {`${textConsts.boxTitle} #${formItem._id}`}
              </Typography>
            ) : undefined}
            {formFieldsArr[0].items &&
              formFieldsArr[0].items.map((orderItem, orderIndex) => <BoxOrder key={orderIndex} order={orderItem} />)}
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          {canBeMasterBox &&
            formItem.status !== OrderStatusByKey[OrderStatus.PAID] &&
            formItem.status !== OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED] && (
              <div className={classNames.buttonsWrapper}>
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

                <Button
                  disableElevation
                  disabled={formFieldsArr.length === 1}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setFormFieldsArr([...formFieldsArr.slice(0, -1)])
                  }}
                >
                  {'Убрать коробку'}
                </Button>
              </div>
            )}

          <SuccessButton
            disableElevation
            color="primary"
            variant="contained"
            onClick={() => {
              onSubmit(formItem && formItem._id, formFieldsArr)

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

        <Modal
          openModal={showSetShippingLabelModal}
          setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        >
          <SetShippingLabelModal
            order={formFieldsArr[0]}
            onClickSaveShippingLabel={shippingLabel => {
              setShippingLabel()(shippingLabel)
              setShowSetShippingLabelModal(!showSetShippingLabelModal)
            }}
            onCloseModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
          />
        </Modal>
      </div>
    )
  },
)
