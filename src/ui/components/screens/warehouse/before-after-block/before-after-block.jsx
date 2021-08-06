import React, {useState} from 'react'

import {Divider, Typography, Paper, Checkbox, NativeSelect} from '@material-ui/core'
import {observer} from 'mobx-react'

import {DeliveryTypeByCode, getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode, OrderStatus, OrderStatusByCode, OrderStatusByKey} from '@constants/order-status'
import {TaskOperationType} from '@constants/task-operation-type'
import {texts} from '@constants/texts'
import {getWarehousesOptionByCode, warehouses} from '@constants/warehouses'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

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

  const [barCodeIsGluedWarehouse, setBarCodeIsGluedWarehouse] = useState(false) // временно, чтобы было понимание, как работают чекбоксы

  const onChangeField = (value, field) => {
    const targetBox = newBoxes.filter(newBox => newBox._id === box._id)[0]
    const updatedTargetBox = {...targetBox, [field]: value}

    const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === box._id ? updatedTargetBox : box))
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

      <Typography className={classNames.boxTitle}>{`${textConsts.boxNum} ${box._id}`}</Typography>
      {box.amount > 1 && (
        <div className={classNames.superWrapper}>
          <Typography className={classNames.subTitle}>{textConsts.superTypo}</Typography>
          <Typography>{`x${box.amount}`}</Typography>
        </div>
      )}
      <div className={classNames.itemsWrapper}>
        {box.items.map((item, index) => (
          <div key={`boxItem_${box.items[0].product?._id}_${index}`}>
            <BoxItemCard item={item} index={index} superCount={box.amount} />
          </div>
        ))}
      </div>
      {isCurrentBox && (
        <Paper>
          <Typography>{textConsts.material}</Typography>
          <Input className={classNames.inputText} value={box.items[0].product?.material} disabled={!isEdit} />
        </Paper>
      )}

      <Paper className={classNames.demensionsWrapper}>
        <Typography className={classNames.categoryTitle}>{textConsts.demensions}</Typography>
        <Typography>
          {textConsts.length}
          {box.lengthCmWarehouse}
        </Typography>
        <Typography>
          {textConsts.width}
          {box.widthCmWarehouse}
        </Typography>
        <Typography>
          {textConsts.height}
          {box.heightCmWarehouse}
        </Typography>

        <Typography>
          {textConsts.weight}
          {box.weighGrossKgWarehouse}
        </Typography>
        <Typography>
          {textConsts.volumeWeigh}
          {box.volumeWeightKgWarehouse}
        </Typography>
        <Typography>
          {textConsts.finalWeight}
          {box.weightFinalAccountingKgWarehouse}
        </Typography>
      </Paper>

      {isNewBox && (
        <Paper className={classNames.bottomBlockWrapper}>
          {taskType === TaskOperationType.RECEIVE && (
            <div className={classNames.barCodeActionsWrapper}>
              {barCodeIsGluedWarehouse === false && (
                <Field
                  oneLine
                  containerClasses={classNames.field}
                  label={textConsts.codeCheck}
                  inputComponent={
                    <Checkbox
                      disabled
                      color="primary"
                      checked={box.items[0].order.isBarCodeAlreadyAttachedByTheSupplier}
                    />
                  }
                />
              )}
              {box.items[0].order.isBarCodeAlreadyAttachedByTheSupplier === true &&
                barCodeIsGluedWarehouse === false && (
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

              {(box.items[0].order.isBarCodeAlreadyAttachedByTheSupplier === false ||
                barCodeReallyIsGlued === false) && (
                <Field
                  oneLine
                  containerClasses={classNames.field}
                  label={textConsts.barCodeIsGluedWarehouse}
                  inputComponent={
                    <Checkbox
                      color="primary"
                      checked={barCodeIsGluedWarehouse}
                      onClick={() => setBarCodeIsGluedWarehouse(!barCodeIsGluedWarehouse)}
                    />
                  }
                />
              )}
            </div>
          )}
          {taskType === TaskOperationType.EDIT && (
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
                    checked={box.isShippingLabelAttachedByStorekeeper}
                    onClick={() =>
                      onChangeField(!box.isShippingLabelAttachedByStorekeeper, 'isShippingLabelAttachedByStorekeeper')
                    }
                  />
                }
              />
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

      <div className={classNames.fieldsWrapper}>
        {taskType === TaskOperationType.RECEIVE && (
          <Field
            containerClasses={classNames.field}
            label={textConsts.statusLabel}
            inputComponent={
              <NativeSelect
                variant="filled"
                value={newBoxes[0] && getOrderStatusOptionByCode(newBoxes[0].items[0].order.status).label}
                className={classNames.nativeSelect}
                input={<Input />}
              >
                <option>{'none'}</option>
                {Object.keys(
                  getObjectFilteredByKeyArrayWhiteList(OrderStatusByCode, [
                    OrderStatusByKey[OrderStatus.IN_STOCK].toString(),
                    OrderStatusByKey[OrderStatus.RETURN_ORDER].toString(),
                  ]),
                ).map((statusCode, statusIndex) => (
                  <option key={statusIndex} value={statusCode}>
                    {getOrderStatusOptionByCode(statusCode).label}
                  </option>
                ))}
              </NativeSelect>
            }
          />
        )}
      </div>

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
                value={getOrderStatusOptionByCode(currentBoxes[0].items[0].order.status).label}
              />
            )}
          </div>
        )}

        {currentBoxes && currentBoxes.map((box, boxIndex) => <Box key={boxIndex} isCurrentBox box={box} />)}
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
