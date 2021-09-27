import React from 'react'

import {Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Typography, Link} from '@material-ui/core'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {checkAndMakeAbsoluteUrl, toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './product-table.style'

export const ProductTable = ({modalHeadCells, order, orderFields}) => {
  const classNames = useClassNames()
  return (
    <TableContainer>
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
              <Typography>{order.product.id}</Typography>
            </TableCell>
            <TableCell>{order.product.currentSupplier ? order.product.currentSupplier.price : 'N/A'}</TableCell>
            <TableCell className={classNames.tableCell}>
              {order.product.currentSupplier ? order.product.currentSupplier.delivery : 'N/A'}
            </TableCell>
            <TableCell className={classNames.tableCell}>{orderFields.amount}</TableCell>
            <TableCell>{toFixedWithDollarSign(calcProductsPriceWithDelivery(order.product, orderFields))}</TableCell>
            <TableCell>
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.product.currentSupplier.link)}>
                <Typography className={classNames.link}>{order.product.currentSupplier.link || 'N/A'}</Typography>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
