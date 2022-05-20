import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import React, {useState} from 'react'

import {Divider, Typography, Paper, Checkbox, Link} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TaskOperationType} from '@constants/task-operation-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Modal} from '@components/modal'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {checkAndMakeAbsoluteUrl, toFixed, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

import {EditBoxTasksModal} from '../edit-task-modal/edit-box-tasks-modal'
import {useClassNames} from './before-after-block.style'
import {BoxItemCard} from './box-item-card'

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

  const onChangeBarCode = (value, field, itemIndex) => {
    const targetBox = newBoxes.filter(newBox => newBox._id === box._id)[0]

    targetBox.items[itemIndex][field] = value

    const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === box._id ? targetBox : newBox))

    setNewBoxes(updatedNewBoxes)
  }

  const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

  const handleChange = (event, newAlignment) => {
    setSizeSetting(newAlignment)
  }

  return (
    <div className={(classNames.box, classNames.mainPaper)}>
      <div className={classNames.fieldsWrapper}>
        <Field disabled label={t(TranslationKey.Warehouse)} value={box.destination?.name} />

        <Field disabled label={t(TranslationKey.Tariff)} value={box.logicsTariff?.name || 'N/A'} />
      </div>

      <Typography className={classNames.boxTitle}>{`${t(TranslationKey['Box number:'])} ${
        box.humanFriendlyId
      }`}</Typography>

      {box.amount > 1 && (
        <div className={classNames.superWrapper}>
          <Typography className={classNames.subTitle}>{t(TranslationKey.Super) + ' '}</Typography>
          <Typography>{`x${box.amount}`}</Typography>
        </div>
      )}
      <div className={classNames.itemsWrapper}>
        {box.items?.map((item, index) => (
          <div key={`boxItem_${box.items?.[0].product?._id}_${index}`}>
            <BoxItemCard
              item={item}
              index={index}
              superCount={box.amount}
              isNewBox={isNewBox}
              onChangeBarCode={onChangeBarCode}
            />
          </div>
        ))}
      </div>

      <Paper className={classNames.boxInfoWrapper}>
        <div>
          <Typography className={classNames.categoryTitle}>
            {isCurrentBox && taskType === TaskOperationType.RECEIVE
              ? t(TranslationKey['Sizes from supplier:'])
              : t(TranslationKey['Sizes from storekeeper:'])}
          </Typography>

          <ToggleButtonGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
            <ToggleButton disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
              {'In'}
            </ToggleButton>
            <ToggleButton disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
              {'Cm'}
            </ToggleButton>
          </ToggleButtonGroup>

          {isCurrentBox && taskType === TaskOperationType.RECEIVE ? (
            <div className={classNames.demensionsWrapper}>
              <Typography>
                {t(TranslationKey.Length) + ': '}

                {toFixed(box.lengthCmSupplier / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
              </Typography>
              <Typography>
                {t(TranslationKey.Width) + ': '}
                {toFixed(box.widthCmSupplier / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
              </Typography>
              <Typography>
                {t(TranslationKey.Height) + ': '}
                {toFixed(box.heightCmSupplier / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
              </Typography>

              <Typography>
                {t(TranslationKey.Weight) + ': '}
                {toFixedWithKg(box.weighGrossKgSupplier, 2)}
              </Typography>

              <Typography>
                {t(TranslationKey['Volume weight']) + ': '}
                {toFixedWithKg(
                  ((parseFloat(box.lengthCmSupplier) || 0) *
                    (parseFloat(box.heightCmSupplier) || 0) *
                    (parseFloat(box.widthCmSupplier) || 0)) /
                    volumeWeightCoefficient,
                  2,
                )}
              </Typography>

              <Typography>
                {t(TranslationKey['Final weight']) + ': '}
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
              <Typography>
                {t(TranslationKey.Length) + ': '}
                {toFixed(box.lengthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
              </Typography>
              <Typography>
                {t(TranslationKey.Width) + ': '}
                {toFixed(box.widthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
              </Typography>
              <Typography>
                {t(TranslationKey.Height) + ': '}
                {toFixed(box.heightCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
              </Typography>

              <Typography>
                {t(TranslationKey.Weight) + ': '}
                {toFixedWithKg(box.weighGrossKgWarehouse, 2)}
              </Typography>
              <Typography>
                {t(TranslationKey['Volume weight']) + ': '}
                {toFixedWithKg(
                  ((parseFloat(box.lengthCmWarehouse) || 0) *
                    (parseFloat(box.heightCmWarehouse) || 0) *
                    (parseFloat(box.widthCmWarehouse) || 0)) /
                    volumeWeightCoefficient,
                  2,
                )}
              </Typography>
              <Typography>
                {t(TranslationKey['Final weight']) + ': '}
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
        </div>

        <div className={classNames.imagesWrapper}>
          {box.images && (
            <div className={classNames.photoWrapper}>
              <Typography>{t(TranslationKey['Box photos:'])}</Typography>

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
                <Typography>{t(TranslationKey['No photos yet...'])}</Typography>
              )}
            </div>
          )}

          {box.items[0].order.images && (
            <div className={classNames.photoWrapper}>
              <Typography>{t(TranslationKey['Order photos:'])}</Typography>

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
                <Typography>{t(TranslationKey['No photos yet...'])}</Typography>
              )}
            </div>
          )}
        </div>
      </Paper>

      <div>
        <div className={classNames.chipWrapper}>
          <Typography className={classNames.subTitle}>{t(TranslationKey['Shipping label']) + ':'}</Typography>

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
          label={t(TranslationKey['Shipping label was glued to the warehouse'])}
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
          <div className={classNames.editBtnWrapper}>
            {isEdit && (
              <Button
                className={classNames.editBtn}
                onClick={() => {
                  setCurBox(box)
                  onClickEditBox(box)
                }}
              >
                {t(TranslationKey.Edit)}
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
      <Typography className={classNames.sectionTitle}>{t(TranslationKey['New boxes'])}</Typography>

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
        <Typography className={classNames.sectionTitle}>{t(TranslationKey.Incoming)}</Typography>

        {/* {taskType !== TaskOperationType.MERGE && taskType !== TaskOperationType.SPLIT && (
          <div className={classNames.fieldsWrapper}>
            <Field disabled label={t(TranslationKey.Warehouse)} value={currentBoxes[0].destination?.name} />

            <Field disabled label={t(TranslationKey.Tariff)} value={currentBoxes[0].logicsTariff?.name || 'N/A'} />

            {taskType === TaskOperationType.RECEIVE && (
              <Field
                disabled
                label={t(TranslationKey.Status)}
                value={getOrderStatusOptionByCode(currentBoxes[0].items?.[0].order.status)?.label}
              />
            )}
          </div>
        )} */}

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
