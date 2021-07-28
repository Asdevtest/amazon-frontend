import React from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'

import {mapTaskOperationTypeKeyToEnum, TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, mapTaskStatusKeyToEnum, TaskStatus} from '@constants/task-status'
import {texts} from '@constants/texts'

import {ErrorButton} from '@components/buttons/error-button'

import {formatDateTime} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './history-table-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseHistoryBodyRow

export const HistoryTableRow = ({item, onCancelMergeBoxes, onCancelSplitBoxes}) => {
  const classNames = useClassNames()

  const renderProductImage = (box, key) => (
    <div key={key} className={classNames.imagesWrapper}>
      <Typography className={classNames.imgNum}>{`#${key + 1}`}</Typography>
      {box.items.map((product, itemIndex) => (
        <div key={itemIndex} className={classNames.imgWrapper}>
          <img alt="placeholder" className={classNames.img} src={getAmazonImageUrl(product.product.images[0])} />
          <Typography className={classNames.imgNum}>{`x${product.amount}`}</Typography>
        </div>
      ))}
      <Typography className={classNames.imgNum}>{box.amount > 1 && `Super x${box.amount}`}</Typography>
    </div>
  )

  const renderBlockProductsImages = (
    <div className={classNames.blockProductsImagesWrapper}>
      {item.boxesBefore && item.boxesBefore.map((box, index) => renderProductImage(box, index))}
      {'=>'}
      {item.boxes.map((box, index) => renderProductImage(box, index))}
    </div>
  )

  const taskMergeDescription = () => (
    <React.Fragment>
      <Typography className={classNames.descriptionWrapper}>{textConsts.merge}</Typography>
      {renderBlockProductsImages}
    </React.Fragment>
  )
  const taskDivideDescription = () => (
    <React.Fragment>
      <Typography className={classNames.descriptionWrapper}>{textConsts.unMerge}</Typography>
      {renderBlockProductsImages}
    </React.Fragment>
  )
  const taskReceiveDescription = () => (
    <React.Fragment>
      <Typography className={classNames.descriptionWrapper}>{textConsts.receive}</Typography>
      {item.boxesBefore.map((box, index) => renderProductImage(box, index))}
    </React.Fragment>
  )

  const checkIfTaskCouldBeCanceled = status => {
    if (status === mapTaskStatusEmumToKey[TaskStatus.NEW] || status === mapTaskStatusEmumToKey[TaskStatus.AT_PROCESS]) {
      return true
    }
    return false
  }

  const renderHistoryItem = () => {
    switch (mapTaskOperationTypeKeyToEnum[item.operationType]) {
      case TaskOperationType.MERGE:
        return (
          <React.Fragment>
            <TableCell>{textConsts.tasks}</TableCell>
            <TableCell>{taskMergeDescription()}</TableCell>
            <TableCell>
              {checkIfTaskCouldBeCanceled(item.status) && (
                <ErrorButton onClick={() => onCancelMergeBoxes(item.boxes[0]._id, item._id)}>
                  {textConsts.cancelBtn}
                </ErrorButton>
              )}
            </TableCell>
          </React.Fragment>
        )
      case TaskOperationType.SPLIT:
        return (
          <React.Fragment>
            <TableCell>{textConsts.tasks}</TableCell>
            <TableCell>{taskDivideDescription()}</TableCell>
            <TableCell>
              {checkIfTaskCouldBeCanceled(item.status) && (
                <ErrorButton onClick={() => onCancelSplitBoxes(item.boxes[0]._id, item._id)}>
                  {textConsts.cancelBtn}
                </ErrorButton>
              )}
            </TableCell>
          </React.Fragment>
        )
      case TaskOperationType.RECEIVE:
        return (
          <React.Fragment>
            <TableCell>{textConsts.tasks}</TableCell>
            <TableCell>{taskReceiveDescription()}</TableCell>
            <TableCell />
          </React.Fragment>
        )
    }
  }

  return (
    <TableRow>
      <TableCell className={classNames.centerTextCell}>{formatDateTime(item.createDate)}</TableCell>
      {renderHistoryItem()}
      <TableCell>{mapTaskStatusKeyToEnum[item.status || 0]}</TableCell>
    </TableRow>
  )
}
