import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

// import {navBarActiveCategory} from '@constants/navbar-active-category'
import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
// import {Modal} from '@components/modal'
// import {ConfirmationModal} from '@components/modals/confirmation-modal'
// import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {ShopWrapper} from '@components/shop/shop-wrapper/shop-wrapper'

// import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
// import {ProductWrapper} from '@components/product/product-wrapper'
import {t} from '@utils/translations'

import {ClientShopViewModel} from './client-shop-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TRADING_SHOPS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS

const data = [
  {
    name: 'январь 2031',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'февраль 2031',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'март 2031',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'апрель 2031',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'май 2031',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'июнь 2031',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'июль 2031',
    uv: 3890,
    pv: 4100,
    amt: 2100,
  },
  {
    name: 'август 2031',
    uv: 3590,
    pv: 7890,
    amt: 2100,
  },
  {
    name: 'сентябрь 2031',
    uv: 1490,
    pv: 6300,
    amt: 2100,
  },
  {
    name: 'октябрь 2031',
    uv: 2390,
    pv: 5350,
    amt: 2100,
  },
  {
    name: 'ноябрь 2031',
    uv: 5490,
    pv: 10300,
    amt: 2100,
  },
  {
    name: 'декабрь 2031',
    uv: 490,
    pv: 1300,
    amt: 2100,
  },
  {
    name: 'январь 2032',
    uv: 9490,
    pv: 11300,
    amt: 2100,
  },
  {
    name: 'февраль 2032',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]
@observer
export class ClientShopView extends Component {
  viewModel = new ClientShopViewModel({
    history: this.props.history,
  })

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    const {
      // storekeepersData,
      // shopsData,
      // supplierModalReadOnly,
      // actionStatus,
      // volumeWeightCoefficient,
      // yuanToDollarRate,
      // userInfo,
      // selectedSupplier,
      // requestStatus,
      // showProgress,
      // progressValue,
      // product,
      // productBase,
      drawerOpen,
      // formFieldsValidationErrors,
      // showWarningModal,
      // warningModalTitle,
      // imagesForLoad,
      // showConfirmModal,
      // showAddOrEditSupplierModal,
      // confirmModalSettings,
      onTriggerDrawerOpen,
      // onChangeProductFields,
      // handleProductActionButtons,
      // onTriggerOpenModal,
      // onChangeImagesForLoad,
      // onClickSupplierButtons,
      // onClickSaveSupplierBtn,
      // onTriggerAddOrEditSupplierModal,
      // onChangeSelectedSupplier,
      // onClickParseProductData,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey.Shop)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <ShopWrapper data={data} />
            </MainContent>
          </Appbar>
        </Main>
        {/* 
        <Modal openModal={showAddOrEditSupplierModal} setOpenModal={onTriggerAddOrEditSupplierModal}>
          <AddOrEditSupplierModalContent
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
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={() => {
            confirmModalSettings.onClickOkBtn()
            onTriggerOpenModal('showConfirmModal')
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        /> */}
      </React.Fragment>
    )
  }
}
