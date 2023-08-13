import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { ShopsIntegrations } from '@components/shops-integrations'

import { styles } from './client-shops-view.style'

import { ClientShopsViewModel } from './client-shops-view.model'

export const ClientShopsViewRaw = props => {
  const [viewModel] = useState(() => new ClientShopsViewModel({ history: props.history, location: props.location }))

  return (
    <React.Fragment>
      <ShopsIntegrations openModal={viewModel.openModal} />
    </React.Fragment>
  )
}

export const ClientShopsView = withStyles(observer(ClientShopsViewRaw), styles)
