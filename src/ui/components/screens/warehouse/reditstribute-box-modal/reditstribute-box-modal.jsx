import React, {useState} from 'react'

import {Chip, Divider, IconButton, Link, NativeSelect, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'

import {loadingStatuses} from '@constants/loading-statuses'
import {operationTypes} from '@constants/operation-types'
import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'
import {zipCodeGroups} from '@constants/zip-code-groups'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {SelectStorekeeperAndTariffForm} from '@components/forms/select-storkeeper-and-tariff-form'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {SetShippingLabelModal} from '@components/modals/set-shipping-label-modal'

import {checkIsPositiveNum} from '@utils/checks'
import {filterEmptyBoxes, filterEmptyOrders} from '@utils/filters'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './reditstribute-box-modal.style'

const textConsts = getLocalizedTexts(texts, 'en').clientBoxRedistribution

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
}) => {
  const classNames = useClassNames()

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)

  const setShippingLabel = () => value => {
    onChangeField({target: {value}}, 'tmpShippingLabel', box._id)
  }

  const onClickShippingLabel = () => {
    setShowSetShippingLabelModal(!showSetShippingLabelModal)
  }

  const onDeleteShippingLabel = () => {
    onChangeField({target: {value: ''}}, 'shippingLabel', box._id)
  }

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

  const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId) => {
    onChangeField({target: {value: storekeeperId}}, 'storekeeperId', box._id)
    onChangeField({target: {value: tariffId}}, 'logicsTariffId', box._id)

    setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
  }

  const curDestination = destinations.find(el => el._id === box.destinationId)

  const firstNumOfCode = curDestination?.zipCode[0]

  const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  const tariffName = storekeepers
    .find(el => el._id === box.storekeeperId)
    ?.tariffLogistics.find(el => el._id === box.logicsTariffId)?.name

  const tariffRate = storekeepers
    .find(el => el._id === box.storekeeperId)
    ?.tariffLogistics.find(el => el._id === box.logicsTariffId)?.conditionsByRegion[regionOfDeliveryName]?.rate

  return (
    <div className={classNames.box}>
      {!isNewBox && (
        <Typography className={classNames.boxTitle}>{`${t(TranslationKey.Box)} № ${box.humanFriendlyId}`}</Typography>
      )}
      <div className={classNames.itemWrapper}>
        <div>
          {box.items.map((order, orderIndex) => (
            <div key={`box_${box._id}_${readOnly ? 1 : 0}_${orderIndex}`}>
              <div key={orderIndex} className={classNames.order}>
                <img className={classNames.img} src={getAmazonImageUrl(order.product.images[0])} />
                <Typography className={classNames.title}>{order.product.amazonTitle}</Typography>
                <Typography className={classNames.subTitle}>{t(TranslationKey.Quantity)}</Typography>
                <Input
                  classes={{root: classNames.inputWrapper, input: classNames.input}}
                  readOnly={readOnly}
                  value={isMasterBox ? (boxIsMasterBox ? selectedBox.amount : 1) : order.amount}
                  onChange={e => checkIsPositiveNum(e.target.value) && onChangeAmountInput(e, box._id, order.order)}
                />
              </div>
              {isMasterBox ? (
                <Typography className={classNames.subTitle}>{`${t(TranslationKey['Units in a box'])} ${
                  box.items[0].amount
                }`}</Typography>
              ) : undefined}
            </div>
          ))}

          <div className={classNames.itemSubWrapper}>
            <Field
              containerClasses={classNames.field}
              label={t(TranslationKey.Destination)}
              inputComponent={
                <NativeSelect
                  disabled={!isNewBox}
                  variant="filled"
                  inputProps={{
                    name: 'destinationId',
                    id: 'destinationId',
                  }}
                  className={classNames.destinationSelect}
                  input={<Input />}
                  value={box.destinationId}
                  onChange={e => onChangeField(e, 'destinationId', box._id)}
                >
                  <option value={''}>{'none'}</option>

                  {destinations.map(item => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </NativeSelect>
              }
            />

            <Field
              containerClasses={classNames.field}
              label={'Storekeeper / ' + t(TranslationKey.Tariff)}
              inputComponent={
                <div>
                  {isNewBox ? (
                    <Button
                      disableElevation
                      disabled={!isNewBox}
                      color="primary"
                      variant={box.logicsTariffId && 'text'}
                      className={clsx({[classNames.storekeeperBtn]: !box.logicsTariffId})}
                      onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
                    >
                      {box.logicsTariffId
                        ? `${storekeepers.find(el => el._id === box.storekeeperId)?.name || 'N/A'} /  
                            ${
                              box.logicsTariffId
                                ? `${tariffName}${regionOfDeliveryName ? ' / ' + regionOfDeliveryName : ''}${
                                    tariffRate ? ' / ' + tariffRate + ' $' : ''
                                  }`
                                : 'none'
                            }`
                        : t(TranslationKey.Select)}
                    </Button>
                  ) : (
                    <Typography className={classNames.storekeeperDisableBtn}>{`${
                      storekeepers.find(el => el._id === box.storekeeperId)?.name || 'N/A'
                    } /  
                        ${
                          box.logicsTariffId
                            ? `${tariffName}${regionOfDeliveryName ? ' / ' + regionOfDeliveryName : ''}${
                                tariffRate ? ' / ' + tariffRate + ' $' : ''
                              }`
                            : 'none'
                        }`}</Typography>
                  )}
                </div>
              }
            />

            <Field
              disabled={!isNewBox}
              inputProps={{maxLength: 255}}
              containerClasses={classNames.field}
              label={t(TranslationKey['FBA Shipment'])}
              value={box.fbaShipment}
              onChange={e => onChangeField(e, 'fbaShipment', box._id)}
            />

            {isNewBox ? (
              <div>
                <Typography className={classNames.linkTitle}>{t(TranslationKey['Shipping label']) + ':'}</Typography>
                <Chip
                  classes={{
                    root: classNames.barcodeChip,
                    clickable: classNames.barcodeChipHover,
                    deletable: classNames.barcodeChipHover,
                    deleteIcon: classNames.barcodeChipIcon,
                    label: classNames.barcodeChiplabel,
                  }}
                  className={clsx({[classNames.barcodeChipExists]: box.shippingLabel})}
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
              </div>
            ) : (
              <div>
                <Typography className={classNames.linkTitle}>{t(TranslationKey['Shipping label']) + ':'}</Typography>
                <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
                  <Typography className={classNames.link}>{box.shippingLabel}</Typography>
                </Link>
              </div>
            )}
          </div>
        </div>

        {isNewBox && (
          <IconButton onClick={() => onRemoveBox(box._id)}>
            <DeleteIcon className={classNames.deleteBtn} />
          </IconButton>
        )}
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
          storekeepers={storekeepers.filter(el => el._id === box?.storekeeper._id)}
          curStorekeeperId={box.storekeeperId}
          curTariffId={box.logicsTariffId}
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
}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle}>{textConsts.newBoxesTitle}</Typography>

      {newBoxes.map((box, boxIndex) => (
        <Box
          key={boxIndex}
          isNewBox
          destinations={destinations}
          storekeepers={storekeepers}
          index={boxIndex}
          box={box}
          readOnly={isMasterBox}
          isMasterBox={isMasterBox}
          selectedBox={selectedBox}
          onChangeAmountInput={onChangeAmountInput}
          onChangeField={onChangeField}
          onRemoveBox={onRemoveBox}
        />
      ))}
    </div>
  )
}

