import React from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {styles} from './table-body-row.style'

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
        <Typography>{'N/A'}</Typography>
      </TableCell>
      <TableCell>
        <Button className={classNames.editBtn} variant="contained" onClick={() => handlers.onEdit(item)}>
          {t(TranslationKey.Edit)}
        </Button>
        <Button danger variant="contained">
          {t(TranslationKey.Delete)}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export const TableBodyRow = withStyles(styles)(TableBodyRowRaw)
