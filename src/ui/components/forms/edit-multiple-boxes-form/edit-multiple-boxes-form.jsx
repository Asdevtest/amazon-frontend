/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DoneIcon from '@mui/icons-material/Done'
import { Checkbox, Chip, IconButton, Typography } from '@mui/material'

import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { tariffTypes } from '@constants/keys/tariff-types'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { checkIsStorekeeper } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixed, trimBarcode } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './edit-multiple-boxes-form.style'

const Box = ({
  userInfo,
  showCheckbox,
  destinations,
  storekeepers,
  box,
  onChangeField,
  onRemoveBox,
  newBoxes,
  setNewBoxes,
  destinationsFavourites,
  setDestinationsFavouritesItem,
}) => {
  const { classes: classNames } = useClassNames()

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

  const [curProductToEditBarcode, setCurProductToEditBarcode] = useState(null)

  const onClickBarcode = item => {
    setCurProductToEditBarcode(item)

    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const isMasterBox = box.amount && box.amount > 1

  const [showFullCard, setShowFullCard] = useState(true)

  const onClickSaveBarcode = product => value => {
    const targetBox = newBoxes.filter(newBox => newBox._id === box._id)[0]

    const newFormFields = { ...targetBox }

    newFormFields.items = [
      ...targetBox.items.map(el => (el.product._id === product.product._id ? { ...el, tmpBarCode: value } : el)),
    ]

    const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === box._id ? newFormFields : newBox))

    setNewBoxes(updatedNewBoxes)

    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const onChangeBarcodeGlued = (product, field) => value => {
    const targetBox = newBoxes.filter(newBox => newBox._id === box._id)[0]

    const newFormFields = { ...targetBox }

    if (field === 'isBarCodeAttachedByTheStorekeeper' && value) {
      newFormFields.items = [
        ...targetBox.items.map(el =>
          el.product._id === product.product._id
            ? { ...el, [field]: value, isBarCodeAlreadyAttachedByTheSupplier: false }
            : el,
        ),
      ]
    } else if (field === 'isBarCodeAlreadyAttachedByTheSupplier' && value) {
      newFormFields.items = [
        ...targetBox.items.map(el =>
          el.product._id === product.product._id
            ? { ...el, [field]: value, isBarCodeAttachedByTheStorekeeper: false }
            : el,
        ),
      ]
    } else {
      newFormFields.items = [
        ...targetBox.items.map(el => (el.product._id === product.product._id ? { ...el, [field]: value } : el)),
      ]
    }

    const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === box._id ? newFormFields : newBox))

    setNewBoxes(updatedNewBoxes)
  }

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
    onChangeField(
      {
        storekeeperId,
        logicsTariffId: tariffId,
        variationTariffId,
        destinationId,
        isSameDestination: variationTariffId ? isSameDestination : true,
      },
      'part',
      box._id,
    )

    setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
  }

  const curDestination = destinations.find(el => el._id === box.destinationId)

  const currentStorekeeper = storekeepers.find(el => el._id === box.storekeeperId)
  const currentLogicsTariff = currentStorekeeper?.tariffLogistics.find(el => el._id === box.logicsTariffId)

  const firstNumOfCode = curDestination?.zipCode[0]

  const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  const tariffName = currentLogicsTariff?.name

  const selectedVariationTariff = currentLogicsTariff?.destinationVariations?.find(
    el => el._id === box?.variationTariffId,
  )

  const tariffRate = toFixed(
    currentLogicsTariff?.conditionsByRegion[regionOfDeliveryName]?.rate || selectedVariationTariff?.pricePerKgUsd,
    2,
  )

  const isSameDestination = selectedVariationTariff?.destination?._id === curDestination?._id

  useEffect(() => {
    if (box?.variationTariffId) {
      onChangeField({ isSameDestination }, 'part', box._id)
    }
  }, [isSameDestination, box?.variationTariffId, box?._id])

  return (
    <div className={classNames.box}>
      <div className={classNames.itemWrapper}>
        <div className={classNames.orderWrapper}>
          {box.items.map((order, orderIndex) => (
            <div key={`box_${box._id}_${orderIndex}`} className={classNames.orderWrapper}>
              <div key={orderIndex} className={classNames.order}>
                <img className={classNames.img} src={getAmazonImageUrl(order.product?.images[0])} />
                <div>
                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asinTitle}>{t(TranslationKey.Box)}</Typography>
                    <Typography className={classNames.asinValue}>{box.humanFriendlyId}</Typography>
                  </div>

                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asinTitle}>{t(TranslationKey.ASIN)}</Typography>
                    <Typography className={classNames.asinValue}>{order.product.asin}</Typography>

                    {order.product.asin ? <CopyValue text={order.product.asin} /> : null}
                  </div>

                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asinTitle}>{t(TranslationKey.SKU)}</Typography>
                    <Typography className={classNames.asinValue}>
                      {order.product.skusByClient?.length ? order.product.skusByClient[0] : '-'}
                    </Typography>

                    {order.product.skusByClient?.length ? <CopyValue text={order.product.skusByClient[0]} /> : null}
                  </div>

                  <Typography className={classNames.title}>{order.product.amazonTitle}</Typography>

                  <Field
                    labelClasses={classNames.label}
                    label={t(TranslationKey.BarCode)}
                    inputComponent={
                      <div>
                        <Chip
                          classes={{
                            root: classNames.barcodeChip,
                            clickable: classNames.barcodeChipHover,
                            deletable: classNames.barcodeChipHover,
                            deleteIcon: classNames.barcodeChipIcon,
                            label: classNames.barcodeChiplabel,
                          }}
                          className={cx({ [classNames.barcodeChipExists]: order.barCode })}
                          size="small"
                          label={
                            order.tmpBarCode?.length
                              ? t(TranslationKey['File added'])
                              : order.barCode
                              ? order.barCode
                              : t(TranslationKey['Set Barcode'])
                          }
                          onClick={() => onClickBarcode(order)}
                          // onDelete={!item.barCode ? undefined : () => onDeleteBarcode(item.product._id)}
                        />
                      </div>
                    }
                  />
                  {checkIsStorekeeper(UserRoleCodeMap[userInfo?.role]) ? (
                    <div
                      className={cx({
                        // Раскоментить если нужно будет подсвечивать
                        // [classNames.containerAccent]:
                        //   (order.isBarCodeAlreadyAttachedByTheSupplier || order.isBarCodeAttachedByTheStorekeeper) &&
                        //   !order.barCode &&
                        //   !order.tmpBarCode?.length,
                      })}
                    >
                      <Field
                        oneLine
                        labelClasses={classNames.label}
                        tooltipInfoContent={t(TranslationKey['The supplier has glued the barcode before shipment'])}
                        containerClasses={classNames.checkboxContainer}
                        // containerClasses={cx(classNames.checkboxContainer, {
                        //   [classNames.containerAccent]: true,
                        // })}
                        label={t(TranslationKey['The barcode is glued by the supplier'])}
                        inputComponent={
                          <Checkbox
                            checked={order.isBarCodeAlreadyAttachedByTheSupplier}
                            onClick={() =>
                              onChangeBarcodeGlued(
                                order,
                                'isBarCodeAlreadyAttachedByTheSupplier',
                              )(!order.isBarCodeAlreadyAttachedByTheSupplier)
                            }
                          />
                        }
                      />
                      <Field
                        oneLine
                        labelClasses={classNames.label}
                        tooltipInfoContent={t(
                          TranslationKey['The barcode was glued on when the box was accepted at the prep center'],
                        )}
                        containerClasses={classNames.checkboxContainer}
                        label={t(TranslationKey['The barcode is glued by the Storekeeper'])}
                        inputComponent={
                          <Checkbox
                            checked={order.isBarCodeAttachedByTheStorekeeper}
                            onClick={() =>
                              onChangeBarcodeGlued(
                                order,
                                'isBarCodeAttachedByTheStorekeeper',
                              )(!order.isBarCodeAttachedByTheStorekeeper)
                            }
                          />
                        }
                      />
                    </div>
                  ) : null}
                </div>

                <div>
                  <Field
                    disabled
                    label={t(TranslationKey.Quantity)}
                    className={classNames.orderInput}
                    labelClasses={classNames.label}
                    value={isMasterBox ? box.amount : order.amount}
                    tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                  />

                  {isMasterBox ? <Typography className={classNames.superBox}>{`SB x ${box.amount}`}</Typography> : null}
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
                error={!box.isSameDestination && t(TranslationKey['Incorrect destination or tariff'])}
                containerClasses={classNames.field}
                tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                label={t(TranslationKey.Destination)}
                labelClasses={classNames.label}
                inputComponent={
                  <WithSearchSelect
                    width={230}
                    favourites={destinationsFavourites}
                    selectedItemName={
                      destinations.find(el => el._id === box.destinationId)?.name || t(TranslationKey['Not chosen'])
                    }
                    data={
                      box.variationTariffId &&
                      currentLogicsTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                        ? destinations.filter(
                            el => el?._id === (box?.destinationId || box?.variationTariff?.destinationId),
                          )
                        : destinations.filter(el => el?.storekeeper?._id !== box?.storekeeperId)
                    }
                    searchFields={['name']}
                    onClickNotChosen={() => onChangeField({ target: { value: null } }, 'destinationId', box._id)}
                    onClickSelect={el => onChangeField({ target: { value: el._id } }, 'destinationId', box._id)}
                    onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                  />
                }
              />

              <Field
                containerClasses={classNames.field}
                tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
                labelClasses={classNames.label}
                inputComponent={
                  <Button
                    variant={box.logicsTariffId && 'text'}
                    className={cx({
                      [classNames.storekeeperBtn]: !box.logicsTariffId,
                      [classNames.storekeeperTrafficBtn]: box.logicsTariffId,
                    })}
                    onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
                  >
                    {box.logicsTariffId
                      ? `${box.logicsTariffId ? `${tariffName}${tariffRate ? ' / ' + tariffRate + ' $' : ''}` : 'none'}`
                      : t(TranslationKey.Select)}
                  </Button>
                }
              />

              <Field
                inputProps={{ maxLength: 255 }}
                tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                containerClasses={classNames.field}
                labelClasses={classNames.label}
                inputClasses={cx(classNames.fieldInput, {
                  [classNames.inputAccent]:
                    (box.shippingLabel || box.tmpShippingLabel?.length) &&
                    !box.fbaShipment &&
                    !curDestination?.storekeeper,
                })}
                label={t(TranslationKey['FBA Shipment'])}
                value={box.fbaShipment}
                onChange={e => onChangeField(e, 'fbaShipment', box._id)}
              />

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
                        ? trimBarcode(box.shippingLabel)
                        : t(TranslationKey['Set Shipping Label'])
                    }
                    onClick={() => onClickShippingLabel()}
                    onDelete={!box.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                  />
                }
              />

              {checkIsStorekeeper(UserRoleCodeMap[userInfo?.role]) ? (
                <Field
                  oneLine
                  labelClasses={classNames.label}
                  label={t(TranslationKey['Shipping label was glued to the warehouse'])}
                  inputComponent={
                    <div className={classNames.checkboxWrapper}>
                      <Checkbox
                        color="primary"
                        checked={box.isShippingLabelAttachedByStorekeeper}
                        onChange={e => onChangeField(e, 'isShippingLabelAttachedByStorekeeper', box._id)}
                      />
                      {/* <Typography className={classNames.checkboxLabel}>{t(TranslationKey.FBA)}</Typography> */}
                    </div>
                  }
                />
              ) : null}
            </div>
          ) : null}

          <div className={classNames.bottomBlockWrapper}>
            <IconButton classes={{ root: classNames.icon }} onClick={() => onRemoveBox(box._id)}>
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
          showCheckbox={showCheckbox}
          destinationsData={destinations}
          storekeepers={storekeepers.filter(el => el._id === box?.storekeeper._id)}
          curStorekeeperId={box.storekeeperId}
          curTariffId={box.logicsTariffId}
          currentDestinationId={box?.destinationId}
          currentVariationTariffId={box?.variationTariffId}
          onSubmit={onSubmitSelectStorekeeperAndTariff}
        />
      </Modal>

      <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
        <SetBarcodeModal
          tmpCode={curProductToEditBarcode?.tmpBarCode}
          item={curProductToEditBarcode}
          onClickSaveBarcode={data => onClickSaveBarcode(curProductToEditBarcode)(data)}
          onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
        />
      </Modal>
    </div>
  )
}

