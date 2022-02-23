import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {ProductWrapper} from '@components/product/product-wrapper'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {AdminProductViewModel} from './admin-product-view.model'

const textConsts = getLocalizedTexts(texts, 'en').adminProductView

@observer
export class AdminProductView extends Component {
  viewModel = new AdminProductViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
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
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} user={textConsts.appUser} />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            history={history}
            user={textConsts.appUser}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              {product ? (
                <ProductWrapper
                  userRole={userInfo.role}
                  product={product}
                  selectedSupplier={selectedSupplier}
                  formFieldsValidationErrors={formFieldsValidationErrors}
                  handleProductActionButtons={handleProductActionButtons}
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
