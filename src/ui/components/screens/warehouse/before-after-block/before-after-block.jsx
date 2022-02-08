import React, {useState} from 'react'

import {Divider, Typography, Paper, Checkbox, NativeSelect} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {DeliveryTypeByCode, getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {TaskOperationType} from '@constants/task-operation-type'
import {texts} from '@constants/texts'
import {getWarehousesOptionByCode, warehouses} from '@constants/warehouses'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithCm, toFixedWithKg} from '@utils/text'

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
}) => {
  const classNames = useClassNames()

  const [barCodeReallyIsGlued, setBarCodeReallyIsGlued] = useState(false)

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const onChangeField = (value, field) => {
    const targetBox = newBoxes.filter(newBox => newBox._id === box._id)[0]
    const updatedTargetBox = {...targetBox, [field]: value}
    const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === box._id ? updatedTargetBox : newBox))
    setNewBoxes(updatedNewBoxes)
  }

  return (
    <Paper className={(classNames.box, classNames.mainPaper)}>
      {isNewBox && (
        <div className={classNames.fieldsWrapper}>
          <Field
            label={textConsts.warehouseLabel}
            inputComponent={
              <NativeSelect
                disabled
                variant="filled"
                value={box.warehouse}
                className={classNames.nativeSelect}
                input={<Input />}
              >
                <option value={'None'} />
                {Object.keys(warehouses).map((warehouseCode, warehouseIndex) => {
                  const warehouseKey = warehouses[warehouseCode]
                  return (
                    <option key={warehouseIndex} value={warehouseCode}>
                      {warehouseKey}
                    </option>
                  )
                })}
              </NativeSelect>
            }
          />

          <Field
            label={textConsts.deliveryMethodLabel}
            inputComponent={
              <NativeSelect
                disabled
                variant="filled"
                value={box.deliveryMethod}
                className={classNames.nativeSelect}
                input={<Input />}
              >
                {Object.keys(DeliveryTypeByCode).map((deliveryCode, deliveryIndex) => (
                  <option key={deliveryIndex} value={deliveryCode}>
                    {getDeliveryOptionByCode(deliveryCode).label}
                  </option>
                ))}
              </NativeSelect>
            }
          />
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

      {isCurrentBox && taskType === TaskOperationType.RECEIVE ? (
        <Paper className={classNames.demensionsWrapper}>
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
            {toFixedWithKg(box.volumeWeightKgSupplier, 2)}
          </Typography>
          <Typography>
            {textConsts.finalWeight}
            {toFixedWithKg(
              box.weighGrossKgSupplier > box.volumeWeightKgSupplier
                ? box.weighGrossKgSupplier
                : box.volumeWeightKgSupplier,
              2,
            )}
          </Typography>
        </Paper>
      ) : (
        <Paper className={classNames.demensionsWrapper}>
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
            {toFixedWithKg(box.volumeWeightKgWarehouse, 2)}
          </Typography>
          <Typography>
            {textConsts.finalWeight}
            {toFixedWithKg(
              box.weighGrossKgWarehouse > box.volumeWeightKgWarehouse
                ? box.weighGrossKgWarehouse
                : box.volumeWeightKgWarehouse,
              2,
            )}
          </Typography>
        </Paper>
      )}

      <div>
        <div className={classNames.chipWrapper}>
          <Typography className={classNames.subTitle}>{textConsts.shippingLabel}</Typography>
          <Typography className={classNames.shippingLabelField}>
            {box.shippingLabel ? box.shippingLabel : 'N/A'}
          </Typography>
        </div>
        <Field
          oneLine
          containerClasses={classNames.field}
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
        <Paper className={classNames.bottomBlockWrapper}>
          {taskType === TaskOperationType.RECEIVE && box.items?.[0].product.barCode && (
            <div className={classNames.barCodeActionsWrapper}>
              {box.isBarCodeAttachedByTheStorekeeper === false && (
                <Field
                  oneLine
                  containerClasses={classNames.field}
                  label={textConsts.codeCheck}
                  inputComponent={
                    <Checkbox
                      disabled
                      color="primary"
                      checked={box.items?.[0].order.isBarCodeAlreadyAttachedByTheSupplier}
                    />
                  }
                />
              )}
              {box.items?.[0].order.isBarCodeAlreadyAttachedByTheSupplier === true &&
                box.isBarCodeAttachedByTheStorekeeper === false && (
                  <Field
                    oneLine
                    containerClasses={classNames.field}
                    label={textConsts.barCodeReallyIsGlued}
                    inputComponent={
                      <Checkbox
                        color="primary"
                        checked={barCodeReallyIsGlued}
                        onClick={() => setBarCodeReallyIsGlued(!barCodeReallyIsGlued)}
                      />
                    }
                  />
                )}

              {(box.items?.[0].order.isBarCodeAlreadyAttachedByTheSupplier === false ||
                barCodeReallyIsGlued === false) && (
                <Field
                  oneLine
                  containerClasses={classNames.field}
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
        </Paper>
      )}

      <BigImagesModal
        isAmazone
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </Paper>
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
}) => {
  const classNames = useClassNames()

  const [curBox, setCurBox] = useState({})

  return (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle}>{textConsts.newBoxes}</Typography>

      {newBoxes.map((box, boxIndex) => (
        <Box
          key={boxIndex}
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
            <Field
              disabled
              label={textConsts.warehouseLabel}
              value={getWarehousesOptionByCode(currentBoxes[0].warehouse).label}
            />

            <Field
              disabled
              label={textConsts.deliveryMethodLabel}
              value={getDeliveryOptionByCode(currentBoxes[0].deliveryMethod).label}
            />
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
          currentBoxes.map((box, boxIndex) => <Box key={boxIndex} isCurrentBox box={box} taskType={taskType} />)}
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
