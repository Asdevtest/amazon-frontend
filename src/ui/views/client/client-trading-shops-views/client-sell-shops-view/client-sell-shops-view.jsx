import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {ClientSellShopsContent} from '@components/contents/client-sell-shops-content'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'

import {t} from '@utils/translations'

import {ClientSellShopsViewModel} from './client-sell-shops-view.model'
import {styles} from './client-sell-shops-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TRADING_SHOPS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS

@observer
class ClientSellShopsViewRaw extends Component {
  viewModel = new ClientSellShopsViewModel({history: this.props.history})

  render() {
    const {drawerOpen, onTriggerDrawerOpen} = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['Sell the store'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <ClientSellShopsContent />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientSellShopsView = withStyles(ClientSellShopsViewRaw, styles)
