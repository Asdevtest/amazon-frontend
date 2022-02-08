import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getBuyerDashboardCardConfig, BuyerDashboardCardDataKey} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardInfoCard} from '@components/dashboards/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/buyerAvatar.jpg'
import {BuyerDashboardViewModel} from './buyer-dashboard-view.model'
import {styles} from './buyer-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').buyerDashboardView
const dashboardCardConfig = getBuyerDashboardCardConfig(textConsts)

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class BuyerDashboardViewRaw extends Component {
  viewModel = new BuyerDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {balance, drawerOpen, onTriggerDrawerOpen} = this.viewModel
    const {classes: classNames} = this.props
    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.BUYER}
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
            curUserRole={UserRole.BUYER}
            avatarSrc={avatar}
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
    const {productsVacant, productsMy, ordersMy, ordersVacant} = this.viewModel
    switch (dataKey) {
      case BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_SUPERVISOR:
        return productsVacant.length
      case BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT:
        return 0
      case BuyerDashboardCardDataKey.ME_PRODUCTS:
        return productsMy.length
      case BuyerDashboardCardDataKey.ME_ORDERS:
        return ordersMy.length
      case BuyerDashboardCardDataKey.FREE_ORDERS:
        return ordersVacant.length
    }
  }
}

export const BuyerDashboardView = withStyles(styles)(BuyerDashboardViewRaw)
