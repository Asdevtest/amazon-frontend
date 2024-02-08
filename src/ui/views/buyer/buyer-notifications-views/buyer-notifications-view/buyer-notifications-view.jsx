import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { styles } from './buyer-notifications-view.style'

import { BuyerNotificationsViewModel } from './buyer-notifications-view.model'

export const BuyerNotificationsViewRaw = props => {
  const [viewModel] = useState(() => new BuyerNotificationsViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <div>
        <div>
          <Typography className={styles.title}>{t(TranslationKey['Choose a section in Notifications'])}</Typography>

          <div className={styles.btnsWrapper}>
            {/*
                  <Button
                    className={styles.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickTariffsNotifications}
                  >
                    <div className={styles.btnTextWrapper}>
                      <Typography className={styles.btnText}>{t(TranslationKey['On boxes tariffs'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button> */}

            <Button
              className={styles.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickIdeasNotifications}
            >
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['On ideas'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const BuyerNotificationsView = withStyles(observer(BuyerNotificationsViewRaw), styles)
