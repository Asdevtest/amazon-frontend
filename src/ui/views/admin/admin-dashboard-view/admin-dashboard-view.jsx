import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getAdminDashboardCardConfig} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

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
    const {drawerOpen, onChangeTriggerDrawerOpen, onClickInfoCardViewMode, dashboardData} = this.viewModel
    // const {classes: classNames} = this.props
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
              <SectionalDashboard
                config={getAdminDashboardCardConfig()}
                valuesData={dashboardData}
                onClickViewMore={onClickInfoCardViewMode}
              />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const AdminDashboardView = withStyles(styles)(AdminDashboardViewRaw)
