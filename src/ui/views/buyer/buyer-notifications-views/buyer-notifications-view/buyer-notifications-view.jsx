import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { ArrowRightIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { styles } from './buyer-notifications-view.style'

import { BuyerNotificationsViewModel } from './buyer-notifications-view.model'

export const BuyerNotificationsViewRaw = props => {
  const [viewModel] = useState(() => new BuyerNotificationsViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <div>
      <Typography className={styles.title}>{t(TranslationKey['Choose a section in Notifications'])}</Typography>

      <div className={styles.btnsWrapper}>
        <Button
          className={styles.button}
          color="primary"
          variant={ButtonVariant.OUTLINED}
          onClick={viewModel.onClickIdeasNotifications}
        >
          <div className={styles.btnTextWrapper}>
            <Typography className={styles.btnText}>{t(TranslationKey['On ideas'])}</Typography>
            <ArrowRightIcon color="primary" />
          </div>
        </Button>
      </div>
    </div>
  )
}

export const BuyerNotificationsView = withStyles(observer(BuyerNotificationsViewRaw), styles)
