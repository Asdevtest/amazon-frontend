import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'

import {ProductStatusByCode} from '@constants/product-status'

import {formatDate} from '@utils/date-time'
import {toFixed} from '@utils/text'

export const TableBodyRow = ({item, handlers}) => (
  <TableRow onClick={() => handlers.onClickTableRow(item)}>
    <TableCell>{item.id}</TableCell>
    <TableCell>{ProductStatusByCode[item.status]}</TableCell>
    <TableCell>{formatDate(item.createdat)}</TableCell>
    <TableCell>{toFixed(item.amazon)}</TableCell>
    <TableCell>{item.bsr}</TableCell>
  </TableRow>
)
