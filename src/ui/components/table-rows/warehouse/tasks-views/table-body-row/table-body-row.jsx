import React from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'

import {
  mapTaskOperationTypeKeyToEnum,
  mapTaskOperationTypeToLabel,
  TaskOperationType,
} from '@constants/task-operation-type'
import {mapTaskStatusKeyToEnum, TaskStatus} from '@constants/task-status'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

import {formatNormDateTime} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './table-body-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseTasksBodyRow

export const WarehouseTasksBodyRowViewMode = {
  VACANT: 'VACANT',
  MY: 'MY',
}

export const TableBodyRow = ({item, handlers, hideActions, viewMode}) => {
  const classNames = useClassNames()

  const onClickResolveBtn = () => {
    handlers.onSelectTask(item)
    handlers.onTriggerEditTaskModal()
  }

  const renderProductImage = (box, key) => {
    if (viewMode === WarehouseTasksBodyRowViewMode.VACANT) {
      return
    }
    return (
      <div key={key} className={classNames.imagesWrapper}>
        <Typography className={classNames.imgNum}>{`#${key + 1}`}</Typography>
        {box.items.map((product, productIndex) => (
          <div key={productIndex} className={classNames.imgWrapper}>
            <img
              alt="placeholder"
              className={classNames.img}
              src={product.product?.images[0] && getAmazonImageUrl(product.product.images[0])}
            />
            <Typography className={classNames.imgNum}>{`x ${product.amount}`}</Typography>
          </div>
        ))}
        <Typography className={classNames.imgNum}>{box.amount > 1 && `Super x${box.amount}`}</Typography>
      </div>
    )
  }

  const renderBlockProductsImages = (
    <div className={classNames.blockProductsImagesWrapper}>
      {viewMode !== WarehouseTasksBodyRowViewMode.VACANT && (
        <>
          {item.boxesBefore && item.boxesBefore.map((box, index) => renderProductImage(box, index))}
          <Typography>{'=>'}</Typography>
        </>
      )}

      {item.boxes.map((box, index) => renderProductImage(box, index))}
    </div>
  )

  const taskMergeDescription = () => (
    <>
      <Typography>{textConsts.merge}</Typography>
      {renderBlockProductsImages}
    </>
  )
  const taskDivideDescription = () => (
    <>
      <Typography className={classNames.descriptionWrapper}>{textConsts.unMerge}</Typography>
      {renderBlockProductsImages}
    </>
  )
  const taskReceiveDescription = () => (
    <>
      <Typography className={classNames.descriptionWrapper}>{textConsts.receive}</Typography>
      {item.boxesBefore && item.boxesBefore.map((box, index) => renderProductImage(box, index))}
    </>
  )

  const taskEditDescription = () => (
    <>
      <Typography className={classNames.descriptionWrapper}>{textConsts.edit}</Typography>
      {item.boxesBefore && item.boxesBefore.map((box, index) => renderProductImage(box, index))}
    </>
  )

  const renderDescription = () => {
    switch (mapTaskOperationTypeKeyToEnum[item.operationType]) {
      case TaskOperationType.MERGE:
        return <TableCell>{taskMergeDescription()}</TableCell>

      case TaskOperationType.SPLIT:
        return <TableCell>{taskDivideDescription()}</TableCell>
      case TaskOperationType.RECEIVE:
        return <TableCell>{taskReceiveDescription()}</TableCell>
      case TaskOperationType.EDIT:
        return <TableCell>{taskEditDescription()}</TableCell>
    }
  }

  const renderActions = () => {
    if (
      hideActions ||
      mapTaskStatusKeyToEnum[item.status] === TaskStatus.SOLVED ||
      mapTaskStatusKeyToEnum[item.status] === TaskStatus.NOT_SOLVED
    ) {
      return (
        <TableCell>
          <div className={classNames.buttonsWrapper}>
            <Button onClick={() => handlers.setCurrentOpenedTask(item)}>{textConsts.showBtn}</Button>
          </div>
        </TableCell>
      )
    }
    if (viewMode === WarehouseTasksBodyRowViewMode.VACANT) {
      return (
        <TableCell>
          <div className={classNames.buttonsWrapper}>
            <Button onClick={() => handlers.onClickPickupBtn(item)}>{textConsts.pickUp}</Button>
          </div>
        </TableCell>
      )
    }
    switch (mapTaskOperationTypeKeyToEnum[item.operationType]) {
      case TaskOperationType.MERGE:
        return (
          <TableCell>
            <div className={classNames.buttonsWrapper}>
              <Button onClick={onClickResolveBtn}>{textConsts.resolveBtn}</Button>

              <ErrorButton
                className={classNames.cancelBtn}
                onClick={() => handlers.onClickCancelTask(item.boxes[0]._id, item._id, item.operationType)}
              >
                {textConsts.cancelBtn}
              </ErrorButton>
            </div>
          </TableCell>
        )

      case TaskOperationType.SPLIT:
        return (
          <TableCell>
            <div className={classNames.buttonsWrapper}>
              <Button onClick={onClickResolveBtn}>{textConsts.resolveBtn}</Button>

              <ErrorButton
                className={classNames.cancelBtn}
                onClick={() => handlers.onClickCancelTask(item.boxes[0]._id, item._id, item.operationType)}
              >
                {textConsts.cancelBtn}
              </ErrorButton>
            </div>
          </TableCell>
        )
      case TaskOperationType.RECEIVE:
        return <TableCell>{<Button onClick={onClickResolveBtn}>{textConsts.resolveBtn}</Button>}</TableCell>
      case TaskOperationType.EDIT:
        return (
          <TableCell>
            <div className={classNames.buttonsWrapper}>
              <Button onClick={onClickResolveBtn}>{textConsts.resolveBtn}</Button>

              <ErrorButton
                className={classNames.cancelBtn}
                onClick={() => handlers.onClickCancelTask(item.boxes[0]._id, item._id, item.operationType)}
              >
                {textConsts.cancelBtn}
              </ErrorButton>
            </div>
          </TableCell>
        )
    }
  }

  return (
    <TableRow>
      <TableCell>{formatNormDateTime(item.createdAt)}</TableCell>
      <TableCell>{formatNormDateTime(item.updatedAt)}</TableCell>
      <TableCell>{mapTaskOperationTypeToLabel[mapTaskOperationTypeKeyToEnum[item.operationType]]}</TableCell>
      {renderDescription()}
      {renderActions()}
      <TableCell>{mapTaskStatusKeyToEnum[item.status || 0]}</TableCell>
    </TableRow>
  )
}
