import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const fieldsOfProductAllowedToForceUpdate = [
  'lamazon',
  'lsupplier',
  'bsr',
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
  // 'totalFba'

  'currentSupplierId',
]

export const fieldsOfProductAllowedToUpdate = [
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
  'currentSupplierId',

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
  amazon: '',
  bsr: '',
  createdAt: '',
  createdBy: {},
  delivery: '',
  dirdecision: '',
  express: false,
  fba: false,
  fbafee: '',
  icomment: '',
  asin: '',
  images: [],
  lamazon: '',
  material: '',
  reffee: '',
  status: '',
  suppliers: [],
  updatedAt: '',
  _id: '',
  fbaamount: '',
}

export const fieldsNotFilledText = () => t(TranslationKey['Fields not filled in'])

export const warningModalTitleVariants = () => ({
  NO_SUPPLIER: t(TranslationKey["You can't choose without a supplier"]),
  CHOOSE_STATUS: t(TranslationKey['We need to choose a status']),
})

export const confirmMessageByProductStatus = () => ({
  5: t(TranslationKey['Send to the Supervisor for review']) + '?',
  10: t(TranslationKey['Send to check with the supplier']) + '?',
})

export const confirmMessageWithoutStatus = () => t(TranslationKey['Save without status']) + '?'
