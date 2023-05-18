import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'

import { MainContent } from '@components/layout/main-content'
import { UserPermissions } from '@components/user/user-permissions/user-permissions'

import { AdminUserPermissionsViewModel } from './admin-user-permissions-view.model'

export const AdminUserPermissionsView = observer(props => {
  const [viewModel] = useState(
    () =>
      new AdminUserPermissionsViewModel({
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
        <UserPermissions />
      </MainContent>
    </React.Fragment>
  )
})
