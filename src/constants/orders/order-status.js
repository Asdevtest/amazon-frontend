import { UiTheme } from '@constants/theme/mui-theme.type'

import { SettingsModel } from '@models/settings-model'

import { Text } from '@components/shared/text'

import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const OrderStatus = {
  FORMED: 'FORMED',
  PENDING: 'PENDING',
  READY_FOR_BUYOUT: 'READY_FOR_BUYOUT',
  NEW: 'NEW',
  READY_TO_PROCESS: 'READY_TO_PROCESS',
  READY_FOR_PAYMENT: 'READY_FOR_PAYMENT',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  AT_PROCESS: 'AT_PROCESS',
  NEED_CONFIRMING_TO_PRICE_CHANGE: 'NEED_CONFIRMING_TO_PRICE_CHANGE',

  PAID_TO_SUPPLIER: 'PAID_TO_SUPPLIER',
  TRACK_NUMBER_ISSUED: 'TRACK_NUMBER_ISSUED',
  VERIFY_RECEIPT: 'VERIFY_RECEIPT',
  IN_STOCK: 'IN_STOCK',

  CANCELED_BY_BUYER: 'CANCELED_BY_BUYER',
  CANCELED_BY_CLIENT: 'CANCELED_BY_CLIENT',
  AWAITING_SHIPMENT: 'AWAITING_SHIPMENT',
  SHIPPED: 'SHIPPED',
}

export const OrderStatusByCode = {
  0: OrderStatus.FORMED, // Корзина - статус "Формируется"
  1: OrderStatus.NEW, // Клиент создал заказ - статус "Новый"
  2: OrderStatus.PENDING,
  3: OrderStatus.READY_FOR_BUYOUT,
  10: OrderStatus.READY_TO_PROCESS, // Заказ доступен к обработке закупщиком (через 15минут после того как он был сделан, приобрёл статус Новый ) - статус "доступен для обработки"
  15: OrderStatus.AT_PROCESS, // Закупщик взял заказ в обработку - статус "в обработке"
  16: OrderStatus.READY_FOR_PAYMENT, // Закупщик взял заказ в обработку - статус "в обработке"
  17: OrderStatus.PARTIALLY_PAID,
  19: OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
  20: OrderStatus.PAID_TO_SUPPLIER, // закупщик оплатил заказ - статус "оплачен"
  25: OrderStatus.TRACK_NUMBER_ISSUED, // выдан и принят трек номер - статус "выдан трек номер"
  27: OrderStatus.VERIFY_RECEIPT, //
  30: OrderStatus.IN_STOCK, // Товар пришёл на склад - "Пришёл на склад"
  35: OrderStatus.CANCELED_BY_BUYER, // Отменен байером
  40: OrderStatus.CANCELED_BY_CLIENT, // Отменен байером отменем клиентом, можно выстаить только для вакантных или тех котрорые ожидают доплаты. (10, 19)
  45: OrderStatus.AWAITING_SHIPMENT, // Ожидает отправки
  50: OrderStatus.SHIPPED, // Отправлен
}

export const OrderStatusTranslate = (status, isClient) => {
  switch (status) {
    case OrderStatus.FORMED:
      return t(TranslationKey.Formed)
    case OrderStatus.NEW:
      return t(TranslationKey.New)
    case OrderStatus.PENDING:
      return t(TranslationKey.Pending)
    case OrderStatus.READY_FOR_BUYOUT:
      return t(TranslationKey['Ready to buy'])
    case OrderStatus.READY_TO_PROCESS:
      return t(TranslationKey['Waiting to be processed by a buyer'])
    case OrderStatus.AT_PROCESS:
      return t(TranslationKey['At process'])
    case OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE:
      return t(TranslationKey['Need confirming to price change'])
    case OrderStatus.PAID_TO_SUPPLIER:
      return t(TranslationKey['Paid to supplier'])
    case OrderStatus.TRACK_NUMBER_ISSUED:
      return t(TranslationKey['Track number issued' + `${isClient ? ' (In transit in stock)' : ''}`])
    case OrderStatus.VERIFY_RECEIPT:
      return t(TranslationKey['Verify receipt'])
    case OrderStatus.IN_STOCK:
      return t(TranslationKey['Order complete'])
    case OrderStatus.CANCELED_BY_BUYER:
      return t(TranslationKey['Canceled by Buyer'])
    case OrderStatus.CANCELED_BY_CLIENT:
      return t(TranslationKey['Canceled by Client'])
    case OrderStatus.AWAITING_SHIPMENT:
      return t(TranslationKey['Awaiting shipment'])
    case OrderStatus.READY_FOR_PAYMENT:
      return t(TranslationKey['Ready for payment'])
    case OrderStatus.PARTIALLY_PAID:
      return t(TranslationKey['Partially paid'])
    case OrderStatus.SHIPPED:
      return t(TranslationKey.Shipped)
  }
}

export const OrderStatusByKey = objectFlip(OrderStatusByCode, parseInt)

