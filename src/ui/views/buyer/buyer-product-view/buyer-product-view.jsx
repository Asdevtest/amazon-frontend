import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { ProductWrapper } from '@components/product/product-wrapper'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { BuyerProductViewModel } from './buyer-product-view.model'

export const BuyerProductView = observer(({ history }) => {
  const [viewModel] = useState(() => new BuyerProductViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      {viewModel.product ? (
        <ProductWrapper
          showTab={viewModel.showTab}
          user={viewModel.userInfo}
          userRole={viewModel.userInfo.role}
          imagesForLoad={viewModel.imagesForLoad}
          product={viewModel.currentData}
          productBase={viewModel.productBase}
          productVariations={viewModel.productVariations}
          navigateToProduct={viewModel.navigateToProduct}
          formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
          handleProductActionButtons={viewModel.handleProductActionButtons}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onClickSetProductStatusBtn={viewModel.onClickSetProductStatusBtn}
          onChangeField={viewModel.onChangeProductFields}
          onClickHsCode={viewModel.onClickHsCode}
          onClickSaveSupplierBtn={viewModel.onClickSaveSupplierBtn}
          onRemoveSupplier={viewModel.onRemoveSupplier}
        />
      ) : null}

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

      <WarningInfoModal
        // @ts-ignore
        openModal={viewModel.showWarningModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningModal')}
        title={viewModel.warningModalTitle}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showWarningModal')}
      />

      <ConfirmationModal
        // @ts-ignore
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

      <SuccessInfoModal
        // @ts-ignore
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={viewModel.successModalTitle}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showSuccessModal')}
      />
    </>
  )
})
