import React from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

import {formatDateTime} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './history-table-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseHistoryBodyRow

export const HistoryTableRow = ({item, onApproveMergeAndSplitBoxes, onCancelMergeBoxes, onCancelSplitBoxes}) => {
  const classNames = useClassNames()

  const taskMergeDescription = () => (
    <React.Fragment>
      <Typography>
        {textConsts.merge}
        {item.boxes[0]._id}
      </Typography>
    </React.Fragment>
  )
  const taskDivideDescription = () => (
    <React.Fragment>
      <Typography>
        {textConsts.unMerge}
        {item.boxes.map((box, index) => (
          <span key={index} className={classNames.defaultOrderSpan}>
            {' '}
            {box._id}
          </span>
        ))}
      </Typography>
    </React.Fragment>
  )
  const changeStatusPayedDescription = () => (
    <Typography>
      {textConsts.order}
      <span className={classNames.defaultOrderSpan}>{item.boxes[0]._id}</span>
      {textConsts.changeStatus}
      <span className={classNames.changeOrderSpan}>{textConsts.paid}</span>
    </Typography>
  )

  const renderApproveButton = (
    <Button onClick={() => onApproveMergeAndSplitBoxes(item.boxes[0]._id)}>{textConsts.acceptBtn}</Button>
  )

  const renderHistoryItem = () => {
    switch (item.operationType) {
      case 'merge':
        return (
          <React.Fragment>
            <TableCell>{textConsts.tasks}</TableCell>
            <TableCell>{taskMergeDescription()}</TableCell>
            <TableCell>
              <div className={classNames.buttonsWrapper}>
                {renderApproveButton}

                <ErrorButton onClick={() => onCancelMergeBoxes(item.boxes[0]._id)}>{textConsts.cancelBtn}</ErrorButton>
              </div>
            </TableCell>
          </React.Fragment>
        )

      case 'split':
        return (
          <React.Fragment>
            <TableCell>{textConsts.tasks}</TableCell>
            <TableCell>{taskDivideDescription()}</TableCell>
            <TableCell>
              <div className={classNames.buttonsWrapper}>
                {renderApproveButton}

                <ErrorButton onClick={() => onCancelSplitBoxes(item.boxes[0]._id)}>{textConsts.cancelBtn}</ErrorButton>
              </div>
            </TableCell>
          </React.Fragment>
        )
      case 'paid':
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
      <TableCell className={classNames.centerTextCell}>{formatDateTime(item.createDate)}</TableCell>
      {renderHistoryItem()}
    </TableRow>
  )
}
