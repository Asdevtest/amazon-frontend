/* 20, 70, 80, 90 - эти статусы запускают процесс выплат. После того как поставлен
  один из таких статусов - больше нельзя така как появилась запись об оплате.
*/
import { objectFlip } from '@utils/object'

import { TranslationKey } from '../translations/translation-key'

export const ProductStatus = {
  NEW_PRODUCT: 'NEW_PRODUCT',
  DEFAULT: 'DEFAULT', // Для сортировки
  RESEARCHER_FOUND_SUPPLIER: 'RESEARCHER_FOUND_SUPPLIER',
  RESEARCHER_CREATED_PRODUCT: 'RESEARCHER_CREATED_PRODUCT',
  CHECKED_BY_SUPERVISOR: 'CHECKED_BY_SUPERVISOR',
  REJECTED_BY_SUPERVISOR_AT_FIRST_STEP: 'REJECTED_BY_SUPERVISOR_AT_FIRST_STEP',
  BUYER_PICKED_PRODUCT: 'BUYER_PICKED_PRODUCT',
  TO_BUYER_FOR_RESEARCH: 'TO_BUYER_FOR_RESEARCH',
  BUYER_FOUND_SUPPLIER: 'BUYER_FOUND_SUPPLIER',
  SUPPLIER_WAS_NOT_FOUND_BY_BUYER: 'SUPPLIER_WAS_NOT_FOUND_BY_BUYER',
  SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE: 'SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE',
  COMPLETE_SUCCESS: 'COMPLETE_SUCCESS',
  COMPLETE_SUPPLIER_WAS_NOT_FOUND: 'COMPLETE_SUPPLIER_WAS_NOT_FOUND',
  COMPLETE_PRICE_WAS_NOT_ACCEPTABLE: 'COMPLETE_PRICE_WAS_NOT_ACCEPTABLE',
  PURCHASED_PRODUCT: 'PURCHASED_PRODUCT',
  NO_PUBLISHED: 'NO_PUBLISHED',

  CREATED_BY_CLIENT: 'CREATED_BY_CLIENT',
  FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR: 'FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR',
  FROM_CLIENT_TO_BUYER_FOR_RESEARCH: 'FROM_CLIENT_TO_BUYER_FOR_RESEARCH',
  FROM_CLIENT_BUYER_PICKED_PRODUCT: 'FROM_CLIENT_BUYER_PICKED_PRODUCT',
  FROM_CLIENT_BUYER_FOUND_SUPPLIER: 'FROM_CLIENT_BUYER_FOUND_SUPPLIER',
  FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER: 'FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER',
  FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE: 'FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE',
  FROM_CLIENT_COMPLETE_SUCCESS: 'FROM_CLIENT_COMPLETE_SUCCESS',
  FROM_CLIENT_PAID_BY_CLIENT: 'FROM_CLIENT_PAID_BY_CLIENT',
  FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND: 'FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND',
  FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE: 'FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE',

  SUPPLIER_FOUND: 'SUPPLIER_FOUND',
}

export const ProductStatusByCode = {
  // Товар после заведения в базе ресерчером получает этот статус. Ресечер может дополнительно сменить его на статус 30
  0: ProductStatus.NEW_PRODUCT,
  1: ProductStatus.DEFAULT, // Для сортировки
  5: ProductStatus.RESEARCHER_CREATED_PRODUCT,
  10: ProductStatus.RESEARCHER_FOUND_SUPPLIER,
  // Статусы, которые поставит супервайзер по итогам проверки
  15: ProductStatus.CHECKED_BY_SUPERVISOR,
  20: ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP, // Если ставит этот статус - должны заплатить супервайзеру.
  30: ProductStatus.TO_BUYER_FOR_RESEARCH,
  35: ProductStatus.BUYER_PICKED_PRODUCT, // статус проставляется автоматически после того как баер взял товар в работу
  // Статусы которые поставит байер по результатам своей работы.
  40: ProductStatus.BUYER_FOUND_SUPPLIER,
  50: ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
  60: ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
  // Статус которые проставит супервайзер по результатам второй проверки.
  70: ProductStatus.COMPLETE_SUCCESS, // если был поставлен статус 70 то нужно учитывать предыдущий статус товара. если переходили с 10->70 оплачиваем ресечеру и супервайзеру. если переходили с 40->70 оплачиваем ресечеру, байеру и супервайзеру.
  75: ProductStatus.PURCHASED_PRODUCT, // продукт куплен
  80: ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND,
  // оплачиваем супервайзеру
  90: ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
  // оплачиваем супервайзеру
  100: ProductStatus.NO_PUBLISHED, // статус для скрытия товара с биржи товаров админом (создана задача на бек)

  200: ProductStatus.CREATED_BY_CLIENT,
  205: ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR,
  230: ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
  235: ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT,
  240: ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER,
  250: ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
  260: ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
  270: ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS,
  275: ProductStatus.FROM_CLIENT_PAID_BY_CLIENT,
  280: ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND,
  290: ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,

  300: ProductStatus.SUPPLIER_FOUND,
}

