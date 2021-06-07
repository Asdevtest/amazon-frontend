import React, {Component} from 'react'

import {SUPERVISOR_INITIAL_PRODUCT, SUPERVISOR_INITIAL_SUPPLIERS, SUPERVISOR_EMPTY_SUPPLIER} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import categoryImgBeautyAndPersonalCare from '@components/product/assets/beautyAndPersonalCare.jpg'
import categoryImgHealthHouseholdAndBabyCare from '@components/product/assets/healthHouseholdAndBabyCare.jpg'
import categoryImgHomeAndKitchen from '@components/product/assets/homeAndKitchen.jpg'
import categoryImgSportsAndOutdoors from '@components/product/assets/sportsAndOutdoors.jpg'
import categoryImgToysAndGames from '@components/product/assets/toysAndGames.jpg'
import {ModalContent} from '@components/product/modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'

const textConsts = getLocalizedTexts(texts, 'en').buyerProductView

const IMAGES = [
  categoryImgHomeAndKitchen,
  categoryImgSportsAndOutdoors,
  categoryImgToysAndGames,
  categoryImgHealthHouseholdAndBabyCare,
  categoryImgBeautyAndPersonalCare,
]

const CHIP_LIST = [
  {key: 0, label: 'Поиск поставщика', color: 'rgb(0, 123, 255)', colorHover: '#1269ec'},
  {key: 1, label: 'Поставщик найден', color: 'rgb(15, 169, 20)', colorHover: '#009a07'},
  {key: 2, label: 'Поставщик не найден', color: '#ff9800', colorHover: '#f57c00'},
  {key: 3, label: 'Цена выше МЗЦ', color: 'rgb(210, 35, 35)', colorHover: '#c51a1c'},
]

export class SupervisorProductView extends Component {
  state = {
    activeCategory: 4,
    activeSubCategory: 0,
    drawerOpen: false,
    product: {...SUPERVISOR_INITIAL_PRODUCT, images: IMAGES},
    suppliers: SUPERVISOR_INITIAL_SUPPLIERS,
    selectedSupplier: 0,
    modalAddSupplier: false,
    modalEditSupplier: false,
    activeChip: null,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          setItem={this.onChangeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.supervisor}
          setSubItem={this.onChangeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={this.onChangeDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={this.onChangeDrawerOpen}
          >
            <MainContent>
              <ProductWrapper
                chipList={CHIP_LIST}
                activeChip={this.state.activeChip}
                setActiveChip={this.onChangeActiveChip}
                product={this.state.product}
                setProduct={this.onChangeProduct}
                suppliers={this.state.suppliers}
                selected={this.state.selectedSupplier}
                handleSupplierButtons={this.onSupplierButtons}
                onClickSupplier={this.onChangeSelectedSupplier}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={this.state.modalAddSupplier} setOpenModal={this.onChangeModalAddSupplier}>
          <ModalContent
            modeAddOrEdit={'add'}
            title={textConsts.modalAddTitle}
            setOpenModal={this.onChangeModalAddSupplier}
            supplier={SUPERVISOR_EMPTY_SUPPLIER}
            suppliers={this.state.suppliers}
            setSuppliers={this.onChangeSuppliers}
            selected={this.state.selectedSupplier}
          />
        </Modal>
        <Modal openModal={this.state.modalEditSupplier} setOpenModal={this.onChangeModalEditSupplier}>
          <ModalContent
            modeAddOrEdit={'edit'}
            title={textConsts.modalEditTitle}
            setOpenModal={this.onChangeModalEditSupplier}
            supplier={this.state.suppliers[this.state.selectedSupplier]}
            suppliers={this.state.suppliers}
            setSuppliers={this.onChangeSuppliers}
            selected={this.state.selectedSupplier}
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

  onChangeCategory = (e, value) => {
    this.setState({activeCategory: value})
  }

  onChangeSubCategory = (e, value) => {
    this.setState({activeSubCategory: value})
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
