import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {OrderProductModal} from '@components/screens/client/order-product-modal'
import {OrderContent} from '@components/screens/orders-view/order-content'

import {t} from '@utils/translations'

import {ClientOrderViewModel} from './client-order-view.model'
import {styles} from './client-order-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_ORDERS

@observer
class ClientOrderViewRaw extends Component {
  viewModel = new ClientOrderViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      confirmModalSettings,
      selectedProduct,
      destinationsFavourites,
      destinations,
      storekeepers,
      navbarActiveSubCategory,
      userInfo,
      volumeWeightCoefficient,
      warningInfoModalSettings,
      orderBoxes,
      drawerOpen,
      order,
      history,
      showConfirmModal,
      showWarningInfoModal,
      showOrderModal,
      showSetBarcodeModal,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickCancelOrder,
      onSubmitChangeBoxFields,
      onSubmitSaveOrder,
      onClickReorder,
      setDestinationsFavouritesItem,
      onDoubleClickBarcode,
      onClickSaveBarcode,
      onConfirmSubmitOrderProductModal,
    } = this.viewModel
    const {classes: classNames} = this.props

    const goBack = () => {
      history.goBack()
    }
    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar
            title={t(TranslationKey.Order)}
            setDrawerOpen={onTriggerDrawerOpen}
            lastCrumbAdditionalText={` № ${order?.id}`}
          >
            <MainContent>
              <div className={classNames.backButtonWrapper}>
                <Button className={classNames.backButton} onClick={goBack}>
                  {t(TranslationKey.Back)}
                </Button>
              </div>
              {order ? (
                <OrderContent
                  isClient
                  userInfo={userInfo}
                  volumeWeightCoefficient={volumeWeightCoefficient}
                  order={order}
                  boxes={orderBoxes}
                  onClickCancelOrder={onClickCancelOrder}
                  onSubmitChangeBoxFields={onSubmitChangeBoxFields}
                  onSubmitSaveOrder={onSubmitSaveOrder}
                  onClickReorder={onClickReorder}
                />
              ) : null}
            </MainContent>
          </Appbar>

          <Modal missClickModalOn openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
            <OrderProductModal
              isPendingOrdering
              reorderOrdersData={[order]}
              volumeWeightCoefficient={volumeWeightCoefficient}
              destinations={destinations}
              storekeepers={storekeepers}
              destinationsFavourites={destinationsFavourites}
              setDestinationsFavouritesItem={setDestinationsFavouritesItem}
              onTriggerOpenModal={onTriggerOpenModal}
              onDoubleClickBarcode={onDoubleClickBarcode}
              onSubmit={onConfirmSubmitOrderProductModal}
            />
          </Modal>

          <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
            <SetBarcodeModal
              item={selectedProduct}
              onClickSaveBarcode={onClickSaveBarcode}
              onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
            />
          </Modal>

          <ConfirmationModal
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            isWarning={confirmModalSettings.isWarning}
            title={confirmModalSettings.confirmTitle}
            message={confirmModalSettings.confirmMessage}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.Cancel)}
            onClickSuccessBtn={confirmModalSettings.onClickConfirm}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />

          <WarningInfoModal
            isWarning={warningInfoModalSettings.isWarning}
            openModal={showWarningInfoModal}
            setOpenModal={() => onTriggerOpenModal('showWarningInfoModal')}
            title={warningInfoModalSettings.title}
            btnText={t(TranslationKey.Ok)}
            onClickBtn={() => {
              onTriggerOpenModal('showWarningInfoModal')
            }}
          />
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientOrderView = withStyles(ClientOrderViewRaw, styles)
