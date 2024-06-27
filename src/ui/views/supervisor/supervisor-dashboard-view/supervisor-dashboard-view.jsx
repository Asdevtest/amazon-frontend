import { observer } from 'mobx-react'
import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useStyles } from './supervisor-dashboard-view.style'

import { getSupervisorDashboardCardConfig } from './supervisor-dashboard-view.config'
import { SupervisorDashboardViewModel } from './supervisor-dashboard-view.model'

export const SupervisorDashboardView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new SupervisorDashboardViewModel({ history }))

  return (
    <>
      <div className={styles.userInfoWrapper}>
        <div className={styles.userInfoLeftWrapper}>
          <img src={getUserAvatarSrc(viewModel.userInfo._id)} className={styles.cardImg} />

          <DashboardBalance user={viewModel.userInfo} />
        </div>

        <DashboardButtons user={viewModel.userInfo} routes={viewModel.supervisorButtonsRoutes} />

        {viewModel.userInfo.masterUser ? (
          <div className={styles.masterUserWrapper}>
            <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

            <UserLink
              blackText
              name={viewModel.userInfo.masterUser?.name}
              userId={viewModel.userInfo.masterUser?._id}
            />
          </div>
        ) : null}
      </div>

      {getSupervisorDashboardCardConfig().map(item => (
        <DashboardOneLineCardsList
          key={item.key}
          config={item}
          valuesData={viewModel.dashboardData}
          onClickViewMore={viewModel.onClickInfoCardViewMode}
        />
      ))}
    </>
  )
})
