import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import React, {useState} from 'react'

import {Chip, IconButton, Link, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {operationTypes} from '@constants/operation-types'
import {TranslationKey} from '@constants/translations/translation-key'
import {zipCodeGroups} from '@constants/zip-code-groups'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {Field} from '@components/field'
import {SelectStorekeeperAndTariffForm} from '@components/forms/select-storkeeper-and-tariff-form'
import {Modal} from '@components/modal'
import {SetShippingLabelModal} from '@components/modals/set-shipping-label-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {WithSearchSelect} from '@components/selects/with-search-select'

import {checkIsPositiveNum} from '@utils/checks'
import {filterEmptyBoxes, filterEmptyOrders} from '@utils/filters'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
// import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './reditstribute-box-modal.style'

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
}) => {
  const classNames = useClassNames()

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
  const [showFullCard, setShowFullCard] = useState(true)

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
      <div className={classNames.itemWrapper}>
        <div>
          {box.items.map((order, orderIndex) => (
            <div key={`box_${box._id}_${readOnly ? 1 : 0}_${orderIndex}`}>
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
                    width={230}
                    selectedItemName={
                      destinations.find(el => el._id === box.destinationId)?.name || t(TranslationKey['Not chosen'])
                    }
                    data={destinations}
                    fieldName="name"
                    onClickNotChosen={() => onChangeField({target: {value: ''}}, 'destinationId', box._id)}
                    onClickSelect={el => onChangeField({target: {value: el._id}}, 'destinationId', box._id)}
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
                        disableElevation
                        disabled={!isNewBox}
                        color="primary"
                        variant={box.logicsTariffId && 'text'}
                        className={clsx({[classNames.storekeeperBtn]: !box.logicsTariffId})}
                        onClick={() =>
                          setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
                        }
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
                tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                containerClasses={classNames.field}
                labelClasses={classNames.label}
                className={classNames.fieldInput}
                label={t(TranslationKey['FBA Shipment'])}
                value={box.fbaShipment}
                onChange={e => onChangeField(e, 'fbaShipment', box._id)}
              />

              {!isNewBox ? (
                <Field
                  disabled={!isNewBox}
                  inputProps={{maxLength: 255}}
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
                        <Typography>{t(TranslationKey['Not available'])}</Typography>
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
              <IconButton classes={{root: classNames.icon}} onClick={() => onRemoveBox(box._id)}>
                <DeleteOutlineOutlinedIcon className={classNames.deleteBtn} />
              </IconButton>
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
      <div className={classNames.currentBoxTitle}>
        <Typography className={classNames.sectionTitle}>{t(TranslationKey['New boxes'])}</Typography>
      </div>

      {newBoxes.map((box, boxIndex) => (
        <div key={boxIndex} className={clsx({[classNames.marginBox]: newBoxes.length > 1})}>
          <Box
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
        </div>
      ))}
    </div>
  )
}

export const RedistributeBox = observer(
  ({
    destinations,
    storekeepers,
    requestStatus,
    // addNewBoxModal,
    // setAddNewBoxModal,
    selectedBox,
    onRedistribute,
    onTriggerOpenModal,
  }) => {
    const classNames = useClassNames()
    const [currentBox, setCurrentBox] = useState(selectedBox)

    const [showNewBoxAttention, setShowNewBoxAttention] = useState(true)

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

    const [comment, setComment] = useState('')
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

      onRedistribute(
        selectedBox._id,
        newBoxesWithoutEmptyOrders.map(el => ({...el, destinationId: el.destinationId || null})),
        operationTypes.SPLIT,
        isMasterBox,
        comment,
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

    const disabledSubmitBtn =
      totalProductsAmount !== 0 ||
      requestStatus === loadingStatuses.isLoading ||
      filterEmptyBoxes(newBoxes).length < 2 ||
      filterEmptyBoxes(newBoxes).some(
        el => (el.shippingLabel?.length < 5 && el.shippingLabel?.length > 0) || el.logicsTariffId === '',
      )

    return (
      <div>
        <div className={classNames.boxesWrapper}>
          <div className={classNames.currentBox}>
            <div className={classNames.currentBoxTitle}>
              <Typography className={classNames.sectionTitle}>{t(TranslationKey.Redistribute)}</Typography>
              <Typography className={classNames.boxTitle}>{`${t(TranslationKey.Box)} № ${
                currentBox.humanFriendlyId
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
              onChangeAmountInput={onChangeAmountInput}
            />
          </div>

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

          <Field
            multiline
            inputProps={{maxLength: 255}}
            className={classNames.heightFieldAuto}
            minRows={18}
            maxRows={18}
            label={t(TranslationKey['Client comment on the task'])}
            placeholder={t(TranslationKey['Client comment on the task'])}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            tooltipInfoContent={t(TranslationKey['Add a new box to the task'])}
            disabled={totalProductsAmount < 1 && isMasterBox}
            color="primary"
            variant="contained"
            className={classNames.button}
            onClick={() => {
              setNewBoxes(newBoxes.concat(getEmptyBox()))
            }}
          >
            {t(TranslationKey['Create a new box'])}
          </Button>
          <Button
            color="primary"
            variant="contained"
            tooltipInfoContent={t(TranslationKey['Create a task to split the box'])}
            disabled={disabledSubmitBtn}
            className={classNames.button}
            onClick={onClickRedistributeBtn}
          >
            {t(TranslationKey.Redistribute)}
          </Button>

          <Button
            color="primary"
            variant="text"
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            className={clsx(classNames.button, classNames.cancelButton)}
            onClick={() => {
              onTriggerOpenModal('showRedistributeBoxModal')
              setShowNewBoxAttention(false)
            }}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>

        <WarningInfoModal
          openModal={showNewBoxAttention}
          setOpenModal={() => setShowNewBoxAttention(!showNewBoxAttention)}
          title={t(
            TranslationKey[
              'Increasing the number of boxes will require additional payment depending on the rates of the warehouse where the goods are located'
            ],
          )}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            setShowNewBoxAttention(!showNewBoxAttention)
          }}
        />
      </div>
    )
  },
)
