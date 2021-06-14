import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getWarehouseDashboardCardConfig, WarehouseDashboardCardDataKey} from '@constants/dashboard-configs'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
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

  render() {
    const {drawerOpen, onChangeTriggerDrawerOpen} = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.WAREHOUSE}
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
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeTriggerDrawerOpen}
          >
            <MainContent>
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
    switch (dataKey) {
      case WarehouseDashboardCardDataKey.VACANT_TASKS:
        return 0
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
