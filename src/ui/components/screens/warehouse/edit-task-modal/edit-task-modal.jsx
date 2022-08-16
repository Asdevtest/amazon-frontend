import React, {useState} from 'react'

import {Divider, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field'
import {Modal} from '@components/modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {t} from '@utils/translations'

import {BeforeAfterBlock} from '../before-after-block'
import {ReceiveBoxModal} from '../receive-box-modal'
import {useClassNames} from './edit-task-modal.style'

export const EditTaskModal = observer(
  ({
    volumeWeightCoefficient,
    requestStatus,
    task,
    onClickOpenCloseModal,
    onSetBarcode,
    onEditBox,
    onClickSolveTask,
    progressValue,
    showProgress,
    showEditBoxModal,
    onTriggerShowEditBoxModal,
    readOnly,
  }) => {
    const classNames = useClassNames()

    const [receiveBoxModal, setReceiveBoxModal] = useState(false)

    const [storekeeperComment, setStorekeeperComment] = useState(task.storekeeperComment)

    const renderModalTitle = status => {
      switch (status) {
        case mapTaskStatusEmumToKey[TaskStatus.SOLVED]:
          return t(TranslationKey['Viewing a completed task'])
        case mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED]:
          return t(TranslationKey['Viewing a canceled task'])
        case mapTaskStatusEmumToKey[TaskStatus.AT_PROCESS]:
          return t(TranslationKey['Resolve task'])
      }
    }

    const renderTypeTaskTitle = type => {
      switch (type) {
        case TaskOperationType.EDIT:
          return t(TranslationKey['Editing the box'])
        case TaskOperationType.MERGE:
          return t(TranslationKey['Merging boxes'])
        case TaskOperationType.RECEIVE:
          return t(TranslationKey['Receiving the box'])
        case TaskOperationType.SPLIT:
          return t(TranslationKey['Splitting the box'])
      }
    }

    const renderTypeTaskImages = type => {
      switch (type) {
        case TaskOperationType.EDIT:
          return '/assets/img/edit.png'
        case TaskOperationType.RECEIVE:
          return '/assets/img/receive.png'
        case TaskOperationType.SPLIT:
          return '/assets/img/split.png'
        case TaskOperationType.MERGE:
          return '/assets/img/merge.png'
      }
    }

    const [newBoxes, setNewBoxes] = useState([
      ...task.boxes.map(
        box =>
          (box = {
            ...box,
            lengthCmWarehouse: box?.lengthCmWarehouse || '',
            widthCmWarehouse: box?.widthCmWarehouse || '',
            heightCmWarehouse: box?.heightCmWarehouse || '',
            weighGrossKgWarehouse: box?.weighGrossKgWarehouse || '',

            isBarCodeAlreadyAttachedByTheSupplier: box?.isBarCodeAlreadyAttachedByTheSupplier || false,
            isShippingLabelAttachedByStorekeeper: box?.isShippingLabelAttachedByStorekeeper || false,

            tmpImages: [],
            images: box?.images || [],
          }),
      ),
    ])

    const [photosOfTask, setPhotosOfTask] = useState([])

    return (
      <div className={classNames.root}>
        <div className={classNames.modalHeader}>
          <Typography className={classNames.modalTitle}>{renderModalTitle(task.status)}</Typography>
          <div className={classNames.typeTaskWrapper}>
            <img src={renderTypeTaskImages(task.operationType)} />
            <Typography className={classNames.typeTaskTitle}>{`${t(TranslationKey['Task type'])}:`}</Typography>
            <Typography className={classNames.typeTaskSubTitle}>{renderTypeTaskTitle(task.operationType)}</Typography>
          </div>
        </div>
        <div className={classNames.form}>
          <div>
            <Typography paragraph className={classNames.subTitle}>
              {t(TranslationKey['Receipt data'])}
            </Typography>
          </div>

          <div className={classNames.commentsAndFilesWrapper}>
            <div className={classNames.commentsWrapper}>
              <Field
                multiline
                disabled
                className={classNames.heightFieldAuto}
                rows={9}
                rowsMax={9}
                label={t(TranslationKey['Client comment'])}
                placeholder={t(TranslationKey['Client comment on the task'])}
                value={task.clientComment || ''}
              />
              <Field
                multiline
                className={classNames.heightFieldAuto}
                disabled={readOnly}
                rows={9}
                rowsMax={9}
                inputProps={{maxLength: 2000}}
                label={t(TranslationKey['Storekeeper comment'])}
                placeholder={t(TranslationKey['Storekeeper comment to client'])}
                value={storekeeperComment || ''}
                onChange={e => setStorekeeperComment(e.target.value)}
              />
            </div>
            {!readOnly ? (
              <div className={classNames.imageFileInputWrapper}>
                <UploadFilesInput images={photosOfTask} setImages={setPhotosOfTask} maxNumber={50} />
              </div>
            ) : null}
          </div>

          <Divider orientation="horizontal" className={classNames.horizontalDivider} />

          {/* {task.operationType === TaskOperationType.RECEIVE && (
            <Field
              multiline
              disabled
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              label={t(TranslationKey['Buyer comment to order'])}
              placeholder={t(TranslationKey['Buyer comment to order'])}
              value={task.boxesBefore[0].items?.[0].order.buyerComment || ''}
            />
          )} */}

          <BeforeAfterBlock
            readOnly={readOnly}
            volumeWeightCoefficient={volumeWeightCoefficient}
            incomingBoxes={task.boxesBefore}
            desiredBoxes={newBoxes}
            taskType={task.operationType}
            setNewBoxes={setNewBoxes}
            showEditBoxModal={showEditBoxModal}
            onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
            onSetBarcode={onSetBarcode}
            onEditBox={onEditBox}
            onClickOpenModal={() => setReceiveBoxModal(!receiveBoxModal)}
          />
        </div>

        {!readOnly ? (
          <div className={classNames.buttonsWrapper}>
            {task.operationType === TaskOperationType.SPLIT && (
              <Button
                disableElevation
                className={classNames.button}
                tooltipInfoContent={newBoxes.length === 0 && t(TranslationKey['Create new box parameters'])}
                color="primary"
                variant="contained"
                onClick={() => {
                  setReceiveBoxModal(!receiveBoxModal)
                }}
              >
                {t(TranslationKey.Redistribute)}
              </Button>
            )}

            <div className={classNames.buttons}>
              <Button
                success
                disableElevation
                className={classNames.successBtn}
                disabled={newBoxes.length === 0 || requestStatus === loadingStatuses.isLoading}
                tooltipInfoContent={t(TranslationKey['Save task data'])}
                variant="contained"
                onClick={() => {
                  onClickSolveTask({
                    task,
                    newBoxes,
                    operationType: task.operationType,
                    comment: storekeeperComment,
                    photos: photosOfTask,
                  })
                }}
              >
                {t(TranslationKey.Save)}
              </Button>
              <Button
                disableElevation
                className={classNames.cancelButton}
                color="primary"
                variant="text"
                onClick={onClickOpenCloseModal}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            </div>
          </div>
        ) : (
          <div className={classNames.buttonWrapper}>
            <Button className={classNames.closeButton} color="primary" onClick={onClickOpenCloseModal}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        )}

        <Modal
          openModal={receiveBoxModal}
          setOpenModal={() => setReceiveBoxModal(!receiveBoxModal)}
          onCloseModal={() => setReceiveBoxModal(!receiveBoxModal)}
        >
          <ReceiveBoxModal
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => setReceiveBoxModal(!receiveBoxModal)}
            selectedBox={task.boxesBefore[0]}
            setSourceBoxes={setNewBoxes}
          />
        </Modal>
        {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
      </div>
    )
  },
)
