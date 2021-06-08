import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {PRODUCT_INITIAL_SUPPLIERS, PRODUCT_EMPTY_SUPPLIERS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {ModalContent} from '@components/product/modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'
import {ClientProductViewModel} from './client-product-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').productView

const CHIP_LIST = [
  {key: 0, label: 'Поиск поставщика', color: 'rgb(0, 123, 255)', colorHover: '#1269ec'},
  {key: 1, label: 'Поставщик найден', color: 'rgb(15, 169, 20)', colorHover: '#009a07'},
  {key: 2, label: 'Поставщик не найден', color: '#ff9800', colorHover: '#f57c00'},
  {key: 3, label: 'Цена выше МЗЦ', color: 'rgb(210, 35, 35)', colorHover: '#c51a1c'},
]

const navbarActiveCategory = null

@observer
export class ClientProductView extends Component {
  viewModel = new ClientProductViewModel({history: this.props.history})
  state = {
    drawerOpen: false,

    suppliers: PRODUCT_INITIAL_SUPPLIERS,
    selectedSupplier: 0,
    modalAddSupplier: false,
    modalEditSupplier: false,
    activeChip: null,
  }

  render() {
    const {drawerOpen} = this.state

    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={this.onChangeDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            notificationCount={2}
            setDrawerOpen={this.onChangeDrawerOpen}
            title={textConsts.appBarTitle}
            username={textConsts.appBarUsername}
          >
            <MainContent>
              <ProductWrapper
                chipList={CHIP_LIST}
                activeChip={this.state.activeChip}
                setActiveChip={this.onChangeActiveChip}
                product={this.viewModel.product}
                suppliers={this.state.suppliers}
                selected={this.state.selectedSupplier}
                handleSupplierButtons={this.onSupplierButtons}
                onClickSupplier={this.onChangeSelectedSupplier}
                onChangeField={this.viewModel.onChangeFieldProduct}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={this.state.modalAddSupplier} setOpenModal={this.onChangeModalAddSupplier}>
          <ModalContent
            modeAddOrEdit={'add'}
            supplier={PRODUCT_EMPTY_SUPPLIERS}
            title={textConsts.addVendor}
            setOpenModal={this.onChangeModalAddSupplier}
            suppliers={this.state.suppliers}
            setSuppliers={this.onChangeSuppliers}
            selected={this.state.selectedSupplier}
          />
        </Modal>
        <Modal openModal={this.state.modalEditSupplier} setOpenModal={this.onChangeModalEditSupplier}>
          <ModalContent
            modeAddOrEdit={'edit'}
            setOpenModal={this.onChangeModalEditSupplier}
            supplier={this.state.suppliers[this.state.selectedSupplier]}
            suppliers={this.state.suppliers}
            setSuppliers={this.onChangeSuppliers}
            selected={this.state.selectedSupplier}
            title={textConsts.editVendor}
          />
        </Modal>
      </React.Fragment>
    )
  }

  onChangeSelectedSupplier = (e, value) => {
    this.setState({selectedSupplier: value})
  }

  onChangeSuppliers = (e, value) => {
    this.setState({suppliers: value})
  }

  onChangeProduct = (e, value) => {
    this.setState({product: value})
  }

  onChangeActiveChip = (e, value) => {
    this.setState({activeChip: value})
  }

  onChangeModalAddSupplier = (e, value) => {
    this.setState({modalAddSupplier: value})
  }

  onChangeModalEditSupplier = (e, value) => {
    this.setState({modalEditSupplier: value})
  }

  onChangeDrawerOpen = (e, value) => {
    this.setState({drawerOpen: value})
  }

  onSupplierButtons = action => {
    if (action === 'add') {
      this.setState({modalAddSupplier: true})
    } else if (action === 'edit') {
      this.setState({modalEditSupplier: true})
    } else {
      this.setState({
        suppliers: this.state.suppliers.filter((supplier, index) => this.state.selectedSupplier !== index),
      })
    }
  }
}
