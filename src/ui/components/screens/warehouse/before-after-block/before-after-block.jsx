import React from 'react'

import {Divider, Typography, Paper, Checkbox} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TaskOperationType} from '@constants/task-operation-type'
// import Carousel from 'react-material-ui-carousel'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {EditBoxModal} from '../edit-task-modal/edit-box-modal'
import {useClassNames} from './before-after-block.style'
import {BoxItemCard} from './box-item-card'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseBeforeAfterBlock

const Box = ({
  box,
  isNewBox = false,
  isCurrentBox = false,
  onClickEditBox,
  isEdit,
  taskType,
  showEditBoxModal,
  onTriggerShowEditBoxModal,
  setNewBoxes,
  setAmountFieldNewBox,
}) => {
  const classNames = useClassNames()
  return (
    <Paper className={(classNames.box, classNames.mainPaper)}>
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
            <BoxItemCard item={item} index={index} />
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
          {'Групповой вес'}
          {box.weighGrossKgWarehouse}
        </Typography>
        <Typography>
          {textConsts.weight}
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
            <Field
              oneLine
              containerClasses={classNames.field}
              label={textConsts.codeCheck}
              inputComponent={
                <Checkbox
                  disabled
                  checked={box.order && box.order.isBarCodeAlreadyAttachedByTheSupplier ? true : false}
                />
              }
            />
          )}

          {/*  раньше здесь предпологалось показывать добавленные фотографии ... нужно ли это?*/}
          {/* {box.images?.length ? (
              <Paper className={classNames.rightCardWrapper}>
                <Typography className={classNames.categoryTitle}>{textConsts.photos}</Typography>

                <Carousel autoPlay timeout={1000} animation="fade">
                  {box.images &&
                    box.images.map((el, index) => (
                      <div key={index}>
                        <img alt="" className={classNames.imgBox} src={el} />
                      </div>
                    ))}
                </Carousel>
              </Paper>
            ) : undefined} */}

          <div className={classNames.editBtnWrapper}>
            {isEdit && (
              <Button className={classNames.editBtn} onClick={() => onClickEditBox(box)}>
                {textConsts.editBtn}
              </Button>
            )}
          </div>
        </Paper>
      )}

      <Modal openModal={showEditBoxModal} setOpenModal={onTriggerShowEditBoxModal}>
        <EditBoxModal
          setEditModal={onTriggerShowEditBoxModal}
          box={box}
          setNewBoxes={setNewBoxes}
          setAmountFieldNewBox={setAmountFieldNewBox}
          operationType={taskType}
        />
      </Modal>
    </Paper>
  )
}

const NewBoxes = ({
  newBoxes,
  onClickEditBox,
  isEdit,
  taskType,
  showEditBoxModal,
  onTriggerShowEditBoxModal,
  setNewBoxes,
  setAmountFieldNewBox,
}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle}>{textConsts.newBoxes}</Typography>
      {newBoxes.map((box, boxIndex) => (
        <Box
          key={boxIndex}
          isNewBox
          box={box}
          isEdit={isEdit}
          taskType={taskType}
          setNewBoxes={setNewBoxes}
          setAmountFieldNewBox={setAmountFieldNewBox}
          showEditBoxModal={showEditBoxModal}
          onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
          onClickEditBox={onClickEditBox}
        />
      ))}
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
        {currentBoxes && currentBoxes.map((box, boxIndex) => <Box key={boxIndex} isCurrentBox box={box} />)}
      </div>
    )

    return (
      <Paper className={classNames.boxesWrapper}>
        {incomingBoxes.length > 0 && (
          <>
            <CurrentBox currentBoxes={incomingBoxes} />

            <Divider flexItem className={classNames.divider} orientation="vertical" />
          </>
        )}

        <NewBoxes
          isEdit={isEdit}
          newBoxes={desiredBoxes}
          taskType={taskType}
          setNewBoxes={setNewBoxes}
          setAmountFieldNewBox={setAmountFieldNewBox}
          showEditBoxModal={showEditBoxModal}
          onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
          onClickEditBox={onClickEditBox}
        />
      </Paper>
    )
  },
)
