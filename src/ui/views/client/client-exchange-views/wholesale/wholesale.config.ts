import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const wholesaleConfig = {
  showSelectShopsModal: observable,
  supplierCardId: observable,
  items: computed,
  onToggleSelectShopsModal: action.bound,
  onSelectSupplierCard: action.bound,
  onAddToInventory: action.bound,
}

export enum WholesaleTabs {
  Suppliers = 'SUPPLIERS',
  Cards = 'CARDS',
}

export const generateWholesaleTabs = () => [
  { label: t(TranslationKey.Cards), value: WholesaleTabs.Cards },
  { label: t(TranslationKey.Suppliers), value: WholesaleTabs.Suppliers },
]
