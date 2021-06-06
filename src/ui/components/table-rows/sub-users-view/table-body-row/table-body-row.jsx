import React from 'react'

import {TableCell, TableRow, Typography, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {texts} from '@constants/texts'

import {ErrorButton} from '@components/buttons/error-button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './table-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').buyerSubUsersBodyRow

const TableBodyRowRaw = ({item, handlers, ...restProps}) => {
  const classNames = restProps.classes
  return (
    <TableRow>
      <TableCell>
        <Typography>{item.date}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.email}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{textConsts.bussinesUnit}</Typography>
      </TableCell>
      <TableCell>
        <Button className={classNames.editBtn} variant="contained" onClick={() => handlers.onEdit()}>
          {textConsts.editBtn}
        </Button>
        <ErrorButton variant="contained">{textConsts.deleteBtn}</ErrorButton>
      </TableCell>
    </TableRow>
  )
}

export const TableBodyRow = withStyles(styles)(TableBodyRowRaw)
