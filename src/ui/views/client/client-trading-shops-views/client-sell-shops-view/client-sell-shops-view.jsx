import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { ClientSellShopsContent } from '@components/contents/client-sell-shops-content'

import { styles } from './client-sell-shops-view.style'

export const ClientSellShopsViewRaw = () => (
  // const [viewModel] = useState(() => new ClientSellShopsViewModel({history: this.props.history}))
  // const {classes: styles} = props

  <>
    <div>
      <ClientSellShopsContent />
    </div>
  </>
)

export const ClientSellShopsView = withStyles(observer(ClientSellShopsViewRaw), styles)
