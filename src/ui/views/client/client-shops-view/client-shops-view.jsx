import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {ShopsIntegrations} from '@components/shops-integrations'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ClientShopsViewModel} from './client-shops-view.model'
import {styles} from './client-shops-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientShopsView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_SHOPS

@observer
class ClientShopsViewRaw extends Component {
  viewModel = new ClientShopsViewModel({history: this.props.history})

  render() {
    const {drawerOpen, onChangeDrawerOpen} = this.viewModel

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onChangeDrawerOpen} />
        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onChangeDrawerOpen}>
            <MainContent>
              <ShopsIntegrations />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientShopsView = withStyles(styles)(ClientShopsViewRaw)