export const RedistributeBox = ({
  destinations,
  storekeepers,
  requestStatus,
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

  const getEmptyBox = () => ({
    ...currentBox,
    _id: 'new_id_' + Date.now(),
    items: emptyProducts,
    amount: 1,
    destinationId: currentBox.destinationId || null,
    tmpShippingLabel: [],
  })

  const emptyBox = getEmptyBox()
  const [newBoxes, setNewBoxes] = useState([emptyBox])
  const totalProductsAmount = isMasterBox
    ? currentBox.amount - newBoxes.length
    : currentBox.items.reduce((acc, order) => acc + order.amount, 0)

  const onChangeAmountInput = (e, _id, order) => {
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

  const onChangeField = (e, field, boxId) => {
    const targetBox = newBoxes.filter(newBox => newBox._id === boxId)[0]

    const updatedTargetBox = {
      ...targetBox,
      [field /* field === 'shippingLabel' ? e.target.value.replace(' ', '') :*/]: e.target.value,
    }

    const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === boxId ? updatedTargetBox : newBox))

    setNewBoxes(updatedNewBoxes)
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

  const CurrentBox = () => (
    <div className={classNames.currentBox}>
      <Typography className={classNames.sectionTitle}>{t(TranslationKey.Redistribute)}</Typography>

      <Box
        readOnly
        destinations={destinations}
        storekeepers={storekeepers}
        boxIsMasterBox={isMasterBox}
        box={currentBox}
        index={0}
        isMasterBox={isMasterBox}
        selectedBox={selectedBox}
        onChangeAmountInput={onChangeAmountInput}
      />

      <div className={classNames.currentBoxFooter}>
        <Typography className={classNames.footerTitle}>{`${t(
          TranslationKey['Left to redistribute'],
        )}: ${totalProductsAmount}`}</Typography>
      </div>
    </div>
  )

  const disabledSubmitBtn =
    totalProductsAmount !== 0 ||
    requestStatus === loadingStatuses.isLoading ||
    filterEmptyBoxes(newBoxes).length < 2 ||
    filterEmptyBoxes(newBoxes).some(
      el => (el.shippingLabel?.length < 5 && el.shippingLabel?.length > 0) || el.logicsTariffId === '',
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
          destinations={destinations}
          storekeepers={storekeepers}
          onChangeAmountInput={onChangeAmountInput}
          onChangeField={onChangeField}
          onRemoveBox={onRemoveBox}
        />
        <Divider flexItem className={classNames.divider} orientation="vertical" />
        <Field
          multiline
          className={classNames.heightFieldAuto}
          rows={4}
          rowsMax={6}
          label={t(TranslationKey['Client comment on the task'])}
          placeholder={t(TranslationKey['Task commentary'])}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button
          color="primary"
          variant="contained"
          disabled={disabledSubmitBtn}
          onClick={() => {
            onClickRedistributeBtn()
          }}
        >
          {textConsts.toRedistributeBtn}
        </Button>
        <Button
          disabled={totalProductsAmount < 1 && isMasterBox}
          color="primary"
          variant="contained"
          onClick={() => {
            addNewBoxModal ?? setAddNewBoxModal(true)
            setNewBoxes(newBoxes.concat(getEmptyBox()))
          }}
        >
          {textConsts.newBoxBtn}
        </Button>
        <Button
          color="primary"
          variant="contained"
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
