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

import avatar from '../assets/clientAvatar.jpg'
import {ClientProductViewModel} from './client-product-view.model'

const textConsts = getLocalizedTexts(texts, 'en').buyerProductView

@observer
export class ClientProductView extends Component {
  viewModel = new ClientProductViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {
      product,
      drawerOpen,
      suppliers,
      formFieldsValidationErrors,
      onTriggerDrawerOpen,
      onChangeProductFields,
      handleProductActionButtons,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
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
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              {product ? (
                <ProductWrapper
                  curUserRole={UserRole.CLIENT}
                  product={product}
                  suppliers={suppliers}
                  handleProductActionButtons={handleProductActionButtons}
                  formFieldsValidationErrors={formFieldsValidationErrors}
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
