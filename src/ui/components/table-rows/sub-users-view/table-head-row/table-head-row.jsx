import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

export const TableHeadRow = ({headCells}) => (
  <TableRow>
    {headCells.map((el, index) => (
      <TableCell key={index}>
        <Typography>{el.label}</Typography>
      </TableCell>
    ))}
  </TableRow>
)
