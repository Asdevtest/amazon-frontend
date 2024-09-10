import { PresetTableKeys } from '@constants/data-grid/presets-table-key'
import { routsPathes } from '@constants/navigation/routs-pathes'

export const getDataGridTableKey = (pathname: string) => {
  switch (pathname) {
    case routsPathes.CLIENT_PENDING_ORDERS:
      return PresetTableKeys.CLIENT_PENDING_ORDERS

    default:
      return PresetTableKeys.CLIENT_ORDERS
  }
}
