import { memo, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Checkbox, Divider, Paper, Tooltip, Typography } from '@mui/material'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/button'
import { Dimensions } from '@components/shared/dimensions'
import { Field } from '@components/shared/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { BoxArrowIcon } from '@components/shared/svg-icons'
import { Text } from '@components/shared/text'

import { getNewTariffTextForBoxOrOrder, getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { UiTheme } from '@typings/enums/ui-theme'

import { Entities } from '@hooks/dimensions/use-show-dimensions'

import { useStyles } from './before-after-block.style'

import { EditBoxTasksForm } from '../../forms/edit-box-tasks-form'

import { BoxItemCard } from './box-item-card'
import { ShortBoxItemCard } from './short-box-item-card'

const Box = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    box,
    boxIndex,
    setCurBox,
    isNewBox = false,
    isCurrentBox = false,
    onClickEditBox,
    isEdit,
    taskType,
    setNewBoxes,
    readOnly,
    newBoxes,
    referenceEditingBox,
    onClickApplyAllBtn,
  } = props

  const [showFullCard, setShowFullCard] = useState(true)

  const onChangeField = (value, field) => {
    const targetBox = newBoxes.filter(newBox => newBox._id === box._id)[0]
    const updatedTargetBox = { ...targetBox, [field]: value }
    const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === box._id ? updatedTargetBox : newBox))
    setNewBoxes(updatedNewBoxes)
  }

  const onApplyGluedBarcodeToAllBoxes = (
    isBarCodeAlreadyAttachedByTheSupplier,
    isBarCodeAttachedByTheStorekeeper,
    isTransparencyFileAlreadyAttachedByTheSupplier,
    isTransparencyFileAttachedByTheStorekeeper,
  ) => {
    const updatedNewBoxes = newBoxes.map(newBox => ({
      ...newBox,
      items: newBox.items.map(el => ({
        ...el,
        isBarCodeAlreadyAttachedByTheSupplier,
        isBarCodeAttachedByTheStorekeeper,
        isTransparencyFileAlreadyAttachedByTheSupplier,
        isTransparencyFileAttachedByTheStorekeeper,
      })),
    }))
    setNewBoxes(updatedNewBoxes)
  }

  const onChangeBarCode = (value, field, itemIndex) => {
    const targetBox = newBoxes.filter(newBox => newBox._id === box._id)[0]
    targetBox.items[itemIndex][field] = value
    const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === box._id ? targetBox : newBox))
    setNewBoxes(updatedNewBoxes)
  }

  const needAccent =
    (taskType === TaskOperationType.EDIT || taskType === TaskOperationType.EDIT_BY_STOREKEEPER) && isNewBox
  const calculationDimensionsField =
    taskType === TaskOperationType.RECEIVE && isCurrentBox ? Entities.SUPPLIER : Entities.WAREHOUSE
  const dimensionsTitle =
    taskType === TaskOperationType.RECEIVE && isCurrentBox
      ? t(TranslationKey['Sizes from buyer']) + ':'
      : `${t(TranslationKey['Sizes from storekeeper'])}:`
  const isChanedDimensions =
    taskType === TaskOperationType.RECEIVE
      ? (referenceEditingBox?.weighGrossKgSupplier !== box?.weighGrossKgWarehouse ||
          referenceEditingBox?.widthCmSupplier !== box?.widthCmWarehouse ||
          referenceEditingBox?.heightCmSupplier !== box?.heightCmWarehouse ||
          referenceEditingBox?.lengthCmSupplier !== box?.lengthCmWarehouse) &&
        !isCurrentBox
      : (referenceEditingBox?.weighGrossKgWarehouse !== box?.weighGrossKgWarehouse ||
          referenceEditingBox?.widthCmWarehouse !== box?.widthCmWarehouse ||
          referenceEditingBox?.heightCmWarehouse !== box?.heightCmWarehouse ||
          referenceEditingBox?.lengthCmWarehouse !== box?.lengthCmWarehouse) &&
        !isCurrentBox

  return (
    <div className={styles.mainPaper}>
      <div className={styles.fieldsWrapper}>
        <Field
          disabled
          tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
          label={t(TranslationKey.Destination)}
          labelClasses={styles.smallLabel}
          inputClasses={cx(styles.field, {
            [styles.editAccent]: needAccent && box.destination?.name !== referenceEditingBox.destination?.name,
          })}
          value={box.destination?.name ? box.destination?.name : t(TranslationKey['Not available'])}
        />

        <Field
          disabled
          tooltipInfoContent={t(TranslationKey['Selected shipping tariff to USA'])}
          label={t(TranslationKey.Tariff)}
          labelClasses={styles.smallLabel}
          value={getNewTariffTextForBoxOrOrder(box, true)}
          inputClasses={cx(styles.field, {
            [styles.editAccent]:
              needAccent &&
              getNewTariffTextForBoxOrOrder(box, true) !== getNewTariffTextForBoxOrOrder(referenceEditingBox, true),
          })}
        />
      </div>

      {(!showFullCard && isEdit) || (!showFullCard && taskType === TaskOperationType.MERGE) ? (
        <Paper
          className={cx(styles.boxWrapper, {
            [styles.boxWrapperWithShadow]: SettingsModel.uiTheme === UiTheme.light,
          })}
        >
          <div className={styles.itemsWrapper}>
            {box.items?.map((item, index) => (
              <div key={`boxItem_${box.items?.[0].product?._id}_${index}`}>
                <ShortBoxItemCard
                  readOnly={readOnly}
                  taskType={taskType}
                  item={item}
                  boxId={box.humanFriendlyId}
                  superCount={box.amount}
                  onChangeBarCode={onChangeBarCode}
                />
              </div>
            ))}
          </div>
        </Paper>
      ) : (
        <Paper
          className={cx(styles.boxWrapper, {
            [styles.boxWrapperWithShadow]: SettingsModel.uiTheme === UiTheme.light,
          })}
        >
          <div className={styles.itemsWrapper}>
            {box.items?.map((item, index) => (
              <div key={`boxItem_${box.items?.[0].product?._id}_${index}`}>
                <BoxItemCard
                  box={box}
                  boxIndex={boxIndex}
                  needAccent={needAccent}
                  taskType={taskType}
                  readOnly={readOnly}
                  referenceEditingBox={referenceEditingBox}
                  item={item}
                  boxId={box.humanFriendlyId}
                  index={index}
                  superCount={box.amount}
                  isNewBox={isNewBox}
                  onChangeBarCode={onChangeBarCode}
                  onApplyGluedBarcodeToAllBoxes={onApplyGluedBarcodeToAllBoxes}
                />
              </div>
            ))}
          </div>
          <div className={styles.boxInfoWrapper}>
            <div className={cx({ [styles.yellowBorder]: isChanedDimensions })}>
              <Dimensions data={box} title={dimensionsTitle} calculationField={calculationDimensionsField} />
            </div>

            <Divider flexItem className={styles.divider} orientation="vertical" />

            <div className={styles.imagesWrapper}>
              <div className={styles.photoWrapper}>
                <Typography className={styles.photoAndFilesTitle}>{`${t(
                  TranslationKey['Photos and documents of the box'],
                )}:`}</Typography>
                {isNewBox && box.tmpImages?.length ? (
                  <Typography className={styles.greenText}>{`${t(TranslationKey['New files'])}: (+ ${
                    box.tmpImages?.length - box.images.length
                  })`}</Typography>
                ) : null}

                <SlideshowGallery
                  slidesToShow={2}
                  files={isNewBox && box.tmpImages?.length ? box.tmpImages : box.images}
                />
              </div>

              <div className={styles.photoWrapper}>
                <Typography className={styles.photoAndFilesTitle}>{`${t(
                  TranslationKey['Photos and order documents'],
                )}:`}</Typography>
                <SlideshowGallery slidesToShow={2} files={box.items[0].order.images} />
              </div>
            </div>
          </div>
          <div className={styles.footerWrapper}>
            <div
              className={cx(styles.footerSubWrapper, {
                [styles.editAccent]:
                  box && referenceEditingBox && box?.shippingLabel !== referenceEditingBox?.shippingLabel,
              })}
            >
              <LabelWithCopy
                labelTitleFontWeight={'bold'}
                labelTitle={t(TranslationKey['Shipping label'])}
                labelValue={box.shippingLabel}
                lableLinkTitle={t(TranslationKey.View)}
              />

              <Field
                oneLine
                containerClasses={styles.checkboxContainer}
                labelClasses={styles.label}
                label={t(TranslationKey['Shipping label was glued to the warehouse'])}
                inputComponent={
                  <Checkbox
                    color="primary"
                    disabled={!box.shippingLabel || !isNewBox || readOnly}
                    checked={box.isShippingLabelAttachedByStorekeeper}
                    onClick={() =>
                      onChangeField(!box.isShippingLabelAttachedByStorekeeper, 'isShippingLabelAttachedByStorekeeper')
                    }
                  />
                }
              />
            </div>

            <div className={styles.footerTrackNumberWrapper}>
              <Field
                // oneLine
                // containerClasses={styles.countSubWrapper}
                label={t(TranslationKey['Track number'])}
                labelClasses={styles.label}
                inputComponent={
                  <Tooltip title={box?.trackNumberText?.length > 70 && box?.trackNumberText}>
                    <Typography className={styles.trackNum}>
                      {getShortenStringIfLongerThanCount(box.trackNumberText, 70) || t(TranslationKey['Not available'])}
                    </Typography>
                  </Tooltip>
                }
              />

              <div className={styles.trackNumberPhotoWrapper}>
                {box.trackNumberFile.length ? (
                  <SlideshowGallery slidesToShow={2} files={box.trackNumberFile} />
                ) : (
                  <Typography className={styles.trackNumberNoPhotoText}>
                    {`${t(TranslationKey['no photo track number'])}...`}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </Paper>
      )}

      {isNewBox && (
        <div className={styles.bottomBlockWrapper}>
          <div className={cx(styles.editBtnWrapper, { [styles.noEditBtnWrapper]: readOnly })}>
            {isEdit && !readOnly && (
              <div className={styles.btnsWrapper}>
                <Button
                  tooltipInfoContent={t(TranslationKey['Edit box parameters'])}
                  onClick={() => {
                    setCurBox(box)
                    onClickEditBox(box)
                  }}
                >
                  {t(TranslationKey.Edit)}
                </Button>

                <Button
                  disabled={
                    !box.widthCmWarehouse ||
                    !box.weighGrossKgWarehouse ||
                    !box.lengthCmWarehouse ||
                    !box.heightCmWarehouse
                  }
                  onClick={() => {
                    onClickApplyAllBtn(box)
                  }}
                >
                  {t(TranslationKey['Apply to all'])}
                </Button>
              </div>
            )}
            <div className={styles.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
              <Typography className={styles.tablePanelViewText}>
                {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
              </Typography>

              {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
            </div>
          </div>
        </div>
      )}
      {!isNewBox && taskType === TaskOperationType.MERGE && (
        <div className={styles.bottomBlockWrapper}>
          <div className={styles.incomingBtnWrapper}>
            <div className={styles.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
              <Typography className={styles.tablePanelViewText}>
                {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
              </Typography>

              {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

const ReceiveBoxes = memo(({ taskType, onClickOpenModal }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.receiveBoxWrapper}>
      <div className={styles.boxImageContainer}>
        <img src="/assets/icons/big-box.svg" className={styles.bigBoxSvg} />
        <BoxArrowIcon className={styles.boxArrowSvg} />
      </div>

      <Typography className={styles.receiveBoxTitle}>
        {t(TranslationKey['Add boxes that have arrived in stock'])}
      </Typography>

      {taskType === TaskOperationType.RECEIVE && (
        <Button onClick={onClickOpenModal}>{t(TranslationKey.Receive)}</Button>
      )}
    </div>
  )
})

const NewBoxes = memo(props => {
  const { classes: styles } = useStyles()

  const {
    referenceEditingBoxes,
    newBoxes,
    onClickEditBox,
    isEdit,
    isNewBox,
    taskType,
    showEditBoxModal,
    onTriggerShowEditBoxModal,
    setNewBoxes,
    volumeWeightCoefficient,
    readOnly,
    onClickApplyAllBtn,
  } = props

  const [curBox, setCurBox] = useState({})

  return (
    <div className={styles.newBoxes}>
      <div className={styles.titleWrapper}>
        <Text
          tooltipInfoContent={t(TranslationKey['New box condition'])}
          className={styles.sectionTitle}
          containerClasses={styles.sectionTitleWrapper}
        >
          {t(TranslationKey['New boxes'])}
        </Text>

        <Typography>{`${t(TranslationKey['Total number of boxes'])}: ${newBoxes.reduce(
          (acc, cur) => (acc += cur.amount),
          0,
        )}`}</Typography>
      </div>

      <div className={styles.newBoxesWrapper}>
        {newBoxes.map((box, boxIndex) => (
          <Box
            key={boxIndex}
            boxIndex={boxIndex}
            readOnly={readOnly}
            isNewBox={isNewBox}
            referenceEditingBox={referenceEditingBoxes[boxIndex]}
            box={box}
            curBox={curBox}
            setCurBox={setCurBox}
            isEdit={isEdit}
            taskType={taskType}
            newBoxes={newBoxes}
            setNewBoxes={setNewBoxes}
            showEditBoxModal={showEditBoxModal}
            onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
            onClickEditBox={onClickEditBox}
            onClickApplyAllBtn={onClickApplyAllBtn}
          />
        ))}
      </div>

      <Modal openModal={showEditBoxModal} setOpenModal={onTriggerShowEditBoxModal}>
        <EditBoxTasksForm
          box={curBox}
          newBoxes={newBoxes}
          volumeWeightCoefficient={volumeWeightCoefficient}
          setNewBoxes={setNewBoxes}
          setEditModal={onTriggerShowEditBoxModal}
        />
      </Modal>
    </div>
  )
})

export const BeforeAfterBlock = memo(props => {
  const { classes: styles } = useStyles()

  const {
    incomingBoxes,
    desiredBoxes,
    onEditBox,
    taskType,
    isEdit = true,
    showEditBoxModal,
    onTriggerShowEditBoxModal,
    setNewBoxes,
    setAmountFieldNewBox,
    onClickOpenModal,
    readOnly,
    onClickApplyAllBtn,
  } = props

  const onClickEditBox = box => {
    onEditBox(box)
  }

  return (
    <>
      <div className={styles.currentBox}>
        <div className={styles.titleWrapper}>
          <Text
            tooltipInfoContent={t(TranslationKey['Previous condition of the box'])}
            className={styles.sectionTitle}
            containerClasses={styles.sectionTitleWrapper}
          >
            {t(TranslationKey.Incoming)}
          </Text>

          <Typography>{`${t(TranslationKey['Total number of boxes'])}: ${incomingBoxes.reduce(
            (acc, cur) => (acc += cur.amount),
            0,
          )}`}</Typography>
        </div>

        <div className={styles.newBoxesWrapper}>
          {incomingBoxes &&
            incomingBoxes.map((box, boxIndex) => (
              <Box key={boxIndex} isCurrentBox readOnly={readOnly} box={box} taskType={taskType} />
            ))}
        </div>
      </div>

      {desiredBoxes.length > 0 && <Divider flexItem className={styles.divider} orientation="vertical" />}

      {desiredBoxes.length > 0 && (
        <NewBoxes
          isNewBox
          readOnly={readOnly}
          isEdit={isEdit}
          referenceEditingBoxes={incomingBoxes}
          newBoxes={desiredBoxes}
          taskType={taskType}
          setNewBoxes={setNewBoxes}
          setAmountFieldNewBox={setAmountFieldNewBox}
          showEditBoxModal={showEditBoxModal}
          onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
          onClickEditBox={onClickEditBox}
          onClickApplyAllBtn={onClickApplyAllBtn}
        />
      )}

      {taskType === TaskOperationType.RECEIVE && desiredBoxes.length === 0 && incomingBoxes.length > 0 && !readOnly && (
        <ReceiveBoxes taskType={taskType} onClickOpenModal={onClickOpenModal} />
      )}
    </>
  )
})
