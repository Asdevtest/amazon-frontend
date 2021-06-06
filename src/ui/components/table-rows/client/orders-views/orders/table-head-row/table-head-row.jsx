import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'

export const TableHeadRow = ({headCells}) => (
  <TableRow>
    <TableCell padding="none">
      <p align="center">#</p>
    </TableCell>
    <TableCell padding="none">
      <p align="center">&nbsp;</p>
    </TableCell>
    {headCells.map((item, index) => (
      <TableCell key={index}>
        <p>{item}</p>
      </TableCell>
    ))}
  </TableRow>
)
