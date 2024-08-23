import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { LaunchNotificationType } from '../launch-notification-message.type'

export const getNotificationTitle = (notificationType: LaunchNotificationType) => {
  switch (notificationType) {
    case LaunchNotificationType.EXPIRED:
      return t(TranslationKey.Expired)
    case LaunchNotificationType.ALMOST_RUNNING_OUT:
      return t(TranslationKey['Almost expired'])
  }
}
