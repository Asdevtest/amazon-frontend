import {Avatar, Paper, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {UserRoleCodeMap} from '@constants/keys/user-roles'
import {getResearcherDashboardCardConfig} from '@constants/navigation/dashboard-configs'
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

import {checkIsResearcher} from '@utils/checks'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {ResearcherDashboardViewModel} from './researcher-dashboard-view.model'
import {styles} from './researcher-dashboard-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class ResearcherDashboardViewRaw extends Component {
  viewModel = new ResearcherDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {userInfo, drawerOpen, dashboardData, onTriggerDrawerOpen, onClickInfoCardViewMode} = this.viewModel
    const {classes: classNames} = this.props
    const researcherButtonsRoutes = {
      notifications: '',
      messages: 'messages',
    }
    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Dashboard)} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <Paper className={classNames.userInfoWrapper}>
                <div className={classNames.userInfoLeftWrapper}>
                  <Avatar src={getUserAvatarSrc(userInfo._id)} className={classNames.cardImg} />

                  {!checkIsResearcher(UserRoleCodeMap[userInfo.role]) && (
                    <DashboardBalance user={userInfo} title={t(TranslationKey['My balance'])} />
                  )}
                </div>

                <DashboardButtons user={userInfo} routes={researcherButtonsRoutes} />

                {userInfo.masterUser && (
                  <div className={classNames.masterUserWrapper}>
                    <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

                    <UserLink blackText name={userInfo.masterUser?.name} userId={userInfo.masterUser?._id} />
                  </div>
                )}
              </Paper>
              {getResearcherDashboardCardConfig().map(item => (
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

export const ResearcherDashboardView = withStyles(ResearcherDashboardViewRaw, styles)
