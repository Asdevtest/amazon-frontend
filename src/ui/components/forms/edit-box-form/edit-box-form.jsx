/* eslint-disable no-unused-vars */
import {useState} from 'react'

import {Button, Chip, Divider, NativeSelect, TableCell, TableRow, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

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
import {Table} from '@components/table'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {trimBarcode} from '@utils/text'

import {useClassNames} from './edit-box-form.style'
import {ProductInOrderTableRow} from './product-in-order-table-row'

const textConsts = getLocalizedTexts(texts, 'en').clientEditBoxForm

const WarehouseDemensions = ({orderBox}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.lengthCmWarehouse}
          value={orderBox.lengthCmWarehouse || 0}
        />
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.widthCmWarehouse}
          value={orderBox.widthCmWarehouse || 0}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.heightCmWarehouse}
          value={orderBox.heightCmWarehouse || 0}
        />
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.weighGrossKgWarehouse}
          value={orderBox.weighGrossKgWarehouse || 0}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.volumeWeightKgWarehouse}
          value={orderBox.volumeWeightKgWarehouse || 0}
        />
        <Field
          disabled
          type="number"
          containerClasses={classNames.numberInputField}
          label={textConsts.weightFinalAccountingKgWarehouse}
          value={orderBox.weightFinalAccountingKgWarehouse || 0}
        />
      </div>
    </div>
  )
}

export const CLIENT_EDIT_BOX_MODAL_HEAD_CELLS = ['Product', 'Barcode', 'Qty', 'Actions']

const renderHeadRow = (
  <TableRow>
    {CLIENT_EDIT_BOX_MODAL_HEAD_CELLS.map((item, index) => (
      <TableCell key={index}>{item}</TableCell>
    ))}
  </TableRow>
)

