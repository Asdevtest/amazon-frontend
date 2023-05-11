import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'
import {Modal} from '@components/shared/modal'

import {t} from '@utils/translations'

import {AdminProductViewModel} from './admin-product-view.model'

@observer
export class AdminProductView extends Component {
  viewModel = new AdminProductViewModel({
    history: this.props.history,
    location: this.props.location,
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
      inInventory,
      userInfo,
      product,
      drawerOpen,
      history,
      selectedSupplier,
      formFieldsValidationErrors,
      handleProductActionButtons,
      onTriggerDrawerOpen,
      onChangeSelectedSupplier,
      onChangeProductFields,
      onTriggerAddOrEditSupplierModal,
      onClickSupplierButtons,
    } = this.viewModel

    const activeCategory = inInventory ? navBarActiveCategory.NAVBAR_INVENTORY : navBarActiveCategory.NAVBAR_EXCHANGE

    return (
      <React.Fragment>
        <Navbar activeCategory={activeCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Product)} history={history} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {product ? (
                <ProductWrapper
                  userRole={userInfo.role}
                  product={product}
                  selectedSupplier={selectedSupplier}
                  formFieldsValidationErrors={formFieldsValidationErrors}
                  handleSupplierButtons={onClickSupplierButtons}
                  handleProductActionButtons={handleProductActionButtons}
                  onClickSupplier={onChangeSelectedSupplier}
                  onChangeField={onChangeProductFields}
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
      </React.Fragment>
    )
  }
}
