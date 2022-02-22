import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getWarehouseDashboardCardConfig} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseDashboardViewModel} from './warehouse-dashboard-view.model'
import {styles} from './warehouse-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseDashboardView
const dashboardCardConfig = getWarehouseDashboardCardConfig(textConsts)
const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class WarehouseDashboardViewRaw extends Component {
  viewModel = new WarehouseDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {dashboardData, userInfo, drawerOpen, onChangeTriggerDrawerOpen, onClickInfoCardViewMode} = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc=""
            setDrawerOpen={onChangeTriggerDrawerOpen}
          >
            <MainContent>
              <DashboardBalance user={userInfo} />

              <SectionalDashboard
                config={dashboardCardConfig}
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

export const WarehouseDashboardView = withStyles(styles)(WarehouseDashboardViewRaw)
