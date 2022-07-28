import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRole} from '@constants/user-roles'

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

import {SupervisorProductViewModel} from './supervisor-product-view.model'

const curUserRole = UserRole.SUPERVISOR

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_PRODUCTS

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
      drawerOpen,
      product,
      productBase,
      actionStatus,
      selectedSupplier,
      formFieldsValidationErrors,
      showWarningModal,
      showConfirmModal,
      confirmMessage,
      warningModalTitle,
      onChangeProductFields,
      onClickSupplierButtons,
      onChangeSelectedSupplier,
      onTriggerDrawerOpen,
      onClickSetProductStatusBtn,
      handleProductActionButtons,
      onTriggerOpenModal,
      onSaveProductData,
      onClickParseProductData,
      onChangeImagesForLoad,
      onTriggerAddOrEditSupplierModal,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={curUserRole}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey.Product)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {product ? (
                <ProductWrapper
                  imagesForLoad={imagesForLoad}
                  userRole={userInfo.role}
                  product={product}
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
          </Appbar>
        </Main>

        <Modal
          missClickModalOn={!supplierModalReadOnly}
          openModal={showAddOrEditSupplierModal}
          setOpenModal={onTriggerAddOrEditSupplierModal}
        >
          <AddOrEditSupplierModalContent
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
