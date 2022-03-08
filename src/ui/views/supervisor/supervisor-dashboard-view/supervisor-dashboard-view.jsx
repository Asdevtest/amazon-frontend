import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getSupervisorDashboardCardConfig} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {SupervisorDashboardViewModel} from './supervisor-dashboard-view.model'
import {styles} from './supervisor-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').supervisorDashboardView
const dashboardCardConfig = getSupervisorDashboardCardConfig(textConsts)

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
    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <DashboardBalance user={userInfo} />

              <div className={classNames.amountWithLabelCardsWrapper}>
                <SectionalDashboard
                  config={dashboardCardConfig}
                  valuesData={dashboardData}
                  onClickViewMore={onClickInfoCardViewMode}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const SupervisorDashboardView = withStyles(styles)(SupervisorDashboardViewRaw)
