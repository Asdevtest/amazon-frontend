import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getResearcherDashboardCardConfig, ResearcherDashboardCardDataKey} from '@constants/dashboard-configs'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboard-balance'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/researcherAvatar.jpg'
import {ResearcherDashboardViewModel} from './researcher-dashboard-view.model'
import {styles} from './researcher-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').researcherDashboardView
const dashboardCardConfig = getResearcherDashboardCardConfig(textConsts)
const navbarActiveCategory = 0

@observer
export class ResearcherDashboardViewRaw extends Component {
  viewModel = new ResearcherDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {balance, drawerOpen, onTriggerDrawerOpen, history} = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.RESEARCHER}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            drawerOpen={drawerOpen}
            history={history}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.RESEARCHER}
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
          route="/researcher/products"
        />
      </Grid>
    ))

  getCardValueByDataKey = dataKey => {
    switch (dataKey) {
      case ResearcherDashboardCardDataKey.PRODUCTS:
        return this.viewModel.productsVacant.length
      case ResearcherDashboardCardDataKey.CUR_BALANCE:
        return 0
      case ResearcherDashboardCardDataKey.FINES:
        return 0
    }
  }
}

export const ResearcherDashboardView = withStyles(styles)(ResearcherDashboardViewRaw)