export const ProductStatusGroups = {
  allProducts: 'allProducts',
  rejectedBySupervisor: 'rejectedBySupervisor',
  onCheckWithSupervisor: 'onCheckWithSupervisor',
  atTheBuyerInWork: 'atTheBuyerInWork',
  searchComplete: 'searchComplete',
  supplierWasNotFound: 'supplierWasNotFound',
  supplierPriceDoesNotFit: 'supplierPriceDoesNotFit',
  paidByTheClient: 'paidByTheClient',
  productIsAppropriate: 'productIsAppropriate',
  buyerFoundSupplier: 'buyerFoundSupplier',
}

export const colorByProductStatus = status => {
  if (
    [
      ProductStatus.NO_PUBLISHED,
      ProductStatus.CREATED_BY_CLIENT,
      ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR,
      ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
      ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT,
      ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER,
      ProductStatus.NEW_PRODUCT,
      ProductStatus.RESEARCHER_CREATED_PRODUCT,
      ProductStatus.RESEARCHER_FOUND_SUPPLIER,
      ProductStatus.CHECKED_BY_SUPERVISOR,
      ProductStatus.TO_BUYER_FOR_RESEARCH,
      ProductStatus.BUYER_PICKED_PRODUCT,
      ProductStatus.BUYER_FOUND_SUPPLIER,
    ].includes(status)
  ) {
    return '#F3AF00'
  } else if (
    [
      ProductStatus.COMPLETE_SUCCESS,
      ProductStatus.PURCHASED_PRODUCT,
      ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS,
      ProductStatus.FROM_CLIENT_PAID_BY_CLIENT,
    ].includes(status)
  ) {
    return '#00B746'
  } else if (
    [
      ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP,
      ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
      ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
      ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND,
      ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
      ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
      ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
      ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND,
      ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
    ].includes(status)
  ) {
    return '#FF1616'
  } else {
    return '#black'
  }
}

export const productStatusTranslateKey = status => {
  switch (status) {
    case ProductStatus.NEW_PRODUCT:
      return TranslationKey['New product']

    case ProductStatus.DEFAULT:
      return TranslationKey.All

    case ProductStatus.RESEARCHER_CREATED_PRODUCT:
      return TranslationKey['Product on check with Supervisor']

    case ProductStatus.RESEARCHER_FOUND_SUPPLIER:
      return TranslationKey['Researcher found supplier']

    case ProductStatus.CHECKED_BY_SUPERVISOR:
      return TranslationKey['Product is appropriate']

    case ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP:
      return TranslationKey['Rejected by Supervisor']

    case ProductStatus.TO_BUYER_FOR_RESEARCH:
      return TranslationKey['Is in search of a Buyer']

    case ProductStatus.BUYER_PICKED_PRODUCT:
      return TranslationKey['Product at the Buyer in work']

    case ProductStatus.BUYER_FOUND_SUPPLIER:
      return TranslationKey['Buyer found a supplier']

    case ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER:
      return TranslationKey['Supplier was not found']

    case ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE:
      return TranslationKey['Supplier price does not fit']

    case ProductStatus.COMPLETE_SUCCESS:
      return TranslationKey['Search complete']

    case ProductStatus.PURCHASED_PRODUCT:
      return TranslationKey['Product purchased']

    case ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND:
      return TranslationKey['Supplier was not found (сhecked)']

    case ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE:
      return TranslationKey['Supplier price does not fit (сhecked)']

    case ProductStatus.NO_PUBLISHED:
      return TranslationKey['Not published']

    case ProductStatus.CREATED_BY_CLIENT:
      return TranslationKey['Created by Client']

    case ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR:
      return TranslationKey['Product on check with Supervisor']

    case ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH:
      return TranslationKey['Is in search of a Buyer']

    case ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT:
      return TranslationKey['Product at the Buyer in work']

    case ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER:
      return TranslationKey['Buyer found a supplier']

    case ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER:
      return TranslationKey['Supplier was not found']

    case ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE:
      return TranslationKey['Supplier price does not fit']

    case ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS:
      return TranslationKey['Search complete']

    case ProductStatus.FROM_CLIENT_PAID_BY_CLIENT:
      return TranslationKey['Paid by the Client']

    case ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND:
      return TranslationKey['Supplier was not found (сhecked)']

    case ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE:
      return TranslationKey['Supplier price does not fit (сhecked)']

    case ProductStatus.SUPPLIER_FOUND:
      return TranslationKey['Supplier found']
  }
}

export const translateStatusForResearcher = status => {
  switch (status) {
    case ProductStatus.NEW_PRODUCT:
      return TranslationKey['New product']

    case ProductStatus.RESEARCHER_CREATED_PRODUCT:
      return TranslationKey['Product on check with Supervisor']

    case ProductStatus.RESEARCHER_FOUND_SUPPLIER:
      return TranslationKey['Researcher found supplier']

    case ProductStatus.CHECKED_BY_SUPERVISOR:
      return TranslationKey['Product is appropriate']

    case ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP:
      return TranslationKey['Rejected by Supervisor']

    default:
      return TranslationKey.Ok
  }
}

export const ProductStatusByKey = objectFlip(ProductStatusByCode, parseInt)
