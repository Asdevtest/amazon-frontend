import React from 'react'

import {Table, TableCell, TableContainer, TableRow, TableHead, TableBody} from '@material-ui/core'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign} from '@utils/text'

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
            <TableCell>{order.product.id}</TableCell>
            <TableCell>{order.product.currentSupplier.price}</TableCell>
            <TableCell className={classNames.tableCell}>{order.product.currentSupplier.delivery}</TableCell>
            <TableCell className={classNames.tableCell}>{orderFields.amount}</TableCell>
            <TableCell>{toFixedWithDollarSign(calcProductsPriceWithDelivery(order.product, orderFields))}</TableCell>
            <TableCell>{order.barCode ? order.barCode : 'N/A'}</TableCell>
            <TableCell className={classNames.suplierLinkCell}>{order.product.currentSupplier.link}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
