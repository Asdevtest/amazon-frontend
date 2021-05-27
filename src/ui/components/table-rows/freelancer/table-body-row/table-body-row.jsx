import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'

export const TableBodyRow = ({item}) => (
  <TableRow>
    <TableCell>{item.asin}</TableCell>
    <TableCell>{item.status}</TableCell>
    <TableCell>{item.created}</TableCell>
    <TableCell>{item.manager}</TableCell>
    <TableCell>{item.amazonPrice.toFixed(2)}</TableCell>
    <TableCell>{item.price.toFixed(2)}</TableCell>
    <TableCell>{item.bsr}</TableCell>
  </TableRow>
)
