import {Box, TableCell, TableRow, Typography} from '@mui/material'

import React from 'react'

import {getOrderStatusOptionByCode} from '@constants/order-status'

import {formatDate} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {useClickPreventionOnDoubleClick} from '@utils/use-click-prevent-on-double-click'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, itemIndex, handlers}) => {
  const {classes: classNames} = useClassNames()
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    () => {
      if (handlers.onClickOrder) {
        handlers.onClickOrder(item, itemIndex)
      }
    },
    () => {
      if (handlers.onDoubleOrder) {
        handlers.onDoubleClickOrder(item, itemIndex)
      }
    },
  )

  return (
    <TableRow hover className={classNames.row} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <TableCell className={classNames.statusCell}>{getOrderStatusOptionByCode(item.status).label}</TableCell>
      <TableCell className={classNames.orderCell}>
        <div className={classNames.order}>
          <img
            alt=""
            src={item.product.images && item.product.images[0] && getAmazonImageUrl(item.product.images[0])}
            className={classNames.orderImg}
          />
          <Box className={classNames.qtyBox}>
            <Typography className={classNames.text}>{item.product.id}</Typography>
            <Typography className={(classNames.text, classNames.qtyTypo)}>{item.amount}</Typography>
          </Box>
        </div>
      </TableCell>
      <TableCell className={classNames.chipCell}>
        <Typography className={classNames.barCode}>{item.product.barCode}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{formatDate(item.createdAt)}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.updated}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        {/* <Typography className={classNames.text}>{warehouses[item.warehouse]}</Typography> */}
      </TableCell>
      <TableCell className={(classNames.cellPadding, classNames.centerCell)}>
        {/* <Typography className={classNames.text}>{getDeliveryOptionByCode(item.deliveryMethod).label}</Typography> */}
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.clientComment}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.buyerComment}</Typography>
      </TableCell>
    </TableRow>
  )
}
