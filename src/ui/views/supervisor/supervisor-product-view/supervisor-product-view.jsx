import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { ProductWrapper } from '@components/product/product-wrapper'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'

import { t } from '@utils/translations'

import { SupervisorProductViewModel } from './supervisor-product-view.model'

export const SupervisorProductView = observer(({ history }) => {
  const [viewModel] = useState(() => new SupervisorProductViewModel({ history }))

  return (
    <>
      {viewModel.product ? (
        <ProductWrapper
          imagesForLoad={viewModel.imagesForLoad}
          user={viewModel.userInfo}
          userRole={viewModel.userInfo.role}
          product={viewModel.currentData}
          productBase={viewModel.productBase}
          productVariations={viewModel.productVariations}
          navigateToProduct={viewModel.navigateToProduct}
          formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
          actionStatus={viewModel.requestStatus}
          handleProductActionButtons={viewModel.handleProductActionButtons}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onClickSetProductStatusBtn={viewModel.onClickSetProductStatusBtn}
          onChangeField={viewModel.onChangeProductFields}
          onClickParseProductData={viewModel.onClickParseProductData}
          onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
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
