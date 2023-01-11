import CloseIcon from '@mui/icons-material/Close'
import {Avatar, Typography} from '@mui/material'

import {forwardRef, useCallback} from 'react'

import {format, secondsToHours} from 'date-fns'
import {useSnackbar, SnackbarContent, SnackbarKey} from 'notistack'

import {UiTheme} from '@constants/themes'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {getDistanceBetweenDatesInSeconds} from '@utils/date-time'
import {t} from '@utils/translations'

import {useClassNames} from './order-deadline-snack.style'

interface SimpleMessagesSnackProps {
  noticeItem: any | null
  id: SnackbarKey
  autoHideDuration?: number
}

export const OrderDeadlineSnack = forwardRef<HTMLDivElement, SimpleMessagesSnackProps>(
  ({id, noticeItem, autoHideDuration /* , ...props*/}, ref) => {
    const {classes: classNames} = useClassNames()

    const {closeSnackbar} = useSnackbar()

    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    const onClickNoticeItem = (orderId: string) => {
      const win = window.open(`${window.location.origin}/client/pending-orders/order?${orderId}`, '_blank')
      win?.focus()
    }

    // console.log('noticeItem', noticeItem)

    setTimeout(() => closeSnackbar(id), autoHideDuration)

    return (
      <SnackbarContent ref={ref}>
        <div className={classNames.mainWrapper}>
          <Avatar
            src={
              SettingsModel.uiTheme === UiTheme.light ? '/assets/icons/snack-light.svg' : '/assets/icons/snack-dark.svg'
            }
            className={classNames.avatarWrapper}
          />

          <div className={classNames.centerWrapper}>
            <Typography className={classNames.attentionTitle}>{t(TranslationKey.Notice).toUpperCase()}</Typography>

            {noticeItem.map((el: any, index: number) => (
              <div key={index} className={classNames.itemWrapper} onClick={() => onClickNoticeItem(el._id)}>
                <div className={classNames.titleWrapper}>
                  <Typography className={classNames.title}>{`${t(TranslationKey.Order)} № ${el.id}`}</Typography>
                </div>

                <Typography className={classNames.messageText}>{`${t(
                  TranslationKey['The redemption deadline expires in'],
                )} ${secondsToHours(getDistanceBetweenDatesInSeconds(el.deadline))} ${t(
                  TranslationKey.hour,
                )}`}</Typography>
              </div>
            ))}
          </div>

          <div className={classNames.rightSiteWrapper}>
            <CloseIcon
              fontSize="small"
              className={classNames.closeIcon}
              onClick={e => {
                e.stopPropagation()

                handleDismiss()
              }}
            />

            <Typography className={classNames.messageDate}>{format(new Date(), 'HH:mm')}</Typography>
          </div>
        </div>
      </SnackbarContent>
    )
  },
)
