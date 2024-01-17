export enum StatusEnum {
  New = 'NEW',
  InStock = 'IN_STOCK',
  RequestedSendToBatch = 'REQUESTED_SEND_TO_BATCH',
  NeedConfirmingToDeliveryPriceChange = 'NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE',
  InBatch = 'IN_BATCH',
  NeedToUpdateTheTariff = 'NEED_TO_UPDATE_THE_TARIFF',
  InBatchOnTheWay = 'IN_BATCH_ON_THE_WAY',
  FinishPrepCentrUsa = 'FINISH_PREP_CENTR_USA',
  AcceptedInProcessing = 'ACCEPTED_IN_PROCESSING',
}
