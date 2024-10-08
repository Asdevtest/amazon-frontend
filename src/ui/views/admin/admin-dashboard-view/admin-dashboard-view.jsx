import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Paper } from '@mui/material'

import { getAdminDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { styles } from './admin-dashboard-view.style'

import { AdminDashboardViewModel } from './admin-dashboard-view.model'

export const AdminDashboardViewRaw = props => {
  const [viewModel] = useState(() => new AdminDashboardViewModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const buyerButtonsRoutes = {
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

            <DashboardBalance user={viewModel.userInfo} />
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
    </>
  )
}

export const AdminDashboardView = withStyles(observer(AdminDashboardViewRaw), styles)
