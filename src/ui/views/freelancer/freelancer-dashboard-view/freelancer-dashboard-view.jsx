import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getFreelancerDashboardCardConfig, FreelancerDashboardCardDataKey} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardInfoCard} from '@components/dashboards/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/researcherAvatar.jpg'
import {FreelancerDashboardViewModel} from './freelacer-dashboard-view.model'
import {styles} from './freelancer-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').researcherDashboardView
const dashboardCardConfig = getFreelancerDashboardCardConfig(textConsts)
const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class FreelancerDashboardViewRaw extends Component {
  viewModel = new FreelancerDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

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
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            drawerOpen={drawerOpen}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <DashboardBalance user={userInfo} />
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
          route={item.route || false}
          onClickViewMore={this.viewModel.onClickInfoCardViewMode}
        />
      </Grid>
    ))

  getCardValueByDataKey = dataKey => {
    switch (dataKey) {
      case FreelancerDashboardCardDataKey.PRODUCTS:
        return this.viewModel.productsVacant.length
      case FreelancerDashboardCardDataKey.CUR_BALANCE:
        return this.viewModel.balance
      case FreelancerDashboardCardDataKey.FINES:
        return 0
    }
  }
}

export const FreelancerDashboardView = withStyles(styles)(FreelancerDashboardViewRaw)
