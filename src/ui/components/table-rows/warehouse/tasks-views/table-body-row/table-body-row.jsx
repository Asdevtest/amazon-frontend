import {TableCell, TableRow, Typography} from '@mui/material'

import React from 'react'

import {
  mapTaskOperationTypeKeyToEnum,
  mapTaskOperationTypeToLabel,
  TaskOperationType,
} from '@constants/task-operation-type'
import {mapTaskStatusKeyToEnum, TaskStatus} from '@constants/task-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {formatNormDateTime} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {useClassNames} from './table-body-row.style'

export const WarehouseTasksBodyRowViewMode = {
  VACANT: 'VACANT',
  MY: 'MY',
}

export const TableBodyRow = ({item, handlers, hideActions, viewMode}) => {
  const {classes: classNames} = useClassNames()

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
              alt=""
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
      <Typography>{t(TranslationKey.Merge)}</Typography>
      {renderBlockProductsImages}
    </>
  )
  const taskDivideDescription = () => (
    <>
      <Typography className={classNames.descriptionWrapper}>{t(TranslationKey.Split)}</Typography>
      {renderBlockProductsImages}
    </>
  )
  const taskReceiveDescription = () => (
    <>
      <Typography className={classNames.descriptionWrapper}>{t(TranslationKey.Receive)}</Typography>
      {item.boxesBefore && item.boxesBefore.map((box, index) => renderProductImage(box, index))}
    </>
  )

  const taskEditDescription = () => (
    <>
      <Typography className={classNames.descriptionWrapper}>{t(TranslationKey.Edit)}</Typography>
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
            <Button onClick={() => handlers.setCurrentOpenedTask(item)}>{t(TranslationKey['View more'])}</Button>
          </div>
        </TableCell>
      )
    }
    if (viewMode === WarehouseTasksBodyRowViewMode.VACANT) {
      return (
        <TableCell>
          <div className={classNames.buttonsWrapper}>
            <Button onClick={() => handlers.onClickPickupBtn(item)}>{t(TranslationKey['Get to work'])}</Button>
          </div>
        </TableCell>
      )
    }
    switch (mapTaskOperationTypeKeyToEnum[item.operationType]) {
      case TaskOperationType.MERGE:
        return (
          <TableCell>
            <div className={classNames.buttonsWrapper}>
              <Button onClick={onClickResolveBtn}>{t(TranslationKey.Resolve)}</Button>

              <Button
                danger
                className={classNames.cancelBtn}
                onClick={() => handlers.onClickCancelTask(item.boxes[0]._id, item._id, item.operationType)}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            </div>
          </TableCell>
        )

      case TaskOperationType.SPLIT:
        return (
          <TableCell>
            <div className={classNames.buttonsWrapper}>
              <Button onClick={onClickResolveBtn}>{t(TranslationKey.Resolve)}</Button>

              <Button
                danger
                className={classNames.cancelBtn}
                onClick={() => handlers.onClickCancelTask(item.boxes[0]._id, item._id, item.operationType)}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            </div>
          </TableCell>
        )
      case TaskOperationType.RECEIVE:
        return <TableCell>{<Button onClick={onClickResolveBtn}>{t(TranslationKey.Resolve)}</Button>}</TableCell>
      case TaskOperationType.EDIT:
        return (
          <TableCell>
            <div className={classNames.buttonsWrapper}>
              <Button onClick={onClickResolveBtn}>{t(TranslationKey.Resolve)}</Button>

              <Button
                danger
                className={classNames.cancelBtn}
                onClick={() => handlers.onClickCancelTask(item.boxes[0]._id, item._id, item.operationType)}
              >
                {t(TranslationKey.Cancel)}
              </Button>
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
