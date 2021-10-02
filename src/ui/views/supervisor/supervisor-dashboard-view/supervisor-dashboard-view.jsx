import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getSupervisorDashboardCardConfig, SupervisorDashboardCardDataKey} from '@constants/dashboard-configs'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboard-balance'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {SupervisorDashboardViewModel} from './supervisor-dashboard-view.model'
import {styles} from './supervisor-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').supervisorDashboardView
const dashboardCardConfig = getSupervisorDashboardCardConfig(textConsts)

const navbarActiveCategory = 0

@observer
export class SupervisorDashboardViewRaw extends Component {
  viewModel = new SupervisorDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {balance, drawerOpen, onTriggerDrawerOpen} = this.viewModel
    const {classes: classNames} = this.props
    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.SUPERVISOR}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.SUPERVISOR}
          >
            <MainContent>
              <DashboardBalance balance={balance} />
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.amountWithLabelCardsWrapper}>
                <Grid container justify="center" spacing={3}>
                  {this.renderDashboardCards()}
                </Grid>
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  renderDashboardCards = () =>
    dashboardCardConfig.map((item, index) => (
      <Grid key={index} item xs={6} lg={4}>
        <DashboardInfoCard
          value={this.getCardValueByDataKey(item.dataKey)}
          title={item.title}
          color={item.color}
          route={item.route || false}
          onClickViewMore={this.viewModel.onClickInfoCardViewMode}
        />
      </Grid>
    ))

  getCardValueByDataKey = dataKey => {
    const {productsVacant, producatsMy, paymentsMy} = this.viewModel
    switch (dataKey) {
      case SupervisorDashboardCardDataKey.NEW_PRODUCTS:
        return productsVacant.length
      case SupervisorDashboardCardDataKey.ME_CHECKING:
        return producatsMy.length
      case SupervisorDashboardCardDataKey.ACCURED:
        return paymentsMy.length
      case SupervisorDashboardCardDataKey.FINES:
        return 'N/A'
    }
  }
}

export const SupervisorDashboardView = withStyles(styles)(SupervisorDashboardViewRaw)
