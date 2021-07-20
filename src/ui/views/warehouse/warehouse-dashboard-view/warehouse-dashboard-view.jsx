import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getWarehouseDashboardCardConfig, WarehouseDashboardCardDataKey} from '@constants/dashboard-configs'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboard-balance'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseDashboardViewModel} from './warehouse-dashboard-view.model'
import {styles} from './warehouse-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseDashboardView
const dashboardCardConfig = getWarehouseDashboardCardConfig(textConsts)
const navbarActiveCategory = 0

@observer
export class WarehouseDashboardViewRaw extends Component {
  viewModel = new WarehouseDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {balance, drawerOpen, onChangeTriggerDrawerOpen, history} = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.STOREKEEPER}
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
            history={history}
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeTriggerDrawerOpen}
            curUserRole={UserRole.STOREKEEPER}
          >
            <MainContent>
              <DashboardBalance balance={balance} />
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <Grid container className={classNames.dashboardCardWrapper} justify="center" spacing={3}>
                {this.renderDashboardCards()}
              </Grid>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  renderDashboardCards = () =>
    dashboardCardConfig.map(item => (
      <Grid key={`dashboardCard_${item.dataKey}`} item xs={6} lg={4}>
        <DashboardInfoCard
          value={this.getCardValueByDataKey(item.dataKey)}
          title={item.title}
          color={item.color}
          // route="/researcher/products" тут пока не используется
        />
      </Grid>
    ))

  getCardValueByDataKey = dataKey => {
    const {tasksVacant, tasksMy, boxesVacant, boxesMy, batches} = this.viewModel
    switch (dataKey) {
      case WarehouseDashboardCardDataKey.VACANT_TASKS:
        return tasksVacant.length
      case WarehouseDashboardCardDataKey.TASKS_MY:
        return tasksMy.length
      case WarehouseDashboardCardDataKey.BOXES_VACANT:
        return boxesVacant.length
      case WarehouseDashboardCardDataKey.BOXES_MY:
        return boxesMy.length
      case WarehouseDashboardCardDataKey.BATCHES:
        return batches.length

      case WarehouseDashboardCardDataKey.COMPLETED_TASKS:
        return 0
      case WarehouseDashboardCardDataKey.MY_STATS:
        return 0
      case WarehouseDashboardCardDataKey.MY_PAYMENTS:
        return 0
    }
  }
}

export const WarehouseDashboardView = withStyles(styles)(WarehouseDashboardViewRaw)
