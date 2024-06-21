import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'

export const updateOrderKeys = [
  'deliveryMethod',
  'warehouse',
  'barCode',
  'trackingNumberChina',
  'amountPaymentPerConsignmentAtDollars',
  'deliveryCostToTheWarehouse',
  'buyerComment',
  'images',
  'yuanToDollarRate',
  'paymentDetails',
  'amount',
  'orderSupplierId',
  'item',
  'priceInYuan',
  'priceBatchDeliveryInYuan',
  'partialPaymentAmountRmb',
  'partiallyPaid',
  'partialPayment',
]

export const filtersFields = [
  'id',
  'item',
  'priority',
  'asin',
  'skuByClient',
  'amazonTitle',
  'paymentDetailsAttached',
  'status',
  'amount',
  'totalPrice',
  'paymentMethod',
  'priceInYuan',
  'storekeeper',
  'productionTerm',
  'deadline',
  'paymentDateToSupplier',
  'needsResearch',
  'client',
  'destination',
  'clientComment',
  'buyerComment',
  'createdAt',
  'updatedAt',
  'partiallyPaid',
  'partialPaymentAmountRmb',
  'minProductionTerm',
  'maxProductionTerm',
]

export const attentionStatuses = [
  OrderStatusByKey[OrderStatus.AT_PROCESS],
  OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
  OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
]

export const paymentMethodsReadOnlyStatuses = [
  OrderStatusByKey[OrderStatus.PARTIALLY_PAID],
  OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
  OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
  OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
  OrderStatusByKey[OrderStatus.IN_STOCK],
  OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER],
  OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT],
]
