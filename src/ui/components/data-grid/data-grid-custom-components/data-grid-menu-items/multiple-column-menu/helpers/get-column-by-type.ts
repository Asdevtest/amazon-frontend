import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'

import { NumberColumnMenu } from '../../number-column-menu'
import { ObjectColumnMenu } from '../../object-column-menu'

export const getColumnMenuByType = (type: ColumnMenuKeys) => {
  switch (type) {
    case ColumnMenuKeys.NUMBER:
      return NumberColumnMenu

    default:
      return ObjectColumnMenu
  }
}
