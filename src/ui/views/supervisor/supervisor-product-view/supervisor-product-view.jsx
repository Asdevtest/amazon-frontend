import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {SUPERVISOR_EMPTY_SUPPLIER} from '@constants/mocks'
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
import {SupervisorProductViewModel} from './supervisor-product-view.model'

const textConsts = getLocalizedTexts(texts, 'en').buyerProductView

const CHIP_LIST = [
  {key: 0, label: 'Поиск поставщика', color: 'rgb(0, 123, 255)', colorHover: '#1269ec'},
  {key: 1, label: 'Поставщик найден', color: 'rgb(15, 169, 20)', colorHover: '#009a07'},
  {key: 2, label: 'Поставщик не найден', color: '#ff9800', colorHover: '#f57c00'},
  {key: 3, label: 'Цена выше МЗЦ', color: 'rgb(210, 35, 35)', colorHover: '#c51a1c'},
]

const navbarActiveCategory = 4

@observer
export class SupervisorProductView extends Component {
  viewModel = new SupervisorProductViewModel({history: this.props.history, location: this.props.location})

  render() {
    const {
      drawerOpen,
      activeChip,
      product,
      suppliers,
      selectedSupplier,
      showAddSupplierModal,
      showEditSupplierModal,
      onTriggerEditSupplierModal,
      onChangeSuppliers,
      onTriggerAddSupplierModal,
      onChangeProductFields,
      onClickSupplierButtons,
      onChangeSelectedSupplier,
      onChangeDrawerOpen,
      onChangeActiveChip,
    } = this.viewModel
    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.SUPERVISOR}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeDrawerOpen}
          >
            <MainContent>
              {product ? (
                <ProductWrapper
                  chipList={CHIP_LIST}
                  activeChip={activeChip}
                  setActiveChip={onChangeActiveChip}
                  product={product}
                  suppliers={suppliers}
                  selected={selectedSupplier}
                  handleSupplierButtons={onClickSupplierButtons}
                  onClickSupplier={onChangeSelectedSupplier}
                  onChangeField={onChangeProductFields}
                />
              ) : undefined}
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showAddSupplierModal} setOpenModal={onTriggerAddSupplierModal}>
          <ModalContent
            modeAddOrEdit={'add'}
            title={textConsts.modalAddTitle}
            setOpenModal={onTriggerAddSupplierModal}
            supplier={SUPERVISOR_EMPTY_SUPPLIER}
            suppliers={suppliers}
            setSuppliers={onChangeSuppliers}
            selected={selectedSupplier}
          />
        </Modal>
        <Modal openModal={showEditSupplierModal} setOpenModal={onTriggerEditSupplierModal}>
          <ModalContent
            modeAddOrEdit={'edit'}
            title={textConsts.modalEditTitle}
            setOpenModal={onTriggerEditSupplierModal}
            supplier={suppliers[selectedSupplier]}
            suppliers={suppliers}
            setSuppliers={onChangeSuppliers}
            selected={selectedSupplier}
          />
        </Modal>
      </React.Fragment>
    )
  }
}
