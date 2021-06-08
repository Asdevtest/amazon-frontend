import {useState} from 'react'

import {Button, Divider, NativeSelect, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Field} from '@components/field'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BoxOrder} from './box-order'
import {useClassNames} from './edit-box-form.style'

const textConsts = getLocalizedTexts(texts, 'en').clientEditBoxForm

const warehouseOptions = [
  {value: 0, label: warehouses[0]},
  {value: 25, label: warehouses[25]},
]

const deliveryMethodOptions = [
  {value: 1, label: 'Air'},
  {value: 2, label: 'Sea'},
]

const statusOptions = [
  {value: 0, label: 'Formed'},
  {value: 1, label: 'New'},
  {value: 10, label: 'ReadyToProcess'},
  {value: 15, label: 'At process'},
  {value: 20, label: 'Paid'},
  {value: 25, label: 'Track number issued'},
  {value: 30, label: 'In stock'},
  {value: 35, label: 'Return order'},
]

export const EditBoxForm = ({formFields, onSubmit}) => {
  const classNames = useClassNames()
  const [warehouseValue, setWarehouseValue] = useState(formFields.warehouse)
  const [deliveryMethodValue, setDeliveryMethodValue] = useState(formFields.ordersId[0].deliveryMethod)
  const [statusValue, setStatusValue] = useState(formFields.status)

  const warehouseInfoData = [
    {value: formFields.lengthCmWarehouse, label: textConsts.lengthCmWarehouseLabel},
    {value: formFields.widthCmWarehouse, label: textConsts.widthCmWarehouseLabel},
    {value: formFields.heightCmWarehouse, label: textConsts.heightCmWarehouseLabel},
    {value: formFields.volumeWeightKgWarehouse, label: textConsts.volumeWeightKgWarehouseLabel},
    {value: formFields.weightFinalAccountingKgWarehouse, label: textConsts.weightFinalAccountingKgWarehouseLabel},
  ]

  return (
    <div className={classNames.root}>
      <div className={classNames.form}>
        <Typography paragraph className={classNames.subTitle}>
          {textConsts.newBoxStateTitle}
        </Typography>

        <Field
          containerClasses={classNames.field}
          label={textConsts.warehouseLabel}
          inputComponent={
            <NativeSelect
              variant="filled"
              value={warehouseValue}
              input={<Input fullWidth />}
              onChange={e => setWarehouseValue(e.target.value)}
            >
              {warehouseOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
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
              value={deliveryMethodValue}
              input={<Input fullWidth />}
              onChange={e => setDeliveryMethodValue(e.target.value)}
            >
              {deliveryMethodOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          }
        />

        <Field
          containerClasses={classNames.field}
          label={textConsts.statusLabel}
          inputComponent={
            <NativeSelect
              variant="filled"
              value={statusValue}
              input={<Input fullWidth />}
              onChange={e => setStatusValue(e.target.value)}
            >
              {statusOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          }
        />

        <Divider className={classNames.divider} />

        <div className={classNames.warehouseInfoWrapper}>
          {warehouseInfoData.map((el, index) => (
            <Typography key={index}>{`${el.label}: ${el.value}`}</Typography>
          ))}
        </div>

        <Divider className={classNames.divider} />

        <div className={classNames.ordersWrapper}>
          <Typography
            paragraph
            className={classNames.subTitle}
          >{`${textConsts.boxTitle} #${formFields.boxId}`}</Typography>
          {formFields.ordersId.map((order, orderIndex) => (
            <BoxOrder key={orderIndex} order={order} />
          ))}
        </div>
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button disableElevation className={classNames.submit} color="primary" variant="contained" onClick={onSubmit}>
          {textConsts.saveChangesBtn}
        </Button>
        <Button disableElevation color="primary" variant="contained">
          {textConsts.cancelChangesBtn}
        </Button>
      </div>
    </div>
  )
}
