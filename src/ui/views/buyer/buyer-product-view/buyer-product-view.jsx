import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/buyerAvatar.jpg'
import {BuyerProductViewModel} from './buyer-product-view.model'

const textConsts = getLocalizedTexts(texts, 'en').buyerProductView

const CHIP_LIST = [
  {key: 0, label: 'Поиск поставщика', color: 'rgb(0, 123, 255)', colorHover: '#1269ec'},
  {key: 1, label: 'Поставщик найден', color: 'rgb(15, 169, 20)', colorHover: '#009a07'},
  {key: 2, label: 'Поставщик не найден', color: '#ff9800', colorHover: '#f57c00'},
  {key: 3, label: 'Цена выше МЗЦ', color: 'rgb(210, 35, 35)', colorHover: '#c51a1c'},
]

const navbarActiveCategory = 2

@observer
export class BuyerProductView extends Component {
  viewModel = new BuyerProductViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getProductData('60bd36d60171ec208c828a4d')
  }

  render() {
    const {
      product,
      drawerOpen,
      activeChip,
      selectedSupplier,
      showAddOrEditSupplierModal,
      onTriggerDrawerOpen,
      onChangeActiveChip,
      onClickSupplierBtns,
      onChangeSelectedSupplier,
      onChangeFieldProduct,
      onTriggerAddOrEditSupplierModal,
      onClickSaveSupplierBtn,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.BUYER}
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
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              {product ? (
                <ProductWrapper
                  chipList={CHIP_LIST}
                  activeChip={activeChip}
                  setActiveChip={onChangeActiveChip}
                  product={product}
                  selectedSupplier={selectedSupplier}
                  handleSupplierButtons={onClickSupplierBtns}
                  onClickSupplier={onChangeSelectedSupplier}
                  onChangeField={onChangeFieldProduct}
                />
              ) : undefined}
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showAddOrEditSupplierModal} setOpenModal={onTriggerAddOrEditSupplierModal}>
          <AddOrEditSupplierModalContent
            title={textConsts.modalAddTitle}
            supplier={selectedSupplier}
            onClickSaveBtn={onClickSaveSupplierBtn}
            onTriggerShowModal={onTriggerAddOrEditSupplierModal}
          />
        </Modal>
      </React.Fragment>
    )
  }
}
