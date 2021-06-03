import React from 'react'

import {Typography, TableRow, TableCell} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {styles} from './modal-table-head-row.style'

const ModalTableHeadRowRaw = ({headCells, ...restProps}) => {
  const classNames = restProps.classes
  return (
    <TableRow>
      {headCells.map((el, index) => (
        <TableCell key={index} className={classNames.tableHeadCell}>
          <Typography className={classNames.tableHeadTypography}>{el.label}</Typography>
        </TableCell>
      ))}
      <TableCell />
      <TableCell />
    </TableRow>
  )
}

export const ModalTableHeadRow = withStyles(styles)(ModalTableHeadRowRaw)