const NewBoxes = ({
  showCheckbox,
  userInfo,
  newBoxes,
  onChangeField,
  destinations,
  storekeepers,
  visibleBoxes,
  setVisibleBoxes,
  onRemoveBox,
  setNewBoxes,
  destinationsFavourites,
  setDestinationsFavouritesItem,
}) => {
  const { classes: classNames } = useClassNames()

  const [nameSearchValue, setNameSearchValue] = useState('')

  useEffect(() => {
    if (nameSearchValue) {
      setVisibleBoxes(
        newBoxes.filter(
          el =>
            el.items.some(item => item.product.amazonTitle?.toLowerCase().includes(nameSearchValue.toLowerCase())) ||
            el.items.some(item =>
              item.product.skusByClient?.some(sku => sku.toLowerCase().includes(nameSearchValue.toLowerCase())),
            ) ||
            el.items.some(item => item.product.asin?.toLowerCase().includes(nameSearchValue.toLowerCase())),
        ),
      )
    } else {
      setVisibleBoxes(newBoxes)
    }
  }, [newBoxes, nameSearchValue])

  return (
    <div className={classNames.newBoxes}>
      <div className={classNames.currentBoxTitle}>
        <Typography className={classNames.sectionTitle}>{t(TranslationKey.Boxes)}</Typography>

        <Typography className={classNames.searchCount}>{`${visibleBoxes.length} / ${newBoxes.length}`}</Typography>

        <SearchInput
          inputClasses={classNames.searchInput}
          value={nameSearchValue}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
          onChange={e => setNameSearchValue(e.target.value)}
        />
      </div>

      {visibleBoxes.map((box, boxIndex) => (
        <div key={boxIndex} className={cx({ [classNames.marginBox]: newBoxes.length > 1 })}>
          <Box
            isNewBox
            showCheckbox={showCheckbox}
            userInfo={userInfo}
            newBoxes={newBoxes}
            destinations={destinations}
            storekeepers={storekeepers}
            index={boxIndex}
            box={box}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            setNewBoxes={setNewBoxes}
            onChangeField={onChangeField}
            onRemoveBox={onRemoveBox}
          />
        </div>
      ))}
    </div>
  )
}

