import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'

export const fieldsForSearch = ['amazonTitle', 'asin', 'xid', 'item', 'skuByClient']

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
  OrderStatusByKey[OrderStatus.AT_PROCESS as keyof typeof OrderStatusByKey],
  OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER as keyof typeof OrderStatusByKey],
  OrderStatusByKey[OrderStatus.VERIFY_RECEIPT as keyof typeof OrderStatusByKey],
]

export const paymentMethodsReadOnlyStatuses = [
  OrderStatusByKey[OrderStatus.PARTIALLY_PAID as keyof typeof OrderStatusByKey],
  OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER as keyof typeof OrderStatusByKey],
  OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED as keyof typeof OrderStatusByKey],
  OrderStatusByKey[OrderStatus.VERIFY_RECEIPT as keyof typeof OrderStatusByKey],
  OrderStatusByKey[OrderStatus.IN_STOCK as keyof typeof OrderStatusByKey],
  OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER as keyof typeof OrderStatusByKey],
  OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT as keyof typeof OrderStatusByKey],
]
