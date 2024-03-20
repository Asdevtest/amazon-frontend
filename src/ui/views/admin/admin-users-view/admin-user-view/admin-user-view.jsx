import { observer } from 'mobx-react'
import { useState } from 'react'

import { UserInfoAndEdit } from '@components/user/user-info-and-edit'

import { AdminUserViewModel } from './admin-user-view.model'

export const AdminUserView = observer(({ history }) => {
  const [viewModel] = useState(() => new AdminUserViewModel({ history }))

  return <UserInfoAndEdit user={viewModel.user} />
})
