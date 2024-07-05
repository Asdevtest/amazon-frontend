export enum AdminOrdersStatusGroup {
  ALL = 'all',
  READ_TO_PROCESS = 'readToProcess',
  AT_PROCESS = 'atProcess',
  PAID = 'paid',
  TRACK_NUMBER_ISSUED = 'trackNumberIssued',
  IN_STOCK = 'inStock',
  CANCELED_BY_BUYER = 'canceledByBuyer',
  NEED_CONFIRMING = 'needConfirming',
  CANCELED_BY_CLIENT = 'canceledByClient',
  VERIFY_RECEIPT = 'verifyReceipt',
}
