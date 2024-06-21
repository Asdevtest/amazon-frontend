import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { ClientBuyShopsContent } from '@components/contents/client-buy-shops-content'

import { styles } from './client-buy-shops-view.style'

export const ClientBuyShopsViewRaw = () => (
  // const [viewModel] = useState(() => new ClientSellShopsViewModel({history: props.history}))
  // const {classes: styles} = props

  <>
    <div>
      <ClientBuyShopsContent />
    </div>
  </>
)

export const ClientBuyShopsView = withStyles(observer(ClientBuyShopsViewRaw), styles)
