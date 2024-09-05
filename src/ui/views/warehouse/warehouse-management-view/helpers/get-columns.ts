import { logisticsTariffsColumns } from '../warehouse-logistics-tariffs.columns'
import { WarehouseTabs } from '../warehouse-management.types'
import { warehouseTariffsColumns } from '../warehouse-tariffs.columns'

export const getColumns = (tableKey: WarehouseTabs) => {
  switch (tableKey) {
    case WarehouseTabs.LOGISTICS_TARIFFS:
      return logisticsTariffsColumns
    case WarehouseTabs.WAREHOUSE_SERVICES:
      return warehouseTariffsColumns
  }
}
