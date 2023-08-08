import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { ModeratorDashboardViewModel } from './moderator-dashboard-view.model'
import { styles } from './moderator-dashboard-view.style'

export const ModeratorDashboardViewRaw = props => {
  const [viewModel] = useState(() => new ModeratorDashboardViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <div>
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
      </div>
    </React.Fragment>
  )
}

export const ModeratorDashboardView = withStyles(observer(ModeratorDashboardViewRaw), styles)
