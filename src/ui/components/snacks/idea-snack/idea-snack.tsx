import CloseIcon from '@mui/icons-material/Close'
import {Avatar, Typography} from '@mui/material'

import {forwardRef, useCallback} from 'react'

import {format, secondsToHours} from 'date-fns'
import {useSnackbar, SnackbarContent, SnackbarKey} from 'notistack'

import {UiTheme} from '@constants/themes'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {UserLink} from '@components/user-link'

import {getDistanceBetweenDatesInSeconds, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {useClassNames} from './idea-snack.style'

interface SimpleMessagesSnackProps {
  noticeItem: any | null
  id: SnackbarKey
  autoHideDuration?: number
}

export const IdeaSnack = forwardRef<HTMLDivElement, SimpleMessagesSnackProps>(
  ({id, noticeItem, autoHideDuration /* , ...props*/}, ref) => {
    const {classes: classNames} = useClassNames()

    const {closeSnackbar} = useSnackbar()

    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    const onClickNoticeItem = () => {
      const win = window.open(
        `${window.location.origin}/client/inventory/product?product-id=${noticeItem.productId}&show-tab=ideas`,
        '_blank',
      )

      win?.focus()
    }

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
            <div className={classNames.centerSubWrapper}>
              <div className={classNames.itemWrapper}>
                <UserLink
                  name={noticeItem.creator.name}
                  userId={noticeItem.creator._id}
                  blackText={undefined}
                  withAvatar={undefined}
                  maxNameWidth={undefined}
                  customStyles={undefined}
                />
                <Typography className={classNames.messageText}>
                  {t(TranslationKey['updated data on idea to product']) + ':'}
                </Typography>
              </div>
              <div className={classNames.itemWrapper}>
                <Typography className={classNames.asin}>{'ASIN:'}</Typography>
                <Typography className={classNames.asinText} onClick={onClickNoticeItem}>
                  {noticeItem.asin}
                </Typography>
              </div>
            </div>
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
