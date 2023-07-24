import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Chip, IconButton, Link, Typography } from '@mui/material'

import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { operationTypes } from '@constants/keys/operation-types'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { EditBoxTasksModal } from '@components/warehouse/edit-task-modal/edit-box-tasks-modal'

import { checkIsPositiveNum } from '@utils/checks'
import { filterEmptyBoxes, filterEmptyOrders } from '@utils/filters'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
// import {checkAndMakeAbsoluteUrl} from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './storekeeper-redistribute-box-modal.style'

const Box = ({
  destinations,
  storekeepers,
  box,
  readOnly = false,
  boxIsMasterBox,
  isMasterBox,
  selectedBox,
  onChangeAmountInput,
  onRemoveBox,
  onChangeField,
  isNewBox,
  totalProductsAmount,
  destinationsFavourites,
  setDestinationsFavouritesItem,
  onClickEditBox,
  setCurBox,
  onClickApplyAllBtn,
}) => {
  const { classes: classNames } = useClassNames()

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
  const [showFullCard, setShowFullCard] = useState(true)

  const setShippingLabel = () => value => {
    onChangeField({ target: { value } }, 'tmpShippingLabel', box._id)
  }

  const onClickShippingLabel = () => {
    setShowSetShippingLabelModal(!showSetShippingLabelModal)
  }

  const onDeleteShippingLabel = () => {
    onChangeField({ target: { value: '' } }, 'shippingLabel', box._id)
  }

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

  const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId, variationTariffId, destinationId) => {
    onChangeField({ storekeeperId, logicsTariffId: tariffId, variationTariffId, destinationId }, 'part', box._id)

    setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
  }

  const curDestination = destinations.find(el => el._id === box.destinationId)
  const currentStorekeeper = storekeepers.find(el => el._id === box.storekeeperId)
  const currentLogicsTariff = currentStorekeeper?.tariffLogistics.find(el => el._id === box.logicsTariffId)

  const firstNumOfCode = curDestination?.zipCode[0]

  const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  const tariffName = currentLogicsTariff?.name

  const tariffRate =
    currentLogicsTariff?.conditionsByRegion[regionOfDeliveryName]?.rate ||
    currentLogicsTariff?.destinationVariations?.find(el => el._id === box?.variationTariffId)?.pricePerKgUsd

  return (
    <div className={classNames.box}>
      <div className={classNames.itemWrapper}>
        <div>
          {box?.items?.map((order, orderIndex) => (
            <div key={`box_${box?._id}_${readOnly ? 1 : 0}_${orderIndex}`}>
              <div key={orderIndex} className={classNames.order}>
                <img className={classNames.img} src={getAmazonImageUrl(order.product.images[0])} />
                <div>
                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asinTitle}>{t(TranslationKey.ASIN)}</Typography>
                    <Typography className={classNames.asinValue}>{order.product.asin}</Typography>
                  </div>

                  <Typography className={classNames.title}>{order.product.amazonTitle}</Typography>
                </div>

                <div>
                  <Field
                    disabled={readOnly}
                    label={t(TranslationKey.Quantity)}
                    className={classNames.orderInput}
                    labelClasses={classNames.label}
                    value={isMasterBox ? (boxIsMasterBox ? selectedBox.amount : 1) : order.amount}
                    tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                    onChange={e => checkIsPositiveNum(e.target.value) && onChangeAmountInput(e, box._id, order.order)}
                  />
                </div>
              </div>
              {isMasterBox ? (
                <Typography className={classNames.subTitle}>{`${t(TranslationKey['Units in a box'])} ${
                  box.items[0].amount
                }`}</Typography>
              ) : undefined}
            </div>
          ))}
          {showFullCard ? (
            <div className={classNames.itemSubWrapper}>
              <Field
                containerClasses={classNames.field}
                tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                label={t(TranslationKey.Destination)}
                labelClasses={classNames.label}
                inputComponent={
                  <WithSearchSelect
                    disabled={!isNewBox}
                    width={220}
                    selectedItemName={
                      destinations.find(el => el._id === (isNewBox ? box.destinationId : box.destination?._id))?.name ||
                      t(TranslationKey['Not chosen'])
                    }
                    data={
                      box?.variationTariffId
                        ? destinations
                            ?.filter(el => el.storekeeper?._id !== box?.storekeeper?._id)
                            ?.filter(el => el._id === box?.destinationId)
                        : destinations?.filter(el => el.storekeeper?._id !== box?.storekeeper?._id)
                    }
                    searchFields={['name']}
                    favourites={destinationsFavourites}
                    onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                    onClickNotChosen={() => onChangeField({ target: { value: '' } }, 'destinationId', box._id)}
                    onClickSelect={el => onChangeField({ target: { value: el._id } }, 'destinationId', box._id)}
                  />
                }
              />

              <Field
                containerClasses={classNames.field}
                tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
                labelClasses={classNames.label}
                inputComponent={
                  <div>
                    {isNewBox ? (
                      <Button
                        disabled={!isNewBox}
                        variant={box.logicsTariffId && 'text'}
                        className={cx(
                          classNames.storekeeperBtnDefault,
                          { [classNames.storekeeperBtn]: !box.logicsTariffId },
                          {
                            [classNames.storekeeperBtnColored]:
                              !box.logicsTariffId && SettingsModel.uiTheme === UiTheme.light,
                          },
                          { [classNames.storekeeperDisableBtn]: !isNewBox },
                        )}
                        onClick={() =>
                          setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
                        }
                      >
                        {box.logicsTariffId
                          ? `${tariffName}${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                          : t(TranslationKey.Select)}
                      </Button>
                    ) : (
                      <Typography className={classNames.storekeeperDisableBtn}>{`${
                        box.logicsTariff?._id ? `${tariffName}${tariffRate ? ' / ' + tariffRate + ' $' : ''}` : 'none'
                      }`}</Typography>
                    )}
                  </div>
                }
              />

              <Field
                disabled={!isNewBox}
                inputProps={{ maxLength: 255 }}
                tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                containerClasses={classNames.field}
                labelClasses={classNames.label}
                inputClasses={cx(classNames.fieldInput, {
                  [classNames.inputAccent]:
                    (box.shippingLabel || box.tmpShippingLabel?.length) &&
                    !box.fbaShipment &&
                    !destinations.find(el => el._id === box.destinationId)?.storekeeper &&
                    isNewBox,
                })}
                label={t(TranslationKey['FBA Shipment'])}
                value={box.fbaShipment}
                onChange={e => onChangeField(e, 'fbaShipment', box._id)}
              />

              {!isNewBox ? (
                <Field
                  disabled={!isNewBox}
                  inputProps={{ maxLength: 255 }}
                  containerClasses={classNames.field}
                  labelClasses={classNames.label}
                  className={classNames.fieldInput}
                  label={t(TranslationKey['Shipping label'])}
                  value={box.shippingLabel}
                  inputComponent={
                    box.shippingLabel ? (
                      <div className={classNames.shippingLabelWrapper}>
                        <Link href={box.shippingLabel} target="_blank">
                          {t(TranslationKey.View)}
                        </Link>
                        <CopyValue text={box.shippingLabel} />
                      </div>
                    ) : (
                      <div className={classNames.shippingLabelWrapper}>
                        <Typography className={classNames.miss}>{t(TranslationKey['Not available'])}</Typography>
                      </div>
                    )
                  }
                />
              ) : null}

              {isNewBox ? (
                <div>
                  <Field
                    label={t(TranslationKey['Shipping label']) + ':'}
                    tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                    labelClasses={classNames.label}
                    inputComponent={
                      <Chip
                        classes={{
                          root: classNames.barcodeChip,
                          clickable: classNames.barcodeChipHover,
                          deletable: classNames.barcodeChipHover,
                          deleteIcon: classNames.barcodeChipIcon,
                          label: classNames.barcodeChiplabel,
                        }}
                        className={cx({ [classNames.barcodeChipExists]: box.shippingLabel })}
                        size="small"
                        label={
                          box.tmpShippingLabel?.length
                            ? t(TranslationKey['File added'])
                            : box.shippingLabel
                            ? box.shippingLabel
                            : t(TranslationKey['Set Shipping Label'])
                        }
                        onClick={() => onClickShippingLabel()}
                        onDelete={!box.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                      />
                    }
                  />
                </div>
              ) : null}
            </div>
          ) : null}

          {!isNewBox && (
            <div className={classNames.currentBoxFooter}>
              <Typography className={classNames.footerTitle}>{`${t(
                TranslationKey['Left to redistribute'],
              )}: ${totalProductsAmount}`}</Typography>
            </div>
          )}

          {isNewBox && (
            <div className={classNames.bottomBlockWrapper}>
              <IconButton classes={{ root: classNames.icon }} onClick={() => onRemoveBox(box._id)}>
                <DeleteOutlineOutlinedIcon className={classNames.deleteBtn} />
              </IconButton>
              <Button
                className={cx(classNames.editBtn, {
                  [classNames.editBtnYellow]:
                    !box.widthCmWarehouse ||
                    !box.weighGrossKgWarehouse ||
                    !box.lengthCmWarehouse ||
                    !box.heightCmWarehouse,
                })}
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
                className={classNames.applyAllBtn}
                onClick={() => {
                  onClickApplyAllBtn(box)
                }}
              >
                {t(TranslationKey['Apply to all'])}
              </Button>
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
      </div>

      <Modal
        openModal={showSetShippingLabelModal}
        setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
      >
        <SetShippingLabelModal
          tmpShippingLabel={box.tmpShippingLabel}
          item={box}
          onClickSaveShippingLabel={shippingLabel => {
            setShippingLabel()(shippingLabel)
            setShowSetShippingLabelModal(!showSetShippingLabelModal)
          }}
          onCloseModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        />
      </Modal>

      <Modal
        openModal={showSelectionStorekeeperAndTariffModal}
        setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
      >
        <SelectStorekeeperAndTariffForm
          showCheckbox
          destinationsData={destinations}
          storekeepers={storekeepers.filter(el => el?._id === box?.storekeeper?._id)}
          curStorekeeperId={box?.storekeeperId}
          curTariffId={box?.logicsTariffId}
          currentDestinationId={box?.destinationId}
          currentVariationTariffId={box?.variationTariffId}
          onSubmit={onSubmitSelectStorekeeperAndTariff}
        />
      </Modal>
    </div>
  )
}

const NewBoxes = ({
  newBoxes,
  isMasterBox,
  selectedBox,
  onChangeAmountInput,
  onRemoveBox,
  onChangeField,
  destinations,
  storekeepers,
  destinationsFavourites,
  setDestinationsFavouritesItem,
  showEditBoxModalR,
  onTriggerShowEditBoxModalR,
  volumeWeightCoefficient,
  onClickEditBox,
  setNewBoxes,
  onClickApplyAllBtn,
}) => {
  const { classes: classNames } = useClassNames()

  const [curBox, setCurBox] = useState({})

  return (
    <div className={classNames.newBoxes}>
      <div className={classNames.currentBoxTitle}>
        <Typography className={classNames.sectionTitle}>{t(TranslationKey['New boxes'])}</Typography>
      </div>

      {newBoxes.map((box, boxIndex) => (
        <div key={boxIndex} className={cx({ [classNames.marginBox]: newBoxes.length > 1 })}>
          <Box
            isNewBox
            destinations={destinations}
            storekeepers={storekeepers}
            index={boxIndex}
            box={box}
            readOnly={isMasterBox}
            isMasterBox={isMasterBox}
            curBox={curBox}
            setCurBox={setCurBox}
            showEditBoxModalR={showEditBoxModalR}
            selectedBox={selectedBox}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            onChangeAmountInput={onChangeAmountInput}
            onChangeField={onChangeField}
            onRemoveBox={onRemoveBox}
            onTriggerShowEditBoxModalR={onTriggerShowEditBoxModalR}
            onClickEditBox={onClickEditBox}
            onClickApplyAllBtn={onClickApplyAllBtn}
          />
        </div>
      ))}
      <Modal openModal={showEditBoxModalR} setOpenModal={onTriggerShowEditBoxModalR}>
        <EditBoxTasksModal
          // isReceive={taskType === TaskOperationType.RECEIVE}
          // primarySizeSuitableCheckbox={taskType === TaskOperationType.RECEIVE || taskType === TaskOperationType.EDIT}
          volumeWeightCoefficient={volumeWeightCoefficient}
          setEditModal={onTriggerShowEditBoxModalR}
          box={curBox}
          newBoxes={newBoxes}
          setNewBoxes={setNewBoxes}
          // operationType={taskType}
        />
      </Modal>
    </div>
  )
}

export const StorekeeperRedistributeBox = observer(
  ({
    destinations,
    storekeepers,
    requestStatus,
    // addNewBoxModal,
    // setAddNewBoxModal,
    selectedBox,
    onRedistribute,
    onTriggerOpenModal,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    showEditBoxModalR,
    onEditBox,
    onTriggerShowEditBoxModalR,
    volumeWeightCoefficient,
  }) => {
    const { classes: classNames } = useClassNames()

    const onClickEditBox = box => {
      onEditBox(box)
    }

    const [currentBox, setCurrentBox] = useState({
      ...selectedBox,
      destinationId: selectedBox.destination?._id || null,
      storekeeperId: selectedBox.storekeeper?._id || '',
      logicsTariffId: selectedBox.logicsTariff?._id || '',
      variationTariffId: selectedBox.variationTariff?._id || '',

      lengthCmWarehouse: 0,
      widthCmWarehouse: 0,
      heightCmWarehouse: 0,
      weighGrossKgWarehouse: 0,
      images: [],
    })

    const isMasterBox = selectedBox?.amount && selectedBox?.amount > 1

    const emptyProducts = currentBox?.items?.map(product => ({ ...product, amount: isMasterBox ? product.amount : 0 }))

    const getEmptyBox = () => ({
      ...currentBox,
      _id: 'new_id_' + Date.now(),
      items: emptyProducts,
      amount: 1,
      tmpShippingLabel: [],
    })

    const emptyBox = getEmptyBox()
    const [newBoxes, setNewBoxes] = useState([emptyBox])

    const totalProductsAmount = isMasterBox
      ? currentBox?.amount - newBoxes.length
      : currentBox?.items?.reduce((acc, order) => acc + order.amount, 0) || 0

    const onChangeAmountInput = (e, _id, order) => {
      const targetBox = newBoxes.filter(box => box._id === _id)[0]
      const targetProduct = targetBox.items.filter(product => product.order === order)[0]
      const updatedTargetProduct = { ...targetProduct, amount: Number(e.target.value) }
      const updatedTargetProducts = targetBox.items.map(product =>
        product.order === order ? updatedTargetProduct : product,
      )
      const updatedTargetBox = { ...targetBox, items: updatedTargetProducts }

      const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? updatedTargetBox : box))

      const currentOrder = selectedBox.items.filter(product => product.order === order)[0]
      const newBoxesProductAmount = updatedNewBoxes
        .map(box => box.items.filter(product => product.order === order)[0].amount)
        .reduce((acc, amount) => acc + amount, 0)
      const checkAmount = currentOrder.amount - newBoxesProductAmount
      if (checkAmount < 0) {
        return
      }
      const updatedCurrentOrder = { ...currentOrder, amount: checkAmount }
      const updatedCurrentOrders = currentBox?.items.map(product =>
        product.order === order ? updatedCurrentOrder : product,
      )
      const updatedCurrentBox = { ...currentBox, items: updatedCurrentOrders }

      setNewBoxes(updatedNewBoxes)
      setCurrentBox(updatedCurrentBox)
    }

    const onChangeField = (e, field, boxId) => {
      const targetBox = newBoxes.filter(newBox => newBox._id === boxId)[0]

      if (field === 'part') {
        const updatedTargetBox = {
          ...targetBox,
          ...e,
        }
        const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === boxId ? updatedTargetBox : newBox))
        setNewBoxes(updatedNewBoxes)
      } else {
        const updatedTargetBox = {
          ...targetBox,
          [field /* field === 'shippingLabel' ? e.target.value.replace(' ', '') :*/]: e.target.value,
        }
        const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === boxId ? updatedTargetBox : newBox))
        setNewBoxes(updatedNewBoxes)
      }
    }

    const onClickRedistributeBtn = () => {
      const newBoxesWithoutEmptyBox = filterEmptyBoxes(newBoxes)

      const newBoxesWithoutEmptyOrders = filterEmptyOrders(newBoxesWithoutEmptyBox)

      const beforeBox = selectedBox
      if (isMasterBox && totalProductsAmount > 1) {
        beforeBox.items[0].masterBoxAmount = totalProductsAmount
      }

      if (isMasterBox && totalProductsAmount > 0) {
        newBoxesWithoutEmptyOrders.push(beforeBox)
      }

      onRedistribute(
        selectedBox._id,
        newBoxesWithoutEmptyOrders.map(el => ({ ...el, destinationId: el.destinationId || null })),
        operationTypes.SPLIT,
        isMasterBox,
        selectedBox,
      )
    }

    const onRemoveBox = boxId => {
      const arr = newBoxes.filter(box => box._id !== boxId)
      setNewBoxes([...arr])

      if (!isMasterBox) {
        const boxForRemove = newBoxes.find(box => box._id === boxId)
        const newCurrentBox = currentBox
        for (let i = 0; i < newCurrentBox.items.length; i++) {
          newCurrentBox.items[i].amount += boxForRemove.items[i].amount
        }
        setCurrentBox(newCurrentBox)
      }
    }

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

    const disabledSubmitBtn =
      totalProductsAmount !== 0 ||
      requestStatus === loadingStatuses.isLoading ||
      filterEmptyBoxes(newBoxes).length < 2 ||
      filterEmptyBoxes(newBoxes).some(
        el =>
          (el.shippingLabel?.length < 5 && el.shippingLabel?.length > 0) ||
          el.logicsTariffId === '' ||
          ((el.shippingLabel || el.tmpShippingLabel?.length) &&
            !el.fbaShipment &&
            !destinations.find(e => e._id === el.destinationId)?.storekeeper) ||
          // Добавил новое условие для блокировки, убрать чтобы вернуться в предыдущему виду
          newBoxes.some(item => item.items.every(el => el.amount === 0)),
      ) ||
      filterEmptyBoxes(newBoxes).some(
        el =>
          el.lengthCmWarehouse === 0 ||
          el.widthCmWarehouse === 0 ||
          el.heightCmWarehouse === 0 ||
          el.weighGrossKgWarehouse === 0,
      )

    return (
      <div>
        <div className={classNames.modalTitleWrapper}>
          <Typography className={classNames.modalTitle}>{t(TranslationKey['Box redistributing'])}</Typography>
          <img src="/assets/img/split.png" />
        </div>

        <div className={classNames.boxesWrapper}>
          <div className={classNames.currentBox}>
            <div className={classNames.currentBoxTitle}>
              <Typography className={classNames.sectionTitle}>{t(TranslationKey.Redistribute)}</Typography>
              <Typography className={classNames.boxTitle}>{`${t(TranslationKey.Box)} № ${
                currentBox?.humanFriendlyId
              }`}</Typography>
            </div>

            <Box
              readOnly
              destinations={destinations}
              storekeepers={storekeepers}
              boxIsMasterBox={isMasterBox}
              box={currentBox}
              totalProductsAmount={totalProductsAmount}
              index={0}
              isMasterBox={isMasterBox}
              selectedBox={selectedBox}
              destinationsFavourites={destinationsFavourites}
              setDestinationsFavouritesItem={setDestinationsFavouritesItem}
              onChangeAmountInput={onChangeAmountInput}
              onClickEditBox={onClickEditBox}
            />
          </div>

          <NewBoxes
            volumeWeightCoefficient={volumeWeightCoefficient}
            newBoxes={newBoxes}
            isMasterBox={isMasterBox}
            selectedBox={selectedBox}
            destinations={destinations}
            storekeepers={storekeepers}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            showEditBoxModalR={showEditBoxModalR}
            setNewBoxes={setNewBoxes}
            onTriggerShowEditBoxModalR={onTriggerShowEditBoxModalR}
            onChangeAmountInput={onChangeAmountInput}
            onChangeField={onChangeField}
            onRemoveBox={onRemoveBox}
            onClickEditBox={onClickEditBox}
            onClickApplyAllBtn={onClickApplyAllBtn}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            tooltipInfoContent={t(TranslationKey['Add a new box to the task'])}
            disabled={totalProductsAmount < 1 && isMasterBox}
            className={classNames.button}
            onClick={() => {
              setNewBoxes(newBoxes.concat(getEmptyBox()))
            }}
          >
            {t(TranslationKey['Create a new box'])}
          </Button>
          <Button
            tooltipInfoContent={t(TranslationKey['Create a task to split the box'])}
            disabled={disabledSubmitBtn}
            className={classNames.button}
            onClick={onClickRedistributeBtn}
          >
            {t(TranslationKey.Redistribute)}
          </Button>

          <Button
            variant="text"
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            className={cx(classNames.button, classNames.cancelButton)}
            onClick={() => {
              onTriggerOpenModal('showRedistributeBoxModal')
            }}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  },
)
