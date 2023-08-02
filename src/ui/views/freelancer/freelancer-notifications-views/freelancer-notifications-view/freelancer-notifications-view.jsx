import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'

import { FreelancerNotificationsViewModel } from '@views/freelancer/freelancer-notifications-views/freelancer-notifications-view/freelancer-notifications-view.model'

import { t } from '@utils/translations'

import { styles } from './freelancer-notifications-view.styles'

export const FreelancerNotificationsViewRaw = props => {
  const [viewModel] = useState(() => new FreelancerNotificationsViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <MainContent>
        <div>
          <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Notifications'])}</Typography>

          <div className={classNames.btnsWrapper}>
            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickFreelanceNotifications}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey.Freelance)}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const FreelancerNotificationsView = withStyles(observer(FreelancerNotificationsViewRaw), styles)
