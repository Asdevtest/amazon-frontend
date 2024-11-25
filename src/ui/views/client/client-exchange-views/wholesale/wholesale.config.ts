import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const wholesaleConfig = {
  wholesaleTab: observable,
  showSelectShopsModal: observable,
  supplierCardId: observable,
  suppliers: computed,
  products: computed,
  supplierMode: computed,
  isEmpty: computed,
  onChangeWholesaleTab: action.bound,
  onToggleSelectShopsModal: action.bound,
  onSelectSupplierCard: action.bound,
  onAddToInventory: action.bound,
}

export enum WholesaleTabs {
  Suppliers = 'SUPPLIERS',
  Products = 'PRODUCTS',
}

export const generateWholesaleTabs = () => [
  { label: t(TranslationKey.Suppliers), value: WholesaleTabs.Suppliers },
  { label: t(TranslationKey.Products), value: WholesaleTabs.Products },
]
