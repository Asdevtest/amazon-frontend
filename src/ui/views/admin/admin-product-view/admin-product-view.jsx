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

import avatar from '../assets/adminAvatar.jpg'
import {AdminProductViewModel} from './admin-product-view.model'

const textConsts = getLocalizedTexts(texts, 'en').adminProductView

@observer
export class AdminProductView extends Component {
  viewModel = new AdminProductViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {
      product,
      drawerOpen,
      suppliers,
      history,
      selectedSupplier,
      formFieldsValidationErrors,
      onTriggerDrawerOpen,
      onChangeSelectedSupplier,
      onChangeProductFields,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            history={history}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.ADMIN}
          >
            <MainContent>
              {product ? (
                <ProductWrapper
                  curUserRole={UserRole.ADMIN}
                  product={product}
                  suppliers={suppliers}
                  selectedSupplier={selectedSupplier}
                  formFieldsValidationErrors={formFieldsValidationErrors}
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
