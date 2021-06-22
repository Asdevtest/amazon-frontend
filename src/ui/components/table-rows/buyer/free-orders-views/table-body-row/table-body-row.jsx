import React from 'react'

import {Box, TableCell, TableRow, Typography} from '@material-ui/core'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {warehouses} from '@constants/warehouses'

import {formatDate} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {useClickPreventionOnDoubleClick} from '@utils/use-click-prevent-on-double-click'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, itemIndex, handlers}) => {
  const classNames = useClassNames()
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    () => {
      if (handlers.onClickOrder) {
        handlers.onClickOrder(item, itemIndex)
      }
    },
    () => {
      if (handlers.onDoubleClickOrder) {
        handlers.onDoubleClickOrder(item, itemIndex)
      }
    },
  )
  return (
    <TableRow onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <TableCell className={classNames.statusCell}>{getOrderStatusOptionByCode(item.status).label}</TableCell>
      <TableCell className={classNames.orderCell}>
        <div className={classNames.order}>
          <img
            alt=""
            src={item.product.images && item.product.images[0] && getAmazonImageUrl(item.product.images[0])}
            className={classNames.orderImg}
          />
          <Box className={classNames.qtyBox}>
            <Typography className={classNames.text}>{item.product.id + ' '}</Typography>
            <Typography className={(classNames.text, classNames.qtyTypo)}>{item.amount}</Typography>
          </Box>
        </div>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        {/* по идее должно быть у заказа */}
        <Typography className={classNames.text}>{formatDate(item.product.createdat)}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        {/* что за поле */}
        <Typography className={classNames.text}>{item.updated}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{warehouses[item.warehouse]}</Typography>
      </TableCell>
      <TableCell className={(classNames.cellPadding, classNames.centerCell)}>
        <Typography className={classNames.text}>{getDeliveryOptionByCode(item.deliveryMethod).label}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.clientComment}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.product.buyerscomment}</Typography>
      </TableCell>
    </TableRow>
  )
}
