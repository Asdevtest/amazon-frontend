import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

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

@observer
export class BuyerProductView extends Component {
  viewModel = new BuyerProductViewModel({history: this.props.history, location: this.props.location})

  render() {
    const {
      product,
      drawerOpen,
      suppliers,
      selectedSupplier,
      showAddOrEditSupplierModal,
      onTriggerDrawerOpen,
      onClickSupplierButtons,
      onChangeSelectedSupplier,
      onChangeProductFields,
      handleProductActionButtons,
      onClickSetProductStatusBtn,
      onTriggerAddOrEditSupplierModal,
      onClickSaveSupplierBtn,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.BUYER}
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
                  curUserRole={UserRole.BUYER}
                  product={product}
                  suppliers={suppliers}
                  selectedSupplier={selectedSupplier}
                  handleSupplierButtons={onClickSupplierButtons}
                  handleProductActionButtons={handleProductActionButtons}
                  onClickSupplier={onChangeSelectedSupplier}
                  onClickSetProductStatusBtn={onClickSetProductStatusBtn}
                  onChangeField={onChangeProductFields}
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
