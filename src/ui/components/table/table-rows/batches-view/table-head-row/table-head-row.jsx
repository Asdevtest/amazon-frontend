import { TableCell, TableRow } from '@mui/material'

import React from 'react'

export const TableHeadRow = ({ headCells }) => (
  <TableRow>
    {headCells.map((el, index) => (
      <TableCell key={index}>{el.title}</TableCell>
    ))}
  </TableRow>
)
