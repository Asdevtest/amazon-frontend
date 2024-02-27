import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { ProductWrapper } from '@components/product/product-wrapper'

import { t } from '@utils/translations'

import { ProductVariation } from '@typings/enums/product-variation'

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
          platformSettings={viewModel.platformSettings}
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
          acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
          showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
          showBindProductModal={viewModel.showBindProductModal}
          productsToBind={useProductsPermissions.currentPermissionsData}
          actionStatus={viewModel.requestStatus}
          productBase={viewModel.productBase}
          handleProductActionButtons={viewModel.handleProductActionButtons}
          formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
          loadMorePermissionsDataHadler={() => useProductsPermissions.loadMoreDataHadler()}
          patchProductTransparencyHandler={viewModel.patchProductTransparencyHandler}
          storekeepersData={viewModel?.storekeepersData}
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
      ) : undefined}

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
    </>
  )
})
