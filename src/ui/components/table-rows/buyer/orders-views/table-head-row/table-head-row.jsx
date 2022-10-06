import {TableCell, TableRow} from '@mui/material'

import React from 'react'

export const TableHeadRow = ({headCells}) => (
  <TableRow>
    {headCells.map((item, index) => (
      <TableCell key={index}>
        <p>{item}</p>
      </TableCell>
    ))}
  </TableRow>
)
