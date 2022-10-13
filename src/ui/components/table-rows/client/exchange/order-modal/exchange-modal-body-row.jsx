import {TableCell, TableRow, Typography} from '@mui/material'

import {withStyles} from 'tss-react/mui'

import {Input} from '@components/input'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign} from '@utils/text'

import {styles} from './exchange-modal-body-row.style'

const ExchangeModalBodyRowRaw = ({product, orderFields, setOderField, classes: classNames}) => (
  <TableRow>
    <TableCell>
      <img
        alt=""
        className={classNames.imgCell}
        src={product.images && product.images[0] && getAmazonImageUrl(product.images[0])}
      />
    </TableCell>
    <TableCell>
      <div>
        <Typography>{product.amazonTitle}</Typography>
        <Typography>{`ID: ${product.id}`}</Typography>
      </div>
    </TableCell>
    <TableCell>{product.category}</TableCell>
    <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(product.currentSupplier.price)}</TableCell>
    <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(product.currentSupplier.delivery)}</TableCell>
    <TableCell>
      <Input
        className={classNames.input}
        inputProps={{maxLength: 15}}
        value={orderFields.amount}
        onChange={setOderField('amount')}
      />
    </TableCell>
    <TableCell className={classNames.alignRight}>{calcProductsPriceWithDelivery(product, orderFields)}</TableCell>

    {/* <TableCell>
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
        <option value={'none'}>{'none'}</option>
        {Object.keys(
          getObjectFilteredByKeyArrayWhiteList(DeliveryTypeByCode, [
            deliveryTypeCodeToKey[DeliveryType.SEA].toString(),
            deliveryTypeCodeToKey[DeliveryType.AIR].toString(),
          ]),
        ).map((deliveryCode, deliveryIndex) => (
          <option key={deliveryIndex} value={deliveryCode}>
            {getDeliveryOptionByCode(deliveryCode).label}
          </option>
        ))}
      </NativeSelect>
    </TableCell> */}
    <TableCell>
      {/* <NativeSelect
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
        <option value={'none'}>{'none'}</option>
        {Object.keys(warehouses).map((warehouseCode, warehouseIndex) => {
          const warehouseKey = warehouses[warehouseCode]
          return (
            <option key={warehouseIndex} value={warehouseCode}>
              {warehouseKey}
            </option>
          )
        })}
      </NativeSelect> */}
    </TableCell>
    <TableCell>
      <Input
        multiline
        inputProps={{maxLength: 500}}
        minRows={4}
        maxRows={6}
        className={classNames.clientCommentInput}
        value={orderFields.clientComment}
        onChange={setOderField('clientComment')}
      />
    </TableCell>
  </TableRow>
)

export const ExchangeModalBodyRow = withStyles(ExchangeModalBodyRowRaw, styles)
