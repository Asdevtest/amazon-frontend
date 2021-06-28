import React, {useState} from 'react'

import {Chip, Typography, TableCell, TableRow, NativeSelect} from '@material-ui/core'
import clsx from 'clsx'

import {DeliveryTypeByCode, getDeliveryOptionByCode} from '@constants/delivery-options'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Input} from '@components/input'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {priceCalculation} from '@utils/price-calculation'
import {trimBarcode} from '@utils/text'

import {useClassNames} from './order-modal-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

export const OrderModalBodyRow = ({
  item,
  itemIndex,
  setOrderState,
  onClickBarcode,
  onDoubleClickBarcode,
  onDeleteBarcode,
  orderState,
}) => {
  const classNames = useClassNames()

  const onChangeInput = (event, nameInput) => {
    setOrderState([
      ...orderState.map((product, index) =>
        index === itemIndex ? {...product, [nameInput]: event.target.value} : product,
      ),
    ])
  }

  const [amount, setAmount] = useState(0)
  const handleInput = e => {
    setAmount(e.target.value)
    onChangeInput(e, 'amount')
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
        <Typography>{item.id}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{item.amazon}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{item.bsr}</Typography>
      </TableCell>

      <TableCell>
        <Input
          type="number"
          value={amount}
          inputProps={{min: 0}}
          className={classNames.amountCell}
          onChange={e => {
            handleInput(e)
          }}
        />
      </TableCell>

      <TableCell>
        <Typography>{priceCalculation(item.amazon, item.fbaamount, amount)}</Typography>
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
          label={item.barCode ? trimBarcode(item.barCode) : textConsts.setBarcodeChipLabel}
          onClick={() => onClickBarcode(item, itemIndex)}
          onDoubleClick={() => onDoubleClickBarcode(item, itemIndex)}
          onDelete={!item.barCode ? undefined : () => onDeleteBarcode(item, itemIndex)}
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
          {Object.keys(DeliveryTypeByCode).map((deliveryOptionCode, index) => (
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
