import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {ClientSellShopsContent} from '@components/contents/client-sell-shops-content'
import {MainContent} from '@components/layout/main-content'

import {ClientSellShopsViewModel} from './client-sell-shops-view.model'
import {styles} from './client-sell-shops-view.style'

@observer
class ClientSellShopsViewRaw extends Component {
  viewModel = new ClientSellShopsViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    // const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <ClientSellShopsContent />
        </MainContent>
      </React.Fragment>
    )
  }
}

export const ClientSellShopsView = withStyles(ClientSellShopsViewRaw, styles)
