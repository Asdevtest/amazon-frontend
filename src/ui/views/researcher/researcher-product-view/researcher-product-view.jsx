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

import {ResearcherProductViewModel} from './researcher-product-view.model'

const textConsts = getLocalizedTexts(texts, 'en').researcherProductView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_PRODUCTS

@observer
export class ResearcherProductView extends Component {
  viewModel = new ResearcherProductViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      volumeWeightCoefficient,
      yuanToDollarRate,
      userInfo,
      imagesForLoad,
      requestStatus,
      alertFailedText,
      showProgress,
      progressValue,
      drawerOpen,
      product,
      productBase,
      actionStatus,
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
      onChangeImagesForLoad,
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
                  alertFailedText={alertFailedText}
                  product={product}
                  productBase={productBase}
                  actionStatus={actionStatus}
                  selectedSupplier={selectedSupplier}
                  formFieldsValidationErrors={formFieldsValidationErrors}
                  handleSupplierButtons={onClickSupplierButtons}
                  handleProductActionButtons={handleProductActionButtons}
                  onChangeField={onChangeProductFields}
                  onClickSetProductStatusBtn={onClickSetProductStatusBtn}
                  onClickSupplier={onChangeSelectedSupplier}
                  onClickParseProductData={onClickParseProductData}
                  onChangeImagesForLoad={onChangeImagesForLoad}
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
