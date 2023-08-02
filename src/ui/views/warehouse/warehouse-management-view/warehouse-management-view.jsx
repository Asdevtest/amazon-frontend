import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { MainContent } from '@components/layout/main-content'
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

  return (
    <React.Fragment>
      <MainContent>
        <WarehouseManagement />
      </MainContent>
    </React.Fragment>
  )
})
