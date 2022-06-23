import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, itemIndex, handlers}) => {
  const classNames = useClassNames()
  return (
    <TableRow key={item.asin} hover role="checkbox">
      <TableCell className={classNames.indexCell}>
        <Typography>{itemIndex + 1}</Typography>
      </TableCell>
      <TableCell className={classNames.indexCell}>
        <Button
          tooltipInfoContent={t(TranslationKey['Assign a product card to a supervisor'])}
          className={classNames.infoBtn}
          onClick={() => handlers.onClickTableRowBtn(item)}
        >
          {t(TranslationKey['Get to work'])}
        </Button>
      </TableCell>
    </TableRow>
  )
}
