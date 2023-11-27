import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import { ProductWrapper } from '@components/product/product-wrapper'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { SupervisorProductViewModel } from './supervisor-product-view.model'

export const SupervisorProductView = observer(({ history }) => {
  const [viewModel] = useState(() => new SupervisorProductViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      {viewModel.product ? (
        <ProductWrapper
          imagesForLoad={viewModel.imagesForLoad}
          platformSettings={viewModel.platformSettings}
          user={viewModel.userInfo}
          userRole={viewModel.userInfo.role}
          product={viewModel.currentData}
          productBase={viewModel.productBase}
          productVariations={viewModel.productVariations}
          navigateToProduct={viewModel.navigateToProduct}
          selectedSupplier={viewModel.selectedSupplier}
          formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
          handleSupplierButtons={viewModel.onClickSupplierButtons}
          actionStatus={viewModel.requestStatus}
          handleProductActionButtons={viewModel.handleProductActionButtons}
          onClickSetProductStatusBtn={viewModel.onClickSetProductStatusBtn}
          onClickSupplier={viewModel.onChangeSelectedSupplier}
          onChangeField={viewModel.onChangeProductFields}
          onClickParseProductData={viewModel.onClickParseProductData}
          onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
        />
      ) : null}

      <Modal
        missClickModalOn={!viewModel.supplierModalReadOnly}
        openModal={viewModel.showAddOrEditSupplierModal}
        setOpenModal={viewModel.onTriggerAddOrEditSupplierModal}
      >
        <AddOrEditSupplierModalContent
          paymentMethods={viewModel.paymentMethods}
          product={viewModel.product}
          storekeepersData={viewModel.storekeepersData}
          onlyRead={viewModel.supplierModalReadOnly}
          sourceYuanToDollarRate={viewModel.yuanToDollarRate}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          title={t(TranslationKey['Adding and editing a supplier'])}
          supplier={viewModel.selectedSupplier}
          onTriggerShowModal={viewModel.onTriggerAddOrEditSupplierModal}
        />
      </Modal>

      <WarningInfoModal
        openModal={viewModel.showWarningModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningModal')}
        title={viewModel.warningModalTitle}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningModal')
        }}
      />

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => {
          viewModel.confirmModalSettings.onClickOkBtn()
          viewModel.onTriggerOpenModal('showConfirmModal')
        }}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
    </React.Fragment>
  )
})
