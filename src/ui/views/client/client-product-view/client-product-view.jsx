import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import { ProductWrapper } from '@components/product/product-wrapper'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ClientProductViewModel } from './client-product-view.model'

export const ClientProductView = observer(props => {
  const { search } = useLocation()

  const queries = new URLSearchParams(search)
  const productId = queries.get('product-id')

  const [viewModel] = useState(
    () =>
      new ClientProductViewModel({
        history: props.history,
        productId,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        {viewModel.product ? (
          <ProductWrapper
            showTab={viewModel.showTab}
            user={viewModel.userInfo}
            userRole={viewModel.userInfo.role}
            imagesForLoad={viewModel.imagesForLoad}
            showProgress={viewModel.showProgress}
            progressValue={viewModel.progressValue}
            product={viewModel.getCurrentData()}
            productVariations={viewModel.productVariations}
            navigateToProduct={viewModel.navigateToProduct}
            unbindProductHandler={viewModel.unbindProductHandler}
            shops={viewModel.shopsData}
            acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
            showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
            showBindProductModal={viewModel.showBindProductModal}
            productsToBind={viewModel.productsToBind}
            actionStatus={viewModel.actionStatus}
            productBase={viewModel.productBase}
            selectedSupplier={viewModel.selectedSupplier}
            handleSupplierButtons={viewModel.onClickSupplierButtons}
            handleProductActionButtons={viewModel.handleProductActionButtons}
            formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
            onClickNextButton={viewModel.bindUnbindProducts}
            onClickGetProductsToBind={viewModel.onClickGetProductsToBind}
            onTriggerOpenModal={viewModel.onTriggerOpenModal}
            onClickSupplier={viewModel.onChangeSelectedSupplier}
            onChangeField={viewModel.onChangeProductFields}
            onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
            onClickParseProductData={viewModel.onClickParseProductData}
          />
        ) : undefined}
      </div>

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
        isWarning={viewModel.confirmModalSettings.isWarning}
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
    </React.Fragment>
  )
})
