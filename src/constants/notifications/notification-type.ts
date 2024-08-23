import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const NotificationTypes: Record<string, string> = {
  box: 'box',
  idea: 'idea',
  order: 'order',
  proposal: 'proposal',
  request: 'request',
  shop: 'shop',
  launch: 'launch',
}

export const getTranslationNotificationType = (type: string) => {
  switch (type) {
    case NotificationTypes.box:
      return t(TranslationKey.Box)

    case NotificationTypes.idea:
      return t(TranslationKey.Idea)

    case NotificationTypes.order:
      return t(TranslationKey.Order)

    case NotificationTypes.proposal:
      return t(TranslationKey.Proposal)

    case NotificationTypes.request:
      return t(TranslationKey.Request)

    case NotificationTypes.shop:
      return t(TranslationKey.Shop)

    case NotificationTypes.launch:
      return t(TranslationKey.Launches)
  }
}
