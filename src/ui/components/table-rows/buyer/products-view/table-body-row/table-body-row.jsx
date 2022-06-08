import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = observer(({item, itemIndex, handlers}) => {
  const classNames = useClassNames()
  return (
    <TableRow key={item.asin} hover>
      <TableCell className={classNames.indexCell}>
        <Typography>{itemIndex + 1}</Typography>
      </TableCell>
      <TableCell className={classNames.indexCell}>
        <Button className={classNames.infoBtn} onClick={() => handlers.onClickTableRowBtn(item)}>
          {t(TranslationKey['Get to work'])}
        </Button>
      </TableCell>
    </TableRow>
  )
})
