/* eslint-disable no-unused-vars */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import React, {useState} from 'react'

import {Divider, Typography, Paper, Checkbox, Link, Tooltip, Avatar} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TaskOperationType} from '@constants/task-operation-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {CustomCarousel, PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {Modal} from '@components/modal'
import {Text} from '@components/text'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'

import {checkAndMakeAbsoluteUrl, getFullTariffTextForBoxOrOrder, toFixed, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

import {EditBoxTasksModal} from '../edit-task-modal/edit-box-tasks-modal'
import {useClassNames} from './before-after-block.style'
import {BoxItemCard} from './box-item-card'
import {ShortBoxItemCard} from './short-box-item-card'

const Box = observer(
  ({
    box,
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
  }) => {
    const classNames = useClassNames()

    const [showFullCard, setShowFullCard] = useState(isEdit && newBoxes[0]._id === box._id ? true : false)

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

    const renderImageInfo = (img, imgName) => (
      <div className={classNames.tooltipWrapper}>
        <Avatar
          variant="square"
          alt={imgName}
          src={img ? img : '/assets/icons/file.png'}
          className={classNames.tooltipImg}
        />

        {typeof img === 'string' ? (
          <Typography className={classNames.linkTypo}>{imgName}</Typography>
        ) : (
          <Typography className={classNames.tooltipText}>{imgName}</Typography>
        )}
      </div>
    )

    return (
      <div className={classNames.mainPaper}>
        <div className={classNames.fieldsWrapper}>
          <div>
            <Field
              disabled
              tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
              label={t(TranslationKey.Warehouse)}
              labelClasses={classNames.smallLabel}
              value={box.destination?.name ? box.destination?.name : t(TranslationKey['Not available'])}
              className={classNames.field}
            />
          </div>

          <div>
            <Field
              disabled
              tooltipInfoContent={t(TranslationKey['Selected shipping tariff to USA'])}
              label={t(TranslationKey.Tariff)}
              labelClasses={classNames.smallLabel}
              value={getFullTariffTextForBoxOrOrder(box) || 'N/A'}
              className={classNames.field}
            />
          </div>
        </div>

        {box.amount > 1 && (
          <div className={classNames.superWrapper}>
            <Typography className={classNames.subTitle}>{t(TranslationKey.Super) + ' '}</Typography>
            <Typography>{`x${box.amount}`}</Typography>
          </div>
        )}
        {(!showFullCard && isEdit) || (!showFullCard && taskType === TaskOperationType.MERGE) ? (
          <Paper className={classNames.boxWrapper}>
            <div className={classNames.itemsWrapper}>
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
          <Paper className={classNames.boxWrapper}>
            <div className={classNames.itemsWrapper}>
              {box.items?.map((item, index) => (
                <div key={`boxItem_${box.items?.[0].product?._id}_${index}`}>
                  <BoxItemCard
                    taskType={taskType}
                    readOnly={readOnly}
                    item={item}
                    boxId={box.humanFriendlyId}
                    index={index}
                    superCount={box.amount}
                    isNewBox={isNewBox}
                    onChangeBarCode={onChangeBarCode}
                  />
                </div>
              ))}
            </div>
            <div className={clsx(classNames.boxInfoWrapper)}>
              <div>
                <Typography className={classNames.categoryTitle}>
                  {isCurrentBox && taskType === TaskOperationType.RECEIVE
                    ? t(TranslationKey['Sizes from supplier:'])
                    : t(TranslationKey['Sizes from storekeeper:'])}
                </Typography>

                <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                  <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                    {'In'}
                  </ToggleBtn>
                  <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                    {'Cm'}
                  </ToggleBtn>
                </ToggleBtnGroup>

                {isCurrentBox && taskType === TaskOperationType.RECEIVE ? (
                  <div className={classNames.demensionsWrapper}>
                    <Typography className={classNames.mobileDemensions}>
                      {t(TranslationKey.Length) + ': '}

                      {toFixed(box.lengthCmSupplier / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                    </Typography>
                    <Typography className={classNames.mobileDemensions}>
                      {t(TranslationKey.Width) + ': '}
                      {toFixed(box.widthCmSupplier / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                    </Typography>
                    <Typography className={classNames.mobileDemensions}>
                      {t(TranslationKey.Height) + ': '}
                      {toFixed(box.heightCmSupplier / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                    </Typography>

                    <Typography className={classNames.mobileDemensions}>
                      {t(TranslationKey.Weight) + ': '}
                      {toFixedWithKg(box.weighGrossKgSupplier, 2)}
                    </Typography>

                    <Typography className={classNames.mobileDemensions}>
                      {t(TranslationKey['Volume weight']) + ': '}
                      {toFixedWithKg(
                        ((parseFloat(box.lengthCmSupplier) || 0) *
                          (parseFloat(box.heightCmSupplier) || 0) *
                          (parseFloat(box.widthCmSupplier) || 0)) /
                          volumeWeightCoefficient,
                        2,
                      )}
                    </Typography>

                    <Typography className={classNames.mobileDemensions}>
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
                    <Typography className={classNames.mobileDemensions}>
                      {t(TranslationKey.Length) + ': '}
                      {toFixed(box.lengthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                    </Typography>
                    <Typography className={classNames.mobileDemensions}>
                      {t(TranslationKey.Width) + ': '}
                      {toFixed(box.widthCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                    </Typography>
                    <Typography className={classNames.mobileDemensions}>
                      {t(TranslationKey.Height) + ': '}
                      {toFixed(box.heightCmWarehouse / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)}
                    </Typography>

                    <Typography className={classNames.mobileDemensions}>
                      {t(TranslationKey.Weight) + ': '}
                      {toFixedWithKg(box.weighGrossKgWarehouse, 2)}
                    </Typography>
                    <Typography className={classNames.mobileDemensions}>
                      {t(TranslationKey['Volume weight']) + ': '}
                      {toFixedWithKg(
                        ((parseFloat(box.lengthCmWarehouse) || 0) *
                          (parseFloat(box.heightCmWarehouse) || 0) *
                          (parseFloat(box.widthCmWarehouse) || 0)) /
                          volumeWeightCoefficient,
                        2,
                      )}
                    </Typography>
                    <Typography className={classNames.mobileDemensions}>
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
                    <Typography className={classNames.photoAndFilesTitle}>{`${t(
                      TranslationKey['Photos and documents of the box'],
                    )}:`}</Typography>
                    <div className={classNames.photoSubWrapper}>
                      <PhotoAndFilesCarousel
                        small
                        direction={window.screen.width < 768 ? 'column' : 'row'}
                        files={box.images}
                        width={'350px'}
                      />
                    </div>

                    {isNewBox && box.tmpImages?.length ? (
                      <div>
                        <Typography className={classNames.greenText}>{`${t(TranslationKey['New files'])}: (+ ${
                          box.tmpImages?.length
                        })`}</Typography>
                        <CustomCarousel>
                          {box.tmpImages?.map((image, index) =>
                            typeof image === 'string' ? (
                              <div key={index} className={classNames.imageLinkListItem}>
                                <Tooltip
                                  title={renderImageInfo(image, image)}
                                  classes={{popper: classNames.imgTooltip}}
                                >
                                  <Avatar className={classNames.image} src={image} alt={image} variant="square" />
                                </Tooltip>

                                <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(image)}>
                                  <Typography className={classNames.linkName}>{image}</Typography>
                                </Link>
                              </div>
                            ) : (
                              <div key={index} className={classNames.imageListItem}>
                                <Tooltip
                                  title={renderImageInfo(image.data_url, image.file.name)}
                                  classes={{popper: classNames.imgTooltip}}
                                >
                                  <img
                                    className={classNames.image}
                                    src={image.file.type.includes('image') ? image.data_url : '/assets/icons/file.png'}
                                    alt={image.file.name}
                                  />
                                </Tooltip>

                                <Typography className={classNames.fileName}>{image.file.name} </Typography>
                              </div>
                            ),
                          )}
                        </CustomCarousel>
                      </div>
                    ) : null}
                  </div>
                )}

                {box.items[0].order.images && (
                  <div className={classNames.photoWrapper}>
                    <Typography className={classNames.photoAndFilesTitle}>{`${t(
                      TranslationKey['Photos and order documents'],
                    )}:`}</Typography>
                    <div className={classNames.photoSubWrapper}>
                      <PhotoAndFilesCarousel
                        small
                        direction={window.screen.width < 768 ? 'column' : 'row'}
                        files={box.items[0].order.images}
                        width="350px"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={classNames.footerWrapper}>
              <div className={classNames.chipWrapper}>
                <Text
                  tooltipInfoContent={t(TranslationKey['Availability of shipping label'])}
                  className={classNames.subTitle}
                >
                  {t(TranslationKey['Shipping label']) + ':'}
                </Text>

                {box.shippingLabel ? (
                  <div className={classNames.barCode}>
                    <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
                      <Typography className={classNames.barCodeField}>{t(TranslationKey.View)}</Typography>
                    </Link>
                    <CopyValue text={box.shippingLabel} />
                  </div>
                ) : (
                  <Typography className={classNames.link}>{t(TranslationKey['Not available'])}</Typography>
                )}
              </div>
              <div>
                <Field
                  oneLine
                  containerClasses={classNames.checkboxContainer}
                  labelClasses={classNames.label}
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
          </Paper>
        )}

        {isNewBox && (
          <div className={classNames.bottomBlockWrapper}>
            <div className={clsx(classNames.editBtnWrapper, {[classNames.noEditBtnWrapper]: readOnly})}>
              {isEdit && !readOnly && (
                <div>
                  <Button
                    className={classNames.editBtn}
                    tooltipInfoContent={t(TranslationKey['Edit box parameters'])}
                    onClick={() => {
                      setCurBox(box)
                      onClickEditBox(box)
                    }}
                  >
                    {t(TranslationKey.Edit)}
                  </Button>
                </div>
              )}
              <div className={classNames.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
                <Typography className={classNames.tablePanelViewText}>
                  {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                </Typography>

                {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
              </div>
            </div>
          </div>
        )}
        {!isNewBox && taskType === TaskOperationType.MERGE && (
          <div className={classNames.bottomBlockWrapper}>
            <div className={classNames.incomingBtnWrapper}>
              <div className={classNames.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
                <Typography className={classNames.tablePanelViewText}>
                  {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                </Typography>

                {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  },
)

const ReceiveBoxes = ({taskType, onClickOpenModal}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.receiveBoxWrapper}>
      <div className={classNames.receiveBox}>
        <img src="/assets/img/receive-big.png" className={classNames.imageBox} />
        <Typography className={classNames.receiveBoxTitle}>
          {t(TranslationKey['Add boxes that have arrived in stock'])}
        </Typography>
        <div className={classNames.buttonWrapper}>
          {taskType === TaskOperationType.RECEIVE && (
            <Button
              disableElevation
              className={classNames.button}
              // tooltipInfoContent={newBoxes.length === 0 && t(TranslationKey['Create new box parameters'])}
              color="primary"
              variant="contained"
              onClick={onClickOpenModal}
            >
              {t(TranslationKey.Receive)}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const NewBoxes = observer(
  ({
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
  }) => {
    const classNames = useClassNames()

    const [curBox, setCurBox] = useState({})

    return (
      <div className={classNames.newBoxes}>
        <Text
          tooltipInfoContent={t(TranslationKey['New box condition'])}
          className={classNames.sectionTitle}
          containerClasses={classNames.sectionTitleWrapper}
        >
          {t(TranslationKey['New boxes'])}
        </Text>
        <div className={classNames.newBoxesWrapper}>
          {newBoxes.map((box, boxIndex) => (
            <Box
              key={boxIndex}
              readOnly={readOnly}
              volumeWeightCoefficient={volumeWeightCoefficient}
              isNewBox={isNewBox}
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
            />
          ))}
        </div>

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
  },
)

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
    onClickOpenModal,
    readOnly,
  }) => {
    const classNames = useClassNames()

    const onClickEditBox = box => {
      onEditBox(box)
    }

    return (
      <div className={classNames.boxesWrapper}>
        <div className={classNames.currentBox}>
          <Text
            tooltipInfoContent={t(TranslationKey['Previous condition of the box'])}
            className={classNames.sectionTitle}
            containerClasses={classNames.sectionTitleWrapper}
          >
            {t(TranslationKey.Incoming)}
          </Text>

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
          <div className={classNames.newBoxesWrapper}>
            {incomingBoxes &&
              incomingBoxes.map((box, boxIndex) => (
                <>
                  <Box
                    key={boxIndex}
                    isCurrentBox
                    readOnly={readOnly}
                    box={box}
                    taskType={taskType}
                    volumeWeightCoefficient={volumeWeightCoefficient}
                  />
                  {/* {taskType === TaskOperationType.MERGE && (
                  <div
                    className={classNames.tablePanelSortWrapper}
                    onClick={() => setShowFullIncomingCard(!showFullIncomingCard)}
                  >
                    <Typography className={classNames.tablePanelViewText}>
                      {showFullIncomingCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                    </Typography>

                    {!showFullIncomingCard ? (
                      <ArrowDropDownIcon color="primary" />
                    ) : (
                      <ArrowDropUpIcon color="primary" />
                    )}
                  </div>
                )} */}
                </>
              ))}
          </div>
        </div>

        {desiredBoxes.length > 0 && <Divider flexItem className={classNames.divider} orientation="vertical" />}

        {desiredBoxes.length > 0 && (
          <NewBoxes
            isNewBox
            readOnly={readOnly}
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
        {taskType === TaskOperationType.RECEIVE &&
          desiredBoxes.length === 0 &&
          incomingBoxes.length > 0 &&
          !readOnly && <ReceiveBoxes taskType={taskType} onClickOpenModal={onClickOpenModal} />}
      </div>
    )
  },
)
