import { StorekeeperModel } from '@models/storekeeper-model'

import { WarehouseTabs } from '../warehouse-management.types'

export const getMainDataMethod = (tableKey: WarehouseTabs) => {
  switch (tableKey) {
    case WarehouseTabs.LOGISTICS_TARIFFS:
      return StorekeeperModel.getLogisticsTariffs
    case WarehouseTabs.WAREHOUSE_SERVICES:
      return StorekeeperModel.getWarehouseTariffs
  }
}
