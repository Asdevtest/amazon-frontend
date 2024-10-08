import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { ProductWrapper } from '@components/product/product-wrapper'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'

import { t } from '@utils/translations'

import { ProductVariation } from '@typings/enums/product/product-variation'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { ClientProductViewModel } from './client-product-view.model'

export const ClientProductView = observer(({ history }) => {
  const [viewModel] = useState(() => new ClientProductViewModel({ history }))

  const [useProductsPermissions] = useState(() => new UseProductsPermissions(ClientModel.getProductPermissionsData))

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
          showBindProductModal={viewModel.showBindProductModal}
          productsToBind={useProductsPermissions.currentPermissionsData}
          actionStatus={viewModel.requestStatus}
          productBase={viewModel.productBase}
          handleProductActionButtons={viewModel.handleProductActionButtons}
          formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
          loadMorePermissionsDataHadler={useProductsPermissions.loadMoreDataHadler}
          patchProductTransparencyHandler={viewModel.patchProductTransparencyHandler}
          onClickSubmitSearch={value => useProductsPermissions.onClickSubmitSearch(value)}
          onClickNextButton={viewModel.bindUnbindProducts}
          onClickGetProductsToBind={option =>
            useProductsPermissions.getPermissionsData(
              option === ProductVariation.PARENT
                ? { isChild: false, offset: 0, filters: '' }
                : {
                    isChild: false,
                    isParent: false,
                    shopId: viewModel.product?.shopId,
                    offset: 0,
                    filters: '',
                  },
            )
          }
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onChangeField={viewModel.onChangeProductFields}
          onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
          onClickParseProductData={viewModel.onClickParseProductData}
          onClickSaveSupplierBtn={viewModel.onClickSaveSupplierBtn}
          onSaveForceProductData={viewModel.onSaveForceProductData}
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
          cancelBtnText={t(TranslationKey.Cancel)}
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
