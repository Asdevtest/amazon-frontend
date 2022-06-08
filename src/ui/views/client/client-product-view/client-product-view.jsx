import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
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

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

import {ClientProductViewModel} from './client-product-view.model'

const textConsts = getLocalizedTexts(texts, 'en').clientProductView

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
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {product ? (
                <ProductWrapper
                  userRole={userInfo.role}
                  imagesForLoad={imagesForLoad}
                  showProgress={showProgress}
                  progressValue={progressValue}
                  product={product}
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
            requestStatus={requestStatus}
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
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
