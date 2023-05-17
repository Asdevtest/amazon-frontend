import {Avatar, Paper, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {getFreelancerDashboardCardConfig} from '@constants/navigation/dashboard-configs'
import {TranslationKey} from '@constants/translations/translation-key'

import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardButtons} from '@components/dashboards/dashboard-buttons'
import {DashboardOneLineCardsList} from '@components/dashboards/dashboard-one-line-cards-list'
import {MainContent} from '@components/layout/main-content'
import {UserLink} from '@components/user/user-link'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {FreelancerDashboardViewModel} from './freelacer-dashboard-view.model'
import {styles} from './freelancer-dashboard-view.style'

export const FreelancerDashboardViewRaw = props => {
  const [viewModel] = useState(() => new FreelancerDashboardViewModel({history: props.history}))
  const {classes: classNames} = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const freelancerButtonsRoutes = {
    notifications: '',
    messages: 'messages',
  }

  return (
    <React.Fragment>
      <MainContent>
        <Paper className={classNames.userInfoWrapper}>
          <div className={classNames.userInfoLeftWrapper}>
            <Avatar src={getUserAvatarSrc(viewModel.userInfo._id)} className={classNames.cardImg} />

            <DashboardBalance user={viewModel.userInfo} title={t(TranslationKey['My balance'])} />
          </div>

          <DashboardButtons user={viewModel.userInfo} routes={freelancerButtonsRoutes} />

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
        {getFreelancerDashboardCardConfig().map(item => (
          <DashboardOneLineCardsList
            key={item.key}
            config={item}
            configSubTitle={t(TranslationKey['Accrual data'])}
            valuesData={viewModel.dashboardData}
            onClickViewMore={viewModel.onClickInfoCardViewMode}
          />
        ))}
      </MainContent>
    </React.Fragment>
  )
}

export const FreelancerDashboardView = withStyles(observer(FreelancerDashboardViewRaw), styles)
