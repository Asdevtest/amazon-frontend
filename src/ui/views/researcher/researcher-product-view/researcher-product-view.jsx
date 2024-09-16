import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { ProductWrapper } from '@components/product/product-wrapper'

import { t } from '@utils/translations'

import { ResearcherProductViewModel } from './researcher-product-view.model'

export const ResearcherProductView = observer(({ history }) => {
  const viewModel = useMemo(() => new ResearcherProductViewModel(history), [])

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
          product={viewModel.currentData}
          productBase={viewModel.productBase}
          actionStatus={viewModel.requestStatus}
          formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
          handleProductActionButtons={viewModel.handleProductActionButtons}
          onChangeField={viewModel.onChangeProductFields}
          onClickSetProductStatusBtn={viewModel.onClickSetProductStatusBtn}
          onClickParseProductData={viewModel.onClickParseProductData}
          onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
        />
      ) : null}

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
