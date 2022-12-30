import {TableCell, TableRow, Typography} from '@mui/material'

import React from 'react'

import {withStyles} from 'tss-react/mui'

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
        <Typography>{t(TranslationKey['Not available'])}</Typography>
      </TableCell>
      <TableCell>
        <Button className={classNames.editBtn} variant="contained" onClick={() => handlers.onClickEditUser(item)}>
          {t(TranslationKey['Edit user'])}
        </Button>
        <Button variant="contained" onClick={handlers.onClickBalance}>
          {t(TranslationKey.Balance)}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export const TableBodyRow = withStyles(TableBodyRowRaw, styles)
