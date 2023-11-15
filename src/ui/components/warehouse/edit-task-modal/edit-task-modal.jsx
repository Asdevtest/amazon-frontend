import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { Divider, Typography } from '@mui/material'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TaskOperationType } from '@constants/task/task-operation-type'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { OtherModel } from '@models/other-model'

import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { BoxArrow } from '@components/shared/svg-icons'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './edit-task-modal.style'

import { BeforeAfterBlock } from '../before-after-block'
import { ReceiveBoxModal } from '../receive-box-modal'

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
    const { classes: classNames } = useClassNames()

    const [receiveBoxModal, setReceiveBoxModal] = useState(false)
    const [isFileDownloading, setIsFileDownloading] = useState(false)

    const [storekeeperComment, setStorekeeperComment] = useState(task.storekeeperComment)
    const [currentScreenWidth, setCurrentScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
      const resizeScreen = () => {
        setCurrentScreenWidth(window.innerWidth)
      }
      window.addEventListener('resize', resizeScreen)
    }, [window.innerWidth])

    const renderModalTitle = status => {
      switch (status) {
        case mapTaskStatusEmumToKey[TaskStatus.SOLVED]:
          return t(TranslationKey['Viewing a completed task'])
        case mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED]:
          return t(TranslationKey['Viewing a canceled task'])
        case mapTaskStatusEmumToKey[TaskStatus.AT_PROCESS]:
          return t(TranslationKey['Resolve task'])
        case mapTaskStatusEmumToKey[TaskStatus.NEW]:
          return t(TranslationKey['New task'])
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
            lengthCmWarehouse: box?.lengthCmWarehouse || 0,
            widthCmWarehouse: box?.widthCmWarehouse || 0,
            heightCmWarehouse: box?.heightCmWarehouse || 0,
            weighGrossKgWarehouse: box?.weighGrossKgWarehouse || 0,

            isBarCodeAlreadyAttachedByTheSupplier: box?.isBarCodeAlreadyAttachedByTheSupplier || false,
            isShippingLabelAttachedByStorekeeper: box?.isShippingLabelAttachedByStorekeeper || false,

            tmpImages: [],
            images: box?.images || [],
          }),
      ),
    ])

    const onClickApplyAllBtn = box => {
      const arr = newBoxes.map(el => ({
        ...el,
        widthCmWarehouse: box.widthCmWarehouse,
        weighGrossKgWarehouse: box.weighGrossKgWarehouse,
        lengthCmWarehouse: box.lengthCmWarehouse,
        heightCmWarehouse: box.heightCmWarehouse,
      }))
      setNewBoxes([...arr])
    }

    const [photosOfTask, setPhotosOfTask] = useState([])

    const uploadTemplateFile = async () => {
      setIsFileDownloading(true)
      await OtherModel.getReportTaskByTaskId(task._id)
      setIsFileDownloading(false)
    }

    return (
      <div className={classNames.root}>
        <div className={classNames.modalHeader}>
          <Typography className={classNames.modalTitle}>{renderModalTitle(task.status)}</Typography>

          <div className={classNames.modalSubHeader}>
            <div className={classNames.typeTaskWrapper}>
              {task.operationType === TaskOperationType.RECEIVE ? (
                <div className={classNames.boxSvgContainer}>
                  <img src="/assets/icons/big-box.svg" className={classNames.bigBoxSvg} />
                  <BoxArrow className={classNames.boxArrowSvg} />
                </div>
              ) : (
                <img src={renderTypeTaskImages(task.operationType)} className={classNames.hideBlock} />
              )}

              <Typography className={classNames.typeTaskTitle}>{`${t(TranslationKey['Task type'])}:`}</Typography>
              <Typography className={classNames.typeTaskSubTitle}>{renderTypeTaskTitle(task.operationType)}</Typography>
            </div>

            {task.operationType === TaskOperationType.RECEIVE && (
              <Button className={classNames.downloadButton} onClick={uploadTemplateFile}>
                {t(TranslationKey['Download task file'])}
                <FileDownloadIcon />
              </Button>
            )}
          </div>
        </div>
        <div className={classNames.form}>
          <Typography paragraph className={classNames.subTitle}>
            {t(TranslationKey['Receipt data'])}
          </Typography>

          <div className={classNames.commentsAndFilesWrapper}>
            <div className={classNames.commentsWrapper}>
              <div>
                <Field
                  multiline
                  disabled
                  className={[classNames.heightFieldAuto, classNames.clientAndBuyerComment]}
                  minRows={currentScreenWidth < 1282 ? 2 : 4}
                  maxRows={currentScreenWidth < 1282 ? 2 : 4}
                  label={t(TranslationKey['Client comment'])}
                  placeholder={t(TranslationKey['Client comment on the task'])}
                  value={task.clientComment || ''}
                />
                <Field
                  multiline
                  disabled
                  className={[classNames.heightFieldAuto, classNames.clientAndBuyerComment]}
                  minRows={currentScreenWidth < 1282 ? 2 : 4}
                  maxRows={currentScreenWidth < 1282 ? 2 : 4}
                  label={t(TranslationKey['Buyer comment'])}
                  placeholder={t(TranslationKey['Buyer comments to the task'])}
                  value={task.buyerComment || ''}
                />
              </div>
              <Field
                multiline
                className={cx(classNames.heightFieldAuto, classNames.storekeeperCommentField)}
                disabled={readOnly}
                minRows={currentScreenWidth < 768 ? 4 : currentScreenWidth < 1282 ? 7 : 11}
                maxRows={currentScreenWidth < 768 ? 4 : currentScreenWidth < 1282 ? 7 : 11}
                inputProps={{ maxLength: 2000 }}
                label={t(TranslationKey['Storekeeper comment'])}
                placeholder={t(TranslationKey['Storekeeper comment to client'])}
                value={storekeeperComment || ''}
                onChange={e => setStorekeeperComment(e.target.value)}
              />
            </div>
            {!readOnly ? (
              <div className={classNames.imageFileInputWrapper}>
                <UploadFilesInput
                  fullWidth
                  dragAndDropBtnHeight={74}
                  images={photosOfTask}
                  setImages={setPhotosOfTask}
                  maxNumber={50}
                />
              </div>
            ) : (
              <div className={classNames.imageAndFileInputWrapper}>
                <PhotoAndFilesSlider customSlideHeight={140} files={task.images} />
              </div>
            )}
          </div>

          <Divider orientation="horizontal" className={classNames.horizontalDivider} />

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
            onClickApplyAllBtn={onClickApplyAllBtn}
          />
        </div>
        <div className={classNames.buttonsMainWrapper}>
          {!readOnly ? (
            <div className={classNames.buttonsWrapperMobile}>
              {task.operationType === TaskOperationType.RECEIVE && newBoxes.length > 0 && (
                <Button
                  className={classNames.buttonMobile}
                  tooltipInfoContent={newBoxes.length === 0 && t(TranslationKey['Create new box parameters'])}
                  onClick={() => {
                    setReceiveBoxModal(!receiveBoxModal)
                  }}
                >
                  {t(TranslationKey.Redistribute)}
                </Button>
              )}
            </div>
          ) : null}

          {!readOnly ? (
            <div className={classNames.buttonsWrapper}>
              {task.operationType === TaskOperationType.RECEIVE && newBoxes.length > 0 && (
                <div className={classNames.hideButton}>
                  <Button
                    className={classNames.button}
                    tooltipInfoContent={newBoxes.length === 0 && t(TranslationKey['Create new box parameters'])}
                    onClick={() => {
                      setReceiveBoxModal(!receiveBoxModal)
                    }}
                  >
                    {t(TranslationKey.Redistribute)}
                  </Button>
                </div>
              )}

              <div className={classNames.buttons}>
                <Button
                  success
                  className={classNames.successBtn}
                  disabled={newBoxes.length === 0 || requestStatus === loadingStatuses.isLoading}
                  tooltipInfoContent={t(TranslationKey['Save task data'])}
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
                <Button variant="text" className={classNames.cancelButton} onClick={onClickOpenCloseModal}>
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
        </div>

        <Modal
          openModal={receiveBoxModal}
          setOpenModal={() => setReceiveBoxModal(!receiveBoxModal)}
          onCloseModal={() => setReceiveBoxModal(!receiveBoxModal)}
        >
          <ReceiveBoxModal
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => setReceiveBoxModal(!receiveBoxModal)}
            boxesBefore={task.boxesBefore}
            setSourceBoxes={setNewBoxes}
          />
        </Modal>
        {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
        {isFileDownloading && <CircularProgressWithLabel />}
      </div>
    )
  },
)
