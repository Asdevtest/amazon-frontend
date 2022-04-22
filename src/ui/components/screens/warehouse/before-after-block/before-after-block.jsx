import React, {useState} from 'react'

import {Divider, Typography, Paper, Checkbox, Link} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {getOrderStatusOptionByCode} from '@constants/order-status'
import {TaskOperationType} from '@constants/task-operation-type'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Modal} from '@components/modal'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl, toFixedWithCm, toFixedWithKg} from '@utils/text'

import {EditBoxTasksModal} from '../edit-task-modal/edit-box-tasks-modal'
import {useClassNames} from './before-after-block.style'
import {BoxItemCard} from './box-item-card'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseBeforeAfterBlock

const Box = ({
  box,
  setCurBox,
  isNewBox = false,
  isCurrentBox = false,
  onClickEditBox,
  isEdit,
  taskType,
  setNewBoxes,
  newBoxes,
  volumeWeightCoefficient,
}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const onChangeField = (value, field) => {
    const targetBox = newBoxes.filter(newBox => newBox._id === box._id)[0]
    const updatedTargetBox = {...targetBox, [field]: value}
    const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === box._id ? updatedTargetBox : newBox))
    setNewBoxes(updatedNewBoxes)
  }

  return (
    <div className={(classNames.box, classNames.mainPaper)}>
      {isNewBox && (
        <div className={classNames.fieldsWrapper}>
          <Field disabled label={textConsts.warehouseLabel} value={box.destination?.name} />

          <Field disabled label={textConsts.logicsTariffLabel} value={box.logicsTariff?.name || 'N/A'} />
        </div>
      )}

      <Typography className={classNames.boxTitle}>{`${textConsts.boxNum} ${box.humanFriendlyId}`}</Typography>
      {box.amount > 1 && (
        <div className={classNames.superWrapper}>
          <Typography className={classNames.subTitle}>{textConsts.superTypo}</Typography>
          <Typography>{`x${box.amount}`}</Typography>
        </div>
      )}
      <div className={classNames.itemsWrapper}>
        {box.items?.map((item, index) => (
          <div key={`boxItem_${box.items?.[0].product?._id}_${index}`}>
            <BoxItemCard item={item} index={index} superCount={box.amount} />
          </div>
        ))}
      </div>

      <Paper className={classNames.boxInfoWrapper}>
        {isCurrentBox && taskType === TaskOperationType.RECEIVE ? (
          <div className={classNames.demensionsWrapper}>
            <Typography className={classNames.categoryTitle}>{textConsts.demensionsSupplier}</Typography>
            <Typography>
              {textConsts.length}
              {toFixedWithCm(box.lengthCmSupplier, 2)}
            </Typography>
            <Typography>
              {textConsts.width}
              {toFixedWithCm(box.widthCmSupplier, 2)}
            </Typography>
            <Typography>
              {textConsts.height}
              {toFixedWithCm(box.heightCmSupplier, 2)}
            </Typography>

            <Typography>
              {textConsts.weight}
              {toFixedWithKg(box.weighGrossKgSupplier, 2)}
            </Typography>

            <Typography>
              {textConsts.volumeWeigh}
              {toFixedWithKg(
                ((parseFloat(box.lengthCmSupplier) || 0) *
                  (parseFloat(box.heightCmSupplier) || 0) *
                  (parseFloat(box.widthCmSupplier) || 0)) /
                  volumeWeightCoefficient,
                2,
              )}
            </Typography>

            <Typography>
              {textConsts.finalWeight}
              {toFixedWithKg(
                box.weighGrossKgSupplier >
                  ((parseFloat(box.lengthCmSupplier) || 0) *
                    (parseFloat(box.heightCmSupplier) || 0) *
                    (parseFloat(box.widthCmSupplier) || 0)) /
                    volumeWeightCoefficient
                  ? box.weighGrossKgSupplier
                  : ((parseFloat(box.lengthCmSupplier) || 0) *
                      (parseFloat(box.heightCmSupplier) || 0) *
                      (parseFloat(box.widthCmSupplier) || 0)) /
                      volumeWeightCoefficient,
                2,
              )}
            </Typography>
          </div>
        ) : (
          <div className={classNames.demensionsWrapper}>
            <Typography className={classNames.categoryTitle}>{textConsts.demensionsWarehouse}</Typography>
            <Typography>
              {textConsts.length}
              {toFixedWithCm(box.lengthCmWarehouse, 2)}
            </Typography>
            <Typography>
              {textConsts.width}
              {toFixedWithCm(box.widthCmWarehouse, 2)}
            </Typography>
            <Typography>
              {textConsts.height}
              {toFixedWithCm(box.heightCmWarehouse, 2)}
            </Typography>

            <Typography>
              {textConsts.weight}
              {toFixedWithKg(box.weighGrossKgWarehouse, 2)}
            </Typography>
            <Typography>
              {textConsts.volumeWeigh}
              {toFixedWithKg(
                ((parseFloat(box.lengthCmWarehouse) || 0) *
                  (parseFloat(box.heightCmWarehouse) || 0) *
                  (parseFloat(box.widthCmWarehouse) || 0)) /
                  volumeWeightCoefficient,
                2,
              )}
            </Typography>
            <Typography>
              {textConsts.finalWeight}
              {toFixedWithKg(
                box.weighGrossKgWarehouse >
                  ((parseFloat(box.lengthCmWarehouse) || 0) *
                    (parseFloat(box.heightCmWarehouse) || 0) *
                    (parseFloat(box.widthCmWarehouse) || 0)) /
                    volumeWeightCoefficient
                  ? box.weighGrossKgWarehouse
                  : ((parseFloat(box.lengthCmWarehouse) || 0) *
                      (parseFloat(box.heightCmWarehouse) || 0) *
                      (parseFloat(box.widthCmWarehouse) || 0)) /
                      volumeWeightCoefficient,
                2,
              )}
            </Typography>
          </div>
        )}

        <div className={classNames.imagesWrapper}>
          {box.images && (
            <div className={classNames.photoWrapper}>
              <Typography>{'Фотографии коробки:'}</Typography>

              {box.images.length > 0 ? (
                <Carousel autoPlay={false} timeout={100} animation="fade">
                  {box.images.map((el, index) => (
                    <div key={index}>
                      <img
                        alt=""
                        className={classNames.imgBox}
                        src={el}
                        onClick={() => {
                          setShowImageModal(!showImageModal)
                          setBigImagesOptions({images: box.images, imgIndex: index})
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <Typography>{'Фотографий пока нет...'}</Typography>
              )}
            </div>
          )}

          {box.items[0].order.images && (
            <div className={classNames.photoWrapper}>
              <Typography>{'Фотографии заказа:'}</Typography>

              {box.items[0].order.images.length > 0 ? (
                <Carousel autoPlay={false} timeout={100} animation="fade">
                  {box.items[0].order.images.map((el, index) => (
                    <div key={index}>
                      <img
                        alt=""
                        className={classNames.imgBox}
                        src={el}
                        onClick={() => {
                          setShowImageModal(!showImageModal)
                          setBigImagesOptions({images: box.items[0].order.images, imgIndex: index})
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <Typography>{'Фотографий пока нет...'}</Typography>
              )}
            </div>
          )}
        </div>
      </Paper>

      <div>
        <div className={classNames.chipWrapper}>
          <Typography className={classNames.subTitle}>{textConsts.shippingLabel}</Typography>

          {box.shippingLabel ? (
            <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
              <Typography className={classNames.link}>{box.shippingLabel}</Typography>
            </Link>
          ) : (
            <Typography className={classNames.link}>{'N/A'}</Typography>
          )}
        </div>
        <Field
          oneLine
          containerClasses={classNames.checkboxContainer}
          label={textConsts.shippingLabelIsGluedWarehouse}
          inputComponent={
            <Checkbox
              color="primary"
              disabled={!box.shippingLabel || !isNewBox}
              checked={box.isShippingLabelAttachedByStorekeeper}
              onClick={() =>
                onChangeField(!box.isShippingLabelAttachedByStorekeeper, 'isShippingLabelAttachedByStorekeeper')
              }
            />
          }
        />
      </div>

      {isNewBox && (
        <div className={classNames.bottomBlockWrapper}>
          {taskType === TaskOperationType.RECEIVE && box.items?.[0].product.barCode && (
            <div className={classNames.barCodeActionsWrapper}>
              {box.isBarCodeAttachedByTheStorekeeper === false && (
                <Field
                  oneLine
                  containerClasses={classNames.checkboxContainer}
                  label={textConsts.codeCheck}
                  inputComponent={
                    <Checkbox
                      color="primary"
                      checked={box.isBarCodeAlreadyAttachedByTheSupplier}
                      onClick={() =>
                        onChangeField(
                          !box.isBarCodeAlreadyAttachedByTheSupplier,
                          'isBarCodeAlreadyAttachedByTheSupplier',
                        )
                      }
                    />
                  }
                />
              )}

              {box.isBarCodeAlreadyAttachedByTheSupplier === false && (
                <Field
                  oneLine
                  containerClasses={classNames.checkboxContainer}
                  label={textConsts.barCodeIsGluedWarehouse}
                  inputComponent={
                    <Checkbox
                      color="primary"
                      checked={box.isBarCodeAttachedByTheStorekeeper}
                      onClick={() =>
                        onChangeField(!box.isBarCodeAttachedByTheStorekeeper, 'isBarCodeAttachedByTheStorekeeper')
                      }
                    />
                  }
                />
              )}
            </div>
          )}

          <div className={classNames.editBtnWrapper}>
            {isEdit && (
              <Button
                className={classNames.editBtn}
                onClick={() => {
                  setCurBox(box)
                  onClickEditBox(box)
                }}
              >
                {textConsts.editBtn}
              </Button>
            )}
          </div>
        </div>
      )}

      <BigImagesModal
        isAmazone
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  )
}

const NewBoxes = ({
  newBoxes,
  onClickEditBox,
  isEdit,
  isNewBox,
  taskType,
  showEditBoxModal,
  onTriggerShowEditBoxModal,
  setNewBoxes,
  volumeWeightCoefficient,
}) => {
  const classNames = useClassNames()

  const [curBox, setCurBox] = useState({})

  return (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle}>{textConsts.newBoxes}</Typography>

      {newBoxes.map((box, boxIndex) => (
        <Box
          key={boxIndex}
          volumeWeightCoefficient={volumeWeightCoefficient}
          isNewBox={isNewBox}
          box={box}
          setCurBox={setCurBox}
          isEdit={isEdit}
          taskType={taskType}
          newBoxes={newBoxes}
          setNewBoxes={setNewBoxes}
          showEditBoxModal={showEditBoxModal}
          onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
          onClickEditBox={onClickEditBox}
        />
      ))}

      <Modal openModal={showEditBoxModal} setOpenModal={onTriggerShowEditBoxModal}>
        <EditBoxTasksModal
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
}

export const BeforeAfterBlock = observer(
  ({
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
  }) => {
    const classNames = useClassNames()

    const onClickEditBox = box => {
      onEditBox(box)
    }

    const CurrentBox = ({currentBoxes}) => (
      <div className={classNames.currentBox}>
        <Typography className={classNames.sectionTitle}>{textConsts.incom}</Typography>

        {taskType !== TaskOperationType.MERGE && taskType !== TaskOperationType.SPLIT && (
          <div className={classNames.fieldsWrapper}>
            <Field disabled label={textConsts.warehouseLabel} value={currentBoxes[0].destination?.name} />

            <Field disabled label={textConsts.logicsTariffLabel} value={currentBoxes[0].logicsTariff?.name || 'N/A'} />

            {taskType === TaskOperationType.RECEIVE && (
              <Field
                disabled
                label={textConsts.statusLabel}
                value={getOrderStatusOptionByCode(currentBoxes[0].items?.[0].order.status)?.label}
              />
            )}
          </div>
        )}

        {currentBoxes &&
          currentBoxes.map((box, boxIndex) => (
            <Box
              key={boxIndex}
              isCurrentBox
              box={box}
              taskType={taskType}
              volumeWeightCoefficient={volumeWeightCoefficient}
            />
          ))}
      </div>
    )

    return (
      <Paper className={classNames.boxesWrapper}>
        <CurrentBox currentBoxes={incomingBoxes} />

        <Divider flexItem className={classNames.divider} orientation="vertical" />

        {desiredBoxes.length > 0 && (
          <NewBoxes
            isNewBox
            isEdit={isEdit}
            volumeWeightCoefficient={volumeWeightCoefficient}
            newBoxes={desiredBoxes}
            taskType={taskType}
            setNewBoxes={setNewBoxes}
            setAmountFieldNewBox={setAmountFieldNewBox}
            showEditBoxModal={showEditBoxModal}
            onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
            onClickEditBox={onClickEditBox}
          />
        )}
      </Paper>
    )
  },
)
