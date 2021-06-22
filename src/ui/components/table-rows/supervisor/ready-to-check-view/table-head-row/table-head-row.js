import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

export const TableHeadRow = () => (
  <TableRow>
    <TableCell padding="none">
      <Typography align="center">#</Typography>
    </TableCell>
  </TableRow>
)
