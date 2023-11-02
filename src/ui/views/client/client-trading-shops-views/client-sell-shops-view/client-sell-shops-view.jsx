import { observer } from 'mobx-react'
import React from 'react'
import { withStyles } from 'tss-react/mui'

import { ClientSellShopsContent } from '@components/contents/client-sell-shops-content'

import { styles } from './client-sell-shops-view.style'

export const ClientSellShopsViewRaw = () => (
  // const [viewModel] = useState(() => new ClientSellShopsViewModel({history: this.props.history}))
  // const {classes: classNames} = props

  <React.Fragment>
    <div>
      <ClientSellShopsContent />
    </div>
  </React.Fragment>
)

export const ClientSellShopsView = withStyles(observer(ClientSellShopsViewRaw), styles)
