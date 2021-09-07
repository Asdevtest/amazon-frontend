import React from 'react'

import {Chip, Typography, TableCell, TableRow, NativeSelect} from '@material-ui/core'
import clsx from 'clsx'

import {
  DeliveryType,
  DeliveryTypeByCode,
  deliveryTypeCodeToKey,
  getDeliveryOptionByCode,
} from '@constants/delivery-options'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Input} from '@components/input'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {trimBarcode} from '@utils/text'

import {useClassNames} from './order-modal-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

export const OrderModalBodyRow = ({
  item,
  itemIndex,
  setOrderStateFiled,
  onClickBarcode,
  onDoubleClickBarcode,
  onDeleteBarcode,
  orderState,
}) => {
  const classNames = useClassNames()

  const onChangeInput = (event, nameInput) => {
    setOrderStateFiled(nameInput)(event.target.value)
  }

  return (
    <TableRow key={item._id} hover role="checkbox">
      <TableCell className={classNames.asinCell}>
        <div className={classNames.asinCellContainer}>
          <div>
            <img
              alt="placeholder"
              className={classNames.img}
              src={item.images && item.images[0] && getAmazonImageUrl(item.images[0])}
            />
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div>
          <Typography>{item.amazonTitle}</Typography>
          <Typography>{`ID: ${item.id}`}</Typography>
        </div>
      </TableCell>

      <TableCell>
        <Typography>{item.currentSupplier.price}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{item.currentSupplier.delivery}</Typography>
      </TableCell>

      <TableCell>
        <Input
          value={orderState.amount}
          inputProps={{min: 0}}
          className={classNames.amountCell}
          onChange={e => onChangeInput(e, 'amount')}
        />
      </TableCell>

      <TableCell>
        <Typography>{calcProductsPriceWithDelivery(item, orderState)}</Typography>
      </TableCell>

      <TableCell>
        <Chip
          classes={{
            root: classNames.barcodeChip,
            clickable: classNames.barcodeChipHover,
            deletable: classNames.barcodeChipHover,
            deleteIcon: classNames.barcodeChipIcon,
          }}
          className={clsx({[classNames.barcodeChipExists]: item.barCode})}
          size="small"
          label={orderState.barCode ? trimBarcode(orderState.barCode) : textConsts.setBarcodeChipLabel}
          onClick={() => onClickBarcode(item, itemIndex)}
          onDoubleClick={() => onDoubleClickBarcode(item, itemIndex)}
          onDelete={!orderState.barCode ? undefined : () => onDeleteBarcode(item, itemIndex)}
        />
      </TableCell>

      <TableCell>
        <NativeSelect
          variant="filled"
          inputProps={{
            name: 'delivery',
            id: 'delivery',
          }}
          className={classNames.select}
          input={<Input />}
          onChange={e => onChangeInput(e, 'deliveryMethod')}
        >
          <option value={'none'}>{'none'}</option>
          {Object.keys(
            getObjectFilteredByKeyArrayWhiteList(DeliveryTypeByCode, [
              deliveryTypeCodeToKey[DeliveryType.SEA].toString(),
              deliveryTypeCodeToKey[DeliveryType.AIR].toString(),
            ]),
          ).map((deliveryOptionCode, index) => (
            <option key={index} value={deliveryOptionCode}>
              {getDeliveryOptionByCode(deliveryOptionCode).label}
            </option>
          ))}
        </NativeSelect>
      </TableCell>

      <TableCell>
        <NativeSelect
          variant="filled"
          inputProps={{
            name: 'warehouse',
            id: 'warehouse',
          }}
          className={classNames.select}
          input={<Input />}
          onChange={e => onChangeInput(e, 'warehouse')}
        >
          <option value={'none'}>{'none'}</option>
          {Object.keys(warehouses).map((warehouseOptionCode, index) => (
            <option key={index} value={warehouseOptionCode}>
              {warehouses[warehouseOptionCode]}
            </option>
          ))}
        </NativeSelect>
      </TableCell>

      <TableCell>
        <Input type="text" inputProps={{min: 0}} onChange={e => onChangeInput(e, 'clientComment')} />
      </TableCell>
    </TableRow>
  )
}
