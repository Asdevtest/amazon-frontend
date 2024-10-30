import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { styles } from './buyer-notifications-view.style'

import { BuyerNotificationsViewModel } from './buyer-notifications-view.model'

export const BuyerNotificationsViewRaw = props => {
  const viewModel = useMemo(() => new BuyerNotificationsViewModel({ history: props.history }), [])
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Notifications'])}</p>

      <div className={styles.btnsWrapper}>
        <CustomButton onClick={viewModel.onClickIdeasNotifications}>{t(TranslationKey['On ideas'])}</CustomButton>
      </div>
    </>
  )
}

export const BuyerNotificationsView = withStyles(observer(BuyerNotificationsViewRaw), styles)
