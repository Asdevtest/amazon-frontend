import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {ClientBuyShopsContent} from '@components/contents/client-buy-shops-content'
import {MainContent} from '@components/layout/main-content'

import {ClientSellShopsViewModel} from './client-buy-shops-view.model'
import {styles} from './client-buy-shops-view.style'

@observer
class ClientBuyShopsViewRaw extends Component {
  viewModel = new ClientSellShopsViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    // const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <ClientBuyShopsContent />
        </MainContent>
      </React.Fragment>
    )
  }
}

export const ClientBuyShopsView = withStyles(ClientBuyShopsViewRaw, styles)
