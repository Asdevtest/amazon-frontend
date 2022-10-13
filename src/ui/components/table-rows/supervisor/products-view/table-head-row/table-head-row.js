import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import React from 'react'

export const TableHeadRow = ({headCells}) => (
  <TableRow>
    <TableCell padding="none">
      <Typography align="center">#</Typography>
    </TableCell>
    <TableCell padding="none">
      <Typography align="center">&nbsp;</Typography>
    </TableCell>
    {headCells.map(headCell => (
      <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'default'}>
        {headCell.label}
      </TableCell>
    ))}
  </TableRow>
)