export const EditBoxForm = observer(({formItem, onSubmit, onTriggerOpenModal}) => {
  const classNames = useClassNames()

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [curPhotos, setCurPhotos] = useState([])

  const rowHandlers = {
    onTriggerOpenModal: () => setShowPhotosModal(!showPhotosModal),
    onSelectPhotos: setCurPhotos,
  }

  const [boxFields, setBoxFields] = useState({
    ...formItem,
    lengthCmSupplier: formItem?.lengthCmSupplier || '',
    widthCmSupplier: formItem?.widthCmSupplier || '',
    heightCmSupplier: formItem?.heightCmSupplier || '',
    weighGrossKgSupplier: formItem?.weighGrossKgSupplier || '',
    volumeWeightKgSupplier: formItem?.volumeWeightKgSupplier || '',
    weightFinalAccountingKgSupplier: formItem?.weightFinalAccountingKgSupplier || '',

    lengthCmWarehouse: formItem?.lengthCmWarehouse || 0,
    widthCmWarehouse: formItem?.widthCmWarehouse || 0,
    heightCmWarehouse: formItem?.heightCmWarehouse || 0,
    weighGrossKgWarehouse: formItem?.weighGrossKgWarehouse || 0,
    volumeWeightKgWarehouse: formItem?.volumeWeightKgWarehouse || 0,
    weightFinalAccountingKgWarehouse: formItem?.weightFinalAccountingKgWarehouse || 0,
    warehouse: formItem?.warehouse,
    deliveryMethod: formItem?.deliveryMethod,
    amount: formItem?.amount,
    shippingLabel: formItem?.shippingLabel || '',
    items: formItem?.items || [
      {
        product: formItem?.product,
        amount: formItem?.amount,
        order: formItem,
      },
    ],
  })

  console.log('formItem', formItem)
  console.log('boxFields', boxFields)

  const setFormField = fieldName => e => {
    const newFormFields = {...boxFields}
    newFormFields[fieldName] = e.target.value

    setBoxFields(newFormFields)
  }

  const setShippingLabel = () => value => {
    const newFormFields = {...boxFields}
    newFormFields.shippingLabel = value

    setBoxFields(newFormFields)
  }

  const onClickShippingLabel = () => {
    setShowSetShippingLabelModal(!showSetShippingLabelModal)
  }

  const onDeleteShippingLabel = () => {
    const newFormFields = {...boxFields}
    newFormFields.shippingLabel = ''
    setBoxFields(newFormFields)
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.form}>
        <div className={classNames.topWrapper}>
          <div>
            <Typography paragraph className={classNames.subTitle}>
              {textConsts.updateBoxTitle}
            </Typography>

            <Field
              containerClasses={classNames.field}
              label={textConsts.warehouseLabel}
              inputComponent={
                <NativeSelect
                  variant="filled"
                  value={boxFields.warehouse}
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
                  value={boxFields.deliveryMethod}
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

            <LabelField
              containerClasses={classNames.field}
              label={textConsts.statusLabel}
              value={
                boxFields.items[0].order.status && getOrderStatusOptionByCode(boxFields.items[0].order.status).label
              }
            />

            <div>
              <Chip
                classes={{
                  root: classNames.barcodeChip,
                  clickable: classNames.barcodeChipHover,
                  deletable: classNames.barcodeChipHover,
                  deleteIcon: classNames.barcodeChipIcon,
                }}
                className={clsx({[classNames.barcodeChipExists]: boxFields.shippingLabel})}
                size="small"
                label={boxFields.shippingLabel ? trimBarcode(boxFields.shippingLabel) : 'Set shipping label'}
                onClick={() => onClickShippingLabel()}
                onDelete={!boxFields.shippingLabel ? undefined : () => onDeleteShippingLabel()}
              />
            </div>
          </div>

          <div className={classNames.blockOfNewBoxWrapper}>
            <Typography paragraph className={classNames.subTitle}>
              {textConsts.warehouseDemensions}
            </Typography>
            <WarehouseDemensions orderBox={boxFields} />
          </div>
        </div>

        <Divider className={classNames.divider} />

        <div className={classNames.tableWrapper}>
          <Typography className={classNames.tableTitle}>{`${textConsts.boxTitle} #${
            formItem && formItem._id
          }`}</Typography>
          <Table
            rowsOnly
            data={boxFields.items}
            BodyRow={ProductInOrderTableRow}
            renderHeadRow={renderHeadRow}
            rowsHandlers={rowHandlers}
          />
        </div>

        <Divider className={classNames.divider} />

        <div className={classNames.commentsWrapper}>
          <Field
            multiline
            className={classNames.heightFieldAuto}
            rows={4}
            rowsMax={6}
            label={'Комментарий клиента'}
            placeholder={'Комментарий клиента к задаче'}
          />
          <Field
            multiline
            className={classNames.heightFieldAuto}
            rows={4}
            rowsMax={6}
            label={'Комментарий склада'}
            placeholder={'Комментарий склада к задаче для клиента'}
          />
        </div>
      </div>

      <div className={classNames.buttonsWrapper}>
        <SuccessButton
          disableElevation
          className={classNames.button}
          color="primary"
          variant="contained"
          onClick={() => {
            onSubmit(formItem._id, boxFields)
          }}
        >
          {textConsts.saveChangesBtn}
        </SuccessButton>

        <Button
          disableElevation
          color="primary"
          className={classNames.button}
          variant="contained"
          onClick={onTriggerOpenModal}
        >
          {textConsts.cancelChangesBtn}
        </Button>
      </div>

      <Modal openModal={showPhotosModal} setOpenModal={() => setShowPhotosModal(!showPhotosModal)}>
        <Carousel autoPlay={false} timeout={100} animation="fade">
          {curPhotos.map((el, index) => (
            <div key={index}>
              <img alt="" className={classNames.imgBox} src={getAmazonImageUrl(el)} />
            </div>
          ))}
        </Carousel>
      </Modal>

      <Modal
        openModal={showSetShippingLabelModal}
        setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
      >
        <SetShippingLabelModal
          order={boxFields}
          onClickSaveShippingLabel={shippingLabel => {
            setShippingLabel()(shippingLabel)
            setShowSetShippingLabelModal(!showSetShippingLabelModal)
          }}
          onCloseModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        />
      </Modal>
    </div>
  )
})
