import {getLocalizedTexts} from '@utils/get-localized-texts'

import {texts} from './texts'

const textConfig = getLocalizedTexts(texts, 'en').warehouseType

export const warehouses = {
  25: 'ONT 8 AMAZON',
  30: 'LGB8 Rialto, CA',
  35: 'MEM1 Memphis, TN',
  40: 'MDW2 Joliet, IL',
  42: 'LAX9 FONTANA, CA',
}

export const WarehouseType = {
  ONT: 'ONT 8 AMAZON',
  LGB8: 'LGB8 Rialto, CA',
  MEM1: 'MEM1 Memphis, TN',
  MDW2: 'MDW2 Joliet, IL',
  LAX9: 'LAX9 FONTANA, CA',
}

export const WarehouseTypeByCode = {
  25: WarehouseType.ONT,
  30: WarehouseType.LGB8,
  35: WarehouseType.MEM1,
  40: WarehouseType.MDW2,
  42: WarehouseType.LAX9,
}

export const WAREHOUSE_OPTIONS = [
  {
    key: WarehouseType.ONT,
    label: textConfig.ont8,
  },
  {
    key: WarehouseType.LGB8,
    label: textConfig.lgb8,
  },
  {
    key: WarehouseType.MEM1,
    label: textConfig.mem1,
  },
  {
    key: WarehouseType.MDW2,
    label: textConfig.mdw2,
  },
  {
    key: WarehouseType.LAX9,
    label: textConfig.lax9,
  },
]

export const getWarehousesOptionByCode = warehousesCode =>
  WAREHOUSE_OPTIONS.find(warehousesOption => warehousesOption.key === WarehouseTypeByCode[warehousesCode])
