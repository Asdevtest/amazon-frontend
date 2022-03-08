import React, {useState} from 'react'

import {Chip, InputLabel, NativeSelect, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {DeliveryTypeByCode, getDeliveryOptionByCode} from '@constants/delivery-options'
import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {SetShippingLabelModal} from '../set-shipping-label-modal'
import {BoxForMerge} from './box-for-merge'
import {useClassNames} from './merge-boxes-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').mergeBoxModal

export const MergeBoxesModal = ({
  selectedBoxes,
  requestStatus,
  openModal,
  setOpenModal,
  onSubmit,
  onRemoveBoxFromSelected,
}) => {
  const classNames = useClassNames()

  const [boxBody, setBoxBody] = useState({shippingLabel: '', warehouse: '', deliveryMethod: '', tmpShippingLabel: []})

  const [comment, setComment] = useState('')
  const onSubmitBoxesModal = () => {
    onSubmit(boxBody, comment)
    setBoxBody({shippingLabel: '', warehouse: '', deliveryMethod: '', tmpShippingLabel: []})
    setComment('')
  }

  const onCloseBoxesModal = () => {
    setOpenModal()
    setBoxBody({shippingLabel: '', warehouse: '', deliveryMethod: '', tmpShippingLabel: []})
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

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.mainWrapper}>
        <Typography variant="h5">{textConsts.mainTitle}</Typography>

        {selectedBoxes.map((box, boxIndex) => (
          <BoxForMerge key={boxIndex} index={boxIndex} box={box} onRemoveBox={onRemoveBoxFromSelected} />
        ))}

        <Typography variant="h5">{textConsts.boxData}</Typography>

        <Typography>{textConsts.attention}</Typography>

        <div>
          <InputLabel className={classNames.modalText}>{textConsts.warehouse}</InputLabel>
          <NativeSelect
            variant="filled"
            value={boxBody.warehouse}
            className={classNames.nativeSelect}
            input={<Input />}
            onChange={e => setBoxBody({...boxBody, warehouse: e.target.value})}
          >
            <option>{textConsts.valueNone}</option>
            {Object.keys(warehouses).map((warehouseCode, warehouseIndex) => {
              const warehouseKey = warehouses[warehouseCode]
              return (
                <option key={warehouseIndex} value={warehouseCode}>
                  {warehouseKey}
                </option>
              )
            })}
          </NativeSelect>
        </div>
        <div>
          <InputLabel className={classNames.modalText}>{textConsts.deliveryMethod}</InputLabel>
          <NativeSelect
            variant="filled"
            value={boxBody.deliveryMethod}
            className={classNames.nativeSelect}
            input={<Input />}
            onChange={e => setBoxBody({...boxBody, deliveryMethod: e.target.value})}
          >
            <option>{textConsts.valueNone}</option>
            {Object.keys(DeliveryTypeByCode).map((deliveryCode, deliveryIndex) => (
              <option key={deliveryIndex} value={deliveryCode}>
                {getDeliveryOptionByCode(deliveryCode).label}
              </option>
            ))}
          </NativeSelect>
        </div>

        {/* <Field
          multiline
          label={textConsts.shippingLabel}
          value={boxBody.shippingLabel}
          error={boxBody.shippingLabel.length < 5 && boxBody.shippingLabel.length > 0 && textConsts.shippingLabelError}
          onChange={e => setBoxBody({...boxBody, shippingLabel: e.target.value.replace(' ', '')})}
        /> */}

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
        <div className={classNames.buttonsWrapper}>
          <Button
            disabled={
              requestStatus === loadingStatuses.isLoading ||
              boxBody.warehouse === '' ||
              boxBody.deliveryMethod === '' ||
              selectedBoxes.length < 2 ||
              (boxBody.shippingLabel.length < 5 && boxBody.shippingLabel.length > 0)
            }
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
    </Modal>
  )
}
