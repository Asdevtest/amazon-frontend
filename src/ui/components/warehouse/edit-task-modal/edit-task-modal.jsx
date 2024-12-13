import { memo, useEffect, useState } from 'react'
import { MdFileDownload } from 'react-icons/md'

import { Divider, Typography } from '@mui/material'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { OtherModel } from '@models/other-model'

import { BoxEdit } from '@components/shared/boxes/box-edit'
import { BoxMerge } from '@components/shared/boxes/box-merge'
import { BoxSplit } from '@components/shared/boxes/box-split'
import { Button } from '@components/shared/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { BoxArrowIcon } from '@components/shared/svg-icons'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './edit-task-modal.style'

import { BeforeAfterBlock } from '../before-after-block'
import { ReceiveBoxModal } from '../receive-box-modal'

export const EditTaskModal = memo(
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
    const { classes: styles, cx } = useStyles()
    const { isMobileResolution, isPcSmallResolution } = useCreateBreakpointResolutions()
    const [receiveBoxModal, setReceiveBoxModal] = useState(false)
    const [isFileDownloading, setIsFileDownloading] = useState(false)
    const [storekeeperComment, setStorekeeperComment] = useState(task.storekeeperComment)

    const taskId = ' ID ' + task.xid

    const renderModalTitle = status => {
      switch (status) {
        case mapTaskStatusEmumToKey[TaskStatus.SOLVED]:
          return t(TranslationKey['Viewing a completed task']) + taskId
        case mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED]:
          return t(TranslationKey['Viewing a canceled task']) + taskId
        case mapTaskStatusEmumToKey[TaskStatus.AT_PROCESS]:
          return t(TranslationKey['Resolve task']) + taskId
        case mapTaskStatusEmumToKey[TaskStatus.NEW]:
          return t(TranslationKey['New task']) + taskId
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

    const renderTypeTaskBoxes = type => {
      switch (type) {
        case TaskOperationType.EDIT:
          return <BoxEdit />
        case TaskOperationType.SPLIT:
          return <BoxSplit />
        case TaskOperationType.MERGE:
          return <BoxMerge />
      }
    }

    const [newBoxes, setNewBoxes] = useState(
      task.boxes.map(
        box =>
          (box = {
            ...box,
            lengthCmWarehouse: box?.lengthCmWarehouse || 0,
            widthCmWarehouse: box?.widthCmWarehouse || 0,
            heightCmWarehouse: box?.heightCmWarehouse || 0,
            weighGrossKgWarehouse: box?.weighGrossKgWarehouse || 0,
            isBarCodeAlreadyAttachedByTheSupplier: box?.isBarCodeAlreadyAttachedByTheSupplier || false,
            isShippingLabelAttachedByStorekeeper: box?.isShippingLabelAttachedByStorekeeper || false,

            items: box?.items?.map(item => ({
              ...item,
              isTransparencyFileAlreadyAttachedByTheSupplier:
                item?.isTransparencyFileAlreadyAttachedByTheSupplier || false,
              isTransparencyFileAttachedByTheStorekeeper: item?.isTransparencyFileAttachedByTheStorekeeper || false,
            })),
            images: box?.images || [],
          }),
      ),
    )

    const [isFilledNewBoxesDimensions, setIsFilledNewBoxesDimensions] = useState(false)

    useEffect(() => {
      setIsFilledNewBoxesDimensions(
        newBoxes.every(
          box => box.widthCmWarehouse || box.weighGrossKgWarehouse || box.lengthCmWarehouse || box.heightCmWarehouse,
        ),
      )
    }, [newBoxes])

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

    const isEditTask = task?.operationType === TaskOperationType.EDIT
    const isReciveTypeTask = task.operationType === TaskOperationType.RECEIVE
    const isManyItemsInSomeBox = task?.boxesBefore.some(box => box.items.length > 1)
    const noTariffInSomeBox = task?.boxesBefore.some(box => !box.logicsTariff)
    const receiveNotFromBuyer = isReciveTypeTask && (isManyItemsInSomeBox || noTariffInSomeBox)
    const isSomeBoxHasntImageToRecive = isReciveTypeTask && newBoxes.some(box => !box?.images?.length)

    const isImagesWereChanged = task?.boxesBefore.some(box => {
      const newBox = newBoxes.find(newBox => newBox.xid === box.xid)

      if (newBox) {
        return newBox.images?.some((item, itemIndex) => item !== box?.images?.[itemIndex])
      }
    })

    const isTaskChangeBarcodeOrTransparency =
      isEditTask &&
      task?.boxesBefore.some(box => {
        const newBox = newBoxes.find(newBox => newBox.xid === box.xid)

        if (newBox) {
          return newBox.items?.some((item, itemIndex) => {
            const currentItem = box?.items?.[itemIndex]

            return currentItem?.barCode !== item?.barCode || currentItem?.transparencyFile !== item?.transparencyFile
          })
        }
      })

    const isNoChangesBarcodeOrTransparency = isTaskChangeBarcodeOrTransparency && !isImagesWereChanged

    const disableSaveButton =
      !newBoxes.length ||
      requestStatus === loadingStatus.IS_LOADING ||
      !isFilledNewBoxesDimensions ||
      (isSomeBoxHasntImageToRecive && !receiveNotFromBuyer) ||
      isNoChangesBarcodeOrTransparency

    return (
      <div className={styles.root}>
        <div className={styles.modalHeader}>
          <Typography className={styles.modalTitle}>{renderModalTitle(task.status)}</Typography>

          <div className={styles.modalSubHeader}>
            <div className={styles.typeTaskWrapper}>
              {isReciveTypeTask ? (
                <div className={styles.boxSvgContainer}>
                  <img src="/assets/icons/big-box.svg" className={styles.bigBoxSvg} />
                  <BoxArrowIcon className={styles.boxArrowSvg} />
                </div>
              ) : (
                renderTypeTaskBoxes(task.operationType)
              )}

              <Typography className={styles.typeTaskTitle}>{`${t(TranslationKey['Task type'])}:`}</Typography>
              <Typography className={styles.modalTitle}>{renderTypeTaskTitle(task?.operationType)}</Typography>
            </div>

            {task.operationType === TaskOperationType.RECEIVE && (
              <Button onClick={uploadTemplateFile}>
                {t(TranslationKey['Download task file'])}
                <MdFileDownload size={22} />
              </Button>
            )}
          </div>
        </div>

        <div className={styles.form}>
          <Typography paragraph className={styles.modalTitle}>
            {t(TranslationKey['Receipt data'])}
          </Typography>

          <div className={styles.commentsAndFilesWrapper}>
            <div className={styles.commentsAndFilesWrapper}>
              <div className={styles.commentsContainer}>
                <Field
                  multiline
                  disabled
                  className={styles.heightFieldAuto}
                  minRows={isPcSmallResolution ? 2 : 4}
                  maxRows={isPcSmallResolution ? 2 : 4}
                  label={t(TranslationKey['Client comment'])}
                  placeholder={t(TranslationKey['Client comment on the task'])}
                  value={task.clientComment || ''}
                />

                <Field
                  multiline
                  disabled
                  className={styles.heightFieldAuto}
                  minRows={isPcSmallResolution ? 2 : 4}
                  maxRows={isPcSmallResolution ? 2 : 4}
                  label={t(TranslationKey['Buyer comment'])}
                  placeholder={t(TranslationKey['Buyer comments to the task'])}
                  value={task.buyerComment || ''}
                />
              </div>

              <Field
                multiline
                className={styles.storekeeperCommentField}
                disabled={readOnly}
                minRows={isMobileResolution ? 4 : isPcSmallResolution ? 7 : 11}
                maxRows={isMobileResolution ? 4 : isPcSmallResolution ? 7 : 11}
                inputProps={{ maxLength: 2000 }}
                label={t(TranslationKey['Storekeeper comment'])}
                placeholder={t(TranslationKey['Storekeeper comment to client'])}
                value={storekeeperComment || ''}
                onChange={e => setStorekeeperComment(e.target.value)}
              />
            </div>

            <div className={styles.imageFileInputWrapper}>
              {!readOnly ? (
                <UploadFilesInput images={photosOfTask} setImages={setPhotosOfTask} dragAndDropButtonHeight={74} />
              ) : (
                <SlideshowGallery files={task.images} />
              )}
            </div>
          </div>

          <Divider orientation="horizontal" className={styles.horizontalDivider} />

          <BeforeAfterBlock
            readOnly={readOnly}
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

          {!readOnly ? (
            <div className={styles.buttonsWrapper}>
              {isNoChangesBarcodeOrTransparency ? (
                <p className={styles.errorText}>{t(TranslationKey['Be sure to add a photo to the box'])}</p>
              ) : null}

              {task.operationType === TaskOperationType.RECEIVE && newBoxes.length > 0 && (
                <div className={styles.hideButton}>
                  <Button
                    tooltipInfoContent={newBoxes.length === 0 && t(TranslationKey['Create new box parameters'])}
                    onClick={() => setReceiveBoxModal(!receiveBoxModal)}
                  >
                    {t(TranslationKey.Redistribute)}
                  </Button>
                </div>
              )}

              <div className={styles.buttonsWrapper}>
                <Button
                  styleType={ButtonStyle.SUCCESS}
                  disabled={disableSaveButton}
                  tooltipInfoContent={t(TranslationKey['Save task data'])}
                  onClick={throttle(() => {
                    onClickSolveTask({
                      task,
                      newBoxes,
                      operationType: task.operationType,
                      comment: storekeeperComment,
                      photos: photosOfTask,
                    })
                  })}
                >
                  {t(TranslationKey.Save)}
                </Button>
                <Button styleType={ButtonStyle.CASUAL} onClick={onClickOpenCloseModal}>
                  {t(TranslationKey.Close)}
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.buttonsWrapper}>
              <Button styleType={ButtonStyle.CASUAL} onClick={onClickOpenCloseModal}>
                {t(TranslationKey.Close)}
              </Button>
            </div>
          )}
        </div>

        <Modal missClickModalOn openModal={receiveBoxModal} setOpenModal={() => setReceiveBoxModal(!receiveBoxModal)}>
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
