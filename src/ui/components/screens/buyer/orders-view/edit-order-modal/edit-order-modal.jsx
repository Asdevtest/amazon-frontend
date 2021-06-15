import {React, useState} from 'react'

import {Box, Divider, Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './edit-order-modal.style'
import {ProductTable} from './product-table'
import {SelectFields} from './select-fields'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalEditOrder

export const EditOrderModal = ({
  order,
  setModal,
  setModalBarcode,
  modalHeadCells,
  warehouses,
  deliveryList,
  statusList,
}) => {
  const classNames = useClassNames()
  const [warehouse, setWarehouse] = useState('None')
  const [delivery, setDelivery] = useState('Sea')
  const [status, setStatus] = useState('Formed')
  const [comment, setComment] = useState(order.buyerComment)
  const [trackId, setTrackId] = useState(order.trackId)
  const [material, setMaterial] = useState(order.material)
  const [qty, setQty] = useState(1)
  const [batchPrice, setBatchPrice] = useState(1)

  return (
    <Box className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>

      <Paper elevation={0} className={classNames.paper}>
        <Typography className={classNames.modalText}>{textConsts.orderNum}</Typography>

        <SelectFields
          setWarehouse={setWarehouse}
          warehouse={warehouse}
          delivery={delivery}
          setDelivery={setDelivery}
          status={status}
          setStatus={setStatus}
          order={order}
          comment={comment}
          setComment={setComment}
          warehouses={warehouses}
          deliveryList={deliveryList}
          statusList={statusList}
        />

        <Divider className={classNames.divider} />
        <Typography className={classNames.modalText}>{textConsts.productNum}</Typography>

        <ProductTable
          modalHeadCells={modalHeadCells}
          order={order}
          qty={qty}
          setQty={setQty}
          barcode={null}
          setModalBarcode={setModalBarcode}
          batchPrice={batchPrice}
          setBatchPrice={setBatchPrice}
          material={material}
          setMaterial={setMaterial}
          trackId={trackId}
          setTrackId={setTrackId}
        />
      </Paper>

      <Box mt={2} className={classNames.buttonsBox}>
        <Button className={classNames.saveBtn} onClick={() => setModal(false)}>
          {textConsts.saveBtn}
        </Button>
        <ErrorButton onClick={() => setModal(false)}>{textConsts.cancelBtn}</ErrorButton>
      </Box>
    </Box>
  )
}
