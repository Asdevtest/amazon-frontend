import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Paper, Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { getResearcherDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'
import { UserLink } from '@components/user/user-link'

import { checkIsResearcher } from '@utils/checks'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { styles } from './researcher-dashboard-view.style'

import { ResearcherDashboardViewModel } from './researcher-dashboard-view.model'

export const ResearcherDashboardViewRaw = props => {
  const [viewModel] = useState(() => new ResearcherDashboardViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const researcherButtonsRoutes = {
    notifications: '',
    messages: 'messages',
  }

  return (
    <React.Fragment>
      <div>
        <Paper className={classNames.userInfoWrapper}>
          <div className={classNames.userInfoLeftWrapper}>
            <img src={getUserAvatarSrc(viewModel.userInfo._id)} className={classNames.cardImg} />

            {!checkIsResearcher(UserRoleCodeMap[viewModel.userInfo.role]) && (
              <DashboardBalance user={viewModel.userInfo} title={t(TranslationKey['My balance'])} />
            )}
          </div>

          <DashboardButtons user={viewModel.userInfo} routes={researcherButtonsRoutes} />

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
        {getResearcherDashboardCardConfig().map(item => (
          <DashboardOneLineCardsList
            key={item.key}
            config={item}
            valuesData={viewModel.dashboardData}
            onClickViewMore={viewModel.onClickInfoCardViewMode}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export const ResearcherDashboardView = withStyles(observer(ResearcherDashboardViewRaw), styles)
