import React from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'

import {mapTaskOperationTypeKeyToEnum, TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, mapTaskStatusKeyToEnum, TaskStatus} from '@constants/task-status'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

import {formatNormDateTime} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './history-table-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseHistoryBodyRow

export const HistoryTableRow = ({item, onClickTaskInfo, onClickCancelBtn}) => {
  const classNames = useClassNames()

  const renderProductImage = (box, key) => (
    <div key={key} className={classNames.imagesWrapper}>
      <Typography className={classNames.imgNum}>{`#${key + 1}`}</Typography>
      {box.items?.map((product, itemIndex) => (
        <div key={itemIndex} className={classNames.imgWrapper}>
          <img
            alt="placeholder"
            className={classNames.img}
            src={product.product?.images[0] && getAmazonImageUrl(product.product.images[0])}
          />
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

  const taskEditDescription = () => (
    <React.Fragment>
      <Typography className={classNames.descriptionWrapper}>{textConsts.edit}</Typography>
      {item.boxesBefore.map((box, index) => renderProductImage(box, index))}
    </React.Fragment>
  )

  const checkIfTaskCouldBeCanceled = status => {
    if (status === mapTaskStatusEmumToKey[TaskStatus.NEW]) {
      return true
    }
    return false
  }

  const renderTaskInfoBtn = () => (
    <Button className={classNames.infoBtn} onClick={() => onClickTaskInfo(item)}>
      {'Смотреть подробнее'}
    </Button>
  )

  const renderHistoryItem = () => {
    switch (mapTaskOperationTypeKeyToEnum[item.operationType]) {
      case TaskOperationType.MERGE:
        return (
          <React.Fragment>
            <TableCell>{taskMergeDescription()}</TableCell>
            <TableCell>
              {renderTaskInfoBtn()}
              {checkIfTaskCouldBeCanceled(item.status) && (
                <ErrorButton onClick={() => onClickCancelBtn(item.boxes[0]._id, item._id, 'merge')}>
                  {textConsts.cancelBtn}
                </ErrorButton>
              )}
            </TableCell>
          </React.Fragment>
        )
      case TaskOperationType.SPLIT:
        return (
          <React.Fragment>
            <TableCell>{taskDivideDescription()}</TableCell>
            <TableCell>
              {renderTaskInfoBtn()}
              {checkIfTaskCouldBeCanceled(item.status) && (
                <ErrorButton onClick={() => onClickCancelBtn(item.boxes[0]._id, item._id, 'split')}>
                  {textConsts.cancelBtn}
                </ErrorButton>
              )}
            </TableCell>
          </React.Fragment>
        )
      case TaskOperationType.RECEIVE:
        return (
          <React.Fragment>
            <TableCell>{taskReceiveDescription()}</TableCell>
            <TableCell />
          </React.Fragment>
        )
      case TaskOperationType.EDIT:
        return (
          <React.Fragment>
            <TableCell>{taskEditDescription()}</TableCell>
            <TableCell>
              {renderTaskInfoBtn()}
              {checkIfTaskCouldBeCanceled(item.status) && (
                <ErrorButton onClick={() => onClickCancelBtn(item.boxes[0]._id, item._id, 'edit')}>
                  {textConsts.cancelBtn}
                </ErrorButton>
              )}
            </TableCell>
          </React.Fragment>
        )
    }
  }

  return (
    <TableRow>
      <TableCell className={classNames.centerTextCell}>{formatNormDateTime(item.createdAt)}</TableCell>
      <TableCell className={classNames.centerTextCell}>{formatNormDateTime(item.updateDate)}</TableCell>
      <TableCell>{textConsts.tasks}</TableCell>
      {renderHistoryItem()}
      <TableCell>{mapTaskStatusKeyToEnum[item.status || 0]}</TableCell>
    </TableRow>
  )
}
