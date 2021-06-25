import React from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './history-table-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseHistoryBodyRow

export const HistoryTableRow = ({item, onApproveMergeAndSplitBoxes, onCancelMergeBoxes, onCancelSplitBoxes}) => {
  const classNames = useClassNames()

  const taskMergeDescription = () => (
    <React.Fragment>
      <Typography>
        {textConsts.order}
        <span className={classNames.defaultOrderSpan}>{item.orders[0]}</span>
        {textConsts.andOrder}
        <span className={classNames.defaultOrderSpan}>{item.orders[1]}</span>
        {textConsts.merge}
      </Typography>
      {!item.status && <span className={classNames.description}>{textConsts.cancelAction}</span>}
    </React.Fragment>
  )
  const taskDivideDescription = () => (
    <React.Fragment>
      <Typography>
        {textConsts.order}
        <span className={classNames.defaultOrderSpan}>{item.orders[0]}</span>
        {textConsts.andOrder}
        <span className={classNames.defaultOrderSpan}>{item.orders[1]}</span>
        {textConsts.unMerge}
      </Typography>
      {!item.status && <span className={classNames.description}>{textConsts.cancelAction}</span>}
    </React.Fragment>
  )
  const changeStatusPayedDescription = () => (
    <Typography>
      {textConsts.order}
      <span className={classNames.defaultOrderSpan}>{item.orders[0]}</span>
      {textConsts.changeStatus}
      <span className={classNames.changeOrderSpan}>{textConsts.paid}</span>
    </Typography>
  )

  const renderApproveBtn = <Button onClick={() => onApproveMergeAndSplitBoxes(item.id)}>{textConsts.acceptBtn}</Button>

  const renderHistoryItem = () => {
    switch (item.type) {
      case 'task/merge':
        return (
          <React.Fragment>
            <TableCell>{textConsts.tasks}</TableCell>
            <TableCell>{taskMergeDescription()}</TableCell>
            <TableCell>
              {item.status ? (
                <ErrorButton onClick={() => onCancelMergeBoxes(item.id)}>{textConsts.cancelBtn}</ErrorButton>
              ) : (
                renderApproveBtn
              )}
            </TableCell>
          </React.Fragment>
        )

      case 'task/divide':
        return (
          <React.Fragment>
            <TableCell>{textConsts.tasks}</TableCell>
            <TableCell>{taskDivideDescription()}</TableCell>
            <TableCell>
              {item.status ? (
                <ErrorButton onClick={() => onCancelSplitBoxes(item.id)}>{textConsts.cancelBtn}</ErrorButton>
              ) : (
                renderApproveBtn
              )}
            </TableCell>
          </React.Fragment>
        )
      case 'change/status/Оплачен':
        return (
          <React.Fragment>
            <TableCell>{textConsts.orderChangeStatus}</TableCell>
            <TableCell>{changeStatusPayedDescription()}</TableCell>
          </React.Fragment>
        )
    }
  }

  return (
    <TableRow>
      <TableCell className={classNames.centerTextCell}>{item.date}</TableCell>
      {renderHistoryItem()}
    </TableRow>
  )
}
