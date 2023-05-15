import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {MainContent} from '@components/layout/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {EditHSCodeModal} from '@components/modals/edit-hs-code-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'
import {Modal} from '@components/shared/modal'

import {t} from '@utils/translations'

import {BuyerProductViewModel} from './buyer-product-view.model'

@observer
export class BuyerProductView extends Component {
  viewModel = new BuyerProductViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      showTab,
      hsCodeData,
      storekeepersData,
      supplierModalReadOnly,
      volumeWeightCoefficient,
      yuanToDollarRate,
      userInfo,
      requestStatus,
      showProgress,
      progressValue,
      product,
      productBase,
      selectedSupplier,
      showAddOrEditSupplierModal,
      showEditHSCodeModal,
      formFieldsValidationErrors,
      warningModalTitle,
      showWarningModal,
      showConfirmModal,
      confirmModalSettings,
      paymentMethods,

      onClickSupplierButtons,
      onChangeSelectedSupplier,
      onChangeProductFields,
      handleProductActionButtons,
      onClickSetProductStatusBtn,
      onTriggerAddOrEditSupplierModal,
      onClickSaveSupplierBtn,
      onTriggerOpenModal,
      onClickHsCode,
      onClickSaveHsCode,
    } = this.viewModel

    return (
      <React.Fragment>
        <MainContent>
          {product ? (
            <ProductWrapper
              showTab={showTab}
              user={userInfo}
              userRole={userInfo.role}
              product={product}
              productBase={productBase}
              selectedSupplier={selectedSupplier}
              formFieldsValidationErrors={formFieldsValidationErrors}
              handleSupplierButtons={onClickSupplierButtons}
              handleProductActionButtons={handleProductActionButtons}
              onClickSupplier={onChangeSelectedSupplier}
              onClickSetProductStatusBtn={onClickSetProductStatusBtn}
              onChangeField={onChangeProductFields}
              onClickHsCode={onClickHsCode}
            />
          ) : undefined}
        </MainContent>
        <Modal
          missClickModalOn={!supplierModalReadOnly}
          openModal={showAddOrEditSupplierModal}
          setOpenModal={onTriggerAddOrEditSupplierModal}
        >
          <AddOrEditSupplierModalContent
            paymentMethods={paymentMethods}
            product={product}
            storekeepersData={storekeepersData}
            onlyRead={supplierModalReadOnly}
            requestStatus={requestStatus}
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
            title={t(TranslationKey['Adding and editing a supplier'])}
            supplier={selectedSupplier}
            showProgress={showProgress}
            progressValue={progressValue}
            onClickSaveBtn={onClickSaveSupplierBtn}
            onTriggerShowModal={onTriggerAddOrEditSupplierModal}
          />
        </Modal>

        <Modal openModal={showEditHSCodeModal} setOpenModal={() => onTriggerOpenModal('showEditHSCodeModal')}>
          <EditHSCodeModal
            hsCodeData={hsCodeData}
            onClickSaveHsCode={onClickSaveHsCode}
            onCloseModal={() => onTriggerOpenModal('showEditHSCodeModal')}
          />
        </Modal>

        <WarningInfoModal
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={warningModalTitle}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

        <ConfirmationModal
          isWarning={confirmModalSettings.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            confirmModalSettings.onClickOkBtn()
            onTriggerOpenModal('showConfirmModal')
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}
