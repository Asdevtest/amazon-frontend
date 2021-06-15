import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseTasksBodyRow

export const TableBodyRow = ({item, itemIndex, handlers, ...restProps}) => {
  const status = item.status

  const onClickResolveBtn = index => {
    handlers.onSelectTaskIndex(index)
    handlers.onTriggerEditTaskModal()
  }

  const onClickBrowseBtn = index => {
    handlers.onSelectTaskIndex(index)
    handlers.onTriggerBrowseTaskModal()
  }

  const renderButtons = () => {
    switch (restProps.type) {
      case 'vacant':
        return (
          status !== null &&
          (status ? (
            <ErrorButton>{textConsts.cancelBtn}</ErrorButton>
          ) : (
            <Button onClick={() => onClickResolveBtn(itemIndex)}>{textConsts.resolveBtn}</Button>
          ))
        )

      case 'completed':
        return <Button onClick={() => onClickBrowseBtn(itemIndex)}>{textConsts.viewBtn}</Button>
    }
  }

  return (
    <TableRow>
      <TableCell>{item.taskId}</TableCell>
      <TableCell>{item.date}</TableCell>
      <TableCell>{item.type}</TableCell>
      <TableCell>{renderButtons()}</TableCell>
      <TableCell>{status ? textConsts.resolved : textConsts.notResolved}</TableCell>
    </TableRow>
  )
}
