import React, {useState} from 'react'

import {Chip, NativeSelect, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {SelectStorekeeperAndTariffForm} from '@components/forms/select-storkeeper-and-tariff-form'
import {Input} from '@components/input'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {SetShippingLabelModal} from '../set-shipping-label-modal'
import {BoxForMerge} from './box-for-merge'
import {useClassNames} from './merge-boxes-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').mergeBoxModal

export const MergeBoxesModal = ({
  destinations,
  storekeepers,
  selectedBoxes,
  requestStatus,
  setOpenModal,
  onSubmit,
  onRemoveBoxFromSelected,
}) => {
  const classNames = useClassNames()

  const [boxBody, setBoxBody] = useState({
    shippingLabel: '',
    destinationId: selectedBoxes.some(box => box.destinationId !== selectedBoxes[0].destinationId)
      ? ''
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
    onSubmit(boxBody, comment)
    setBoxBody({shippingLabel: '', destinationId: '', logicsTariffId: '', fbaShipment: '', tmpShippingLabel: []})
    setComment('')
  }

  const onCloseBoxesModal = () => {
    setOpenModal()
    setBoxBody({shippingLabel: '', destinationId: '', logicsTariffId: '', fbaShipment: '', tmpShippingLabel: []})
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
    boxBody.destinationId === '' ||
    boxBody.logicsTariffId === '' ||
    selectedBoxes.length < 2 ||
    (boxBody.shippingLabel.length < 5 && boxBody.shippingLabel.length > 0) ||
    isDifferentStorekeepers

  return (
    <div className={classNames.mainWrapper}>
      <Typography variant="h5">{textConsts.mainTitle}</Typography>

      {selectedBoxes.map((box, boxIndex) => (
        <BoxForMerge key={boxIndex} index={boxIndex} box={box} onRemoveBox={onRemoveBoxFromSelected} />
      ))}

      <Typography variant="h5">{textConsts.boxData}</Typography>

      <Typography>{textConsts.attention}</Typography>

      <Field
        containerClasses={classNames.field}
        label={'Destination'}
        inputComponent={
          <NativeSelect
            variant="filled"
            inputProps={{
              name: 'destinationId',
              id: 'destinationId',
            }}
            value={boxBody.destinationId}
            className={classNames.destinationSelect}
            input={<Input />}
            onChange={e => setBoxBody({...boxBody, destinationId: e.target.value})}
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
        label={'Storekeeper / Tariff'}
        inputComponent={
          <Button
            disableElevation
            disabled={isDifferentStorekeepers}
            color="primary"
            variant={boxBody.logicsTariffId && 'text'}
            className={clsx({[classNames.storekeeperBtn]: !boxBody.logicsTariffId})}
            onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          >
            {boxBody.logicsTariffId
              ? `${storekeepers.find(el => el._id === boxBody.storekeeperId).name} /  
                ${
                  boxBody.logicsTariffId
                    ? storekeepers
                        .find(el => el._id === boxBody.storekeeperId)
                        .tariffLogistics.find(el => el._id === boxBody.logicsTariffId).name
                    : 'none'
                }`
              : 'Выбрать'}
          </Button>
        }
      />

      <Field
        containerClasses={classNames.field}
        inputProps={{maxLength: 255}}
        label={'FBA SHIPMENT'}
        value={boxBody.fbaShipment}
        onChange={e => setBoxBody({...boxBody, fbaShipment: e.target.value})}
      />

      <div>
        <Typography className={classNames.linkTitle}>{'Шиппинг лейбл:'}</Typography>
        <Chip
          classes={{
            root: classNames.barcodeChip,
            clickable: classNames.barcodeChipHover,
            deletable: classNames.barcodeChipHover,
            deleteIcon: classNames.barcodeChipIcon,
            label: classNames.barcodeChiplabel,
          }}
          className={clsx({[classNames.barcodeChipExists]: boxBody.shippingLabel})}
          size="small"
          label={
            boxBody.tmpShippingLabel?.length
              ? 'FILE IS ADDED'
              : boxBody.shippingLabel
              ? boxBody.shippingLabel
              : 'Set shipping label'
          }
          onClick={() => onClickShippingLabel()}
          onDelete={!boxBody.shippingLabel ? undefined : () => onDeleteShippingLabel()}
        />
      </div>

      <Field
        multiline
        className={classNames.heightFieldAuto}
        rows={4}
        rowsMax={6}
        inputProps={{maxLength: 2000}}
        label={textConsts.comment}
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      {isDifferentStorekeepers && (
        <Typography className={classNames.attentionDifStorekeepers}>{textConsts.attentionDifStorekeepers}</Typography>
      )}

      <div className={classNames.buttonsWrapper}>
        <Button
          disabled={disabledSubmit}
          color="primary"
          variant="contained"
          className={classNames.button}
          onClick={() => {
            onSubmitBoxesModal()
          }}
        >
          {textConsts.saveBtn}
        </Button>
        <Button
          disabled={requestStatus === loadingStatuses.isLoading}
          color="primary"
          variant="contained"
          className={classNames.button}
          onClick={() => {
            onCloseBoxesModal()
          }}
        >
          {textConsts.cancelBtn}
        </Button>
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
