import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'

export const getColumnKey = (type: string) => {
  switch (type) {
    case 'number':
      return columnnsKeys.shared.NUMBER
    case 'date':
      return columnnsKeys.shared.DATE
    default:
      return columnnsKeys.shared.STRING_VALUE
  }
}
