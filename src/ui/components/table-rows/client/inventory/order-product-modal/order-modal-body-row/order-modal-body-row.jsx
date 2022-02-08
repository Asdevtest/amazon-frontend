import React from 'react'

import {Chip, Typography, TableCell, TableRow, NativeSelect, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
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
import {toFixed, trimBarcode} from '@utils/text'

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
  onRemoveProduct,
  withRemove,
}) => {
  const classNames = useClassNames()

  const onChangeInput = (event, nameInput) => {
    setOrderStateFiled(nameInput)(event.target.value)
  }

  return (
    <TableRow
      key={item._id}
      hover
      role="checkbox"
      className={clsx({[classNames.noCurrentSupplier]: !item.currentSupplier})}
    >
      <TableCell className={classNames.asinCell}>
        <div className={classNames.asinCellContainer}>
          <div>
            <img alt="placeholder" className={classNames.img} src={getAmazonImageUrl(item.images[0])} />
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div>
          <Typography>{item.amazonTitle}</Typography>
          <Typography>{`ASIN: ${item.id}`}</Typography>
          {!item.currentSupplier && (
            <Typography className={classNames.noCurrentSupplierText}>{textConsts.noCurrentSupplier}</Typography>
          )}
        </div>
      </TableCell>

      <TableCell>
        <Typography>{item.currentSupplier && item.currentSupplier.price}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{item.currentSupplier && item.currentSupplier.delivery}</Typography>
      </TableCell>

      <TableCell>
        <Input
          inputProps={{maxLength: 15, min: 0}}
          value={orderState.amount}
          className={classNames.amountCell}
          onChange={e => onChangeInput(e, 'amount')}
        />
      </TableCell>

      <TableCell>
        <Typography>{toFixed(calcProductsPriceWithDelivery(item, orderState), 2)}</Typography>
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
        <Input inputProps={{maxLength: 500}} onChange={e => onChangeInput(e, 'clientComment')} />
      </TableCell>

      {withRemove && (
        <TableCell>
          <IconButton onClick={() => onRemoveProduct(item._id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  )
}
