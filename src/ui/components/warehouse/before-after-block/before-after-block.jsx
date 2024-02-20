import { Fragment, memo, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Checkbox, Divider, Paper, Tooltip, Typography } from '@mui/material'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TaskOperationType } from '@constants/task/task-operation-type'
import { UiTheme } from '@constants/theme/mui-theme.type'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ImageModal } from '@components/modals/image-modal/image-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { BoxArrow } from '@components/shared/svg-icons'
import { Text } from '@components/shared/text'

import { getNewTariffTextForBoxOrOrder, getShortenStringIfLongerThanCount, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './before-after-block.style'

import { EditBoxTasksModal } from '../edit-task-modal/edit-box-tasks-modal'

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
    volumeWeightCoefficient,
    referenceEditingBox,
    onClickApplyAllBtn,
  } = props

  const [showFullCard, setShowFullCard] = useState(true /* && newBoxes[0]?._id === box._id ? true : false*/)

  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })

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

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const weightSizesType = getWeightSizesType(sizeSetting)

  const volumeWeightWarehouse =
    ((parseFloat(box.lengthCmWarehouse) || 0) *
      (parseFloat(box.heightCmWarehouse) || 0) *
      (parseFloat(box.widthCmWarehouse) || 0)) /
    volumeWeightCoefficient

  const volumeWeightSupplier =
    ((parseFloat(box.lengthCmSupplier) || 0) *
      (parseFloat(box.heightCmSupplier) || 0) *
      (parseFloat(box.widthCmSupplier) || 0)) /
    volumeWeightCoefficient

  const needAccent =
    (taskType === TaskOperationType.EDIT || taskType === TaskOperationType.EDIT_BY_STOREKEEPER) && isNewBox

  return (
    <div className={styles.mainPaper}>
      <div className={styles.fieldsWrapper}>
        <div>
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
        </div>

        <div>
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
          <div className={cx(styles.boxInfoWrapper)}>
            <div>
              <Typography className={styles.categoryTitle}>
                {taskType === TaskOperationType.RECEIVE
                  ? isCurrentBox
                    ? t(TranslationKey['Sizes from buyer']) + ':'
                    : `${t(TranslationKey['Sizes from storekeeper'])}:`
                  : `${t(TranslationKey['Sizes from storekeeper'])}:`}
              </Typography>

              <div className={styles.sizesSubWrapper}>
                <CustomSwitcher
                  condition={sizeSetting}
                  switcherSettings={[
                    { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                    { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
                  ]}
                  changeConditionHandler={condition => setSizeSetting(condition)}
                />
              </div>

              {
                /* isCurrentBox &&*/ taskType === TaskOperationType.RECEIVE ? (
                  <div className={styles.demensionsWrapper}>
                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey.Length) + ': '}

                      {isCurrentBox
                        ? toFixed(box.lengthCmSupplier / lengthConversion, 2)
                        : toFixed(box.lengthCmWarehouse / lengthConversion, 2)}
                    </Typography>
                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey.Width) + ': '}
                      {isCurrentBox
                        ? toFixed(box.widthCmSupplier / lengthConversion, 2)
                        : toFixed(box.widthCmWarehouse / lengthConversion, 2)}
                    </Typography>
                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey.Height) + ': '}
                      {isCurrentBox
                        ? toFixed(box.heightCmSupplier / lengthConversion, 2)
                        : toFixed(box.heightCmWarehouse / lengthConversion, 2)}
                    </Typography>

                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey.Weight) + ': '}
                      {isCurrentBox
                        ? toFixed(box.weighGrossKgSupplier / weightConversion, 2)
                        : toFixed(box.weighGrossKgWarehouse / weightConversion, 2)}
                      {' ' + weightSizesType}
                    </Typography>

                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey['Volume weight']) + ': '}
                      {isCurrentBox
                        ? toFixed(volumeWeightSupplier / weightConversion, 2)
                        : toFixed(volumeWeightWarehouse / weightConversion, 2)}
                      {' ' + weightSizesType}
                    </Typography>

                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey['Final weight']) + ': '}
                      {isCurrentBox
                        ? toFixed(
                            box.weighGrossKgSupplier > volumeWeightSupplier
                              ? box.weighGrossKgSupplier / weightConversion
                              : volumeWeightWarehouse / weightConversion,
                            2,
                          )
                        : toFixed(
                            box.weighGrossKgWarehouse > volumeWeightSupplier
                              ? box.weighGrossKgWarehouse / weightConversion
                              : volumeWeightWarehouse / weightConversion,
                            2,
                          )}
                      {' ' + weightSizesType}
                    </Typography>
                  </div>
                ) : (
                  <div
                    className={cx(styles.demensionsWrapper, {
                      [styles.editAccent]:
                        isNewBox &&
                        (taskType === TaskOperationType.EDIT || taskType === TaskOperationType.EDIT_BY_STOREKEEPER) &&
                        (box.heightCmWarehouse !== referenceEditingBox.heightCmWarehouse ||
                          box.weighGrossKgWarehouse !== referenceEditingBox.weighGrossKgWarehouse ||
                          box.widthCmWarehouse !== referenceEditingBox.widthCmWarehouse ||
                          box.lengthCmWarehouse !== referenceEditingBox.lengthCmWarehouse),
                    })}
                  >
                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey.Length) + ': '}
                      {toFixed(box.lengthCmWarehouse / lengthConversion, 2)}
                    </Typography>
                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey.Width) + ': '}
                      {toFixed(box.widthCmWarehouse / lengthConversion, 2)}
                    </Typography>
                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey.Height) + ': '}
                      {toFixed(box.heightCmWarehouse / lengthConversion, 2)}
                    </Typography>

                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey.Weight) + ': '}
                      {toFixed(box.weighGrossKgWarehouse / weightConversion, 2)}
                      {' ' + weightSizesType}
                    </Typography>
                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey['Volume weight']) + ': '}
                      {toFixed(volumeWeightWarehouse / weightConversion, 2)}
                      {' ' + weightSizesType}
                    </Typography>
                    <Typography className={cx(styles.standartText, styles.mobileDemensions)}>
                      {t(TranslationKey['Final weight']) + ': '}
                      {toFixed(
                        box.weighGrossKgWarehouse > volumeWeightWarehouse
                          ? box.weighGrossKgWarehouse / weightConversion
                          : volumeWeightWarehouse / weightConversion,
                        2,
                      )}
                      {' ' + weightSizesType}
                    </Typography>
                  </div>
                )
              }
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
                <PhotoAndFilesSlider
                  smallSlider
                  files={isNewBox && box.tmpImages?.length ? box.tmpImages : box.images}
                />
              </div>

              <div className={styles.photoWrapper}>
                <Typography className={styles.photoAndFilesTitle}>{`${t(
                  TranslationKey['Photos and order documents'],
                )}:`}</Typography>
                <PhotoAndFilesSlider smallSlider files={box.items[0].order.images} />
              </div>
            </div>
          </div>
          <div className={styles.footerWrapper}>
            <div className={styles.footerSubWrapper}>
              <LabelWithCopy
                labelTitleFontWeight={'bold'}
                labelTitle={t(TranslationKey['Shipping label'])}
                labelValue={box.shippingLabel}
                lableLinkTitle={t(TranslationKey.View)}
              />

              <div>
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
                  <PhotoAndFilesSlider smallSlider files={box.trackNumberFile} />
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
                  className={styles.editBtn}
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
                  className={styles.editBtn}
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

      {showPhotosModal && (
        <ImageModal
          isOpenModal={showPhotosModal}
          handleOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          files={bigImagesOptions.images}
          currentFileIndex={bigImagesOptions.imgIndex}
          handleCurrentFileIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
        />
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
        <BoxArrow className={styles.boxArrowSvg} />
      </div>

      <Typography className={styles.receiveBoxTitle}>
        {t(TranslationKey['Add boxes that have arrived in stock'])}
      </Typography>

      {taskType === TaskOperationType.RECEIVE && (
        <Button className={styles.button} onClick={onClickOpenModal}>
          {t(TranslationKey.Receive)}
        </Button>
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
            volumeWeightCoefficient={volumeWeightCoefficient}
            isNewBox={isNewBox}
            referenceEditingBox={referenceEditingBoxes[0]}
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
        <EditBoxTasksModal
          isReceive={taskType === TaskOperationType.RECEIVE}
          primarySizeSuitableCheckbox={taskType === TaskOperationType.RECEIVE || taskType === TaskOperationType.EDIT}
          volumeWeightCoefficient={volumeWeightCoefficient}
          setEditModal={onTriggerShowEditBoxModal}
          box={curBox}
          newBoxes={newBoxes}
          setNewBoxes={setNewBoxes}
          operationType={taskType}
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
    volumeWeightCoefficient,
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
              <Fragment key={boxIndex}>
                <Box
                  isCurrentBox
                  readOnly={readOnly}
                  box={box}
                  taskType={taskType}
                  volumeWeightCoefficient={volumeWeightCoefficient}
                />
              </Fragment>
            ))}
        </div>
      </div>

      {desiredBoxes.length > 0 && <Divider flexItem className={styles.divider} orientation="vertical" />}

      {desiredBoxes.length > 0 && (
        <NewBoxes
          isNewBox
          readOnly={readOnly}
          isEdit={isEdit}
          volumeWeightCoefficient={volumeWeightCoefficient}
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
