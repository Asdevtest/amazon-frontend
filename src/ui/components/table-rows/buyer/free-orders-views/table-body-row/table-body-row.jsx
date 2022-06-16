import React from 'react'

import {Box, TableCell, TableRow, Typography} from '@material-ui/core'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {TranslationKey} from '@constants/translations/translation-key'
import {warehouses} from '@constants/warehouses'

import {Button} from '@components/buttons/button'

import {formatDate} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, handlers}) => {
  const classNames = useClassNames()
  return (
    <TableRow hover>
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
        <Typography className={classNames.text}>{formatDate(item.createdAt)}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.updated}</Typography>
      </TableCell>

      <TableCell className={classNames.indexCell}>
        <Button className={classNames.infoBtn} onClick={() => handlers.onClickTableRowBtn(item)}>
          {t(TranslationKey['Get to work'])}
        </Button>
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
        <Typography className={classNames.text}>{item.buyerComment}</Typography>
      </TableCell>
    </TableRow>
  )
}
