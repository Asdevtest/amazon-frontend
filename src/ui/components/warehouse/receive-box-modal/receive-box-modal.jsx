import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Divider, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddFilesForm } from '@components/forms/add-files-form'
import { CheckQuantityForm } from '@components/forms/check-quantity-form'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './receive-box-modal.style'

import { CurrentBox, NewBoxes } from './components'

export const ReceiveBoxModal = ({ setOpenModal, setSourceBoxes, volumeWeightCoefficient, boxesBefore }) => {
  const { classes: styles, cx } = useStyles()
  const [showNoDimensionsErrorModal, setShowNoDimensionsErrorModal] = useState(false)
  const [showAddImagesModal, setShowAddImagesModal] = useState(false)

  const [showCheckQuantityModal, setShowCheckQuantityModal] = useState(false)

  const isManyItemsInSomeBox = boxesBefore.some(box => box.items.length > 1)

  const noTariffInSomeBox = boxesBefore.some(box => !box.logicsTariff)

  const receiveNotFromBuyer = isManyItemsInSomeBox || noTariffInSomeBox

  const emptyProducts = boxesBefore[0].items.map(product => ({ ...product, amount: '' }))

  const getEmptyBox = () => {
    const emptyBox = { ...boxesBefore[0], _id: 'new_id_' + Date.now(), items: emptyProducts, amount: 1 }

    const emptyBoxWithDemensions = {
      ...emptyBox,
      lengthCmWarehouse: emptyBox?.lengthCmWarehouse || '',
      widthCmWarehouse: emptyBox?.widthCmWarehouse || '',
      heightCmWarehouse: emptyBox?.heightCmWarehouse || '',
      weighGrossKgWarehouse: emptyBox?.weighGrossKgWarehouse || '',
      volumeWeightKgWarehouse: emptyBox?.volumeWeightKgWarehouse || '',
      weightFinalAccountingKgWarehouse: emptyBox?.weightFinalAccountingKgWarehouse || '',
      tmpImages: [],
      images: (emptyBox?.images === null ? [] : emptyBox?.images) || [],
    }

    return emptyBoxWithDemensions
  }

  const getStartBoxes = () => {
    const newArr = boxesBefore.map((el, index) => {
      const startBox = {
        ...el,
        _id: 'new_id_' + index + Date.now(),
        items: el.items.map(product => ({ ...product })),
      }

      const volumeWeight =
        ((parseFloat(el.lengthCmSupplier) || 0) *
          (parseFloat(el.heightCmSupplier) || 0) *
          (parseFloat(el.widthCmSupplier) || 0)) /
        volumeWeightCoefficient

      const weightFinalAccountingKg = Math.max(parseFloat(volumeWeight) || 0, parseFloat(el.weighGrossKgSupplier) || 0)

      const startBoxWithDemensions = {
        ...startBox,
        lengthCmWarehouse: el?.lengthCmSupplier || '',
        widthCmWarehouse: el?.widthCmSupplier || '',
        heightCmWarehouse: el?.heightCmSupplier || '',
        weighGrossKgWarehouse: el?.weighGrossKgSupplier || '',

        volumeWeightKgWarehouse: volumeWeight || '',

        weightFinalAccountingKgWarehouse: weightFinalAccountingKg || '',
        tmpImages: [],
        images: (startBox?.images === null ? [] : startBox?.images) || [],
      }

      return startBoxWithDemensions
    })

    return newArr
  }

  const [newBoxes, setNewBoxes] = useState(getStartBoxes())

  const actuallyAssembled = newBoxes.reduce((acc, box) => acc + box.items[0].amount * box.amount, 0)
  const totalProductsAmount =
    boxesBefore.reduce(
      (accum, current) => (accum += current.items.reduce((acc, order) => acc + order.amount * current.amount, 0)),
      0,
    ) - actuallyAssembled

  const onChangeFieldInput = (e, _id, field) => {
    const targetBox = newBoxes.filter(box => box._id === _id)[0]

    if (
      isNaN(e.target.value) ||
      Number(e.target.value) < 0 ||
      (field === 'amount' && Number(e.target.value) === 0 && e.target.value !== '')
    ) {
      return
    }

    targetBox[field] =
      field === 'amount' ? (e.target.value !== '' ? Number(e.target.value) : e.target.value) : e.target.value

    targetBox.volumeWeightKgWarehouse =
      ((parseFloat(targetBox.lengthCmWarehouse) || 0) *
        (parseFloat(targetBox.heightCmWarehouse) || 0) *
        (parseFloat(targetBox.widthCmWarehouse) || 0)) /
      volumeWeightCoefficient
    targetBox.weightFinalAccountingKgWarehouse = Math.max(
      parseFloat(targetBox.volumeWeightKgWarehouse) || 0,
      parseFloat(targetBox.weighGrossKgWarehouse) || 0,
    )

    const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? targetBox : box))
    setNewBoxes(updatedNewBoxes)
  }

  const onChangeQtyInput = (e, _id, order) => {
    if (isNaN(e.target.value) || Number(e.target.value) < 0) {
      return
    }
    const targetBox = newBoxes.filter(box => box._id === _id)[0]
    const targetProduct = targetBox.items.filter(product => product.order === order)[0]
    const updatedTargetProduct = { ...targetProduct, amount: Number(e.target.value) }
    const updatedTargetProducts = targetBox.items.map(product =>
      product.order === order ? updatedTargetProduct : product,
    )
    const updatedTargetBox = { ...targetBox, items: updatedTargetProducts }
    const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? updatedTargetBox : box))

    setNewBoxes(updatedNewBoxes)
  }

  const onRemoveBox = boxId => {
    const updatedNewBoxes = newBoxes.filter(box => box._id !== boxId)
    setNewBoxes(updatedNewBoxes)
  }

  const addDouble = boxId => {
    const foundedBox = newBoxes.find(box => box._id === boxId)

    const copyedBox = { ...JSON.parse(JSON.stringify(foundedBox)), tmpImages: foundedBox.tmpImages }

    const updatedNewBoxes = [...newBoxes, { ...copyedBox, _id: `${copyedBox._id} + 'double' ${Date.now()}` }]
    setNewBoxes(updatedNewBoxes)
  }

  const [boxForImageEdit, setBoxForImageEdit] = useState({})

  const onAddImages = boxId => {
    setShowAddImagesModal(!showAddImagesModal)
    const editingBox = newBoxes.find(box => box._id === boxId)

    setBoxForImageEdit(editingBox)
  }

  const onClickRedistributeBtn = async () => {
    try {
      const newBoxesWithoutEmptyBoxes = newBoxes
        .map(box => ({ ...box, items: box.items.filter(e => e.amount > 0) }))
        .filter(el => el.items[0].amount !== (0 || ''))

      const newBoxesWithoutNumberFields = newBoxesWithoutEmptyBoxes.map(el => ({
        ...el,

        items: el?.items?.map(item => ({
          ...item,
          isTransparencyFileAlreadyAttachedByTheSupplier: item?.isTransparencyFileAlreadyAttachedByTheSupplier || false,
          isTransparencyFileAttachedByTheStorekeeper: item?.isTransparencyFileAttachedByTheStorekeeper || false,
        })),

        lengthCmWarehouse: parseFloat(el?.lengthCmWarehouse) || '',
        widthCmWarehouse: parseFloat(el?.widthCmWarehouse) || '',
        heightCmWarehouse: parseFloat(el?.heightCmWarehouse) || '',
        weighGrossKgWarehouse: parseFloat(el?.weighGrossKgWarehouse) || '',
        volumeWeightKgWarehouse: parseFloat(el?.volumeWeightKgWarehouse) || '',
        weightFinalAccountingKgWarehouse: parseFloat(el?.weightFinalAccountingKgWarehouse) || '',
      }))

      setSourceBoxes(newBoxesWithoutNumberFields)
      setOpenModal()
    } catch (error) {
      setShowNoDimensionsErrorModal(!showNoDimensionsErrorModal)
    }
  }

  const isSomeBoxHasntImage = newBoxes.some(box => !box?.tmpImages?.length && !box?.images?.length)

  const disableSubmit = newBoxes.some(box => box.amount === '') || (isSomeBoxHasntImage && !receiveNotFromBuyer)

  return (
    <div className={styles.root}>
      <div className={styles.modalHeaderWrapper}>
        <Typography className={styles.modalTitle}>{t(TranslationKey['Receive and distribute'])}</Typography>

        {!receiveNotFromBuyer && (
          <div className={styles.addButtonWrapper}>
            <Button
              className={styles.addButton}
              tooltipInfoContent={t(TranslationKey['Add a box'])}
              onClick={() => {
                setNewBoxes(newBoxes.concat(getEmptyBox()))
              }}
            >
              {t(TranslationKey['New box'])}
              <AddIcon fontSize="small" className={styles.icon} />
            </Button>
          </div>
        )}
      </div>

      <div className={styles.boxesWrapper}>
        {!receiveNotFromBuyer && (
          <CurrentBox
            boxesBefore={boxesBefore}
            volumeWeightCoefficient={volumeWeightCoefficient}
            totalProductsAmount={totalProductsAmount}
            actuallyAssembled={actuallyAssembled}
          />
        )}

        {!receiveNotFromBuyer && <Divider flexItem className={styles.divider} orientation="vertical" />}

        <NewBoxes
          newBoxes={newBoxes}
          addDouble={addDouble}
          onChangeQtyInput={onChangeQtyInput}
          onChangeFieldInput={onChangeFieldInput}
          onRemoveBox={onRemoveBox}
          onAddImages={onAddImages}
        />
      </div>

      <div className={styles.addButtonWrapperMobile}>
        <Button
          className={styles.addButtonMobile}
          tooltipInfoContent={t(TranslationKey['Add a box'])}
          onClick={() => setNewBoxes(newBoxes.concat(getEmptyBox()))}
        >
          {t(TranslationKey['New box'])}
          <AddIcon fontSize="small" className={styles.icon} />
        </Button>
      </div>

      <div className={styles.buttonsWrapper}>
        {isSomeBoxHasntImage && (
          <p className={styles.noImageText}>{t(TranslationKey['Be sure to add a photo to the box'])}</p>
        )}

        <Button
          success
          disabled={disableSubmit}
          className={styles.button}
          onClick={() => {
            receiveNotFromBuyer
              ? onClickRedistributeBtn()
              : totalProductsAmount === 0
              ? onClickRedistributeBtn()
              : setShowCheckQuantityModal(!showCheckQuantityModal)
          }}
        >
          {t(TranslationKey.Save)}
        </Button>

        <Button variant="text" className={cx(styles.button, styles.cancelButton)} onClick={setOpenModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>

      <WarningInfoModal
        openModal={showNoDimensionsErrorModal}
        setOpenModal={() => setShowNoDimensionsErrorModal(!showNoDimensionsErrorModal)}
        title={t(TranslationKey['Enter the dimensions of all the boxes'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          setShowNoDimensionsErrorModal(!showNoDimensionsErrorModal)
        }}
      />

      <Modal
        openModal={showAddImagesModal}
        setOpenModal={() => setShowAddImagesModal(!showAddImagesModal)}
        onCloseModal={() => setShowAddImagesModal(!showAddImagesModal)}
      >
        <AddFilesForm
          item={boxForImageEdit}
          allItemsArray={newBoxes}
          setAllItemsArray={setNewBoxes}
          onCloseModal={() => setShowAddImagesModal(!showAddImagesModal)}
        />
      </Modal>

      <Modal openModal={showCheckQuantityModal} setOpenModal={() => setShowCheckQuantityModal(!showCheckQuantityModal)}>
        <CheckQuantityForm
          title={t(TranslationKey['Confirmation of goods quantity'])}
          description={t(TranslationKey['Enter the amount of goods that came into the warehouse']) + ':'}
          acceptText={t(TranslationKey.Save) + '?'}
          comparisonQuantity={actuallyAssembled}
          onClose={() => setShowCheckQuantityModal(!showCheckQuantityModal)}
          onSubmit={onClickRedistributeBtn}
        />
      </Modal>
    </div>
  )
}
