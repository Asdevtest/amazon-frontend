import {Avatar, Paper, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {getFreelancerDashboardCardConfig} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardButtons} from '@components/dashboards/dashboard-buttons'
import {DashboardOneLineCardsList} from '@components/dashboards/dashboard-one-line-cards-list'
// import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {UserLink} from '@components/user-link'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {FreelancerDashboardViewModel} from './freelacer-dashboard-view.model'
import {styles} from './freelancer-dashboard-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class FreelancerDashboardViewRaw extends Component {
  viewModel = new FreelancerDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, onTriggerDrawerOpen, userInfo, dashboardData, onClickInfoCardViewMode} = this.viewModel
    const {classes: classNames} = this.props
    const freelancerButtonsRoutes = {
      notifications: '',
      messages: 'messages',
    }
    return (
      <React.Fragment>
        <Navbar
          user={userInfo}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey.Dashboard)} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen}>
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
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const FreelancerDashboardView = withStyles(FreelancerDashboardViewRaw, styles)
