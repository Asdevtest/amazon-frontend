import { Typography } from '@mui/material'

import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { MainContent } from '@components/layout/main-content'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { ModeratorDashboardViewModel } from './moderator-dashboard-view.model'
import { styles } from './moderator-dashboard-view.style'

export const ModeratorDashboardViewRaw = props => {
  const [viewModel] = useState(() => new ModeratorDashboardViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <MainContent>
        <Typography className={classNames.inProcess}>{'В разработке...'}</Typography>

        {viewModel.userInfo.masterUser && (
          <div className={classNames.masterUserWrapper}>
            <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

            <UserLink
              blackText
              name={viewModel.userInfo.masterUser?.name}
              userId={viewModel.userInfo.masterUser?._id}
            />
          </div>
        )}
      </MainContent>
    </React.Fragment>
  )
}

export const ModeratorDashboardView = withStyles(observer(ModeratorDashboardViewRaw), styles)
