import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { styles } from './buyer-notifications-view.style'

import { BuyerNotificationsViewModel } from './buyer-notifications-view.model'

export const BuyerNotificationsViewRaw = props => {
  const [viewModel] = useState(() => new BuyerNotificationsViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Notifications'])}</p>

      <div className={styles.btnsWrapper}>
        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickIdeasNotifications}>
          {t(TranslationKey['On ideas'])}
        </Button>
      </div>
    </>
  )
}

export const BuyerNotificationsView = withStyles(observer(BuyerNotificationsViewRaw), styles)
