import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {CLIENT_ORDER_INITIAL_PRODUCT, DELIVERY_TYPES} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {OrderContent} from '@components/screens/client/orders-view/order-content'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientOrderViewModel} from './client-order-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderView

const navbarActiveCategory = 0

@observer
export class ClientOrderView extends Component {
  viewModel = new ClientOrderViewModel({history: this.props.history})
  state = {
    activeSubCategory: 2,
    drawerOpen: false,
  }

  render() {
    const {activeSubCategory, drawerOpen} = this.state

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={this.onChangeDrawerOpen}
          user={textConsts.appUser}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            username={textConsts.appBarUsername}
            setDrawerOpen={this.onChangeDrawerOpen}
          >
            <MainContent>
              <Typography variant="h3">{textConsts.mainTitle}</Typography>
              <OrderContent productData={CLIENT_ORDER_INITIAL_PRODUCT} deliveryTypes={DELIVERY_TYPES} />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
  onChangeDrawerOpen = (e, value) => {
    this.setState({drawerOpen: value})
  }
}
