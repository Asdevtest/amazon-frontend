import {cx} from '@emotion/css'
import {Chip, Typography} from '@mui/material'

import React, {useState} from 'react'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'
import {zipCodeGroups} from '@constants/zip-code-groups'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {SelectStorekeeperAndTariffForm} from '@components/forms/select-storkeeper-and-tariff-form'
import {Modal} from '@components/modal'
import {WithSearchSelect} from '@components/selects/with-search-select'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {SetShippingLabelModal} from '../set-shipping-label-modal'
import {BoxForMerge} from './box-for-merge'
import {useClassNames} from './merge-boxes-modal.style'

export const MergeBoxesModal = ({
  destinations,
  storekeepers,
  selectedBoxes,
  requestStatus,
  setOpenModal,
  onSubmit,
  onRemoveBoxFromSelected,
}) => {
  const {classes: classNames} = useClassNames()

  const [boxBody, setBoxBody] = useState({
    shippingLabel: null,
    destinationId: selectedBoxes.some(box => box.destinationId !== selectedBoxes[0].destinationId)
      ? null
      : selectedBoxes[0].destinationId,

    storekeeperId: selectedBoxes.some(box => box.storekeeperId !== selectedBoxes[0].storekeeperId)
      ? ''
      : selectedBoxes[0].storekeeperId,
    logicsTariffId: selectedBoxes.some(box => box.logicsTariffId !== selectedBoxes[0].logicsTariffId)
      ? ''
      : selectedBoxes[0].logicsTariffId,

    fbaShipment: '',

    tmpShippingLabel: [],
  })

  const [comment, setComment] = useState('')
  const onSubmitBoxesModal = () => {
    onSubmit({...boxBody, destinationId: boxBody.destinationId || null}, selectedBoxes[0], comment)
    setBoxBody({shippingLabel: '', destinationId: null, logicsTariffId: '', fbaShipment: '', tmpShippingLabel: []})
    setComment('')
  }

  const onCloseBoxesModal = () => {
    setOpenModal()
    setBoxBody({shippingLabel: '', destinationId: null, logicsTariffId: '', fbaShipment: '', tmpShippingLabel: []})
    setComment('')
  }

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)

  const setShippingLabel = () => value => {
    const newFormFields = {...boxBody}
    newFormFields.tmpShippingLabel = value

    setBoxBody(newFormFields)
  }

  const onClickShippingLabel = () => {
    setShowSetShippingLabelModal(!showSetShippingLabelModal)
  }

  const onDeleteShippingLabel = () => {
    const newFormFields = {...boxBody}
    newFormFields.shippingLabel = ''
    setBoxBody(newFormFields)
  }

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

  const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId) => {
    setBoxBody({...boxBody, storekeeperId, logicsTariffId: tariffId})

    setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
  }

  const isDifferentStorekeepers = selectedBoxes.some(el => el.storekeeper._id !== selectedBoxes[0].storekeeper._id)

  const disabledSubmit =
    requestStatus === loadingStatuses.isLoading ||
    boxBody.logicsTariffId === '' ||
    selectedBoxes.length < 2 ||
    (boxBody.shippingLabel?.length < 5 && boxBody.shippingLabel?.length > 0) ||
    isDifferentStorekeepers

  const curDestination = destinations.find(el => el._id === boxBody.destinationId)

  const firstNumOfCode = curDestination?.zipCode[0]

  const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  const tariffName = storekeepers
    .find(el => el._id === boxBody.storekeeperId)
    ?.tariffLogistics.find(el => el._id === boxBody.logicsTariffId)?.name

  const tariffRate = storekeepers
    .find(el => el._id === boxBody.storekeeperId)
    ?.tariffLogistics.find(el => el._id === boxBody.logicsTariffId)?.conditionsByRegion[regionOfDeliveryName]?.rate
  const boxData = selectedBoxes.map(box => box.items)

  const finalBoxData = Object.values(
    boxData.flat().reduce((acc, item) => {
      if (!acc[item.product.asin]) {
        acc[item.product.asin] = {...item}
      } else {
        acc[item.product.asin].amount = acc[item.product.asin].amount + item.amount
      }
      return acc
    }, {}),
  )

  return (
    <div>
      <div className={classNames.mainWrapper}>
        <div>
          <Typography className={classNames.boxTitle}>{t(TranslationKey['Source boxes'])}</Typography>
          <div className={classNames.marginBox}>
            {selectedBoxes.map((box, boxIndex) => (
              <BoxForMerge
                key={boxIndex}
                index={boxIndex}
                box={box}
                // showFullCard={showFullCard}
                // setShowFullCard={setShowFullCard}
                onRemoveBox={onRemoveBoxFromSelected}
              />
            ))}
          </div>
        </div>

        <div>
          <Typography className={classNames.boxTitle}>{t(TranslationKey['Final box data'])}</Typography>
          {/* <Typography>{t(TranslationKey['Please note the change in stock and method of delivery!!!'])}</Typography> */}
          <div className={classNames.finalBoxWrapper}>
            {finalBoxData &&
              finalBoxData.map((order, orderIndex) => (
                <div key={orderIndex} className={classNames.order}>
                  <img className={classNames.img} src={getAmazonImageUrl(order.product?.images[0])} />
                  <div>
                    <div className={classNames.asinWrapper}>
                      <Typography className={classNames.asinTitle}>{t(TranslationKey.ASIN)}</Typography>
                      <Typography className={classNames.asinValue}>{order.product?.asin}</Typography>
                    </div>

                    <Typography className={classNames.title}>{order.product?.amazonTitle}</Typography>
                  </div>

                  <div>
                    <Field
                      disabled
                      label={t(TranslationKey.Quantity)}
                      className={classNames.orderInput}
                      labelClasses={classNames.label}
                      value={order?.amount}
                      tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                    />
                  </div>
                </div>
              ))}

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
                      destinations.find(el => el._id === boxBody.destinationId)?.name || t(TranslationKey['Not chosen'])
                    }
                    data={destinations}
                    fieldName="name"
                    onClickNotChosen={() => setBoxBody({...boxBody, destinationId: ''})}
                    onClickSelect={el => setBoxBody({...boxBody, destinationId: el._id})}
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
                    disableElevation
                    disabled={isDifferentStorekeepers}
                    color="primary"
                    variant={boxBody.logicsTariffId && 'text'}
                    className={cx({[classNames.storekeeperBtn]: !boxBody.logicsTariffId})}
                    onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
                  >
                    {boxBody.logicsTariffId
                      ? `${storekeepers.find(el => el._id === boxBody.storekeeperId).name} /  
                ${
                  boxBody.logicsTariffId
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
                tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                containerClasses={classNames.field}
                className={classNames.fieldInput}
                labelClasses={classNames.label}
                inputProps={{maxLength: 255}}
                label={t(TranslationKey['FBA Shipment'])}
                value={boxBody.fbaShipment}
                onChange={e => setBoxBody({...boxBody, fbaShipment: e.target.value})}
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
                    className={cx({[classNames.barcodeChipExists]: boxBody.shippingLabel})}
                    size="small"
                    label={
                      boxBody.tmpShippingLabel?.length
                        ? t(TranslationKey['File added'])
                        : boxBody.shippingLabel
                        ? boxBody.shippingLabel
                        : t(TranslationKey['Set Shipping Label'])
                    }
                    onClick={() => onClickShippingLabel()}
                    onDelete={!boxBody.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                  />
                }
              />
            </div>
          </div>
        </div>

        <Field
          multiline
          className={classNames.heightFieldAuto}
          minRows={18}
          maxRows={18}
          inputProps={{maxLength: 2000}}
          label={t(TranslationKey['Client comment on the task'])}
          placeholder={t(TranslationKey['Client comment on the task'])}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>
      <div className={cx(classNames.modalFooter, {[classNames.modalAlternateFooter]: !isDifferentStorekeepers})}>
        {isDifferentStorekeepers && (
          <Typography className={classNames.attentionDifStorekeepers}>
            {t(TranslationKey['Intermediate warehouses must match!'])}
          </Typography>
        )}
        <div className={classNames.buttonsWrapper}>
          <Button
            tooltipInfoContent={t(TranslationKey['Create a task to merge boxes'])}
            disabled={disabledSubmit}
            color="primary"
            variant="contained"
            className={classNames.button}
            onClick={() => {
              onSubmitBoxesModal()
            }}
          >
            {t(TranslationKey.Merge)}
          </Button>
          <Button
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            disabled={requestStatus === loadingStatuses.isLoading}
            color="primary"
            variant="text"
            className={cx(classNames.button, classNames.cancelButton)}
            onClick={() => {
              onCloseBoxesModal()
            }}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>

      <Modal
        openModal={showSetShippingLabelModal}
        setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
      >
        <SetShippingLabelModal
          tmpShippingLabel={boxBody.tmpShippingLabel}
          item={boxBody}
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
          storekeepers={storekeepers.filter(el => el._id === selectedBoxes[0]?.storekeeper._id)}
          curStorekeeperId={boxBody.storekeeperId}
          curTariffId={boxBody.logicsTariffId}
          onSubmit={onSubmitSelectStorekeeperAndTariff}
        />
      </Modal>
    </div>
  )
}
