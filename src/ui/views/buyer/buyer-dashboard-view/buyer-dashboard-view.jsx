import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Avatar, Paper, Typography } from '@mui/material'

import { getBuyerDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'
// import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { BuyerDashboardViewModel } from './buyer-dashboard-view.model'
import { styles } from './buyer-dashboard-view.style'

export const BuyerDashboardViewRaw = props => {
  const [viewModel] = useState(() => new BuyerDashboardViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const buyerButtonsRoutes = {
    notifications: 'notifications/ideas-notifications',
    messages: 'messages',
  }

  return (
    <React.Fragment>
      <div>
        <Paper className={classNames.userInfoWrapper}>
          <div className={classNames.userInfoLeftWrapper}>
            <Avatar src={getUserAvatarSrc(viewModel.userInfo._id)} className={classNames.cardImg} />

            <DashboardBalance user={viewModel.userInfo} title={t(TranslationKey['My balance'])} />
          </div>

          <DashboardButtons user={viewModel.userInfo} routes={buyerButtonsRoutes} />

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
        </Paper>
        {viewModel.currentData &&
          getBuyerDashboardCardConfig().map(item => (
            <DashboardOneLineCardsList
              key={item.key}
              config={item}
              valuesData={viewModel.currentData}
              onClickViewMore={viewModel.onClickInfoCardViewMode}
            />
          ))}
      </div>
    </React.Fragment>
  )
}

export const BuyerDashboardView = withStyles(observer(BuyerDashboardViewRaw), styles)
