/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {Chip, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

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
import {SearchInput} from '@components/search-input'
import {WithSearchSelect} from '@components/selects/with-search-select'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {useClassNames} from './edit-multiple-boxes-form.style'

const Box = ({destinations, storekeepers, box, onChangeField}) => {
  const {classes: classNames} = useClassNames()

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)

  const isMasterBox = box.amount && box.amount > 1

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
            <div key={`box_${box._id}_${orderIndex}`}>
              <div key={orderIndex} className={classNames.order}>
                <img className={classNames.img} src={getAmazonImageUrl(order.product.images[0])} />
                <div>
                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asinTitle}>{t(TranslationKey.Box)}</Typography>
                    <Typography className={classNames.asinValue}>{box.humanFriendlyId}</Typography>
                  </div>

                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asinTitle}>{t(TranslationKey.ASIN)}</Typography>
                    <Typography className={classNames.asinValue}>{order.product.asin}</Typography>
                  </div>

                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asinTitle}>{t(TranslationKey.SKU)}</Typography>
                    <Typography className={classNames.asinValue}>
                      {order.product.skusByClient?.length ? order.product.skusByClient[0] : '-'}
                    </Typography>
                  </div>

                  <Typography className={classNames.title}>{order.product.amazonTitle}</Typography>
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
                containerClasses={classNames.field}
                tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                label={t(TranslationKey.Destination)}
                labelClasses={classNames.label}
                inputComponent={
                  <WithSearchSelect
                    width={230}
                    selectedItemName={
                      destinations.find(el => el._id === box.destinationId)?.name || t(TranslationKey['Not chosen'])
                    }
                    data={destinations.filter(el => el.storekeeperId !== box?.storekeeperId)}
                    searchFields={['name']}
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
                  <Button
                    variant={box.logicsTariffId && 'text'}
                    className={cx({[classNames.storekeeperBtn]: !box.logicsTariffId})}
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
                }
              />

              <Field
                inputProps={{maxLength: 255}}
                tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                containerClasses={classNames.field}
                labelClasses={classNames.label}
                className={classNames.fieldInput}
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
                    className={cx({[classNames.barcodeChipExists]: box.shippingLabel})}
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

          {/* <div className={classNames.bottomBlockWrapper}>
            <div />
            <div className={classNames.incomingBtnWrapper}>
              <div className={classNames.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
                <Typography className={classNames.tablePanelViewText}>
                  {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                </Typography>

                {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
              </div>
            </div>
          </div> */}
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

