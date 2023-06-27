import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'

import { MainContent } from '@components/layout/main-content'
import { UserInfoAndEdit } from '@components/user/user-info-and-edit'

import { AdminUserViewModel } from './admin-user-view.model'

export const AdminUserView = observer(props => {
  const [viewModel] = useState(
    () =>
      new AdminUserViewModel({
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
        <UserInfoAndEdit user={viewModel.user} />
      </MainContent>
    </React.Fragment>
  )
})
