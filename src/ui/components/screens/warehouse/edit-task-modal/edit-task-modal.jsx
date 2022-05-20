import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {TaskOperationType} from '@constants/task-operation-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
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
        <div className={classNames.form}>
          <Typography paragraph className={classNames.subTitle}>
            {t(TranslationKey['Receipt data'])}
          </Typography>

          <div className={classNames.commentsWrapper}>
            <Field
              multiline
              disabled
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              label={t(TranslationKey['Client comment'])}
              placeholder={t(TranslationKey['Client comment on the task'])}
              value={task.clientComment || ''}
            />
            <Field
              multiline
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              inputProps={{maxLength: 2000}}
              label={t(TranslationKey['Storekeeper comment'])}
              placeholder={t(TranslationKey['Storekeeper comment to client'])}
              value={storekeeperComment || ''}
              onChange={e => setStorekeeperComment(e.target.value)}
            />
          </div>

          {task.operationType === TaskOperationType.RECEIVE && (
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
          )}

          <div className={classNames.imageFileInputWrapper}>
            <UploadFilesInput images={photosOfTask} setImages={setPhotosOfTask} maxNumber={50} />
          </div>

          <BeforeAfterBlock
            volumeWeightCoefficient={volumeWeightCoefficient}
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
              {newBoxes.length === 0 ? t(TranslationKey.Receive) : t(TranslationKey.Redistribute)}
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
              {t(TranslationKey.Save)}
            </SuccessButton>
          </div>

          <Button
            disableElevation
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={onClickOpenCloseModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
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
