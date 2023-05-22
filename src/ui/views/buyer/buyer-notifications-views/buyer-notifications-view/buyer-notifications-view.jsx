import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { BuyerNotificationsViewModel } from './buyer-notifications-view.model'
import { styles } from './buyer-notifications-view.style'

export const BuyerNotificationsViewRaw = props => {
  const [viewModel] = useState(() => new BuyerNotificationsViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <MainContent>
        <div>
          <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Notifications'])}</Typography>

          <div className={classNames.btnsWrapper}>
            {/*
                  <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickTariffsNotifications}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['On boxes tariffs'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button> */}

            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickIdeasNotifications}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['On ideas'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const BuyerNotificationsView = withStyles(observer(BuyerNotificationsViewRaw), styles)
