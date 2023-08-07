import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Avatar, Paper } from '@mui/material'

import { getAdminDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { AdminDashboardViewModel } from './admin-dashboard-view.model'
import { styles } from './admin-dashboard-view.style'

export const AdminDashboardViewRaw = props => {
  const [viewModel] = useState(() => new AdminDashboardViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const buyerButtonsRoutes = {
    notifications: '',
    messages: 'messages',
    settings: 'settings',
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
        </Paper>

        {getAdminDashboardCardConfig().map(item => (
          <DashboardOneLineCardsList
            key={item.key}
            config={item}
            configSubTitle={t(TranslationKey['Accrual data'])}
            valuesData={viewModel.dashboardData}
            onClickViewMore={viewModel.onClickInfoCardViewMode}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export const AdminDashboardView = withStyles(observer(AdminDashboardViewRaw), styles)
