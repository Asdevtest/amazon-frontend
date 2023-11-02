import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { OrderContent } from '@components/contents/order-content'
import { BoxViewForm } from '@components/forms/box-view-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ClientOrderViewModel } from './client-order-view.model'

export const ClientOrderView = observer(({ history, location }) => {
  const [viewModel] = useState(() => new ClientOrderViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()

    SettingsModel.changeLastCrumbAdditionalText('')
  }, [])

  useEffect(() => {
    const queries = new URLSearchParams(location.search)
    const orderId = queries.get('orderId')

    if (orderId) {
      viewModel.updateOrderId(orderId)
    }
  }, [location.search])

  return (
    <React.Fragment>
      {viewModel.order ? (
        <OrderContent
          isClient
          storekeepers={viewModel.storekeepers}
          destinations={viewModel.destinations}
          userInfo={viewModel.userInfo}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          platformSettings={viewModel.platformSettings}
          order={viewModel.order}
          boxes={viewModel.orderBoxes}
          selectedSupplier={viewModel.selectedSupplier}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          setCurrentOpenedBox={viewModel.setCurrentOpenedBox}
          onClickCancelOrder={viewModel.onClickCancelOrder}
          onSubmitChangeBoxFields={viewModel.onSubmitChangeBoxFields}
          onSubmitSaveOrder={viewModel.onSubmitSaveOrder}
          onClickReorder={viewModel.onClickReorder}
          onChangeSelectedSupplier={viewModel.onChangeSelectedSupplier}
          onTriggerAddOrEditSupplierModal={viewModel.onTriggerAddOrEditSupplierModal}
          onClickHsCode={viewModel.onClickHsCode}
        />
      ) : null}

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
        isWarning={viewModel.confirmModalSettings?.isWarning}
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

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxViewForm
          userInfo={viewModel.userInfo}
          box={viewModel.curBox}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
          onSubmitChangeFields={viewModel.onSubmitChangeBoxFields}
          onClickHsCode={viewModel.onClickHsCode}
        />
      </Modal>
    </React.Fragment>
  )
})
