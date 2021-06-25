import React, {useState} from 'react'

import {Button, Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {filterEmptyBoxes, filterEmptyOrders} from '@utils/filters'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './reditstribute-box-modal.style'

const textConsts = getLocalizedTexts(texts, 'en').clientBoxRedistribution

export const RedistributeBox = ({
  addNewBoxModal,
  setAddNewBoxModal,
  selectedBox,
  onRedistribute,
  onTriggerOpenModal,
}) => {
  const classNames = useClassNames()
  const [currentBox, setCurrentBox] = useState(selectedBox)

  const emptyProducts = currentBox.items.map(order => ({...order, amount: 0}))

  const getEmptyBox = () => ({...currentBox, boxId: 'newBoxId_' + Date.now(), items: emptyProducts})

  const emptyBox = getEmptyBox()
  const [newBoxes, setNewBoxes] = useState([emptyBox])
  const totalProductsAmount = currentBox.items.reduce((acc, order) => acc + order.amount, 0)

  const onChangeInput = (e, boxId, orderId) => {
    const targetBox = newBoxes.filter(box => box.boxId === boxId)[0]
    const targetProduct = targetBox.items.filter(product => product.orderId === orderId)[0]
    const updatedTargetProduct = {...targetProduct, amount: Number(e.target.value)}
    const updatedTargetProducts = targetBox.items.map(product =>
      product.orderId === orderId ? updatedTargetProduct : product,
    )
    const updatedTargetBox = {...targetBox, items: updatedTargetProducts}

    const updatedNewBoxes = newBoxes.map(box => (box.boxId === boxId ? updatedTargetBox : box))

    const currentOrder = selectedBox.items.filter(product => product.orderId === orderId)[0]
    const newBoxesProductAmount = updatedNewBoxes
      .map(box => box.items.filter(product => product.orderId === orderId)[0].amount)
      .reduce((acc, amount) => acc + amount, 0)
    const checkAmount = currentOrder.amount - newBoxesProductAmount
    if (checkAmount < 0) {
      return
    }
    const updatedCurrentOrder = {...currentOrder, amount: checkAmount}
    const updatedCurrentOrders = currentBox.items.map(product =>
      product.orderId === orderId ? updatedCurrentOrder : product,
    )
    const updatedCurrentBox = {...currentBox, items: updatedCurrentOrders}

    setNewBoxes(updatedNewBoxes)
    setCurrentBox(updatedCurrentBox)
  }

  const onClickRedistributeBtn = () => {
    const newBoxesWithoutEmptyBox = filterEmptyBoxes(newBoxes)

    const newBoxesWithoutEmptyOrders = filterEmptyOrders(newBoxesWithoutEmptyBox)

    onRedistribute(selectedBox._id, newBoxesWithoutEmptyOrders)
  }

  const Box = ({box, readOnly = false}) => (
    <div className={classNames.box}>
      <Typography className={classNames.boxTitle}>{box.boxId}</Typography>
      {box.items.map((order, orderIndex) => (
        <div key={orderIndex} className={classNames.order}>
          <img className={classNames.img} src={order.product.img} />
          <Typography className={classNames.title}>{orderIndex + 1 + '. ' + order.product.amazonTitle}</Typography>
          <Typography className={classNames.subTitle}>{textConsts.qtyLabel}</Typography>
          <Input
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            readOnly={readOnly}
            value={order.amount}
            onChange={e => onChangeInput(e, box.boxId, order.orderId)}
          />
        </div>
      ))}
    </div>
  )

  const CurrentBox = () => (
    <div className={classNames.currentBox}>
      <Typography className={classNames.sectionTitle}>{textConsts.redistributionTitle}</Typography>

      <Box readOnly box={currentBox} />

      <div className={classNames.currentBoxFooter}>
        <Typography
          className={classNames.footerTitle}
        >{`${textConsts.productsLeftToRedistribute}: ${totalProductsAmount}`}</Typography>
      </div>
    </div>
  )

  const NewBoxes = () => (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle}>{textConsts.newBoxesTitle}</Typography>

      {newBoxes.map((box, boxIndex) => (
        <Box key={boxIndex} box={box} />
      ))}
    </div>
  )

  return (
    <React.Fragment>
      <div className={classNames.boxesWrapper}>
        <CurrentBox />
        <Divider flexItem className={classNames.divider} orientation="vertical" />
        <NewBoxes />
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button
          variant="text"
          disabled={totalProductsAmount !== 0}
          onClick={() => {
            onClickRedistributeBtn()
            onTriggerOpenModal('showRedistributeBoxModal')
            onTriggerOpenModal('showRedistributeBoxSuccessModal')
            setAddNewBoxModal(null)
          }}
        >
          {textConsts.toRedistributeBtn}
        </Button>
        <Button
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