const NewBoxes = ({newBoxes, onChangeField, destinations, storekeepers}) => {
  const {classes: classNames} = useClassNames()

  const [boxes, setBoxes] = useState(newBoxes || [])

  const [nameSearchValue, setNameSearchValue] = useState('')

  useEffect(() => {
    if (nameSearchValue) {
      setBoxes(
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
      setBoxes(newBoxes)
    }
  }, [newBoxes, nameSearchValue])

  return (
    <div className={classNames.newBoxes}>
      <div className={classNames.currentBoxTitle}>
        <Typography className={classNames.sectionTitle}>{t(TranslationKey.Boxes)}</Typography>

        <Typography className={classNames.searchCount}>{`${boxes.length} / ${newBoxes.length}`}</Typography>

        <SearchInput
          inputClasses={classNames.searchInput}
          value={nameSearchValue}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
          onChange={e => setNameSearchValue(e.target.value)}
        />
      </div>

      {boxes.map((box, boxIndex) => (
        <div key={boxIndex} className={cx({[classNames.marginBox]: newBoxes.length > 1})}>
          <Box
            isNewBox
            destinations={destinations}
            storekeepers={storekeepers}
            index={boxIndex}
            box={box}
            onChangeField={onChangeField}
          />
        </div>
      ))}
    </div>
  )
}

export const EditMultipleBoxesForm = observer(
  ({
    destinations,
    storekeepers,
    onSubmit,
    onCloseModal,

    selectedBoxes,
  }) => {
    const {classes: classNames} = useClassNames()

    const [sharedFields, setSharedFields] = useState({
      destinationId: null,
      logicsTariffId: null,
      shippingLabel: null,
      fbaShipment: '',

      storekeeperId: selectedBoxes[0]?.storekeeper?._id,
      tmpShippingLabel: [],
    })

    const onChangeSharedFields = (event, field) => {
      const newFormFields = {...sharedFields}
      newFormFields[field] = event.target.value
      setSharedFields(newFormFields)
    }

    const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)
    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)

    const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId) => {
      onChangeSharedFields({target: {value: storekeeperId}}, 'storekeeperId')
      onChangeSharedFields({target: {value: tariffId}}, 'logicsTariffId')

      setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
    }

    const setShippingLabel = () => value => {
      onChangeSharedFields({target: {value}}, 'tmpShippingLabel')
    }

    const onClickShippingLabel = () => {
      setShowSetShippingLabelModal(!showSetShippingLabelModal)
    }

    const onDeleteShippingLabel = () => {
      onChangeSharedFields({target: {value: ''}}, 'shippingLabel')
    }

    const [newBoxes, setNewBoxes] = useState(
      selectedBoxes.map(el => ({
        ...el,
        destinationId: el.destination?._id || null,
        storekeeperId: el.storekeeper?._id || '',
        logicsTariffId: el.logicsTariff?._id || '',

        tmpShippingLabel: [],
        items: el?.items ? [...el.items.map(el => ({...el, changeBarCodInInventory: false, tmpBarCode: []}))] : [],
      })),
    )

    const onChangeField = (e, field, boxId) => {
      const targetBox = newBoxes.filter(newBox => newBox._id === boxId)[0]

      const updatedTargetBox = {
        ...targetBox,
        [field /* field === 'shippingLabel' ? e.target.value.replace(' ', '') :*/]: e.target.value,
      }

      const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === boxId ? updatedTargetBox : newBox))

      setNewBoxes(updatedNewBoxes)
    }

    const onApplySharedValuesToAllBoxes = field => {
      let updatedNewBoxes = null

      if (field === 'destinationId') {
        updatedNewBoxes = newBoxes.map(newBox => ({
          ...newBox,
          destinationId: sharedFields.destinationId,
        }))
      } else if (field === 'logicsTariffId') {
        updatedNewBoxes = newBoxes.map(newBox => ({
          ...newBox,
          logicsTariffId: sharedFields.logicsTariffId,
        }))
      } else if (field === 'fbaShipment') {
        updatedNewBoxes = newBoxes.map(newBox => ({
          ...newBox,
          fbaShipment: sharedFields.fbaShipment,
        }))
      } else if (field === 'tmpShippingLabel') {
        updatedNewBoxes = newBoxes.map(newBox => ({
          ...newBox,
          shippingLabel: sharedFields.shippingLabel,
          tmpShippingLabel: sharedFields.tmpShippingLabel,
        }))
      }

      setNewBoxes(updatedNewBoxes)
    }

    const onClickSubmit = () => {
      onSubmit(newBoxes, selectedBoxes)
    }

    const curDestination = destinations.find(el => el._id === sharedFields.destinationId)

    const firstNumOfCode = curDestination?.zipCode[0]

    const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

    const tariffName = storekeepers
      .find(el => el._id === sharedFields.storekeeperId)
      ?.tariffLogistics.find(el => el._id === sharedFields.logicsTariffId)?.name

    const tariffRate = storekeepers
      .find(el => el._id === sharedFields.storekeeperId)
      ?.tariffLogistics.find(el => el._id === sharedFields.logicsTariffId)?.conditionsByRegion[
      regionOfDeliveryName
    ]?.rate

    const disabledSubmitBtn = newBoxes.some(el => !el.logicsTariffId)

    return (
      <div>
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
                      selectedItemName={
                        destinations.find(el => el._id === sharedFields.destinationId)?.name ||
                        t(TranslationKey['Not chosen'])
                      }
                      data={destinations.filter(el => el.storekeeperId !== sharedFields.storekeeperId)}
                      searchFields={['name']}
                      onClickNotChosen={() => onChangeSharedFields({target: {value: null}}, 'destinationId')}
                      onClickSelect={el => onChangeSharedFields({target: {value: el._id}}, 'destinationId')}
                    />
                  }
                />

                <Button
                  className={classNames.applyButton}
                  onClick={() => onApplySharedValuesToAllBoxes('destinationId')}
                >
                  {t(TranslationKey.Apply)}
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
                      className={cx({[classNames.storekeeperBtn]: !sharedFields.logicsTariffId})}
                      onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
                    >
                      {sharedFields.logicsTariffId
                        ? `${storekeepers.find(el => el._id === sharedFields.storekeeperId)?.name || 'N/A'} /
                            ${
                              sharedFields.logicsTariffId
                                ? `${tariffName}${regionOfDeliveryName ? ' / ' + regionOfDeliveryName : ''}${
                                    tariffRate ? ' / ' + tariffRate + ' $' : ''
                                  }`
                                : 'none'
                            }`
                        : t(TranslationKey.Select)}
                    </Button>
                  }
                />

                <Button
                  className={classNames.applyButton}
                  onClick={() => onApplySharedValuesToAllBoxes('logicsTariffId')}
                >
                  {t(TranslationKey.Apply)}
                </Button>
              </div>

              <div>
                <Field
                  inputProps={{maxLength: 255}}
                  tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                  containerClasses={classNames.field}
                  labelClasses={classNames.label}
                  className={classNames.fieldInput}
                  label={t(TranslationKey['FBA Shipment'])}
                  value={sharedFields.fbaShipment}
                  onChange={e => onChangeSharedFields(e, 'fbaShipment')}
                />

                <Button className={classNames.applyButton} onClick={() => onApplySharedValuesToAllBoxes('fbaShipment')}>
                  {t(TranslationKey.Apply)}
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
                      className={cx({[classNames.barcodeChipExists]: sharedFields.shippingLabel})}
                      size="small"
                      label={
                        sharedFields.tmpShippingLabel?.length
                          ? t(TranslationKey['File added'])
                          : sharedFields.shippingLabel
                          ? sharedFields.shippingLabel
                          : t(TranslationKey['Set Shipping Label'])
                      }
                      onClick={() => onClickShippingLabel()}
                      onDelete={!sharedFields.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                    />
                  }
                />
                <Button
                  className={classNames.applyButton}
                  onClick={() => onApplySharedValuesToAllBoxes('tmpShippingLabel')}
                >
                  {t(TranslationKey.Apply)}
                </Button>
              </div>
            </div>
          </div>

          <NewBoxes
            newBoxes={newBoxes}
            destinations={destinations}
            storekeepers={storekeepers}
            onChangeField={onChangeField}
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
            storekeepers={storekeepers.filter(el => el._id === sharedFields?.storekeeperId)}
            curStorekeeperId={sharedFields.storekeeperId}
            curTariffId={sharedFields.logicsTariffId}
            onSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        </Modal>
      </div>
    )
  },
)
