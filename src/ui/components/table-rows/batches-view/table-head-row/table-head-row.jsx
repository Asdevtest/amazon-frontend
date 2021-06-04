import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'

export const TableHeadRow = ({headCells}) => (
  <TableRow>
    {headCells.map((el, index) => (
      <TableCell key={index}>{el.title}</TableCell>
    ))}
  </TableRow>
)
