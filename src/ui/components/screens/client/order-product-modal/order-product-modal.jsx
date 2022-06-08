import React, {useEffect, useState} from 'react'

import {
  Container,
  Divider,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
} from '@material-ui/core'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {OrderModalBodyRow} from '@components/table-rows/client/inventory/order-product-modal/order-modal-body-row'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {checkIsPositiveNum, isNotUndefined} from '@utils/checks'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './order-product-modal.style'

export const OrderProductModal = ({
  volumeWeightCoefficient,
  destinations,
  storekeepers,
  requestStatus,
  onTriggerOpenModal,
  selectedProductsData,
  onDoubleClickBarcode,
  onSubmit,
  onClickCancel,
}) => {
  const classNames = useClassNames()

  const [submitIsClicked, setSubmitIsClicked] = useState(false)
  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
  const [tmpOrderIndex, setTmpOrderIndex] = useState(undefined)

  const triggerBarcodeModal = () => {
    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const [productsForRender, setProductsForRender] = useState(
    selectedProductsData.map(product => ({
      ...product,
      amount: 1,
    })),
  )

  const [orderState, setOrderState] = useState(
    selectedProductsData.map(product => ({
      amount: 1,
      clientComment: '',
      barCode: product.barCode || '',
      productId: product._id,
      images: [],
      tmpBarCode: [],

      destinationId: '',

      storekeeperId: '',
      logicsTariffId: '',
    })),
  )

  useEffect(() => {
    if (!orderState?.length) {
      onTriggerOpenModal('showOrderModal')
    }
  }, [orderState])

  const onRemoveProduct = itemId => {
    const newStateOrderState = [...orderState].filter(el => el.productId !== itemId)
    const newRenderOrderState = productsForRender.filter(el => el._id !== itemId)

    setProductsForRender(newRenderOrderState)
    setOrderState(newStateOrderState)
  }

  const setOrderStateFiled = index => fieldsName => value => {
    const newStateOrderState = [...orderState]

    const newRenderOrderState = [...productsForRender]

    if (['amount'].includes(fieldsName)) {
      if (!checkIsPositiveNum(value)) {
        return
      }

      newStateOrderState[index][fieldsName] = parseInt(value) || 0

      newRenderOrderState[index][fieldsName] = parseInt(value) || 0
    } else {
      newStateOrderState[index][fieldsName] = value

      newRenderOrderState[index][fieldsName] = value
    }

    setProductsForRender(newRenderOrderState)
    setOrderState(newStateOrderState)
  }

  const onClickSubmit = () => {
    onTriggerOpenModal('showOrderModal')
    onSubmit(orderState)
    setSubmitIsClicked(true)
  }

  const disabledSubmit =
    orderState.some(
      order =>
        order.storekeeperId === '' ||
        order.logicsTariffId === '' ||
        // order.destinationId === '' ||
        Number(order.amount) <= 0 ||
        !Number.isInteger(Number(order.amount)),
    ) ||
    requestStatus === loadingStatuses.isLoading ||
    productsForRender.some(item => !item.currentSupplier) ||
    !orderState.length ||
    submitIsClicked

  return (
    <Container disableGutters maxWidth={'xl'}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Order of goods'])}</Typography>
      <Divider className={classNames.divider} />
      <TableContainer className={classNames.tableWrapper}>
        <Table className={classNames.table}>
          <TableHead>
            <TableRow>
              <TableCell className={(classNames.tableCell, classNames.imgCell)}>{t(TranslationKey.Image)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey.Product)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey.Price)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey['Delivery cost per piece'])}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey.Quantity)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey.Total)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey.BarCode)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey.Warehouse)}</TableCell>

              <TableCell className={classNames.tableCell}>{'Storekeeper / ' + t(TranslationKey.Tariff)}</TableCell>

              <TableCell className={classNames.tableCell}>{t(TranslationKey['Client comment'])}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsForRender.map((product, index) => (
              <OrderModalBodyRow
                key={product._id}
                volumeWeightCoefficient={volumeWeightCoefficient}
                destinations={destinations}
                storekeepers={storekeepers}
                item={product}
                withRemove={selectedProductsData.length > 1}
                orderState={orderState[index]}
                setOrderStateFiled={setOrderStateFiled(index)}
                itemIndex={index}
                onClickBarcode={() => {
                  setTmpOrderIndex(index)
                  triggerBarcodeModal()
                }}
                onDoubleClickBarcode={onDoubleClickBarcode}
                onDeleteBarcode={() => {
                  setOrderStateFiled(index)('barCode')('')
                }}
                onRemoveProduct={onRemoveProduct}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={classNames.sumWrapper}>
        <Typography className={classNames.sumText}>{`${t(
          TranslationKey['Total amount of orders'],
        )}: ${toFixedWithDollarSign(
          productsForRender.reduce((ac, cur) => (ac += calcProductsPriceWithDelivery(cur, cur)), 0),
          2,
        )}`}</Typography>
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button
          disableElevation
          variant="contained"
          className={(classNames.modalButton, classNames.buyNowBtn)}
          disabled={disabledSubmit}
          onClick={onClickSubmit}
        >
          {t(TranslationKey['To order'])}
        </Button>

        <Button
          disableElevation
          color="primary"
          variant="contained"
          className={(classNames.modalButton, classNames.cancelBtn)}
          onClick={() => (onClickCancel ? onClickCancel() : onTriggerOpenModal('showOrderModal'))}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
      <Modal openModal={showSetBarcodeModal} setOpenModal={() => triggerBarcodeModal()}>
        <SetBarcodeModal
          tmpCode={isNotUndefined(tmpOrderIndex) && orderState[tmpOrderIndex].tmpBarCode}
          item={isNotUndefined(tmpOrderIndex) && orderState[tmpOrderIndex]}
          onClickSaveBarcode={barCode => {
            setOrderStateFiled(tmpOrderIndex)('tmpBarCode')(barCode)
            triggerBarcodeModal()
            setTmpOrderIndex(undefined)
          }}
          onCloseModal={triggerBarcodeModal}
        />
      </Modal>
    </Container>
  )
}
