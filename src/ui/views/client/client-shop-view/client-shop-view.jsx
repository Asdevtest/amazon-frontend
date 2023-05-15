import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {MainContent} from '@components/layout/main-content'
import {ShopWrapper} from '@components/traiding-shop/shop-wrapper/shop-wrapper'

import {ClientShopViewModel} from './client-shop-view.model'

@observer
export class ClientShopView extends Component {
  viewModel = new ClientShopViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {userInfo, shopInfo, onClickEditBtn} = this.viewModel

    return (
      <React.Fragment>
        <MainContent>
          {shopInfo ? <ShopWrapper userInfo={userInfo} shopInfo={shopInfo} onClickEditBtn={onClickEditBtn} /> : null}
        </MainContent>
      </React.Fragment>
    )
  }
}
