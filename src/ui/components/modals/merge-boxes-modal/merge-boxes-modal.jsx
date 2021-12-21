import React, {useState} from 'react'

import {InputLabel, NativeSelect, Typography} from '@material-ui/core'

import {DeliveryTypeByCode, getDeliveryOptionByCode} from '@constants/delivery-options'
import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

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

  const [boxBody, setBoxBody] = useState({shippingLabel: '', warehouse: '', deliveryMethod: ''})

  const [comment, setComment] = useState('')
  const onSubmitBoxesModal = () => {
    onSubmit(boxBody, comment)
    setBoxBody({shippingLabel: '', warehouse: '', deliveryMethod: ''})
    setComment('')
  }

  const onCloseBoxesModal = () => {
    setOpenModal()
    setBoxBody({shippingLabel: '', warehouse: '', deliveryMethod: ''})
    setComment('')
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
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

      <Field
        multiline
        className={classNames.heightFieldAuto}
        label={textConsts.shippingLabel}
        value={boxBody.shippingLabel}
        onChange={e => setBoxBody({...boxBody, shippingLabel: e.target.value})}
      />

      <Field
        multiline
        className={classNames.heightFieldAuto}
        rows={4}
        rowsMax={6}
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
            selectedBoxes.length < 2
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
    </Modal>
  )
}
