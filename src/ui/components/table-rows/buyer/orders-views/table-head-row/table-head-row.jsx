import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'

export const TableHeadRow = ({headCells}) => (
  <TableRow>
    {headCells.map((item, index) => (
      <TableCell key={index}>
        <p>{item}</p>
      </TableCell>
    ))}
  </TableRow>
)
