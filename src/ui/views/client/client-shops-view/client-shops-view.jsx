import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {ShopsIntegrations} from '@components/shops-integrations'

import {ClientShopsViewModel} from './client-shops-view.model'
import {styles} from './client-shops-view.style'

@observer
class ClientShopsViewRaw extends Component {
  viewModel = new ClientShopsViewModel({history: this.props.history, location: this.props.location})

  render() {
    const {openModal} = this.viewModel

    return (
      <React.Fragment>
        <ShopsIntegrations openModal={openModal} />
      </React.Fragment>
    )
  }
}

export const ClientShopsView = withStyles(ClientShopsViewRaw, styles)
