import React, {useState} from 'react'

import {Container, Divider, IconButton, TableCell, TableRow, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Input} from '@components/input'
import {Table} from '@components/table'
import {TableHeadRow} from '@components/table-rows/batches-view/table-head-row'

import {filterEmptyBoxes, filterEmptyOrders} from '@utils/filters'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {CommentsLine} from './comments-line'
import {useClassNames} from './receive-box-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseReceiveBoxModal

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

const renderHeadRow = <TableHeadRow headCells={WAREHOUSE_RECEIVE_HEAD_CELLS} />

const TableBodyBoxRow = ({item, itemIndex, handlers}) => {
  const classNames = useClassNames()

  return (
    <TableRow className={classNames.row}>
      <TableCell>
        <Typography className={classNames.boxTitle}>{item._id}</Typography>
        <div className={classNames.descriptionWrapper}>
          <img
            className={classNames.img}
            src={
              item.items[0].product.images &&
              item.items[0].product.images[0] &&
              getAmazonImageUrl(item.items[0].product.images[0])
            }
          />
          <Typography className={classNames.title}>
            {itemIndex + 1 + '. ' + item.items[0].product.amazonTitle}
          </Typography>
        </div>
      </TableCell>

      <TableCell className={classNames.qtyCell}>
        <Input
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          type="number"
          value={item.items[0].amount}
          onChange={e => handlers.onChangeQtyInput(e, item._id, item.items[0].order)}
        />
      </TableCell>

      <TableCell>
        <Input
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          type="number"
          value={item.amount}
          onChange={e => handlers.onChangeFieldInput(e, item._id, 'amount')}
        />
      </TableCell>

      <TableCell>
        <Input
          disabled
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          type="number"
          value={item.items[0].amount * item.amount}
        />
      </TableCell>

      <TableCell className={classNames.sizesCell}>
        <div className={classNames.sizeWrapper}>
          <Typography>{'H:'}</Typography>
          <Input
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            type="number"
            value={item.heightCmWarehouse}
            onChange={e => handlers.onChangeFieldInput(e, item._id, 'heightCmWarehouse')}
          />
        </div>
        <div className={classNames.sizeWrapper}>
          <Typography>{'W:'}</Typography>
          <Input
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            type="number"
            value={item.widthCmWarehouse}
            onChange={e => handlers.onChangeFieldInput(e, item._id, 'widthCmWarehouse')}
          />
        </div>
        <div className={classNames.sizeWrapper}>
          <Typography>{'L:'}</Typography>
          <Input
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            type="number"
            value={item.lengthCmWarehouse}
            onChange={e => handlers.onChangeFieldInput(e, item._id, 'lengthCmWarehouse')}
          />
        </div>
      </TableCell>
      <TableCell>
        <Input
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          type="number"
          value={item.weighGrossKgWarehouse}
          onChange={e => handlers.onChangeFieldInput(e, item._id, 'weighGrossKgWarehouse')}
        />
      </TableCell>
      <TableCell>
        <Input
          disabled
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          value={item.volumeWeightKgWarehouse}
        />
      </TableCell>
      <TableCell>
        <Input
          disabled
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          value={item.weightFinalAccountingKgWarehouse}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handlers.onRemoveBox(item._id)}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

const NewBoxes = ({newBoxes, onChangeQtyInput, onChangeFieldInput, onRemoveBox}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle}>{textConsts.newBoxesTitle}</Typography>

      <Table
        rowsOnly
        data={newBoxes}
        BodyRow={TableBodyBoxRow}
        renderHeadRow={renderHeadRow}
        rowsHandlers={{onChangeQtyInput, onChangeFieldInput, onRemoveBox}}
      />
    </div>
  )
}

