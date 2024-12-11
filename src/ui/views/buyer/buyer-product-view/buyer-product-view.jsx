import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { ProductWrapper } from '@components/product/product-wrapper'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { BuyerProductViewModel } from './buyer-product-view.model'

export const BuyerProductView = observer(({ history }) => {
  const viewModel = useMemo(() => new BuyerProductViewModel({ history }), [])

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
          onSaveForceProductData={viewModel.onSaveForceProductData}
          onRemoveSupplier={viewModel.onRemoveSupplier}
        />
      ) : (
        <CircularProgressWithLabel />
      )}

      <Modal
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          productId={viewModel.currentData?._id}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
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
      ) : null}
    </>
  )
})
