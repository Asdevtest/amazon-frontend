import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {ProductWrapper} from '@components/product/product-wrapper'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'
import {SupervisorProductViewModel} from './supervisor-product-view.model'

const curUserRole = UserRole.SUPERVISOR
const textConsts = getLocalizedTexts(texts, 'en').buyerProductView

const navbarActiveCategory = 4

@observer
export class SupervisorProductView extends Component {
  viewModel = new SupervisorProductViewModel({history: this.props.history, location: this.props.location})

  render() {
    const {
      drawerOpen,
      product,
      suppliers,
      actionStatus,
      selectedSupplier,
      onChangeProductFields,
      onClickSupplierButtons,
      onChangeSelectedSupplier,
      onTriggerDrawerOpen,
      onClickSetProductStatusBtn,
      handleProductActionButtons,
    } = this.viewModel
    return (
      <React.Fragment>
        <Navbar
          curUserRole={curUserRole}
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
                  curUserRole={UserRole.SUPERVISOR}
                  product={product}
                  suppliers={suppliers}
                  selectedSupplier={selectedSupplier}
                  handleSupplierButtons={onClickSupplierButtons}
                  actionStatus={actionStatus}
                  handleProductActionButtons={handleProductActionButtons}
                  onClickSetProductStatusBtn={onClickSetProductStatusBtn}
                  onClickSupplier={onChangeSelectedSupplier}
                  onChangeField={onChangeProductFields}
                />
              ) : undefined}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
