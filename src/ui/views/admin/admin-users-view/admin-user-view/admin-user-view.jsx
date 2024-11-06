import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { UserInfoAndEdit } from '@components/user/user-info-and-edit'

import { AdminUserViewModel } from './admin-user-view.model'

export const AdminUserView = observer(({ history }) => {
  const viewModel = useMemo(() => new AdminUserViewModel({ history }), [])

  return <UserInfoAndEdit user={viewModel.user} />
})
