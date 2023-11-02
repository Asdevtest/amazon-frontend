import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { WarehouseManagement } from '@components/warehouse/warehouse-management'

import { WarehouseManagementViewModel } from './warehouse-management-view.model'

export const WarehouseManagementView = observer(props => {
  const [viewModel] = useState(
    () =>
      new WarehouseManagementViewModel({
        history: props.history,
        location: props.location,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return <WarehouseManagement />
})
