import React, {useState} from 'react'

import {Box, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BoxList} from './box-list'
import {useClassNames} from './edit-batch-modal.style'
import {Form} from './form'

const textConsts = getLocalizedTexts(texts, 'en').batchesModalEditBatch

export const EditBatchModal = ({batch, setModal, warehouseList, deliveryList}) => {
  const classNames = useClassNames()

  const [warehouse, setWarehouse] = useState(batch[0][0].destination)
  const [delivery, setDelivery] = useState(batch[0][0].deliveryMethod)
  const [status, setStatus] = useState(batch[0][0].status)
  const [warehouseCheckbox, setWarehouseCheckbox] = useState(
    batch[0][0].destination !== textConsts.batchDestination ? true : false,
  )
  const [deliveryCheckbox, setDeliveryCheckbox] = useState(!!batch[0][0].deliveryMethod)
  // const [ selectedBoxes, setSelectedBoxes ] = useState(batch); закомментировано пока не использается setSelectedBoxes

  return (
    <Box className={classNames.listsBox}>
      <Typography className={classNames.modalTitle}>{textConsts.mainTitle}</Typography>

      <Form
        warehouseCheckbox={warehouseCheckbox}
        warehouse={warehouse}
        setWarehouse={setWarehouse}
        setWarehouseCheckbox={setWarehouseCheckbox}
        deliveryCheckbox={deliveryCheckbox}
        setDeliveryCheckbox={setDeliveryCheckbox}
        setDelivery={setDelivery}
        setStatus={setStatus}
        delivery={delivery}
        status={status}
        warehouseList={warehouseList}
        deliveryList={deliveryList}
      />

      <BoxList selectedBoxes={batch} warehouse={warehouse} delivery={delivery} />

      <Box mt={2} className={classNames.btnBox}>
        <Button className={classNames.saveBtn}>{textConsts.saveBtn}</Button>
        <Button danger onClick={() => setModal(false)}>
          {textConsts.cancelBtn}
        </Button>
      </Box>
    </Box>
  )
}
