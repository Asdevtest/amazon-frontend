import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const fieldsOfProductAllowedToUpdate = [
  'checkednotes',
  'lamazon',
  'lsupplier',
  'bsr',
  'status',
  'amazon',
  'fbafee',
  'reffee',
  'delivery',
  'icomment',
  'fba',
  'profit',
  'margin',
  'images',
  'width',
  'height',
  'length',
  'amazonTitle',
  'amazonDetail',
  'amazonDescription',
  'category',
  'weight',
  'minpurchase',
  'fbaamount',
  'strategyStatus',

  'niche',
  'asins',
  'avgRevenue',
  'avgBSR',
  'totalRevenue',
  'coefficient',
  'avgPrice',
  'avgReviews',
  'redFlags',
  'tags',
  // 'totalFba'
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
  updateDate: '',
  _id: '',
  fbaamount: 0,
}

export const confirmMessageByProductStatus = () => ({
  15: t(TranslationKey['The product is suitable']) + '?',
  20: t(TranslationKey['The product is not suitable']) + '?',
  30: t(TranslationKey['Send to find a supplier?']),
  70: t(TranslationKey['Publish on the exchange']) + '?',
  80: t(TranslationKey['Supplier not found']) + '?',
  90: t(TranslationKey["The supplier's price is not acceptable?"]),
  230: t(TranslationKey['Send to find a supplier?']),
  250: t(TranslationKey['The product is not suitable']) + '?',
  // 280: t(TranslationKey['Confirm the execution of the Supplier Search request?']),
  280: t(TranslationKey['Supplier not found']) + '?',
  270: t(TranslationKey['Supplier found']) + '?',
  290: t(TranslationKey["Is the supplier's price unacceptable"]) + '?',
})

export const confirmMessageWithoutStatus = () => t(TranslationKey['Save without status']) + '?'

export const warningModalTitleVariants = () => ({
  NO_SUPPLIER: t(TranslationKey["You can't choose without a supplier"]),
  CHOOSE_STATUS: t(TranslationKey['We need to choose a status']),
  PRICE_WAS_NOT_ACCEPTABLE: t(TranslationKey["Is the supplier's price unacceptable"]),
  SUPPLIER_WAS_NOT_FOUND_BY_BUYER: t(TranslationKey['Supplier not found']),
  ERROR: t(TranslationKey.Error),
})
