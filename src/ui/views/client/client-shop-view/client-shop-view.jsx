import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {ShopWrapper} from '@components/shop/shop-wrapper/shop-wrapper'

import {t} from '@utils/translations'

import {ClientShopViewModel} from './client-shop-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TRADING_SHOPS

@observer
export class ClientShopView extends Component {
  viewModel = new ClientShopViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, shopInfo, onTriggerDrawerOpen, history} = this.viewModel
    console.log(shopInfo)

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={
            history.location.pathname.includes('sell')
              ? navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS
              : navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BUY_SHOPS
          }
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey.Shop)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <ShopWrapper shopInfo={shopInfo} />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
