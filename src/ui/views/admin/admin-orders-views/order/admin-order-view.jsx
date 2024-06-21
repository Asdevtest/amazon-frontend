import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { SettingsModel } from '@models/settings-model'

import { OrderContent } from '@components/contents/order-content'

import { AdminOrderViewModel } from './admin-order-view.model'

export const AdminOrderView = observer(({ history }) => {
  const [viewModel] = useState(() => new AdminOrderViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()

    return () => {
      SettingsModel.changeLastCrumbAdditionalText('')
    }
  }, [])

  return viewModel.order ? (
    <OrderContent
      platformSettings={viewModel.platformSettings}
      storekeepers={viewModel.storekeepers}
      destinations={viewModel.destinations}
      order={viewModel.order}
    />
  ) : null
})
