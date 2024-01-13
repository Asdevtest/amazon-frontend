import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

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
    <>
      <div>
        <UserInfoAndEdit user={viewModel.user} />
      </div>
    </>
  )
})
