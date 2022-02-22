import {getLocalizedTexts} from '@utils/get-localized-texts'
import {objectFlip} from '@utils/object'

import {texts} from './texts'

export const OrderStatus = {
  FORMED: 'FORMED',
  NEW: 'NEW',
  READY_TO_PROCESS: 'READY_TO_PROCESS',
  AT_PROCESS: 'AT_PROCESS',
  NEED_CONFIRMING_TO_PRICE_CHANGE: 'NEED_CONFIRMING_TO_PRICE_CHANGE',

  PAID_TO_SUPPLIER: 'PAID_TO_SUPPLIER',
  TRACK_NUMBER_ISSUED: 'TRACK_NUMBER_ISSUED',
  IN_STOCK: 'IN_STOCK',
  CANCELED_BY_BUYER: 'CANCELED_BY_BUYER',
  CANCELED_BY_CLIENT: 'CANCELED_BY_CLIENT',
  AWAITING_SHIPMENT: 'AWAITING_SHIPMENT',
  SHIPPED: 'SHIPPED',
}

export const OrderStatusByCode = {
  0: OrderStatus.FORMED, // Корзина - статус "Формируется"
  1: OrderStatus.NEW, // Клиент создал заказ - статус "Новый"
  10: OrderStatus.READY_TO_PROCESS, // Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус "доступен для обработки"
  15: OrderStatus.AT_PROCESS, // Закупщик взял заказ в обработку - статус "в обработке"
  19: OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
  20: OrderStatus.PAID_TO_SUPPLIER, // закупщик оплатил заказ - статус "оплачен"
  25: OrderStatus.TRACK_NUMBER_ISSUED, // выдан и принят трек номер - статус "выдан трек номер"
  30: OrderStatus.IN_STOCK, // Товар пришёл на склад - "Пришёл на склад"
  35: OrderStatus.CANCELED_BY_BUYER, // Отменен байером
  40: OrderStatus.CANCELED_BY_CLIENT, // Отменен байером отменем клиентом, можно выстаить только для вакантных или тех котрорые ожидают доплаты. (10, 19)
  45: OrderStatus.AWAITING_SHIPMENT, // Ожидает отправки
  50: OrderStatus.SHIPPED, // Отправлен
}

export const OrderStatusByKey = objectFlip(OrderStatusByCode, parseInt)

const textConfig = getLocalizedTexts(texts, 'en').orderStatus

export const ORDER_STATUS_OPTIONS = [
  {
    key: OrderStatus.FORMED,
    label: textConfig.formed,
  },
  {
    key: OrderStatus.NEW,
    label: textConfig.new,
  },
  {
    key: OrderStatus.READY_TO_PROCESS,
    label: textConfig.readyToProcess,
  },
  {
    key: OrderStatus.AT_PROCESS,
    label: textConfig.atProcess,
  },

  {
    key: OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
    label: textConfig.toPriceChange,
  },

  {
    key: OrderStatus.PAID_TO_SUPPLIER,
    label: textConfig.paid,
  },
  {
    key: OrderStatus.TRACK_NUMBER_ISSUED,
    label: textConfig.trackNumberIssued,
  },
  {
    key: OrderStatus.IN_STOCK,
    label: textConfig.inStock,
  },
  {
    key: OrderStatus.CANCELED_BY_BUYER,
    label: textConfig.returnOrder,
  },

  {
    key: OrderStatus.CANCELED_BY_CLIENT,
    label: textConfig.closed,
  },
  {
    key: OrderStatus.AWAITING_SHIPMENT,
    label: textConfig.awaitingShipment,
  },
  {
    key: OrderStatus.SHIPPED,
    label: textConfig.shipped,
  },
]

export const getOrderStatusOptionByCode = statusCode =>
  ORDER_STATUS_OPTIONS.find(statusOption => statusOption.key === OrderStatusByCode[statusCode])
