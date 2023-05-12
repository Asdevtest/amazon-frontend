import {Avatar, Paper, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {getSupervisorDashboardCardConfig} from '@constants/navigation/dashboard-configs'
import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardButtons} from '@components/dashboards/dashboard-buttons'
import {DashboardOneLineCardsList} from '@components/dashboards/dashboard-one-line-cards-list'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {UserLink} from '@components/user/user-link'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {SupervisorDashboardViewModel} from './supervisor-dashboard-view.model'
import {styles} from './supervisor-dashboard-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class SupervisorDashboardViewRaw extends Component {
  viewModel = new SupervisorDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {userInfo, drawerOpen, dashboardData, onTriggerDrawerOpen, onClickInfoCardViewMode} = this.viewModel
    const {classes: classNames} = this.props
    const supervisorButtonsRoutes = {
      notifications: '',
      messages: 'messages',
      settings: 'settings',
    }
    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Dashboard)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <Paper className={classNames.userInfoWrapper}>
                <div className={classNames.userInfoLeftWrapper}>
                  <Avatar src={getUserAvatarSrc(userInfo._id)} className={classNames.cardImg} />

                  <DashboardBalance user={userInfo} title={t(TranslationKey['My balance'])} />
                </div>

                <DashboardButtons user={userInfo} routes={supervisorButtonsRoutes} />

                {userInfo.masterUser && (
                  <div className={classNames.masterUserWrapper}>
                    <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

                    <UserLink blackText name={userInfo.masterUser?.name} userId={userInfo.masterUser?._id} />
                  </div>
                )}
              </Paper>
              {getSupervisorDashboardCardConfig().map(item => (
                <DashboardOneLineCardsList
                  key={item.key}
                  config={item}
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

export const SupervisorDashboardView = withStyles(SupervisorDashboardViewRaw, styles)
