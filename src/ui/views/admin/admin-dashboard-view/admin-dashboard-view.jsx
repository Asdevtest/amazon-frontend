import {Avatar, Paper} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {getAdminDashboardCardConfig} from '@constants/navigation/dashboard-configs'
import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardButtons} from '@components/dashboards/dashboard-buttons'
import {DashboardOneLineCardsList} from '@components/dashboards/dashboard-one-line-cards-list'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {AdminDashboardViewModel} from './admin-dashboard-view.model'
import {styles} from './admin-dashboard-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class AdminDashboardViewRaw extends Component {
  viewModel = new AdminDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, onChangeTriggerDrawerOpen, onClickInfoCardViewMode, dashboardData, userInfo} = this.viewModel
    const {classes: classNames} = this.props
    const buyerButtonsRoutes = {
      notifications: '',
      messages: 'messages',
      settings: 'settings',
    }
    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeTriggerDrawerOpen}
        />
        <Main>
          <Appbar setDrawerOpen={onChangeTriggerDrawerOpen} title={t(TranslationKey.Dashboard)}>
            <MainContent>
              <Paper className={classNames.userInfoWrapper}>
                <div className={classNames.userInfoLeftWrapper}>
                  <Avatar src={getUserAvatarSrc(userInfo._id)} className={classNames.cardImg} />

                  <DashboardBalance user={userInfo} title={t(TranslationKey['My balance'])} />
                </div>

                <DashboardButtons user={userInfo} routes={buyerButtonsRoutes} />
              </Paper>
              {getAdminDashboardCardConfig().map(item => (
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

export const AdminDashboardView = withStyles(AdminDashboardViewRaw, styles)
