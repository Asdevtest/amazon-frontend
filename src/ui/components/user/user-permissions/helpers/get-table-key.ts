import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { PermissionsTypes } from '../user-permissions.types'

export const getTableKey = (currentTableKey: PermissionsTypes) => {
  if (currentTableKey === PermissionsTypes.GROUP_PERMISSIONS) {
    return DataGridTablesKeys.ADMIN_GROUP_PERMISSIONS
  } else {
    return DataGridTablesKeys.ADMIN_SINGLE_PERMISSIONS
  }
}
