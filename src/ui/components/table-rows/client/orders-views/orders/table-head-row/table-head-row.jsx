import {TableCell, TableRow} from '@mui/material'

import React from 'react'

export const TableHeadRow = ({headCells}) => (
  <TableRow>
    <TableCell padding="none">
      <p>#</p>
    </TableCell>
    <TableCell padding="none">
      <p>&nbsp;</p>
    </TableCell>
    {headCells.map((item, index) => (
      <TableCell key={index}>
        <p>{item}</p>
      </TableCell>
    ))}
  </TableRow>
)
