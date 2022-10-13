import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {ClientBuyShopsContent} from '@components/contents/client-buy-shops-content'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {ClientSellShopsViewModel} from './client-buy-shops-view.model'
import {styles} from './client-buy-shops-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TRADING_SHOPS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BUY_SHOPS

@observer
class ClientBuyShopsViewRaw extends Component {
  viewModel = new ClientSellShopsViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    const {drawerOpen, onTriggerDrawerOpen} = this.viewModel
    // const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['Buy Shop'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <ClientBuyShopsContent />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientBuyShopsView = withStyles(ClientBuyShopsViewRaw, styles)