export const buyerOrderModalAllowOrderStatuses = [
  `${OrderStatusByKey[OrderStatus.PENDING]}`,
  `${OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]}`,
  `${OrderStatusByKey[OrderStatus.AT_PROCESS]}`,
  `${OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT]}`,
  `${OrderStatusByKey[OrderStatus.PARTIALLY_PAID]}`,
  `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
  `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`,
  `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,
  `${OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]}`,

  `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`,
  `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
  `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,
]

export const buyerOrderModalDisabledOrderStatuses = [
  `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
  `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
  `${OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]}`,
]

export const buyerOrderModalSubmitDisabledOrderStatuses = [
  `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
  `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
  `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`,
  `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,
]

export const ORDER_STATUS_OPTIONS = [
  {
    key: OrderStatus.FORMED,
    label: 'Formed',
  },

  {
    key: OrderStatus.PENDING,
    label: 'Pending',
  },

  {
    key: OrderStatus.READY_FOR_BUYOUT,
    label: 'Ready to buy',
  },
  {
    key: OrderStatus.NEW,
    label: 'New',
  },
  {
    key: OrderStatus.READY_TO_PROCESS,
    label: 'Ready to process',
  },
  {
    key: OrderStatus.AT_PROCESS,
    label: 'At process',
  },

  {
    key: OrderStatus.READY_FOR_PAYMENT,
    label: 'Ready for payment',
  },

  {
    key: OrderStatus.PARTIALLY_PAID,
    label: 'Partially paid',
  },

  {
    key: OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
    label: 'To price change',
  },

  {
    key: OrderStatus.PAID_TO_SUPPLIER,
    label: 'Paid to supplier',
  },
  {
    key: OrderStatus.TRACK_NUMBER_ISSUED,
    label: 'Track number issued',
  },

  {
    key: OrderStatus.VERIFY_RECEIPT,
    label: 'Verify receipt',
  },
  {
    key: OrderStatus.IN_STOCK,
    label: 'In stock',
  },
  {
    key: OrderStatus.CANCELED_BY_BUYER,
    label: 'Return order',
  },

  {
    key: OrderStatus.CANCELED_BY_CLIENT,
    label: 'Closed',
  },
  {
    key: OrderStatus.AWAITING_SHIPMENT,
    label: 'Awaiting shipment',
  },
  {
    key: OrderStatus.SHIPPED,
    label: 'Shipped',
  },
]

export const orderColorByStatus = status => {
  if (
    [
      OrderStatus.FORMED,
      OrderStatus.PENDING,
      OrderStatus.AT_PROCESS,
      OrderStatus.PARTIALLY_PAID,
      OrderStatus.TRACK_NUMBER_ISSUED,
    ].includes(status)
  ) {
    return '#F3AF00'
  } else if ([OrderStatus.IN_STOCK, OrderStatus.READY_FOR_BUYOUT, OrderStatus.PAID_TO_SUPPLIER].includes(status)) {
    return '#00B746'
  } else if (
    [
      OrderStatus.CANCELED_BY_BUYER,
      OrderStatus.CANCELED_BY_CLIENT,
      OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
    ].includes(status)
  ) {
    return SettingsModel.uiTheme === UiTheme.dark ? '#DD2121' : '#FF1616'
  } else if (
    [OrderStatus.READY_FOR_PAYMENT, OrderStatus.VERIFY_RECEIPT, OrderStatus.READY_TO_PROCESS].includes(status)
  ) {
    return SettingsModel.uiTheme === UiTheme.dark ? '#4CA1DE' : '#0A6FE8'
  } else {
    return '#black'
  }
}

export const OrderStatusText = ({ className, status, isClient }) => {
  const colorByStatus = () => {
    if (
      [
        OrderStatus.FORMED,
        OrderStatus.PENDING,
        OrderStatus.AT_PROCESS,
        OrderStatus.PARTIALLY_PAID,
        OrderStatus.TRACK_NUMBER_ISSUED,
      ].includes(status)
    ) {
      return '#F3AF00'
    } else if ([OrderStatus.IN_STOCK, OrderStatus.READY_FOR_BUYOUT, OrderStatus.PAID_TO_SUPPLIER].includes(status)) {
      return '#00B746'
    } else if (
      [
        OrderStatus.CANCELED_BY_BUYER,
        OrderStatus.CANCELED_BY_CLIENT,
        OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
      ].includes(status)
    ) {
      return '#FF1616'
    } else if (
      [OrderStatus.READY_FOR_PAYMENT, OrderStatus.VERIFY_RECEIPT, OrderStatus.READY_TO_PROCESS].includes(status)
    ) {
      return SettingsModel.uiTheme === UiTheme.dark ? '#4CA1DE' : '#0A6FE8'
    } else {
      return '#black'
    }
  }

  const colorStatus = colorByStatus()

  return (
    <Text
      tooltipInfoContent={t(TranslationKey['Current order status'])}
      className={className}
      style={{ color: colorStatus }}
    >
      {OrderStatusTranslate(status, isClient)}
    </Text>
  )
}

export const getOrderStatusOptionByCode = statusCode =>
  ORDER_STATUS_OPTIONS.find(statusOption => statusOption.key === OrderStatusByCode[statusCode])

export const getOrderStatusByCode = status => {
  return OrderStatusByCode[status]
}
