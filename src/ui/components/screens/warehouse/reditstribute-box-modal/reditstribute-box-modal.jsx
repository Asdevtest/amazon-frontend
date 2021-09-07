import React, {useState} from 'react'

import {Button, Divider, Typography} from '@material-ui/core'

import {operationTypes} from '@constants/operation-types'
import {texts} from '@constants/texts'

import {Field} from '@components/field'
import {Input} from '@components/input'

import {filterEmptyBoxes, filterEmptyOrders} from '@utils/filters'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './reditstribute-box-modal.style'

const textConsts = getLocalizedTexts(texts, 'en').clientBoxRedistribution

const Box = ({box, readOnly = false, boxIsMasterBox, index, isMasterBox, selectedBox, onChangeInput}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.box}>
      <Typography className={classNames.boxTitle}>{box._id}</Typography>
      {box.items.map((order, orderIndex) => (
        <div key={`box_${box._id}_${readOnly ? 1 : 0}_${index}`}>
          <div key={orderIndex} className={classNames.order}>
            <img
              className={classNames.img}
              src={order.product.images && order.product.images[0] && getAmazonImageUrl(order.product.images[0])}
            />
            <Typography className={classNames.title}>{orderIndex + 1 + '. ' + order.product.amazonTitle}</Typography>
            <Typography className={classNames.subTitle}>{textConsts.qtyLabel}</Typography>
            <Input
              classes={{root: classNames.inputWrapper, input: classNames.input}}
              readOnly={readOnly}
              value={isMasterBox ? (boxIsMasterBox ? selectedBox.amount : 1) : order.amount}
              onChange={e => onChangeInput(e, box._id, order.order)}
            />
          </div>
          {isMasterBox ? (
            <Typography className={classNames.subTitle}>{`Unites per box ${box.items[0].amount}`}</Typography>
          ) : undefined}
        </div>
      ))}
    </div>
  )
}

const NewBoxes = ({newBoxes, isMasterBox, selectedBox, onChangeInput}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle}>{textConsts.newBoxesTitle}</Typography>

      {newBoxes.map((box, boxIndex) => (
        <Box
          key={boxIndex}
          index={boxIndex}
          box={box}
          readOnly={isMasterBox}
          isMasterBox={isMasterBox}
          selectedBox={selectedBox}
          onChangeInput={onChangeInput}
        />
      ))}
    </div>
  )
}

export const RedistributeBox = ({
  addNewBoxModal,
  setAddNewBoxModal,
  selectedBox,
  onRedistribute,
  onTriggerOpenModal,
}) => {
  const classNames = useClassNames()
  const [currentBox, setCurrentBox] = useState(selectedBox)

  const [comment, setComment] = useState('')

  const isMasterBox = selectedBox?.amount && selectedBox?.amount > 1

  const emptyProducts = currentBox.items.map(product => ({...product, amount: isMasterBox ? product.amount : 0}))

  const getEmptyBox = () => ({...currentBox, _id: 'new_id_' + Date.now(), items: emptyProducts, amount: 1})

  const emptyBox = getEmptyBox()
  const [newBoxes, setNewBoxes] = useState([emptyBox])
  const totalProductsAmount = isMasterBox
    ? currentBox.amount - newBoxes.length
    : currentBox.items.reduce((acc, order) => acc + order.amount, 0)

  const onChangeInput = (e, _id, order) => {
    const targetBox = newBoxes.filter(box => box._id === _id)[0]
    const targetProduct = targetBox.items.filter(product => product.order === order)[0]
    const updatedTargetProduct = {...targetProduct, amount: Number(e.target.value)}
    const updatedTargetProducts = targetBox.items.map(product =>
      product.order === order ? updatedTargetProduct : product,
    )
    const updatedTargetBox = {...targetBox, items: updatedTargetProducts}

    const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? updatedTargetBox : box))

    const currentOrder = selectedBox.items.filter(product => product.order === order)[0]
    const newBoxesProductAmount = updatedNewBoxes
      .map(box => box.items.filter(product => product.order === order)[0].amount)
      .reduce((acc, amount) => acc + amount, 0)
    const checkAmount = currentOrder.amount - newBoxesProductAmount
    if (checkAmount < 0) {
      return
    }
    const updatedCurrentOrder = {...currentOrder, amount: checkAmount}
    const updatedCurrentOrders = currentBox.items.map(product =>
      product.order === order ? updatedCurrentOrder : product,
    )
    const updatedCurrentBox = {...currentBox, items: updatedCurrentOrders}

    setNewBoxes(updatedNewBoxes)
    setCurrentBox(updatedCurrentBox)
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

    onRedistribute(selectedBox._id, newBoxesWithoutEmptyOrders, operationTypes.SPLIT, isMasterBox, comment)
  }

  const CurrentBox = () => (
    <div className={classNames.currentBox}>
      <Typography className={classNames.sectionTitle}>{textConsts.redistributionTitle}</Typography>

      <Box
        readOnly
        boxIsMasterBox={isMasterBox}
        box={currentBox}
        index={0}
        isMasterBox={isMasterBox}
        selectedBox={selectedBox}
        onChangeInput={onChangeInput}
      />

      <div className={classNames.currentBoxFooter}>
        <Typography
          className={classNames.footerTitle}
        >{`${textConsts.productsLeftToRedistribute}: ${totalProductsAmount}`}</Typography>
      </div>
    </div>
  )

  return (
    <React.Fragment>
      <div className={classNames.boxesWrapper}>
        <CurrentBox />
        <Divider flexItem className={classNames.divider} orientation="vertical" />
        <NewBoxes
          newBoxes={newBoxes}
          isMasterBox={isMasterBox}
          selectedBox={selectedBox}
          onChangeInput={onChangeInput}
        />
        <Divider flexItem className={classNames.divider} orientation="vertical" />
        <Field
          multiline
          className={classNames.heightFieldAuto}
          rows={4}
          rowsMax={6}
          label={'Комментарий клиента к задаче'}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button
          variant="text"
          disabled={totalProductsAmount !== 0 && !isMasterBox}
          onClick={() => {
            onClickRedistributeBtn()
          }}
        >
          {textConsts.toRedistributeBtn}
        </Button>
        <Button
          disabled={totalProductsAmount < 1 && isMasterBox}
          variant="text"
          onClick={() => {
            addNewBoxModal ?? setAddNewBoxModal(true)
            setNewBoxes(newBoxes.concat(getEmptyBox()))
          }}
        >
          {textConsts.newBoxBtn}
        </Button>
        <Button
          variant="text"
          onClick={() => {
            onTriggerOpenModal('showRedistributeBoxModal')
            setAddNewBoxModal(null)
          }}
        >
          {textConsts.cancelBtn}
        </Button>
      </div>
    </React.Fragment>
  )
}
