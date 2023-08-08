import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { OrderContent } from '@components/contents/order-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ClientOrderViewModel } from './client-order-view.model'
import { styles } from './client-order-view.style'

export const ClientOrderViewRaw = props => {
  const { search } = useLocation()
  const [viewModel] = useState(
    () =>
      new ClientOrderViewModel({
        history: props.history,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()

    return () => {
      SettingsModel.changeLastCrumbAdditionalText('')
    }
  }, [])

  useEffect(() => {
    console.log(search)
    const queries = new URLSearchParams(search)
    const orderId = queries.get('orderId')

    if (orderId) {
      viewModel.updateOrderId(orderId)
    }
  }, [search])

  const goBack = () => {
    viewModel.history.goBack()
  }

  return (
    <React.Fragment>
      <div>
        <div className={classNames.backButtonWrapper}>
          <Button className={classNames.backButton} onClick={goBack}>
            {t(TranslationKey.Back)}
          </Button>
        </div>
        {viewModel.order ? (
          <OrderContent
            isClient
            storekeepers={viewModel.storekeepers}
            destinations={viewModel.destinations}
            userInfo={viewModel.userInfo}
            volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
            order={viewModel.order}
            boxes={viewModel.orderBoxes}
            selectedSupplier={viewModel.selectedSupplier}
            destinationsFavourites={viewModel.destinationsFavourites}
            setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
            onClickCancelOrder={viewModel.onClickCancelOrder}
            onSubmitChangeBoxFields={viewModel.onSubmitChangeBoxFields}
            onSubmitSaveOrder={viewModel.onSubmitSaveOrder}
            onClickReorder={viewModel.onClickReorder}
            onChangeSelectedSupplier={viewModel.onChangeSelectedSupplier}
            onTriggerAddOrEditSupplierModal={viewModel.onTriggerAddOrEditSupplierModal}
            onClickHsCode={viewModel.onClickHsCode}
          />
        ) : null}
      </div>

      <Modal
        missClickModalOn
        openModal={viewModel.showOrderModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}
      >
        <OrderProductModal
          isPendingOrdering
          reorderOrdersData={[viewModel.order]}
          // volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          platformSettings={viewModel.platformSettings}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepers}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onDoubleClickBarcode={viewModel.onDoubleClickBarcode}
          onSubmit={viewModel.onConfirmSubmitOrderProductModal}
        />
      </Modal>

      <Modal
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          hsCodeData={viewModel.hsCodeData}
          onClickSaveHsCode={viewModel.onClickSaveHsCode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSetBarcodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSetBarcodeModal')}
      >
        <SetBarcodeModal
          item={viewModel.selectedProduct}
          onClickSaveBarcode={viewModel.onClickSaveBarcode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSetBarcodeModal')}
        />
      </Modal>

      <ConfirmationModal
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        isWarning={viewModel.confirmModalSettings.isWarning}
        title={viewModel.confirmModalSettings.confirmTitle}
        message={viewModel.confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningInfoModal')
        }}
      />

      <Modal openModal={viewModel.showAddOrEditSupplierModal} setOpenModal={viewModel.onTriggerAddOrEditSupplierModal}>
        <AddOrEditSupplierModalContent
          onlyRead
          product={viewModel.order?.product}
          storekeepersData={viewModel.storekeepers}
          sourceYuanToDollarRate={viewModel.yuanToDollarRate}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          title={t(TranslationKey['Adding and editing a supplier'])}
          supplier={viewModel.selectedSupplier}
          onTriggerShowModal={viewModel.onTriggerAddOrEditSupplierModal}
        />
      </Modal>
    </React.Fragment>
  )
}

export const ClientOrderView = withStyles(observer(ClientOrderViewRaw), styles)
