import { memo, useEffect, useState } from 'react'

import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { Divider, Typography } from '@mui/material'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TaskOperationType } from '@constants/task/task-operation-type'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { OtherModel } from '@models/other-model'

import { BoxEdit } from '@components/shared/boxes/box-edit'
import { BoxMerge } from '@components/shared/boxes/box-merge'
import { BoxSplit } from '@components/shared/boxes/box-split'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { BoxArrow } from '@components/shared/svg-icons'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

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

            tmpImages: [],
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

    const isSomeBoxHasntImageToRecive =
      isReciveTypeTask && newBoxes.some(box => !box?.tmpImages?.length && !box?.images?.length)

    const isSomeBoxHasntImageToEdit = isEditTask && newBoxes.some(box => !box?.tmpImages?.length)

    const isTaskChangeBarcodeOrTransparency =
      isEditTask &&
      task?.boxesBefore.some(box => {
        const newBox = newBoxes.find(newBox => newBox.humanFriendlyId === box.humanFriendlyId)

        if (newBox) {
          newBox.items?.some((item, itemIndex) => {
            const currentItem = box?.items?.[itemIndex]

            return currentItem?.barCode !== item?.barCode || currentItem?.transparencyFile !== item?.transparencyFile
          })
        }
      })

    const isNoChangesBarcodeOrTransparency = isTaskChangeBarcodeOrTransparency && isSomeBoxHasntImageToEdit

    const disableSaveButton =
      !newBoxes.length ||
      requestStatus === loadingStatuses.IS_LOADING ||
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
                  <BoxArrow className={styles.boxArrowSvg} />
                </div>
              ) : (
                renderTypeTaskBoxes(task.operationType)
              )}

              <Typography className={styles.typeTaskTitle}>{`${t(TranslationKey['Task type'])}:`}</Typography>
              <Typography className={styles.typeTaskSubTitle}>{renderTypeTaskTitle(task?.operationType)}</Typography>
            </div>

            {task.operationType === TaskOperationType.RECEIVE && (
              <Button className={styles.downloadButton} onClick={uploadTemplateFile}>
                {t(TranslationKey['Download task file'])}
                <FileDownloadIcon />
              </Button>
            )}
          </div>
        </div>
        <div className={styles.form}>
          <Typography paragraph className={styles.subTitle}>
            {t(TranslationKey['Receipt data'])}
          </Typography>

          <div className={styles.commentsAndFilesWrapper}>
            <div className={styles.commentsWrapper}>
              <div>
                <Field
                  multiline
                  disabled
                  className={[styles.heightFieldAuto, styles.clientAndBuyerComment]}
                  minRows={isPcSmallResolution ? 2 : 4}
                  maxRows={isPcSmallResolution ? 2 : 4}
                  label={t(TranslationKey['Client comment'])}
                  placeholder={t(TranslationKey['Client comment on the task'])}
                  value={task.clientComment || ''}
                />
                <Field
                  multiline
                  disabled
                  className={[styles.heightFieldAuto, styles.clientAndBuyerComment]}
                  minRows={isPcSmallResolution ? 2 : 4}
                  maxRows={isPcSmallResolution ? 2 : 4}
                  label={t(TranslationKey['Buyer comment'])}
                  placeholder={t(TranslationKey['Buyer comments to the task'])}
                  value={task.buyerComment || ''}
                />
              </div>
              <Field
                multiline
                className={cx(styles.heightFieldAuto, styles.storekeeperCommentField)}
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
            {!readOnly ? (
              <div className={styles.imageFileInputWrapper}>
                <UploadFilesInput
                  fullWidth
                  dragAndDropBtnHeight={74}
                  images={photosOfTask}
                  setImages={setPhotosOfTask}
                  maxNumber={50}
                />
              </div>
            ) : (
              <div className={styles.imageAndFileInputWrapper}>
                <PhotoAndFilesSlider customSlideHeight={140} files={task.images} />
              </div>
            )}
          </div>

          <Divider orientation="horizontal" className={styles.horizontalDivider} />

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
        <div className={styles.buttonsMainWrapper}>
          {!readOnly ? (
            <div className={styles.buttonsWrapperMobile}>
              {task.operationType === TaskOperationType.RECEIVE && newBoxes.length > 0 && (
                <Button
                  className={styles.buttonMobile}
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
            <div className={styles.buttonsWrapper}>
              {isNoChangesBarcodeOrTransparency ? (
                <p className={styles.errorText}>{t(TranslationKey['Be sure to add a photo to the box'])}</p>
              ) : null}

              {task.operationType === TaskOperationType.RECEIVE && newBoxes.length > 0 && (
                <div className={styles.hideButton}>
                  <Button
                    className={styles.button}
                    tooltipInfoContent={newBoxes.length === 0 && t(TranslationKey['Create new box parameters'])}
                    onClick={() => {
                      setReceiveBoxModal(!receiveBoxModal)
                    }}
                  >
                    {t(TranslationKey.Redistribute)}
                  </Button>
                </div>
              )}

              <div className={styles.buttons}>
                <Button
                  type={ButtonType.SUCCESS}
                  className={styles.successBtn}
                  disabled={disableSaveButton}
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
                <Button
                  variant={ButtonVariant.OUTLINED}
                  className={styles.cancelButton}
                  onClick={onClickOpenCloseModal}
                >
                  {t(TranslationKey.Cancel)}
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.buttonWrapper}>
              <Button className={styles.closeButton} onClick={onClickOpenCloseModal}>
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
