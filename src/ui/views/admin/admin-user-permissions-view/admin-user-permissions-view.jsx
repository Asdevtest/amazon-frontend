import { observer } from 'mobx-react'

import { UserPermissions } from '@components/user/user-permissions/user-permissions'

export const AdminUserPermissionsView = observer(() => {
  return <UserPermissions />
})