export const EditMultipleBoxesForm = observer(
  ({
    showCheckbox,
    userInfo,
    destinations,
    storekeepers,
    onSubmit,
    onCloseModal,
    selectedBoxes,
    destinationsFavourites,
    setDestinationsFavouritesItem,
  }) => {
    const { classes: classNames } = useClassNames()

    const [sharedFields, setSharedFields] = useState({
      destinationId: null,
      logicsTariffId: null,
      variationTariffId: null,
      shippingLabel: null,
      fbaShipment: '',
      isShippingLabelAttachedByStorekeeper: false,

      isBarCodeAlreadyAttachedByTheSupplier: false,
      isBarCodeAttachedByTheStorekeeper: false,

      storekeeperId: selectedBoxes[0]?.storekeeper?._id || undefined,
      tmpShippingLabel: [],
      tmpBarCode: [],
    })

    const [destinationId, setDestinationId] = useState(sharedFields.destinationId)

    useEffect(() => {
      setDestinationId(sharedFields.destinationId)
    }, [sharedFields.destinationId])

    const onChangeSharedFields = (event, field) => {
      const newFormFields = { ...sharedFields }

      if (['isShippingLabelAttachedByStorekeeper'].includes(field)) {
        newFormFields[field] = event.target.checked
      } else if (['isBarCodeAlreadyAttachedByTheSupplier', 'isBarCodeAttachedByTheStorekeeper'].includes(field)) {
        if (field === 'isBarCodeAlreadyAttachedByTheSupplier' && event.target.checked) {
          newFormFields[field] = event.target.checked
          newFormFields.isBarCodeAttachedByTheStorekeeper = false
        } else if (field === 'isBarCodeAttachedByTheStorekeeper' && event.target.checked) {
          newFormFields[field] = event.target.checked
          newFormFields.isBarCodeAlreadyAttachedByTheSupplier = false
        } else {
          newFormFields[field] = event.target.checked
        }
      } else {
        newFormFields[field] = event.target.value
      }

      setSharedFields(newFormFields)
    }

    const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)
    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const onClickBarcode = item => {
      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onClickSaveBarcode = product => value => {
      onChangeSharedFields({ target: { value } }, 'tmpBarCode')

      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId, variationTariffId, destinationId) => {
      setSharedFields({ ...sharedFields, storekeeperId, logicsTariffId: tariffId, variationTariffId })
      setDestinationId(destinationId)

      setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
    }

    const setShippingLabel = () => value => {
      onChangeSharedFields({ target: { value } }, 'tmpShippingLabel')
    }

    const onClickShippingLabel = () => {
      setShowSetShippingLabelModal(!showSetShippingLabelModal)
    }

    const onDeleteShippingLabel = () => {
      onChangeSharedFields({ target: { value: '' } }, 'shippingLabel')
    }

    const [newBoxes, setNewBoxes] = useState(
      selectedBoxes.map(el => ({
        ...el,
        destinationId: el.destination?._id || null,
        storekeeperId: el.storekeeper?._id || null,
        logicsTariffId: el.logicsTariff?._id || null,
        variationTariffId: el?.variationTariff?._id || null,

        tmpShippingLabel: [],
        items: el?.items ? [...el.items.map(el => ({ ...el, changeBarCodInInventory: false, tmpBarCode: [] }))] : [],

        isSameDestination: true,
      })),
    )

    const [visibleBoxes, setVisibleBoxes] = useState([])

    const [applyBtnsClicked, setApplyBtnsClicked] = useState({
      destinationId: false,
      logicsTariffId: false,
      fbaShipment: false,
      tmpShippingLabel: false,
      tmpBarCode: false,
      isShippingLabelAttachedByStorekeeper: false,
      isBarcodeLabelAttached: false,
    })

    const onRemoveBox = boxId => {
      const arr = newBoxes.filter(box => box._id !== boxId)
      setNewBoxes([...arr])
    }

    useEffect(() => {
      if (!newBoxes.length) {
        onCloseModal()
      }
    }, [newBoxes.length])

    // const onChangeField = (e, field, boxId) => {
    //   console.log('VALUE', e)

    //   const targetBox = newBoxes.filter(newBox => newBox._id === boxId)[0]

    //   if (field === 'part') {
    //     const updatedTargetBox = {
    //       ...targetBox,
    //       ...e,
    //     }

    //     const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === boxId ? updatedTargetBox : newBox))

    //     console.log('updatedNewBoxes', updatedNewBoxes)

    //     setNewBoxes(updatedNewBoxes)
    //   } else {
    //     const updatedTargetBox = {
    //       ...targetBox,
    //       [field]: field === 'isShippingLabelAttachedByStorekeeper' ? e.target.checked : e.target.value,
    //     }

    //     const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === boxId ? updatedTargetBox : newBox))

    //     setNewBoxes(updatedNewBoxes)
    //   }
    // }

    const onChangeField = (e, field, boxId) => {
      setNewBoxes(prevBoxes => {
        const updatedBoxes = prevBoxes.map(newBox => {
          if (newBox._id === boxId) {
            if (field === 'part') {
              return {
                ...newBox,
                ...e,
              }
            } else {
              return {
                ...newBox,
                [field]: field === 'isShippingLabelAttachedByStorekeeper' ? e.target.checked : e.target.value,
              }
            }
          }
          return newBox
        })

        return updatedBoxes
      })
    }

    const onApplySharedValuesToAllBoxes = field => {
      const visibleBoxesIds = visibleBoxes.map(el => el._id)

      let updatedNewBoxes

      if (field === 'tmpBarCode') {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,
                items: newBox?.items
                  ? [
                      ...newBox.items.map(el => ({
                        ...el,
                        changeBarCodInInventory: false,
                        tmpBarCode: sharedFields.tmpBarCode,
                      })),
                    ]
                  : [],
              }
            : newBox,
        )
      } else if (field === 'isBarcodeLabelAttached') {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,
                items: newBox?.items
                  ? [
                      ...newBox.items.map(el => ({
                        ...el,
                        isBarCodeAlreadyAttachedByTheSupplier: sharedFields.isBarCodeAlreadyAttachedByTheSupplier,
                        isBarCodeAttachedByTheStorekeeper: sharedFields.isBarCodeAttachedByTheStorekeeper,
                      })),
                    ]
                  : [],
              }
            : newBox,
        )
      } else if (field === 'logicsTariffId') {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,
                logicsTariffId: sharedFields.logicsTariffId,
                variationTariffId: sharedFields.variationTariffId,
              }
            : newBox,
        )
      } else {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,
                [field]: sharedFields[field],
              }
            : newBox,
        )
      }

      setApplyBtnsClicked({ ...applyBtnsClicked, [field]: true })

      setTimeout(() => setApplyBtnsClicked({ ...applyBtnsClicked, [field]: false }), 1000)

      setNewBoxes(updatedNewBoxes)
    }

    const onClickSubmit = () => {
      onSubmit(newBoxes, selectedBoxes)
    }

    const curDestination = destinations.find(el => el._id === sharedFields.destinationId)

    const firstNumOfCode = curDestination?.zipCode[0]

    const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

    const currentStorekeeper = storekeepers.find(el => el._id === sharedFields.storekeeperId)
    const currentLogicsTariff = currentStorekeeper?.tariffLogistics.find(el => el._id === sharedFields.logicsTariffId)

    const tariffName = currentLogicsTariff?.name

    const tariffRate = toFixed(
      currentLogicsTariff?.conditionsByRegion[regionOfDeliveryName]?.rate ||
        currentLogicsTariff?.destinationVariations?.find(el => el._id === sharedFields?.variationTariffId)
          ?.pricePerKgUsd,
      2,
    )

    const disabledSubmitBtn =
      newBoxes.some(
        el =>
          !el.isSameDestination ||
          !el.logicsTariffId ||
          ((el.shippingLabel || el.tmpShippingLabel?.length) &&
            !el.fbaShipment &&
            !destinations.find(e => e._id === el.destinationId)?.storekeeper),
      ) || selectedBoxes.some(box => box?.status !== BoxStatus.IN_STOCK)

    const disabledApplyBtn = !visibleBoxes.length

    return (
      <div className={classNames.root}>
        <div className={classNames.modalTitleWrapper}>
          <Typography className={classNames.modalTitle}>{t(TranslationKey['Editing boxes'])}</Typography>
          <img src="/assets/img/edit.png" />
        </div>

        <div className={classNames.boxesWrapper}>
          <div className={classNames.currentBox}>
            <div className={classNames.currentBoxTitle}>
              <Typography className={classNames.sectionTitle}>{t(TranslationKey['Shared options'])}</Typography>
            </div>

            <div className={classNames.sharedItemSubWrapper}>
              <div>
                <Field
                  containerClasses={classNames.field}
                  tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                  label={t(TranslationKey.Destination)}
                  labelClasses={classNames.label}
                  inputComponent={
                    <WithSearchSelect
                      width={230}
                      favourites={destinationsFavourites}
                      selectedItemName={
                        destinations.find(el => el._id === sharedFields.destinationId)?.name ||
                        t(TranslationKey['Not chosen'])
                      }
                      data={
                        sharedFields.variationTariffId &&
                        currentLogicsTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                          ? destinations
                              // .filter(el => el.storekeeper?._id !== sharedFields.storekeeperId)
                              .filter(el => el?._id === destinationId)
                          : destinations.filter(el => el.storekeeper?._id !== sharedFields.storekeeperId)
                      }
                      searchFields={['name']}
                      onClickNotChosen={() => onChangeSharedFields({ target: { value: null } }, 'destinationId')}
                      onClickSelect={el => onChangeSharedFields({ target: { value: el._id } }, 'destinationId')}
                      onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                    />
                  }
                />

                <Button
                  disabled={disabledApplyBtn}
                  className={cx(classNames.applyButton, {
                    [classNames.applyButtonClicked]: applyBtnsClicked.destinationId,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('destinationId')}
                >
                  {applyBtnsClicked.destinationId ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

              <div>
                <Field
                  containerClasses={classNames.field}
                  tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                  label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
                  labelClasses={classNames.label}
                  inputComponent={
                    <Button
                      variant={sharedFields.logicsTariffId && 'text'}
                      className={cx({
                        [classNames.storekeeperBtn]: !sharedFields.logicsTariffId,
                        [classNames.storekeeperBtnDefault]: sharedFields.logicsTariffId,
                      })}
                      onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
                    >
                      {sharedFields.logicsTariffId
                        ? `${
                            sharedFields.logicsTariffId
                              ? `${tariffName}${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                              : 'none'
                          }`
                        : t(TranslationKey.Select)}
                    </Button>
                  }
                />

                <Button
                  disabled={disabledApplyBtn}
                  className={cx(classNames.applyButton, {
                    [classNames.applyButtonClicked]: applyBtnsClicked.logicsTariffId,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('logicsTariffId')}
                >
                  {applyBtnsClicked.logicsTariffId ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

              <div>
                <Field
                  inputProps={{ maxLength: 255 }}
                  tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                  containerClasses={classNames.field}
                  labelClasses={classNames.label}
                  className={classNames.fieldInput}
                  label={t(TranslationKey['FBA Shipment'])}
                  value={sharedFields.fbaShipment}
                  onChange={e => onChangeSharedFields(e, 'fbaShipment')}
                />

                <Button
                  disabled={disabledApplyBtn}
                  className={cx(classNames.applyButton, {
                    [classNames.applyButtonClicked]: applyBtnsClicked.fbaShipment,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('fbaShipment')}
                >
                  {applyBtnsClicked.fbaShipment ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

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
                      className={cx({ [classNames.barcodeChipExists]: sharedFields.shippingLabel })}
                      size="small"
                      label={
                        sharedFields.tmpShippingLabel?.length
                          ? t(TranslationKey['File added'])
                          : sharedFields.shippingLabel
                          ? trimBarcode(sharedFields.shippingLabel)
                          : t(TranslationKey['Set Shipping Label'])
                      }
                      onClick={() => onClickShippingLabel()}
                      onDelete={!sharedFields.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                    />
                  }
                />
                <Button
                  disabled={disabledApplyBtn}
                  className={cx(classNames.applyButton, {
                    [classNames.applyButtonClicked]: applyBtnsClicked.tmpShippingLabel,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('tmpShippingLabel')}
                >
                  {applyBtnsClicked.tmpShippingLabel ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

              <div>
                <Field
                  labelClasses={classNames.label}
                  label={t(TranslationKey.BarCode)}
                  inputComponent={
                    <div>
                      <Chip
                        classes={{
                          root: classNames.barcodeChip,
                          clickable: classNames.barcodeChipHover,
                          deletable: classNames.barcodeChipHover,
                          deleteIcon: classNames.barcodeChipIcon,
                          label: classNames.barcodeChiplabel,
                        }}
                        className={cx({ [classNames.barcodeChipExists]: sharedFields.barCode })}
                        size="small"
                        label={
                          sharedFields.tmpBarCode?.length
                            ? t(TranslationKey['File added'])
                            : sharedFields.barCode
                            ? sharedFields.barCode
                            : t(TranslationKey['Set Barcode'])
                        }
                        onClick={() => onClickBarcode(sharedFields)}
                        // onDelete={!item.barCode ? undefined : () => onDeleteBarcode(item.product._id)}
                      />
                    </div>
                  }
                />
                <Button
                  disabled={disabledApplyBtn}
                  className={cx(classNames.applyButton, {
                    [classNames.applyButtonClicked]: applyBtnsClicked.tmpBarCode,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('tmpBarCode')}
                >
                  {applyBtnsClicked.tmpBarCode ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

              {checkIsStorekeeper(UserRoleCodeMap[userInfo?.role]) ? (
                <div>
                  <Field
                    oneLine
                    labelClasses={classNames.label}
                    label={t(TranslationKey['Shipping label was glued to the warehouse'])}
                    inputComponent={
                      <div className={classNames.checkboxWrapper}>
                        <Checkbox
                          color="primary"
                          checked={sharedFields.isShippingLabelAttachedByStorekeeper}
                          onChange={e => onChangeSharedFields(e, 'isShippingLabelAttachedByStorekeeper')}
                        />
                        {/* <Typography className={classNames.checkboxLabel}>{t(TranslationKey.FBA)}</Typography> */}
                      </div>
                    }
                  />
                  <Button
                    disabled={disabledApplyBtn}
                    className={cx(classNames.applyButton, {
                      [classNames.applyButtonClicked]: applyBtnsClicked.isShippingLabelAttachedByStorekeeper,
                    })}
                    onClick={() => onApplySharedValuesToAllBoxes('isShippingLabelAttachedByStorekeeper')}
                  >
                    {applyBtnsClicked.isShippingLabelAttachedByStorekeeper ? <DoneIcon /> : t(TranslationKey.Apply)}
                  </Button>
                </div>
              ) : null}

              {checkIsStorekeeper(UserRoleCodeMap[userInfo?.role]) ? (
                <div>
                  <Field
                    oneLine
                    labelClasses={classNames.label}
                    tooltipInfoContent={t(TranslationKey['The supplier has glued the barcode before shipment'])}
                    containerClasses={classNames.checkboxContainer}
                    label={t(TranslationKey['The barcode is glued by the supplier'])}
                    inputComponent={
                      <Checkbox
                        checked={sharedFields.isBarCodeAlreadyAttachedByTheSupplier}
                        onChange={e => onChangeSharedFields(e, 'isBarCodeAlreadyAttachedByTheSupplier')}
                      />
                    }
                  />
                  <Field
                    oneLine
                    labelClasses={classNames.label}
                    tooltipInfoContent={t(
                      TranslationKey['The barcode was glued on when the box was accepted at the prep center'],
                    )}
                    containerClasses={classNames.checkboxContainer}
                    label={t(TranslationKey['The barcode is glued by the Storekeeper'])}
                    inputComponent={
                      <Checkbox
                        checked={sharedFields.isBarCodeAttachedByTheStorekeeper}
                        onChange={e => onChangeSharedFields(e, 'isBarCodeAttachedByTheStorekeeper')}
                      />
                    }
                  />

                  <Button
                    disabled={disabledApplyBtn}
                    className={cx(classNames.applyButton, {
                      [classNames.applyButtonClicked]: applyBtnsClicked.isBarcodeLabelAttached,
                    })}
                    onClick={() => onApplySharedValuesToAllBoxes('isBarcodeLabelAttached')}
                  >
                    {applyBtnsClicked.isBarcodeLabelAttached ? <DoneIcon /> : t(TranslationKey.Apply)}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>

          <NewBoxes
            showCheckbox={showCheckbox}
            userInfo={userInfo}
            visibleBoxes={visibleBoxes}
            newBoxes={newBoxes}
            destinations={destinations}
            storekeepers={storekeepers}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            setVisibleBoxes={setVisibleBoxes}
            setNewBoxes={setNewBoxes}
            onChangeField={onChangeField}
            onRemoveBox={onRemoveBox}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button disabled={disabledSubmitBtn} className={classNames.button} onClick={onClickSubmit}>
            {t(TranslationKey.Edit)}
          </Button>

          <Button
            variant="text"
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            className={cx(classNames.button, classNames.cancelButton)}
            onClick={onCloseModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>

        <Modal
          openModal={showSetShippingLabelModal}
          setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        >
          <SetShippingLabelModal
            tmpShippingLabel={sharedFields.tmpShippingLabel}
            item={sharedFields}
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
            showCheckbox={showCheckbox}
            destinationsData={destinations}
            storekeepers={
              sharedFields?.storekeeperId
                ? storekeepers?.filter(el => el._id === sharedFields?.storekeeperId)
                : storekeepers.filter(el => el._id === selectedBoxes[0]?.storekeeper?._id)
            }
            curStorekeeperId={sharedFields?.storekeeperId}
            curTariffId={sharedFields?.logicsTariffId}
            currentDestinationId={sharedFields?.destinationId}
            currentVariationTariffId={sharedFields?.variationTariffId}
            onSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        </Modal>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            tmpCode={sharedFields?.tmpBarCode}
            item={sharedFields}
            onClickSaveBarcode={data => onClickSaveBarcode(sharedFields)(data)}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>
      </div>
    )
  },
)
