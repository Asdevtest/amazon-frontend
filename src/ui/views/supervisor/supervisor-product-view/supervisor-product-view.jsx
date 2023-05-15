import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {MainContent} from '@components/layout/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'
import {Modal} from '@components/shared/modal'

import {t} from '@utils/translations'

import {SupervisorProductViewModel} from './supervisor-product-view.model'

@observer
export class SupervisorProductView extends Component {
  viewModel = new SupervisorProductViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      storekeepersData,
      volumeWeightCoefficient,
      yuanToDollarRate,
      supplierModalReadOnly,
      showAddOrEditSupplierModal,
      imagesForLoad,
      userInfo,
      product,
      productBase,
      actionStatus,
      selectedSupplier,
      formFieldsValidationErrors,
      showWarningModal,
      showConfirmModal,
      confirmMessage,
      warningModalTitle,
      paymentMethods,
      onChangeProductFields,
      onClickSupplierButtons,
      onChangeSelectedSupplier,
      onClickSetProductStatusBtn,
      handleProductActionButtons,
      onTriggerOpenModal,
      onSaveProductData,
      onClickParseProductData,
      onChangeImagesForLoad,
      onTriggerAddOrEditSupplierModal,
      getCurrentData,
    } = this.viewModel

    return (
      <React.Fragment>
        <MainContent>
          {product ? (
            <ProductWrapper
              imagesForLoad={imagesForLoad}
              userRole={userInfo.role}
              product={getCurrentData()}
              productBase={productBase}
              selectedSupplier={selectedSupplier}
              formFieldsValidationErrors={formFieldsValidationErrors}
              handleSupplierButtons={onClickSupplierButtons}
              actionStatus={actionStatus}
              handleProductActionButtons={handleProductActionButtons}
              onClickSetProductStatusBtn={onClickSetProductStatusBtn}
              onClickSupplier={onChangeSelectedSupplier}
              onChangeField={onChangeProductFields}
              onClickParseProductData={onClickParseProductData}
              onChangeImagesForLoad={onChangeImagesForLoad}
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
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
            title={t(TranslationKey['Adding and editing a supplier'])}
            supplier={selectedSupplier}
            onTriggerShowModal={onTriggerAddOrEditSupplierModal}
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
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            onSaveProductData()
            onTriggerOpenModal('showConfirmModal')
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}
