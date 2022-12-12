import {TranslationKey} from './translations/translation-key'

export const BoxStatus = {
  NEW: 'NEW',
  IN_STOCK: 'IN_STOCK',
  REQUESTED_SEND_TO_BATCH: 'REQUESTED_SEND_TO_BATCH',
  NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE: 'NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE',
  IN_BATCH: 'IN_BATCH',
  IN_BATCH_ON_THE_WAY: 'IN_BATCH_ON_THE_WAY',
  NEED_TO_UPDATE_THE_TARIFF: 'NEED_TO_UPDATE_THE_TARIFF',
}

export const boxStatusTranslateKey = status => {
  switch (status) {
    case BoxStatus.NEW:
      return TranslationKey['On the way to the warehouse']
    case BoxStatus.IN_STOCK:
      return TranslationKey['In stock']
    case BoxStatus.REQUESTED_SEND_TO_BATCH:
      return TranslationKey['Awaiting shipment in batches']
    case BoxStatus.IN_BATCH_ON_THE_WAY:
      return TranslationKey['Sent in batches']
    case BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE:
      return TranslationKey['Needs confirmation of shipping cost']
  }
}

export const colorByBoxStatus = status => {
  if (
    [BoxStatus.NEW, BoxStatus.REQUESTED_SEND_TO_BATCH, BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE].includes(
      status,
    )
  ) {
    return {
      color: 'red',
    }
  }
  if ([BoxStatus.IN_STOCK, BoxStatus.REQUESTED_SEND_TO_BATCH, BoxStatus.IN_BATCH_ON_THE_WAY].includes(status)) {
    return {
      background: 'linear-gradient(180deg, #00B746 0%, #03A03F 100%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
    }
  }
}
