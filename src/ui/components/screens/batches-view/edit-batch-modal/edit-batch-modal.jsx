import React, {useState} from 'react'

import {Box, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BoxList} from './box-list'
import {BuyerForm} from './buyer-form'
import {ClientForm} from './client-form'
import {useClassNames} from './edit-batch-modal.style'

const textConsts = getLocalizedTexts(texts, 'en').batchesModalEditBatch

export const EditBatchModal = ({batch, setModal, warehouseList, deliveryList, curUserRole}) => {
  const classNames = useClassNames()

  const [warehouse, setWarehouse] = useState(batch[0][0].destination)
  const [delivery, setDelivery] = useState(batch[0][0].deliveryMethod)
  const [status, setStatus] = useState(batch[0][0].status)
  const [warehouseCheckbox, setWarehouseCheckbox] = useState(
    batch[0][0].destination !== textConsts.batchDestination ? true : false,
  )
  const [deliveryCheckbox, setDeliveryCheckbox] = useState(!!batch[0][0].deliveryMethod)

  const renderSwitchForm = () => {
    switch (curUserRole) {
      case userRole.CLIENT:
        return <ClientForm batch={batch} />
      case userRole.BUYER:
        return (
          <BuyerForm
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
        )
    }
  }

  return (
    <Box className={classNames.listsBox}>
      <Typography className={classNames.modalTitle}>{textConsts.mainTitle}</Typography>

      {renderSwitchForm()}

      <BoxList selectedBoxes={batch} warehouse={warehouse} delivery={delivery} />

      <Box mt={2} className={classNames.btnBox}>
        <Button className={classNames.saveBtn}>{textConsts.saveBtn}</Button>
        <ErrorButton variant="contained" onClick={() => setModal(false)}>
          {textConsts.cancelBtn}
        </ErrorButton>
      </Box>
    </Box>
  )
}
