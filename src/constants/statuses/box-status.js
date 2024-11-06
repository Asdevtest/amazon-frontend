import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const BoxStatus = {
  NEW: 'NEW',
  IN_STOCK: 'IN_STOCK',
  REQUESTED_SEND_TO_BATCH: 'REQUESTED_SEND_TO_BATCH',
  NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE: 'NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE',
  IN_BATCH: 'IN_BATCH',
  IN_BATCH_ON_THE_WAY: 'IN_BATCH_ON_THE_WAY',
  FINISH_PREP_CENTR_USA: 'FINISH_PREP_CENTR_USA',
  NEED_TO_UPDATE_THE_TARIFF: 'NEED_TO_UPDATE_THE_TARIFF',
  ACCEPTED_IN_PROCESSING: 'ACCEPTED_IN_PROCESSING',
}

export const boxStatusTranslateKey = status => {
  switch (status) {
    case BoxStatus.NEW:
      return t(TranslationKey['On the way to the warehouse'])
    case BoxStatus.IN_STOCK:
      return t(TranslationKey['In stock'])
    case BoxStatus.REQUESTED_SEND_TO_BATCH:
      return t(TranslationKey['Requested in batch'])
    case BoxStatus.IN_BATCH_ON_THE_WAY:
      return t(TranslationKey['Sent in batches'])
    case BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE:
      return t(TranslationKey['Needs confirmation of shipping cost'])
    case BoxStatus.IN_BATCH:
      return t(TranslationKey['Awaiting shipment in batches'])
    case BoxStatus.ACCEPTED_IN_PROCESSING:
      return t(TranslationKey['Accepted in processing'])
    case BoxStatus.NEED_TO_UPDATE_THE_TARIFF:
      return t(TranslationKey['Need to update the tariff'])
    default:
      return t(TranslationKey['No status'])
  }
}

export const colorByBoxStatus = status => {
  if (
    [
      BoxStatus.NEW,
      BoxStatus.REQUESTED_SEND_TO_BATCH,
      BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
      BoxStatus.IN_BATCH,
      BoxStatus.ACCEPTED_IN_PROCESSING,
      BoxStatus.NEED_TO_UPDATE_THE_TARIFF,
    ].includes(status)
  ) {
    return {
      color: '#C69109',
    }
  }
  if ([BoxStatus.IN_STOCK, BoxStatus.REQUESTED_SEND_TO_BATCH, BoxStatus.IN_BATCH_ON_THE_WAY].includes(status)) {
    return {
      background: 'linear-gradient(180deg, #00B746 0%, #03A03F 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
    }
  }
}
