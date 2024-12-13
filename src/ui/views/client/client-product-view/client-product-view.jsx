import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { ProductWrapper } from '@components/product/product-wrapper'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'

import { t } from '@utils/translations'

import { ClientProductViewModel } from './client-product-view.model'

export const ClientProductView = observer(({ history }) => {
  const viewModel = useMemo(() => new ClientProductViewModel({ history }), [])

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
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          product={viewModel.currentData}
          productVariations={viewModel.productVariations}
          navigateToProduct={viewModel.navigateToProduct}
          unbindProductHandler={viewModel.unbindProductHandler}
          shops={viewModel.shopsData}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepers}
          showBindProductModal={viewModel.showBindProductModal}
          actionStatus={viewModel.requestStatus}
          productBase={viewModel.productBase}
          handleProductActionButtons={viewModel.handleProductActionButtons}
          formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
          patchProductTransparencyHandler={viewModel.patchProductTransparencyHandler}
          onClickNextButton={viewModel.bindUnbindProducts}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onChangeField={viewModel.onChangeProductFields}
          onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
          onClickParseProductData={viewModel.onClickParseProductData}
          onClickSaveSupplierBtn={viewModel.onClickSaveSupplierBtn}
          onSaveForceProductData={viewModel.onSaveForceProductData}
          onClickGetProductsToBind={viewModel.onClickGetProductsToBind}
        />
      ) : (
        <CircularProgressWithLabel />
      )}

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={viewModel.confirmModalSettings.title}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
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
