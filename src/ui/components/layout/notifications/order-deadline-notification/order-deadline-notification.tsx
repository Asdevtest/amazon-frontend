import { format } from 'date-fns'
import { FC } from 'react'

import { Avatar, Typography } from '@mui/material'

import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import {
  formatDateDistanceFromNowStrict,
  getDistanceBetweenDatesInSeconds,
  sortObjectsArrayByFiledDateWithParseISOAsc,
} from '@utils/date-time'
import { t } from '@utils/translations'

import { useClassNames } from './order-deadline-notification.style'

interface InoticeItem {
  _id: string
  id: string
  deadline: string
}

interface OrderDeadlineNotificationProps {
  noticeItem: InoticeItem[] | null
}

export const OrderDeadlineNotification: FC<OrderDeadlineNotificationProps> = props => {
  const { classes: classNames } = useClassNames()

  const { noticeItem } = props

  const onClickNoticeItem = (orderId: string) => {
    const win = window.open(`${window.location.origin}/client/my-orders/pending-orders/order?${orderId}`, '_blank')
    win?.focus()
  }

  return (
    <div className={classNames.mainWrapper}>
      <Avatar
        src={SettingsModel.uiTheme === UiTheme.light ? '/assets/icons/snack-light.svg' : '/assets/icons/snack-dark.svg'}
        className={classNames.avatarWrapper}
      />

      <div className={classNames.centerWrapper}>
        <Typography className={classNames.attentionTitle}>{t(TranslationKey.Notice).toUpperCase()}</Typography>
        <div className={classNames.centerSubWrapper}>
          {noticeItem
            ?.sort(sortObjectsArrayByFiledDateWithParseISOAsc('deadline'))
            .map((el: InoticeItem, index: number) => (
              <div key={index} className={classNames.itemWrapper} onClick={() => onClickNoticeItem(el._id)}>
                <div className={classNames.titleWrapper}>
                  <Typography className={classNames.title}>{`${t(TranslationKey.Order)} № ${el.id}`}</Typography>
                </div>

                <Typography className={classNames.messageText}>{`${t(
                  TranslationKey[
                    getDistanceBetweenDatesInSeconds(el.deadline) > 0
                      ? 'The redemption deadline expires'
                      : 'The redemption deadline has expired'
                  ],
                )} ${formatDateDistanceFromNowStrict(el.deadline)}`}</Typography>
              </div>
            ))}
        </div>
      </div>

      <div className={classNames.footer}>
        <Typography className={classNames.messageDate}>{format(new Date(), 'HH:mm')}</Typography>
      </div>
    </div>
  )
}
