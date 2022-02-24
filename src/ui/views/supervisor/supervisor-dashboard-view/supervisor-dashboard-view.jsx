import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getSupervisorDashboardCardConfig, SupervisorDashboardCardDataKey} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardInfoCard} from '@components/dashboards/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed} from '@utils/text'

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
    const {userInfo, drawerOpen, onTriggerDrawerOpen} = this.viewModel
    const {classes: classNames} = this.props
    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <DashboardBalance user={userInfo} />
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

      case SupervisorDashboardCardDataKey.SUPLIER_FOUNDED:
        return producatsMy.filter(prod => prod.status === ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER]).length

      case SupervisorDashboardCardDataKey.COMPLETE_SUCCESS:
        return producatsMy.filter(prod => prod.status === ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]).length

      case SupervisorDashboardCardDataKey.PURCHASED:
        return producatsMy.filter(prod => prod.status === ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT]).length

      case SupervisorDashboardCardDataKey.ACCURED:
        return toFixed(
          paymentsMy.reduce((ac, el) => el.sum > 0 && ac + el.sum, 0),
          2,
        )

      case SupervisorDashboardCardDataKey.FINES:
        return toFixed(
          paymentsMy.reduce((ac, el) => el.sum < 0 && ac + el.sum, 0),
          2,
        )
    }
  }
}

export const SupervisorDashboardView = withStyles(styles)(SupervisorDashboardViewRaw)
