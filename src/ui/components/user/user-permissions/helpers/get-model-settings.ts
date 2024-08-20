import { PermissionsTypes } from '../user-permissions.types'

import { getMainDataMethod } from './get-main-data-method'
import { getTableKey } from './get-table-key'

export const getModelSettings = (currentTableKey: PermissionsTypes) => {
  const currentGetMainDataMethod = getMainDataMethod(currentTableKey)
  const tableKey = getTableKey(currentTableKey)

  return {
    getMainDataMethod: currentGetMainDataMethod,
    tableKey,
  }
}
