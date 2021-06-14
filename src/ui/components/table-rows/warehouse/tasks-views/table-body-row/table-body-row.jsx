import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

export const TableBodyRow = ({item, itemIndex, handlers}) => {
  const status = item.status

  const onClickResolveBtn = index => {
    handlers.onSelectTaskIndex(index)
    handlers.onTriggerEditTaskModal()
  }

  return (
    <TableRow>
      <TableCell>{item.taskId}</TableCell>
      <TableCell>{item.date}</TableCell>
      <TableCell>{item.type}</TableCell>
      <TableCell>
        {status !== null &&
          (status ? (
            <ErrorButton /* onClick={() => setStatus(false)}*/>{'Отменить'}</ErrorButton>
          ) : (
            <Button onClick={() => onClickResolveBtn(itemIndex)}>{'Решить'}</Button>
          ))}
      </TableCell>
      <TableCell>{status ? 'Решено' : 'Не решено'}</TableCell>
    </TableRow>
  )
}
