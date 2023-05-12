import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

// import {getFreelancerDashboardCardConfig} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/layout/appbar'
// import {DashboardBalance} from '@components/dashboards/dashboard-balance'
// import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {UserLink} from '@components/user/user-link'

import {t} from '@utils/translations'

import {ModeratorDashboardViewModel} from './moderator-dashboard-view.model'
import {styles} from './moderator-dashboard-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class ModeratorDashboardViewRaw extends Component {
  viewModel = new ModeratorDashboardViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    const {drawerOpen, onTriggerDrawerOpen, userInfo} = this.viewModel
    const {classes: classNames} = this.props

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
              <Typography className={classNames.inProcess}>{'В разработке...'}</Typography>

              {userInfo.masterUser && (
                <div className={classNames.masterUserWrapper}>
                  <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

                  <UserLink blackText name={userInfo.masterUser?.name} userId={userInfo.masterUser?._id} />
                </div>
              )}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ModeratorDashboardView = withStyles(ModeratorDashboardViewRaw, styles)
