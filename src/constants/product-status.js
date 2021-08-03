/* 20, 70, 80, 90 - эти статусы запускают процесс выплат. После того как поставлен
  один из таких статусов - больше нельзя така как появилась запись об оплате.
*/
import {objectFlip} from '@utils/object'

export const ProductStatus = {
  NEW_PRODUCT: 'NEW_PRODUCT',
  RESEARCHER_FOUND_SUPPLIER: 'RESEARCHER_FOUND_SUPPLIER',
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
}

export const ProductStatusByCode = {
  // Товар после заведения в базе ресерчером получает этот статус. Ресечер может дополнительно сменить его на статус 30
  0: ProductStatus.NEW_PRODUCT,
  10: ProductStatus.RESEARCHER_FOUND_SUPPLIER,
  // Статусы, которые поставит супервайзер по итогам проверки
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
}

export const ProductStatusByKey = objectFlip(ProductStatusByCode, parseInt)
