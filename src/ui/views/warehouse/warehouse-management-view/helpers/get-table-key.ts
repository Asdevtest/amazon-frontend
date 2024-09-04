import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { WarehouseTabs } from '../warehouse-management.types'

export const getTableKey = (tableKey: WarehouseTabs) => {
  switch (tableKey) {
    case WarehouseTabs.LOGISTICS_TARIFFS:
      return DataGridTablesKeys.WAREHOUSE_MANAGEMENT_LOGISTICS_TARIFFS
    case WarehouseTabs.WAREHOUSE_SERVICES:
      return DataGridTablesKeys.WAREHOUSE_MANAGEMENT_WAREHOUSE_SERVICES
  }
}
