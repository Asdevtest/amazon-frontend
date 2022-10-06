import {TableCell, TableRow, Typography} from '@mui/material'

import React from 'react'

import {withStyles} from 'tss-react/mui'

import {OrderStatusByCode} from '@constants/order-status'

import {Button} from '@components/buttons/button'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {formatDate} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'

import {styles} from './table-body-row.style'

const TableBodyRowRaw = ({item, itemIndex, handlers, ...restProps}) => {
  const classNames = restProps.classes
  return (
    <TableRow hover onClick={() => handlers.onClickTableRow(item)}>
      <TableCell className={classNames.count}>
        <Typography>{itemIndex + 1}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{formatDate(item.createdAt)}</Typography>
      </TableCell>

      <TableCell>
        <div className={classNames.order}>
          <img
            alt=""
            src={item.product.images && item.product.images[0] && getAmazonImageUrl(item.product.images[0])}
            className={classNames.orderImg}
          />
          <div>
            <Typography className={classNames.orderTitle}>{item.product.amazonTitle}</Typography>
            <Typography className={classNames.orderText}>
              <span className={classNames.orderTextSpan}>{'id'}</span>
              {item.product.id}
            </Typography>
          </div>
        </div>
      </TableCell>
      <TableCell className={classNames.priceTableCell}>{OrderStatusByCode[item.status]}</TableCell>
      <TableCell>
        <Typography className={classNames.barCode}>{item.product.barCode}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{item.amount}</Typography>
      </TableCell>

      <TableCell>{/* <Typography>{warehouses[item.warehouse]}</Typography> */}</TableCell>

      <TableCell>
        <Button size="small">{'Смотреть подробнее'}</Button>
      </TableCell>

      <TableCell>
        <Typography>{toFixedWithDollarSign(calcProductsPriceWithDelivery(item.product, item))}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{toFixedWithKg(item.product.weight, 2)}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{toFixedWithKg(item.product.weight * item.amount, 2)}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{item.trackId}</Typography>
      </TableCell>
    </TableRow>
  )
}

export const TableBodyRow = withStyles(TableBodyRowRaw, styles)
