import React from 'react'

import {Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {parseBoxesIdInStr} from '@utils/parse-boxes-id-in-str'

import {BeforeAfterBlock} from '../before-after-block'
import {useClassNames} from './browse-task-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseCompletedTaskModal

export const BrowseTaskModal = ({task, onClickOpenCloseModal}) => {
  const classNames = useClassNames()

  const renderDescription = () => {
    switch (task.type) {
      case 'divide':
        return (
          <Typography>
            {textConsts.divideBox}
            <Typography className={classNames.descriptionSpan}>{parseBoxesIdInStr(task.incomingBoxes)}</Typography>
            {textConsts.divideBoxes}
            <Typography className={classNames.descriptionSpan}>{parseBoxesIdInStr(task.desiredBoxes)}</Typography>
          </Typography>
        )

      case 'merge':
        return (
          <Typography>
            {textConsts.mergeBoxes}
            <Typography className={classNames.descriptionSpan}>{parseBoxesIdInStr(task.desiredBoxes)}</Typography>
            {textConsts.mergeBox}
            <Typography className={classNames.descriptionSpan}>{parseBoxesIdInStr(task.desiredBoxes)}</Typography>
          </Typography>
        )

      case 'receive':
        return (
          <Typography>
            {textConsts.receiveBoxes}
            <Typography className={classNames.descriptionSpan}>{parseBoxesIdInStr(task.incomingBoxes)}</Typography>
          </Typography>
        )
    }
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.form}>
        <Typography paragraph className={classNames.subTitle}>
          {textConsts.description}
        </Typography>

        {renderDescription()}

        <Divider className={classNames.divider} />

        <Typography paragraph className={classNames.subTitle}>
          {textConsts.sendData}
        </Typography>

        <Typography>
          {textConsts.warehouse} {task.warehouse}
        </Typography>

        <Typography>
          {textConsts.deliveryMethod}
          {task.deliveryMethod}
        </Typography>

        <Typography>
          {textConsts.deliveryStatus} {task.shippingStatus}
        </Typography>

        <Divider className={classNames.divider} />

        <Typography paragraph className={classNames.subTitle}>
          {textConsts.taskTitle}
        </Typography>

        <BeforeAfterBlock incomingBoxes={task.incomingBoxes} desiredBoxes={task.desiredBoxes} isEdit={false} />

        <Divider className={classNames.divider} />

        <div className={classNames.buttonsWrapper}>
          <Button disableElevation className={classNames.submit} variant="contained" onClick={onClickOpenCloseModal}>
            {textConsts.okBtn}
          </Button>

          <Button disableElevation color="primary" variant="contained" onClick={onClickOpenCloseModal}>
            {textConsts.cancelChangesBtn}
          </Button>
        </div>
      </div>
    </div>
  )
}
