import {t} from '@utils/translations'

import {TranslationKey} from './translations/translation-key'

export const SUPERVISOR_PRODUCTS_HEAD_CELLS = () => [
  {id: 'asin', align: 'center', disablePadding: true, label: '#'},
  {id: 'action', align: 'center', disablePadding: true, label: t(TranslationKey.Action)},
]

export const CLIENT_ORDERS_HEAD_CELL = [
  {align: 'center', disablePadding: true, label: '#'},
  {align: 'center', disablePadding: true, label: 'Дата'},
  {align: 'center', disablePadding: true, label: 'Заказы'},
  {align: 'center', disablePadding: true, label: 'Статус'},
  {align: 'center', disablePadding: true, label: 'Баркод'},
  {align: 'center', disablePadding: false, label: 'Кол-во'},
  {align: 'center', disablePadding: false, label: 'Куда'},
  {align: 'center', disablePadding: false, label: 'Действия'},
  {align: 'center', disablePadding: false, label: 'Сумма'},
  {align: 'center', disablePadding: false, label: 'Вес продукта'},
  {align: 'center', disablePadding: false, label: 'Суммарный вес'},
  {align: 'center', disablePadding: false, label: 'Трек номер'},
]
export const CLIENT_EXCHANGE_MODAL_HEAD_CELLS = [
  {id: 'img', label: 'Image'},
  {id: 'product', label: 'Product'},
  {id: 'category', label: 'Category'},
  {id: 'price', label: 'Price'},
  {id: 'deliveryPrice', label: 'Ср. стоимость доставки за 1 шт.'},
  {id: 'amount', label: 'Amount'},

  {id: 'fullPrice', label: 'Full price'},

  {id: 'deliveryMethod', label: 'Delivery method'},
  {id: 'warehouse', label: 'Warehouse'},
  {id: 'clientComment', label: 'Client comment'},
]

export const CLIENT_EXCHANGE_HEAD_CELLS = [
  {id: 'img', label: 'Image'},
  {id: 'category', label: 'Category'},
  {id: 'priceAmazon', label: 'Цена'},
  {id: 'weight', label: 'Вес'},
  {id: 'bsr', label: 'BSR'},
  {id: 'fbaamount', label: 'Рекомендованная партия', align: 'center'},
  {id: 'reasearcher', label: 'Ресерчер'},
  {id: 'buyer', label: 'Баер'},
]

export const CLIENT_WAREHOUSE_HEAD_CELLS = () => [
  {id: 'img', label: '#'},
  {id: 'img', label: ''},
  {id: 'img', label: t(TranslationKey.Created)},
  {id: 'img', label: t(TranslationKey.Product)},
  {id: 'img', label: t(TranslationKey.Photos)},
  {id: 'img', label: t(TranslationKey.Quantity)},
  {id: 'img', label: t(TranslationKey.Warehouse)},
  {id: 'img', label: t(TranslationKey.Boxes)},
  {id: 'img', label: t(TranslationKey.Price)},
  {id: 'img', label: t(TranslationKey['Final weight'])},
  {id: 'img', label: t(TranslationKey['Gross weight'])},
  {id: 'img', label: 'Track ID'},
]

export const BATCHES_HEAD_CELLS = [
  {title: 'ClientID'},
  {title: 'Dispatch Date'},
  {title: 'Quantity'},
  {title: 'Status'},
  {title: 'Created'},
  {title: 'Updated'},
  {title: 'Warehouse'},
  {title: 'Delivery'},
  {title: 'Track ID'},
]

export const BUYER_MY_ORDERS_HEAD_CELLS = [
  'Статус',
  'Товар',
  'Баркод',
  'Создан',
  'Изменён',
  'Склад',
  'Способ доставки',
  'Комментарий клиента',
  'Комментарий байера',
]

export const BUYER_MY_ORDERS_MODAL_HEAD_CELLS = () => [
  '',
  t(TranslationKey.Title),
  t(TranslationKey.Price),
  t(TranslationKey['Avg. shipping cost per 1 pc.']),
  t(TranslationKey.Quantity),
  t(TranslationKey.Total),
  t(TranslationKey.Supplier),
]

export const BUYER_FREE_ORDERS_MODAL_HEAD_CELLS = [
  'Статус',
  'Товар',
  'Штрихкод',
  'Создан',
  'Изменён',
  'Склад',
  'Способ доставки',
  'Комментарий клиента',
  'Комментарий байера',
]

export const ADMIN_ORDERS_HEAD_CELL = [
  'Заказы',
  'Штрих-код',
  'Кол-во',
  'Куда',
  'Коробка',
  'Сумма',
  'Вес',
  'Вес финальный',
  'Трек номер',
]

export const BUYER_PRODUCTS_HEAD_CELLS = () => [
  {id: 'asin', align: 'center', disablePadding: true, label: '#'},
  {id: 'action', align: 'center', disablePadding: true, label: t(TranslationKey.Action)},
]
