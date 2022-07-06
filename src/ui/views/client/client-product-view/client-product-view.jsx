import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'

import {t} from '@utils/translations'

import {ClientProductViewModel} from './client-product-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_INVENTORY
@observer
export class ClientProductView extends Component {
  viewModel = new ClientProductViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      supplierModalReadOnly,
      actionStatus,
      volumeWeightCoefficient,
      yuanToDollarRate,
      userInfo,
      selectedSupplier,
      requestStatus,
      showProgress,
      progressValue,
      product,
      productBase,
      drawerOpen,
      formFieldsValidationErrors,
      showWarningModal,
      warningModalTitle,
      imagesForLoad,
      showConfirmModal,
      showAddOrEditSupplierModal,
      confirmModalSettings,
      onTriggerDrawerOpen,
      onChangeProductFields,
      handleProductActionButtons,
      onTriggerOpenModal,
      onChangeImagesForLoad,
      onClickSupplierButtons,
      onClickSaveSupplierBtn,
      onTriggerAddOrEditSupplierModal,
      onChangeSelectedSupplier,
      onClickParseProductData,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Product)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {product ? (
                <ProductWrapper
                  userRole={userInfo.role}
                  imagesForLoad={imagesForLoad}
                  showProgress={showProgress}
                  progressValue={progressValue}
                  product={product}
                  actionStatus={actionStatus}
                  productBase={productBase}
                  selectedSupplier={selectedSupplier}
                  handleSupplierButtons={onClickSupplierButtons}
                  handleProductActionButtons={handleProductActionButtons}
                  formFieldsValidationErrors={formFieldsValidationErrors}
                  onClickSupplier={onChangeSelectedSupplier}
                  onChangeField={onChangeProductFields}
                  onChangeImagesForLoad={onChangeImagesForLoad}
                  onClickParseProductData={onClickParseProductData}
                />
              ) : undefined}
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showAddOrEditSupplierModal} setOpenModal={onTriggerAddOrEditSupplierModal}>
          <AddOrEditSupplierModalContent
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
          title={confirmModalSettings.title}
          message={confirmModalSettings.message}
          successBtnText={confirmModalSettings.successBtnText}
          cancelBtnText={confirmModalSettings.cancelBtnText}
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