export const ReceiveBoxModal = ({setOpenModal, selectedBox, setSourceBoxes}) => {
  const classNames = useClassNames()

  const emptyProducts = selectedBox.items.map(product => ({...product, amount: 0}))
  const getEmptyBox = () => ({...selectedBox, _id: 'new_id_' + Date.now(), items: emptyProducts, amount: 1})
  const emptyBox = getEmptyBox()
  const emptyBoxWithDemensions = {
    ...emptyBox,
    lengthCmWarehouse: emptyBox?.lengthCmWarehouse || '',
    widthCmWarehouse: emptyBox?.widthCmWarehouse || '',
    heightCmWarehouse: emptyBox?.heightCmWarehouse || '',
    weighGrossKgWarehouse: emptyBox?.weighGrossKgWarehouse || '',
    volumeWeightKgWarehouse: emptyBox?.volumeWeightKgWarehouse || '',
    weightFinalAccountingKgWarehouse: emptyBox?.weightFinalAccountingKgWarehouse || '',
    tmpImages: [],
  }

  const [newBoxes, setNewBoxes] = useState([emptyBoxWithDemensions])

  const actuallyAssembled = newBoxes.reduce((acc, box) => acc + box.items[0].amount * box.amount, 0)
  const totalProductsAmount =
    selectedBox.items.reduce((acc, order) => acc + order.amount * selectedBox.amount, 0) - actuallyAssembled

  const onChangeFieldInput = (e, _id, field) => {
    if (Number(e.target.value) < 0) {
      return
    }
    const targetBox = newBoxes.filter(box => box._id === _id)[0]
    const updatedTargetBox = {...targetBox, [field]: Number(e.target.value)}

    updatedTargetBox.volumeWeightKgWarehouse =
      ((parseFloat(updatedTargetBox.lengthCmWarehouse) || 0) *
        (parseFloat(updatedTargetBox.heightCmWarehouse) || 0) *
        (parseFloat(updatedTargetBox.widthCmWarehouse) || 0)) /
      5000
    updatedTargetBox.weightFinalAccountingKgWarehouse = Math.max(
      parseFloat(updatedTargetBox.volumeWeightKgWarehouse) || 0,
      parseFloat(updatedTargetBox.weighGrossKgWarehouse) || 0,
    )

    const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? updatedTargetBox : box))
    setNewBoxes(updatedNewBoxes)
  }

  const onChangeQtyInput = (e, _id, order) => {
    if (Number(e.target.value) < 0) {
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

  const onClickRedistributeBtn = () => {
    const newBoxesWithoutEmptyBox = filterEmptyBoxes(newBoxes)
    const newBoxesWithoutEmptyOrders = filterEmptyOrders(newBoxesWithoutEmptyBox)
    setSourceBoxes([...newBoxesWithoutEmptyOrders])
    setOpenModal()
  }

  const CurrentBox = () => (
    <div className={classNames.currentBox}>
      <Typography className={classNames.sectionTitle}>{textConsts.redistributionTitle}</Typography>
      <Typography className={classNames.boxTitle}>{selectedBox._id}</Typography>
      <div className={classNames.order}>
        <img
          className={classNames.img}
          src={
            selectedBox.items[0].product.images &&
            selectedBox.items[0].product.images[0] &&
            getAmazonImageUrl(selectedBox.items[0].product.images[0])
          }
        />
        <Typography className={classNames.titleOfCurBox}>{selectedBox.items[0].product.amazonTitle}</Typography>
      </div>
      <div className={classNames.currentBoxFooter}>
        <div className={classNames.qtyWrapper}>
          <Typography className={classNames.footerTitle}>{textConsts.qtyLabel}</Typography>
          <Input
            readOnly
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            value={`${selectedBox.items[0].amount} x ${selectedBox.amount}`}
          />
        </div>
        <Typography
          className={classNames.footerTitle}
        >{`${textConsts.productsLeftToRedistribute}: ${totalProductsAmount}`}</Typography>

        <Typography
          className={classNames.footerTitle}
        >{`${textConsts.actuallyAssembled}: ${actuallyAssembled}`}</Typography>
      </div>
    </div>
  )

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>

      <CommentsLine />

      <Divider className={classNames.divider} />

      <div className={classNames.boxesWrapper}>
        <CurrentBox />
        <Divider flexItem className={classNames.divider} orientation="vertical" />
        <NewBoxes
          newBoxes={newBoxes}
          onChangeQtyInput={onChangeQtyInput}
          onChangeFieldInput={onChangeFieldInput}
          onRemoveBox={onRemoveBox}
        />
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button
          variant="text"
          // disabled={totalProductsAmount !== 0} сняты ограничения для китайцев
          onClick={() => {
            onClickRedistributeBtn()
          }}
        >
          {textConsts.toRedistributeBtn}
        </Button>
        <Button
          // disabled={totalProductsAmount < 1} сняты ограничения для китайцев
          variant="text"
          onClick={() => {
            setNewBoxes(newBoxes.concat(getEmptyBox()))
          }}
        >
          {textConsts.newBoxBtn}
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setOpenModal()
          }}
        >
          {textConsts.cancelBtn}
        </Button>
      </div>
    </Container>
  )
}
