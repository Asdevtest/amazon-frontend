import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import { ProductWrapper } from '@components/product/product-wrapper'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ResearcherProductViewModel } from './researcher-product-view.model'

export const ResearcherProductView = observer(({ history }) => {
  const [viewModel] = useState(() => new ResearcherProductViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      {viewModel.currentData ? (
        <ProductWrapper
          user={viewModel.userInfo}
          userRole={viewModel.userInfo.role}
          imagesForLoad={viewModel.imagesForLoad}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          alertFailedText={viewModel.alertFailedText}
          platformSettings={viewModel.platformSettings}
          product={viewModel.currentData}
          productBase={viewModel.productBase}
          actionStatus={viewModel.requestStatus}
          selectedSupplier={viewModel.selectedSupplier}
          formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
          handleSupplierButtons={viewModel.onClickSupplierButtons}
          handleProductActionButtons={viewModel.handleProductActionButtons}
          onChangeField={viewModel.onChangeProductFields}
          onClickSetProductStatusBtn={viewModel.onClickSetProductStatusBtn}
          onClickSupplier={viewModel.onChangeSelectedSupplier}
          onClickParseProductData={viewModel.onClickParseProductData}
          onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
        />
      ) : undefined}

      <Modal
        missClickModalOn={!viewModel.supplierModalReadOnly}
        openModal={viewModel.showAddOrEditSupplierModal}
        setOpenModal={viewModel.onTriggerAddOrEditSupplierModal}
      >
        <AddOrEditSupplierModalContent
          onlyRead={viewModel.supplierModalReadOnly}
          requestStatus={viewModel.requestStatus}
          sourceYuanToDollarRate={viewModel.yuanToDollarRate}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          title={t(TranslationKey['Adding and editing a supplier'])}
          supplier={viewModel.selectedSupplier}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          onClickSaveBtn={viewModel.onClickSaveSupplierBtn}
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
    </>
  )
})
