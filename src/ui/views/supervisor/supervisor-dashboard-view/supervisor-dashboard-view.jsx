import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Paper, Typography } from '@mui/material'

import { getSupervisorDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { styles } from './supervisor-dashboard-view.style'

import { SupervisorDashboardViewModel } from './supervisor-dashboard-view.model'

export const SupervisorDashboardViewRaw = props => {
  const [viewModel] = useState(() => new SupervisorDashboardViewModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const supervisorButtonsRoutes = {
    notifications: '',
    messages: 'messages',
    settings: 'settings',
  }

  return (
    <>
      <div>
        <Paper className={styles.userInfoWrapper}>
          <div className={styles.userInfoLeftWrapper}>
            <img src={getUserAvatarSrc(viewModel.userInfo._id)} className={styles.cardImg} />

            <DashboardBalance user={viewModel.userInfo} title={t(TranslationKey['My balance'])} />
          </div>

          <DashboardButtons user={viewModel.userInfo} routes={supervisorButtonsRoutes} />

          {viewModel.userInfo.masterUser && (
            <div className={styles.masterUserWrapper}>
              <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

              <UserLink
                blackText
                name={viewModel.userInfo.masterUser?.name}
                userId={viewModel.userInfo.masterUser?._id}
              />
            </div>
          )}
        </Paper>
        {getSupervisorDashboardCardConfig().map(item => (
          <DashboardOneLineCardsList
            key={item.key}
            config={item}
            valuesData={viewModel.dashboardData}
            onClickViewMore={viewModel.onClickInfoCardViewMode}
          />
        ))}
      </div>
    </>
  )
}

export const SupervisorDashboardView = withStyles(observer(SupervisorDashboardViewRaw), styles)
