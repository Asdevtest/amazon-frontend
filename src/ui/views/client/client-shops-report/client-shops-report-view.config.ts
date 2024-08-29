import { action, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { ShopReportsTabsValues } from '@typings/enums/shop-report'

export const observerConfig = {
  tabValue: observable,
  inventoryProducts: observable,
  showBindStockGoodsToInventoryModal: observable,
  showConfirmModal: observable,
  showSelectShopsModal: observable,
  shopsData: observable,

  onChangeTab: action.bound,
  moveGoodsToInventoryHandler: action.bound,
  deleteReportHandler: action.bound,
  bindStockGoodsToInventoryHandler: action.bound,
  submitDeleteReportHandler: action.bound,
  getTableData: action.bound,
  getProductsMy: action.bound,
  submitBindStockGoodsHandler: action.bound,
  initUserSettings: action.bound,
  getShopsData: action.bound,
  bindReportInventoryHandler: action.bound,
}

export const createRadioButtonOptions = () => [
  {
    label: 'PPC-Organic by day',
    value: ShopReportsTabsValues.PPC_ORGANIC_BY_DAY,
  },
  {
    label: 'Inventory Shipments',
    value: ShopReportsTabsValues.INVENTORY_SHIPMENTS,
  },
  {
    label: t(TranslationKey.Inventory),
    value: ShopReportsTabsValues.INVENTORY,
  },
  {
    label: t(TranslationKey.Returns),
    value: ShopReportsTabsValues.RETURNS,
  },
  {
    label: 'PPC-Organic by Weeks',
    value: ShopReportsTabsValues.PPC,
  },
  {
    label: t(TranslationKey['Warehouse report']),
    value: ShopReportsTabsValues.STOCK_REPORT,
  },
  {
    label: t(TranslationKey['Dashboard by goods/days']),
    value: ShopReportsTabsValues.GOODS_DAYS_REPORT,
  },
]
