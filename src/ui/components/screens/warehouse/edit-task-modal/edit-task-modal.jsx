import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {TaskOperationType} from '@constants/task-operation-type'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BeforeAfterBlock} from '../before-after-block'
import {ReceiveBoxModal} from '../receive-box-modal'
import {useClassNames} from './edit-task-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseTaskForm

export const EditTaskModal = observer(
  ({
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
  }) => {
    const classNames = useClassNames()

    const [receiveBoxModal, setReceiveBoxModal] = useState(false)

    const [storekeeperComment, setStorekeeperComment] = useState(task.storekeeperComment)

    const [newBoxes, setNewBoxes] = useState([
      ...task.boxes.map(
        box =>
          (box = {
            ...box,
            lengthCmWarehouse: box?.lengthCmWarehouse || '',
            widthCmWarehouse: box?.widthCmWarehouse || '',
            heightCmWarehouse: box?.heightCmWarehouse || '',
            weighGrossKgWarehouse: box?.weighGrossKgWarehouse || '',
            volumeWeightKgWarehouse: box?.volumeWeightKgWarehouse || '',
            weightFinalAccountingKgWarehouse: Math.max(
              parseFloat(box?.volumeWeightKgWarehouse) || 0,
              parseFloat(box?.weighGrossKgWarehouse) || 0,
            ),
            isShippingLabelAttachedByStorekeeper: box?.isShippingLabelAttachedByStorekeeper || false,
            tmpImages: [],
          }),
      ),
    ])

    const [photosOfTask, setPhotosOfTask] = useState([])

    return (
      <div className={classNames.root}>
        <div className={classNames.form}>
          <Typography paragraph className={classNames.subTitle}>
            {textConsts.taskTitle}
          </Typography>

          <div className={classNames.commentsWrapper}>
            <Field
              multiline
              disabled
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              label={'Комментарий клиента'}
              placeholder={'Комментарий клиента к задаче'}
              value={task.clientComment || ''}
            />
            <Field
              multiline
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              label={'Комментарий склада'}
              placeholder={'Комментарий склада к задаче для клиента'}
              value={storekeeperComment || ''}
              onChange={e => setStorekeeperComment(e.target.value)}
            />
          </div>

          <div>
            <Typography>{'Прикрепить фото к задаче'}</Typography>
            <input
              multiple="multiple"
              className={classNames.filesInput}
              type="file"
              onChange={e => setPhotosOfTask([...e.target.files])}
            />
          </div>

          <BeforeAfterBlock
            incomingBoxes={task.boxesBefore}
            desiredBoxes={newBoxes}
            taskType={task.operationType}
            setNewBoxes={setNewBoxes}
            showEditBoxModal={showEditBoxModal}
            onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
            onSetBarcode={onSetBarcode}
            onEditBox={onEditBox}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          {task.operationType === TaskOperationType.RECEIVE && (
            <Button
              disableElevation
              className={classNames.button}
              color="primary"
              variant="contained"
              onClick={() => {
                setReceiveBoxModal(!receiveBoxModal)
              }}
            >
              {newBoxes.length === 0 ? textConsts.receiveBoxBtn : textConsts.reReceiveBoxBtn}
            </Button>
          )}
          <div className={classNames.button}>
            <SuccessButton
              disableElevation
              disabled={newBoxes.length === 0 || requestStatus === loadingStatuses.isLoading}
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
              {textConsts.saveChangesBtn}
            </SuccessButton>
          </div>

          <Button
            disableElevation
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={onClickOpenCloseModal}
          >
            {textConsts.cancelChangesBtn}
          </Button>
        </div>
        <Modal openModal={receiveBoxModal} setOpenModal={() => setReceiveBoxModal(!receiveBoxModal)}>
          <ReceiveBoxModal
            setOpenModal={() => setReceiveBoxModal(!receiveBoxModal)}
            selectedBox={task.boxesBefore[0]}
            setSourceBoxes={setNewBoxes}
          />
        </Modal>
        {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}
      </div>
    )
  },
)
