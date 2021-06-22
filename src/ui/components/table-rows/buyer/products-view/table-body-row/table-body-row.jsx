import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import {observer} from 'mobx-react'

import {useClickPreventionOnDoubleClick} from '@utils/use-click-prevent-on-double-click'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = observer(({item, itemIndex, handlers}) => {
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    () => {
      if (handlers.onClickTableRow) {
        handlers.onClickTableRow(item, itemIndex)
      }
    },
    () => {
      if (handlers.onDoubleClickTableRow) {
        handlers.onDoubleClickTableRow(item, itemIndex)
      }
    },
  )
  const classNames = useClassNames()
  return (
    <TableRow key={item.asin} hover role="checkbox" onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <TableCell className={classNames.indexCell}>
        <Typography>{itemIndex + 1}</Typography>
      </TableCell>
    </TableRow>
  )
})
