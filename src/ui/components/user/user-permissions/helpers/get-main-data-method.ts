import { PermissionsModel } from '@models/permissions-model'

import { PermissionsTypes } from '../user-permissions.types'

export const getMainDataMethod = (currentTableKey: PermissionsTypes) => {
  if (currentTableKey === PermissionsTypes.GROUP_PERMISSIONS) {
    return PermissionsModel.getGroupPermissions
  } else {
    return PermissionsModel.getSinglePermissions
  }
}
