import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'

import {isNotUndefined} from '@utils/checks'
import {useClickPreventionOnDoubleClick} from '@utils/use-click-prevent-on-double-click'

export const TableBodyRow = ({item, itemIndex, handlers, selectedBatchIndex}) => {
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
  return (
    <TableRow
      selected={isNotUndefined(selectedBatchIndex) && selectedBatchIndex === itemIndex}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {/* Метод Евгения, пока будем использовать фиксированные клетки 
      {Object.entries(item).map(([ key, value ], index) => (
      <TableCell
        key={`${index}${key}-${value}`}
        // className={clsx({ [classNames.alignRight]: isNumber(value) })}
      >
        {value}
      </TableCell>
    ))} */}

      <TableCell>{item[0][0].clientId}</TableCell>
      <TableCell>{item[0][0].status}</TableCell>
      <TableCell>{item[0][0].created}</TableCell>
      <TableCell>{item[0][0].updated}</TableCell>
      <TableCell>{item[0][0].destination}</TableCell>
      <TableCell>{item[0][0].deliveryMethod}</TableCell>
      <TableCell>{item[0][0].trackId}</TableCell>
    </TableRow>
  )
}
