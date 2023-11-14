import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useState } from 'react'

import { operationTypes } from '@constants/keys/operation-types'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxSplit } from '@components/shared/boxes/box-split'
import { Button } from '@components/shared/buttons/button'

import { filterEmptyBoxes, filterEmptyOrders } from '@utils/filters'
import { t } from '@utils/translations'

import { useClassNames } from './storekeeper-redistribute-box-modal.style'

import { Box } from './box/box'
import { NewBoxes } from './new-boxes/new-boxes'

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
      <div className={classNames.wrapper}>
        <div className={classNames.modalTitleWrapper}>
          <p className={classNames.modalTitle}>{t(TranslationKey['Box redistributing'])}</p>
          <BoxSplit />
        </div>

        <div className={classNames.boxesWrapper}>
          <div className={classNames.currentBox}>
            <div className={classNames.currentBoxTitle}>
              <p className={classNames.sectionTitle}>{t(TranslationKey.Redistribute)}</p>
              <p className={classNames.boxTitle}>{`${t(TranslationKey.Box)} № ${currentBox?.humanFriendlyId}`}</p>
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
