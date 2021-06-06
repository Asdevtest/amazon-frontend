import React, {Component} from 'react'

import {Typography} from '@material-ui/core'

import {CLIENT_ORDER_INITIAL_PRODUCT, DELIVERY_TYPES} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {OrderContent} from '@components/screens/client/orders-view/order-content'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderView

export class ClientOrderView extends Component {
  state = {
    activeCategory: 8,
    activeSubCategory: 2,
    drawerOpen: false,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          setItem={this.onChangeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.client}
          setSubItem={this.onChangeSubCategory}
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

  onChangeCategory = (e, value) => {
    this.setState({activeCategory: value})
  }

  onChangeSubCategory = (e, value) => {
    this.setState({activeSubCategory: value})
  }
}
