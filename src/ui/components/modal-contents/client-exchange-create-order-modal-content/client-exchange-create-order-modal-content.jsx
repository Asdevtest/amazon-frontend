import {useState} from 'react'

import {TableBody, TableContainer, TableHead, Typography, Table as MuiTable, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {texts} from '@constants/texts'

import {Modal} from '@components/modal/modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {ExchangeModalBodyRow} from '@components/table-rows/client/exchange'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './client-exchange-create-order-modal-content.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchnageModalContent

const ClientExchnageCreateOrderModalContentRaw = ({
  product,
  modalHeadRow,
  classes: classNames,
  onClickOrderNowBtn,
  onClickCancelBtn,
}) => {
  const [showBarcodeModal, setShowBarcodeModal] = useState(false)
  const [orderFields, setOderFields] = useState({
    amount: 1,
    deliveryMethod: 0,
    warehouse: 0,
    clientComment: '',
    barCode: '',
  })

  if (!product) {
    return <div />
  }

  const setOderField = fieldName => e => {
    const newOrderFields = {...orderFields}
    newOrderFields[fieldName] = e.target.value
    setOderFields(newOrderFields)
  }

  const onTriggerBarcodeModal = () => {
    setShowBarcodeModal(!showBarcodeModal)
  }

  const onClickSaveBarcode = barCode => {
    const newOrderFields = {...orderFields}
    newOrderFields.barCode = barCode
    setOderFields(newOrderFields)
    onTriggerBarcodeModal()
  }

  return (
    <>
      <Typography variant="h5">{textConsts.title}</Typography>
      <TableContainer className={classNames.modalTableWrapper}>
        <MuiTable>
          <TableHead>{modalHeadRow}</TableHead>
          <TableBody>
            <ExchangeModalBodyRow
              orderFields={orderFields}
              setOderField={setOderField}
              product={product}
              onClickEditBarcode={onTriggerBarcodeModal}
            />
          </TableBody>
        </MuiTable>
      </TableContainer>
      <div className={classNames.btnsWrapper}>
        <Button color="primary" variant="contained" onClick={() => onClickOrderNowBtn(product, orderFields)}>
          {textConsts.orderNowBtn}
        </Button>
        <Button disableElevation className={classNames.cancelBtn} variant="contained" onClick={onClickCancelBtn}>
          {textConsts.cancelBtn}
        </Button>
      </div>
      <Modal openModal={showBarcodeModal} setOpenModal={onTriggerBarcodeModal}>
        <SetBarcodeModal
          order={orderFields}
          onClickSaveBarcode={onClickSaveBarcode}
          onCloseModal={onTriggerBarcodeModal}
        />
      </Modal>
    </>
  )
}

export const ClientExchnageCreateOrderModalContent = withStyles(styles)(ClientExchnageCreateOrderModalContentRaw)
