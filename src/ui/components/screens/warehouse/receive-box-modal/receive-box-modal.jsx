import React, {useState} from 'react'

import {Divider, IconButton, TableCell, TableRow, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {transformAndValidate} from 'class-transformer-validator'

import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesWarehouseReceiveBoxModalContract} from '@models/boxes-model/boxes-model.contracts'

import {Button} from '@components/buttons/button'
import {AddFilesForm} from '@components/forms/add-files-form'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Table} from '@components/table'
import {TableHeadRow} from '@components/table-rows/batches-view/table-head-row'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

// import {CommentsLine} from './comments-line'
import {useClassNames} from './receive-box-modal.style'

const WAREHOUSE_RECEIVE_HEAD_CELLS = [
  {title: 'BOX'},
  {title: 'QTY'},
  {title: 'Count superbox'},
  {title: 'TOTAL'},
  {title: 'Sizes'},
  {title: 'Weight'},
  {title: 'Volume weight'},
  {title: 'Final weight'},
]

const TableBodyBoxRow = ({item, itemIndex, handlers}) => {
  const classNames = useClassNames()

  return (
    <TableRow className={classNames.row}>
      <TableCell className={classNames.standartCell}>
        <Typography className={classNames.boxTitle}>{'new box'}</Typography>
        <div className={classNames.descriptionWrapper}>
          <img className={classNames.img} src={getAmazonImageUrl(item.items[0]?.product.images[0])} />
          <Typography className={classNames.title}>
            {itemIndex + 1 + '. ' + item.items[0].product.amazonTitle}
          </Typography>
        </div>
      </TableCell>

      <TableCell className={classNames.qtyCell}>
        <Input
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          inputProps={{maxLength: 4}}
          value={item.items[0].amount}
          onChange={e => handlers.onChangeQtyInput(e, item._id, item.items[0].order)}
        />
      </TableCell>

      <TableCell className={classNames.standartCell}>
        <Input
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          inputProps={{maxLength: 4}}
          value={item.amount}
          onChange={e => handlers.onChangeFieldInput(e, item._id, 'amount')}
        />
      </TableCell>

      <TableCell className={classNames.standartCell}>
        <Input
          disabled
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          value={item.items[0].amount * item.amount}
        />
      </TableCell>

      <TableCell className={classNames.sizesCell}>
        <div className={classNames.sizeWrapper}>
          <Typography>{'H:'}</Typography>
          <Input
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            inputProps={{maxLength: 4}}
            value={item.heightCmWarehouse}
            onChange={e => handlers.onChangeFieldInput(e, item._id, 'heightCmWarehouse')}
          />
        </div>
        <div className={classNames.sizeWrapper}>
          <Typography>{'W:'}</Typography>
          <Input
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            inputProps={{maxLength: 4}}
            value={item.widthCmWarehouse}
            onChange={e => handlers.onChangeFieldInput(e, item._id, 'widthCmWarehouse')}
          />
        </div>
        <div className={classNames.sizeWrapper}>
          <Typography>{'L:'}</Typography>
          <Input
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            inputProps={{maxLength: 4}}
            value={item.lengthCmWarehouse}
            onChange={e => handlers.onChangeFieldInput(e, item._id, 'lengthCmWarehouse')}
          />
        </div>
      </TableCell>
      <TableCell className={classNames.standartCell}>
        <Input
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          inputProps={{maxLength: 4}}
          value={item.weighGrossKgWarehouse}
          onChange={e => handlers.onChangeFieldInput(e, item._id, 'weighGrossKgWarehouse')}
        />
      </TableCell>
      <TableCell className={classNames.standartCell}>
        <Input
          disabled
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          value={toFixed(item.volumeWeightKgWarehouse, 3)}
        />
      </TableCell>
      <TableCell className={classNames.standartCell}>
        <Input
          disabled
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          value={toFixed(item.weightFinalAccountingKgWarehouse, 3)}
        />
      </TableCell>

      <TableCell>
        <Button onClick={() => handlers.onAddImages(item._id)}>{'Фотографии'}</Button>
      </TableCell>

      <TableCell>
        <IconButton onClick={() => handlers.onRemoveBox(item._id)}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

const NewBoxes = ({newBoxes, onChangeQtyInput, onChangeFieldInput, onRemoveBox, onAddImages}) => {
  const classNames = useClassNames()

  const renderHeadRow = <TableHeadRow headCells={WAREHOUSE_RECEIVE_HEAD_CELLS} />

  return (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle}>{t(TranslationKey['New boxes'])}</Typography>

      <div className={classNames.tableWrapper}>
        <Table
          rowsOnly
          data={newBoxes}
          BodyRow={TableBodyBoxRow}
          renderHeadRow={renderHeadRow}
          rowsHandlers={{onChangeQtyInput, onChangeFieldInput, onRemoveBox, onAddImages}}
        />
      </div>
    </div>
  )
}

export const ReceiveBoxModal = ({setOpenModal, selectedBox, setSourceBoxes, volumeWeightCoefficient}) => {
  const classNames = useClassNames()
  const [showNoDimensionsErrorModal, setShowNoDimensionsErrorModal] = useState(false)
  const [showAddImagesModal, setShowAddImagesModal] = useState(false)

  const emptyProducts = selectedBox.items.map(product => ({...product, amount: ''}))
  const getEmptyBox = () => {
    const emptyBox = {...selectedBox, _id: 'new_id_' + Date.now(), items: emptyProducts, amount: 1}

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

  const [newBoxes, setNewBoxes] = useState([getEmptyBox()])

  const actuallyAssembled = newBoxes.reduce((acc, box) => acc + box.items[0].amount * box.amount, 0)
  const totalProductsAmount =
    selectedBox.items.reduce((acc, order) => acc + order.amount * selectedBox.amount, 0) - actuallyAssembled

  const onChangeFieldInput = (e, _id, field) => {
    if (
      isNaN(e.target.value) ||
      Number(e.target.value) < 0 ||
      (field === 'amount' && Number(e.target.value) === 0 && e.target.value !== '')
    ) {
      return
    }
    const targetBox = newBoxes.filter(box => box._id === _id)[0]

    const updatedTargetBox =
      field === 'amount'
        ? {...targetBox, [field]: e.target.value !== '' ? Number(e.target.value) : e.target.value}
        : {...targetBox, [field]: e.target.value}

    updatedTargetBox.volumeWeightKgWarehouse =
      ((parseFloat(updatedTargetBox.lengthCmWarehouse) || 0) *
        (parseFloat(updatedTargetBox.heightCmWarehouse) || 0) *
        (parseFloat(updatedTargetBox.widthCmWarehouse) || 0)) /
      volumeWeightCoefficient
    updatedTargetBox.weightFinalAccountingKgWarehouse = Math.max(
      parseFloat(updatedTargetBox.volumeWeightKgWarehouse) || 0,
      parseFloat(updatedTargetBox.weighGrossKgWarehouse) || 0,
    )

    const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? updatedTargetBox : box))
    setNewBoxes(updatedNewBoxes)
  }

  const onChangeQtyInput = (e, _id, order) => {
    if (isNaN(e.target.value) || Number(e.target.value) < 0) {
      return
    }
    const targetBox = newBoxes.filter(box => box._id === _id)[0]
    const targetProduct = targetBox.items.filter(product => product.order === order)[0]
    const updatedTargetProduct = {...targetProduct, amount: Number(e.target.value)}
    const updatedTargetProducts = targetBox.items.map(product =>
      product.order === order ? updatedTargetProduct : product,
    )
    const updatedTargetBox = {...targetBox, items: updatedTargetProducts}
    const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? updatedTargetBox : box))

    setNewBoxes(updatedNewBoxes)
  }

  const onRemoveBox = boxId => {
    const updatedNewBoxes = newBoxes.filter(box => box._id !== boxId)
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
      const newBoxesWithoutEmptyBoxes = newBoxes.filter(el => el.items[0].amount !== (0 || ''))

      const newBoxesWithoutNumberFields = newBoxesWithoutEmptyBoxes.map(el => ({
        ...el,
        lengthCmWarehouse: parseFloat(el?.lengthCmWarehouse) || '',
        widthCmWarehouse: parseFloat(el?.widthCmWarehouse) || '',
        heightCmWarehouse: parseFloat(el?.heightCmWarehouse) || '',
        weighGrossKgWarehouse: parseFloat(el?.weighGrossKgWarehouse) || '',
        volumeWeightKgWarehouse: parseFloat(el?.volumeWeightKgWarehouse) || '',
        weightFinalAccountingKgWarehouse: parseFloat(el?.weightFinalAccountingKgWarehouse) || '',
      }))

      for (let i = 0; i < newBoxesWithoutNumberFields.length; i++) {
        const box = getObjectFilteredByKeyArrayBlackList(newBoxesWithoutNumberFields[i], ['tmpImages'])

        await transformAndValidate(BoxesWarehouseReceiveBoxModalContract, box)
      }

      setSourceBoxes([...newBoxesWithoutNumberFields])
      setOpenModal()
    } catch (error) {
      setShowNoDimensionsErrorModal(!showNoDimensionsErrorModal)
    }
  }
  const CurrentBox = () => (
    <div className={classNames.currentBox}>
      <Typography className={classNames.boxTitle}>{`Box ${selectedBox.humanFriendlyId}`}</Typography>
      <div className={classNames.order}>
        <img className={classNames.img} src={getAmazonImageUrl(selectedBox?.items[0]?.product.images[0])} />
        <Typography className={classNames.titleOfCurBox}>{selectedBox.items[0].product.amazonTitle}</Typography>
      </div>
      <div className={classNames.currentBoxFooter}>
        <div className={classNames.qtyWrapper}>
          <Typography className={classNames.footerTitle}>{t(TranslationKey.Quantity)}</Typography>
          <Input
            readOnly
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            value={`${selectedBox.items[0].amount} x ${selectedBox.amount}`}
          />
        </div>
        <Typography className={classNames.footerTitle}>{`${t(
          TranslationKey['Left to redistribute'],
        )}: ${totalProductsAmount}`}</Typography>

        <Typography className={classNames.footerTitle}>{`${t(
          TranslationKey['Actually assembled'],
        )}: ${actuallyAssembled}`}</Typography>
      </div>
    </div>
  )

  const disableSubmit = newBoxes.some(box => box.items[0].amount < 1 || box.amount === '')

  return (
    <div className={classNames.root}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Receive and distribute'])}</Typography>

      {/* <CommentsLine /> */}

      <Divider className={classNames.divider} />

      <div className={classNames.boxesWrapper}>
        <CurrentBox />
        <Divider flexItem className={classNames.divider} orientation="vertical" />
        <NewBoxes
          newBoxes={newBoxes}
          onChangeQtyInput={onChangeQtyInput}
          onChangeFieldInput={onChangeFieldInput}
          onRemoveBox={onRemoveBox}
          onAddImages={onAddImages}
        />
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button
          disabled={disableSubmit}
          className={classNames.button}
          onClick={() => {
            onClickRedistributeBtn()
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button
          className={classNames.button}
          onClick={() => {
            setNewBoxes(newBoxes.concat(getEmptyBox()))
          }}
        >
          {t(TranslationKey['New box'])}
        </Button>
        <Button
          className={classNames.button}
          onClick={() => {
            setOpenModal()
          }}
        >
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
    </div>
  )
}
