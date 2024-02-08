import { format } from 'date-fns'
import { FC } from 'react'

import { Avatar, Typography } from '@mui/material'

import { UiTheme } from '@constants/theme/mui-theme.type'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import {
  formatDateDistanceFromNowStrict,
  getDistanceBetweenDatesInSeconds,
  sortObjectsArrayByFiledDateWithParseISOAsc,
} from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './order-deadline-notification.style'

interface InoticeItem {
  _id: string
  id: string
  deadline: string
}

interface OrderDeadlineNotificationProps {
  noticeItem: InoticeItem[] | null
}

export const OrderDeadlineNotification: FC<OrderDeadlineNotificationProps> = props => {
  const { classes: styles } = useStyles()

  const { noticeItem } = props

  const onClickNoticeItem = (orderId: string) => {
    const win = window.open(`${window.location.origin}/client/my-orders/pending-orders/order?${orderId}`, '_blank')
    win?.focus()
  }

  return (
    <div className={styles.mainWrapper}>
      <Avatar
        src={SettingsModel.uiTheme === UiTheme.light ? '/assets/icons/snack-light.svg' : '/assets/icons/snack-dark.svg'}
        className={styles.avatarWrapper}
      />

      <div className={styles.centerWrapper}>
        <Typography className={styles.attentionTitle}>{t(TranslationKey.Notice).toUpperCase()}</Typography>
        <div className={styles.centerSubWrapper}>
          {noticeItem
            ?.sort(sortObjectsArrayByFiledDateWithParseISOAsc('deadline'))
            .map((el: InoticeItem, index: number) => (
              <div key={index} className={styles.itemWrapper} onClick={() => onClickNoticeItem(el._id)}>
                <div className={styles.titleWrapper}>
                  <Typography className={styles.title}>{`${t(TranslationKey.Order)} № ${el.id}`}</Typography>
                </div>

                <Typography className={styles.messageText}>{`${t(
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

      <div className={styles.footer}>
        <Typography className={styles.messageDate}>{format(new Date(), 'HH:mm')}</Typography>
      </div>
    </div>
  )
}
