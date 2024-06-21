import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const fieldsOfProductAllowedToUpdate = [
  'reffee',
  'fbalink',
  'fbafee',
  'fbaamount',
  'delivery',
  'status',
  'profit',
  'margin',
  'buyersComment',
  'additionalProp1',
  'currentSupplierId',
  'tags',
]

export const fieldsOfProductAllowedToForceUpdate = [
  'reffee',
  'fbalink',
  'fbafee',
  'fbaamount',
  'delivery',
  'profit',
  'margin',
  'buyersComment',
  'additionalProp1',
  'currentSupplierId',
  'tags',
]

export const formFieldsDefault = {
  checkednotes: '',
  amazon: 0,
  bsr: 0,
  createdAt: '',
  createdBy: {},
  delivery: 0,
  dirdecision: 0,
  express: false,
  fba: false,
  fbafee: 0,
  icomment: '',
  id: '',
  images: [],
  lamazon: '',
  material: '',
  reffee: 15,
  status: 0,
  updatedAt: '',
  _id: '',
  buyersComment: '',
}

export const confirmMessageByProductStatus = () => ({
  60: t(TranslationKey["The supplier's price is not acceptable?"]),
  50: t(TranslationKey['Supplier not found']) + '?',
  40: t(TranslationKey['Supplier found']) + '?',
  240: t(TranslationKey['Supplier found']) + '?',
  260: t(TranslationKey["The supplier's price is not acceptable?"]),
  250: t(TranslationKey['Supplier not found']) + '?',
})

export const warningModalTitleVariants = () => ({
  NO_SUPPLIER: t(TranslationKey["You can't choose without a supplier"]),
  CHOOSE_STATUS: t(TranslationKey['We need to choose a status']),
})
