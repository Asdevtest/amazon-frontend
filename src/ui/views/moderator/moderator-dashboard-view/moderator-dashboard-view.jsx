import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

// import {getFreelancerDashboardCardConfig} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
// import {DashboardBalance} from '@components/dashboards/dashboard-balance'
// import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

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
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ModeratorDashboardView = withStyles(ModeratorDashboardViewRaw, styles)
