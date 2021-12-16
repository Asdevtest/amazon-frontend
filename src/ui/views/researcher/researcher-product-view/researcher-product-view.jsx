import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
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

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/researcherAvatar.jpg'
import {ResearcherProductViewModel} from './researcher-product-view.model'

const textConsts = getLocalizedTexts(texts, 'en').researcherProductView

const navbarActiveCategory = 1

@observer
export class ResearcherProductView extends Component {
  viewModel = new ResearcherProductViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {
      requestStatus,
      alertFailedText,
      showProgress,
      progressValue,
      drawerOpen,
      product,
      actionStatus,
      suppliers,
      selectedSupplier,
      showAddOrEditSupplierModal,
      formFieldsValidationErrors,
      showConfirmModal,
      confirmModalSettings,
      showWarningModal,
      warningModalTitle,
      onTriggerAddOrEditSupplierModal,
      onClickSaveSupplierBtn,
      onChangeProductFields,
      onClickSupplierButtons,
      onChangeSelectedSupplier,
      onTriggerDrawerOpen,
      onClickParseProductData,
      handleProductActionButtons,
      onTriggerOpenModal,
      onClickSetProductStatusBtn,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.RESEARCHER}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.RESEARCHER}
          >
            <MainContent>
              {product ? (
                <ProductWrapper
                  alertFailedText={alertFailedText}
                  curUserRole={UserRole.RESEARCHER}
                  product={product}
                  suppliers={suppliers}
                  actionStatus={actionStatus}
                  selectedSupplier={selectedSupplier}
                  formFieldsValidationErrors={formFieldsValidationErrors}
                  handleSupplierButtons={onClickSupplierButtons}
                  handleProductActionButtons={handleProductActionButtons}
                  onChangeField={onChangeProductFields}
                  onClickSetProductStatusBtn={onClickSetProductStatusBtn}
                  onClickSupplier={onChangeSelectedSupplier}
                  onClickParseProductData={onClickParseProductData}
                />
              ) : undefined}
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showAddOrEditSupplierModal} setOpenModal={onTriggerAddOrEditSupplierModal}>
          <AddOrEditSupplierModalContent
            requestStatus={requestStatus}
            title={textConsts.modalAddTitle}
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
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

        <ConfirmationModal
          isWarning={confirmModalSettings.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={textConsts.confirmTitle}
          message={confirmModalSettings.message}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
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
