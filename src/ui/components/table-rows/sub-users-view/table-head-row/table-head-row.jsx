import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import React from 'react'

export const TableHeadRow = ({headCells}) => (
  <TableRow>
    {headCells.map((el, index) => (
      <TableCell key={index}>
        <Typography>{el.label}</Typography>
      </TableCell>
    ))}
  </TableRow>
)
