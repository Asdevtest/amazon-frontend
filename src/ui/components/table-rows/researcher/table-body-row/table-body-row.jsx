import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'

import {ProductStatus} from '@constants/product-status'

import {formatDate} from '@utils/date-time'

export const TableBodyRow = ({item, handlers}) => (
  <TableRow onClick={() => handlers.onClickTableRow(item)}>
    <TableCell>{item.id}</TableCell>
    <TableCell>{ProductStatus[item.status]}</TableCell>
    <TableCell>{formatDate(item.createdat)}</TableCell>
    <TableCell>{item.manager}</TableCell>
    <TableCell>{item.amazonPrice ? item.amazonPrice.toFixed(2) : ''}</TableCell>
    <TableCell>{item.price ? item.price.toFixed(2) : ''}</TableCell>
    <TableCell>{item.bsr}</TableCell>
  </TableRow>
)
