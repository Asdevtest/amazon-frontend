import {Chip, NativeSelect, TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {DeliveryTypeByCode, getDeliveryOptionByCode} from '@constants/delivery-options'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Input} from '@components/input'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {styles} from './exchange-modal-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').exchangeModalBodyRowRaw

const ExchangeModalBodyRowRaw = ({product, orderFields, setOderField, classes: classNames, onClickEditBarcode}) => {
  const fullPriceForDeliveryAndAmount = (parseFloat(product.delivery) || 0) * (parseFloat(orderFields.amount) || 0)
  return (
    <TableRow>
      <TableCell>
        <img
          alt=""
          className={classNames.imgCell}
          src={product.images && product.images[0] && getAmazonImageUrl(product.images[0])}
        />
      </TableCell>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(product.amazon)}</TableCell>
      <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(product.delivery)}</TableCell>
      <TableCell>
        <Input
          className={classNames.input}
          type="number"
          value={orderFields.amount}
          onChange={setOderField('amount')}
        />
      </TableCell>
      <TableCell className={classNames.alignRight}>{fullPriceForDeliveryAndAmount}</TableCell>
      <TableCell className={classNames.alignRight}>
        <Chip
          className={clsx(
            {
              root: classNames.orderChip,
              clickable: classNames.orderChipHover,
              deletable: classNames.orderChipHover,
              deleteIcon: classNames.orderChipIcon,
            },
            {[classNames.select]: orderFields.barCode},
          )}
          size="small"
          color={orderFields.barCode ? 'primary' : 'default'}
          label={orderFields.barCode ? orderFields.barCode : textConsts.setBarCodeLabel}
          onClick={e => {
            e.stopPropagation()
            onClickEditBarcode()
          }}
        />
      </TableCell>
      <TableCell>
        <NativeSelect
          variant="filled"
          inputProps={{
            name: 'delivery-select',
            id: 'delivery-select',
          }}
          value={orderFields.deliveryMethod}
          className={classNames.nativeSelect}
          input={<Input />}
          onChange={setOderField('deliveryMethod')}
        >
          {Object.keys(DeliveryTypeByCode).map((deliveryCode, deliveryIndex) => (
            <option key={deliveryIndex} value={deliveryCode}>
              {getDeliveryOptionByCode(deliveryCode).label}
            </option>
          ))}
        </NativeSelect>
      </TableCell>
      <TableCell>
        <NativeSelect
          variant="filled"
          inputProps={{
            name: 'warehouse-select',
            id: 'warehouse-select',
          }}
          value={orderFields.warehouse}
          className={classNames.nativeSelect}
          input={<Input />}
          onChange={setOderField('warehouse')}
        >
          {Object.keys(warehouses).map((warehouseCode, warehouseIndex) => {
            const warehouseKey = warehouses[warehouseCode]
            return (
              <option key={warehouseIndex} value={warehouseCode}>
                {warehouseKey}
              </option>
            )
          })}
        </NativeSelect>
      </TableCell>
      <TableCell>
        <Input
          multiline
          rows={4}
          rowsMax={6}
          className={classNames.clientCommentInput}
          value={orderFields.clientComment}
          onChange={setOderField('clientComment')}
        />
      </TableCell>
    </TableRow>
  )
}

export const ExchangeModalBodyRow = withStyles(styles)(ExchangeModalBodyRowRaw)
