import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

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
