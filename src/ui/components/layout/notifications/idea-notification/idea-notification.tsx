import { format } from 'date-fns'
import { FC } from 'react'

import { Avatar, Typography } from '@mui/material'

import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { useClassNames } from './idea-notification.style'

interface InoticeItem {
  productId: string
  asin: string
  creator: { name: string; _id: string }
  _id: string
}

interface IdeaNotificationProps {
  noticeItem: InoticeItem | null
  role: number
}

export const IdeaNotification: FC<IdeaNotificationProps> = props => {
  const { role, noticeItem } = props

  const { classes: classNames } = useClassNames()

  const getRolePiceToUrl = (key: string) => {
    switch (key) {
      case UserRole.CLIENT:
        return 'client/inventory'

      case UserRole.BUYER:
        return 'buyer/my-products'

      default:
        return 'client/inventory'
    }
  }

  const onClickNoticeItem = () => {
    const win = window.open(
      `${window.location.origin}/${getRolePiceToUrl(
        (UserRoleCodeMap as { [key: number]: string })[role],
      )}/product?product-id=${noticeItem?.productId}&show-tab=ideas`,
      '_blank',
    )

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
          <div className={classNames.itemWrapper}>
            <UserLink name={noticeItem?.creator.name} userId={noticeItem?.creator._id} />
            <Typography className={classNames.messageText}>
              {t(TranslationKey['updated data on idea to product']) + ':'}
            </Typography>
          </div>
          <div className={classNames.itemWrapper}>
            <Typography className={classNames.asin}>{'ASIN:'}</Typography>
            <Typography className={classNames.asinText} onClick={onClickNoticeItem}>
              {noticeItem?.asin}
            </Typography>
          </div>
        </div>
      </div>

      <div className={classNames.footer}>
        <Typography className={classNames.messageDate}>{format(new Date(), 'HH:mm')}</Typography>
      </div>
    </div>
  )
}
