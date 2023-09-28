import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'

import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const adminExchangeBtnsConfig = () => [
  {
    status: ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT],
    label: t(TranslationKey.Created),
  },
  {
    status: ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR],
    label: t(TranslationKey.New),
  },
  {
    status: ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH],
    label: t(TranslationKey['Supplier search']),
  },
  {
    status: ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT],
    label: t(TranslationKey['In the work of a Bayer']),
  },
  {
    status: ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
    label: t(TranslationKey['Supplier found by Bayer']),
  },
  {
    status: ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
    label: t(TranslationKey['Supplier not found by Bayer']),
  },
  {
    status: ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
    label: t(TranslationKey['Price is higher than MZC']),
  },
  {
    status: ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS],
    label: t(TranslationKey.Published),
  },
  {
    status: ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
    label: t(TranslationKey.Rejected),
  },
  {
    status: ProductStatusByKey[ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND],
    label: t(TranslationKey['No supplier (completed by supervisor)']),
  },

  {
    status: ProductStatusByKey[ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
    label: t(TranslationKey["The supplier's price does not fit"]),
  },
]

export const adminOrdersBtnsConfig = () => [
  {
    label: t(TranslationKey['Available for processing']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#007a07',
  },
  {
    label: t(TranslationKey['The buyer took the order']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['The buyer paid for the order']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['Track number issued']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['Came to the warehouse']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['Return Order']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },

  {
    label: t(TranslationKey['Additional payment required']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['Canceled by Client']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['Verify receipt']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey.All),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
]
