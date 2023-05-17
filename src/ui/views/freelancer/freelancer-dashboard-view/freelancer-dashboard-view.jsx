import {Avatar, Paper, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {getFreelancerDashboardCardConfig} from '@constants/navigation/dashboard-configs'
import {TranslationKey} from '@constants/translations/translation-key'

import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardButtons} from '@components/dashboards/dashboard-buttons'
import {DashboardOneLineCardsList} from '@components/dashboards/dashboard-one-line-cards-list'
// import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {MainContent} from '@components/layout/main-content'
import {UserLink} from '@components/user/user-link'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {FreelancerDashboardViewModel} from './freelacer-dashboard-view.model'
import {styles} from './freelancer-dashboard-view.style'

@observer
export class FreelancerDashboardViewRaw extends Component {
  viewModel = new FreelancerDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {userInfo, dashboardData, onClickInfoCardViewMode} = this.viewModel
    const {classes: classNames} = this.props
    const freelancerButtonsRoutes = {
      notifications: '',
      messages: 'messages',
    }
    return (
      <React.Fragment>
        <MainContent>
          <Paper className={classNames.userInfoWrapper}>
            <div className={classNames.userInfoLeftWrapper}>
              <Avatar src={getUserAvatarSrc(userInfo._id)} className={classNames.cardImg} />

              <DashboardBalance user={userInfo} title={t(TranslationKey['My balance'])} />
            </div>

            <DashboardButtons user={userInfo} routes={freelancerButtonsRoutes} />

            {userInfo.masterUser && (
              <div className={classNames.masterUserWrapper}>
                <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

                <UserLink blackText name={userInfo.masterUser?.name} userId={userInfo.masterUser?._id} />
              </div>
            )}
          </Paper>
          {getFreelancerDashboardCardConfig().map(item => (
            <DashboardOneLineCardsList
              key={item.key}
              config={item}
              configSubTitle={t(TranslationKey['Accrual data'])}
              valuesData={dashboardData}
              onClickViewMore={onClickInfoCardViewMode}
            />
          ))}
        </MainContent>
      </React.Fragment>
    )
  }
}

export const FreelancerDashboardView = withStyles(FreelancerDashboardViewRaw, styles)
