import {Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Typography, Link} from '@mui/material'

import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {checkAndMakeAbsoluteUrl, toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './product-table.style'

export const ProductTable = ({modalHeadCells, order, orderFields}) => {
  const {classes: classNames} = useClassNames()
  return (
    <TableContainer className={classNames.tableContainer}>
      <Table className={classNames.table}>
        <TableHead>
          <TableRow>
            {modalHeadCells.map((el, i) => (
              <TableCell key={i} className={classNames.tableCell}>
                {el}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <img
                className={classNames.imgBox}
                src={order.product.images && order.product.images[0] && getAmazonImageUrl(order.product.images[0])}
                alt={order.csCode}
              />
            </TableCell>
            <TableCell>
              <Typography className={classNames.amazonTitle}>{order.product.amazonTitle}</Typography>
              <Typography>{`ASIN: ${order.product.asin}`}</Typography>
            </TableCell>
            <TableCell>
              {order.orderSupplier ? order.orderSupplier.price : `${t(TranslationKey['Not available'])}`}
            </TableCell>
            <TableCell className={classNames.tableCell}>
              {toFixed(order.orderSupplier.batchDeliveryCostInDollar / order.orderSupplier.amount, 2)}
            </TableCell>
            <TableCell className={classNames.tableCell}>{orderFields.amount}</TableCell>
            <TableCell>{toFixedWithDollarSign(calcProductsPriceWithDelivery(order.product, orderFields), 2)}</TableCell>
            <TableCell>
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.orderSupplier?.link)}>
                <Typography className={classNames.link}>
                  {order.orderSupplier?.link || `${t(TranslationKey['Not available'])}`}
                </Typography>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
