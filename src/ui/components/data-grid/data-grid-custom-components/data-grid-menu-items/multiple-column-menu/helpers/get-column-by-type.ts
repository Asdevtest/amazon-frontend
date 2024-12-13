import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'

import { DateColumnMenu } from '../../date-column-menu'
import { NumberColumnMenu } from '../../number-column-menu'
import { ObjectColumnMenu } from '../../object-column-menu'
import { StringColumnMenu } from '../../string-column-menu'

export const getColumnMenuByType = (type: ColumnMenuKeys) => {
  switch (type) {
    case ColumnMenuKeys.STRING:
      return StringColumnMenu

    case ColumnMenuKeys.NUMBER:
      return NumberColumnMenu

    case ColumnMenuKeys.DATA:
      return DateColumnMenu

    default:
      return ObjectColumnMenu
  }
}
