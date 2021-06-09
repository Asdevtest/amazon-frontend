import React, {useState} from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './history-table-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseHistoryBodyRow

export const HistoryTableRow = props => {
  const classNames = useClassNames()

  const [status, setStatus] = useState(props.item.status)

  const TaskMergeDescription = () => (
    <React.Fragment>
      <Typography>
        {textConsts.order}
        <span className={classNames.defaultOrderSpan}>{props.item.orders[0]}</span>
        {textConsts.andOrder}
        <span className={classNames.defaultOrderSpan}>{props.item.orders[1]}</span>
        {textConsts.merge}
      </Typography>
      {!status && <span className={classNames.description}>{textConsts.cancelAction}</span>}
    </React.Fragment>
  )
  const TaskDivideDescription = () => (
    <React.Fragment>
      <Typography>
        {textConsts.order}
        <span className={classNames.defaultOrderSpan}>{props.item.orders[0]}</span>
        {textConsts.andOrder}
        <span className={classNames.defaultOrderSpan}>{props.item.orders[1]}</span>
        {textConsts.unMerge}
      </Typography>
      {!status && <span className={classNames.description}>{textConsts.cancelAction}</span>}
    </React.Fragment>
  )
  const ChangeStatusPayedDescription = () => (
    <Typography>
      {textConsts.order}
      <span className={classNames.defaultOrderSpan}>{props.item.orders[0]}</span>
      {textConsts.changeStatus}
      <span className={classNames.changeOrderSpan}>{textConsts.paid}</span>
    </Typography>
  )

  const renderHistoryItem = () => {
    switch (props.item.type) {
      case 'task/merge':
        return {
          theme: textConsts.tasks,
          description: <TaskMergeDescription status={status} item={props.item} />,
        }
      case 'task/divide':
        return {
          theme: textConsts.tasks,
          description: <TaskDivideDescription status={status} item={props.item} />,
        }
      case 'change/status/Оплачен':
        return {
          theme: textConsts.orderChangeStatus,
          description: <ChangeStatusPayedDescription status={status} item={props.item} />,
        }
    }
  }

  const item = renderHistoryItem()

  return (
    <TableRow>
      <TableCell className={classNames.centerTextCell}>{props.item.date}</TableCell>
      <TableCell>{item.theme}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>
        {status !== null &&
          (status ? (
            <ErrorButton onClick={() => setStatus(false)}>{textConsts.cancelBtn}</ErrorButton>
          ) : (
            <Button onClick={() => setStatus(null)}>{textConsts.acceptBtn}</Button>
          ))}
      </TableCell>
    </TableRow>
  )
}
