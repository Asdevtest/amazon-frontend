import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getSupervisorDashboardCardConfig, SupervisorDashboardCardDataKey} from '@constants/dashboard-configs'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/researcherAvatar.jpg'
import {SupervisorDashboardViewModel} from './supervisor-dashboard-view.model'
import {styles} from './supervisor-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').researcherDashboardView
const dashboardCardConfig = getSupervisorDashboardCardConfig(textConsts)

const navbarActiveCategory = 0

@observer
export class SupervisorDashboardViewRaw extends Component {
  viewModel = new SupervisorDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, onTriggerDrawerOpen} = this.viewModel
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
            avatarSrc={avatar}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
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
          route="/supervisor/products"
          onClickViewMore={this.onClickInfoCardViewMode}
        />
      </Grid>
    ))

  onClickInfoCardViewMode = () => {}

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
        return 0
    }
  }
}

export const SupervisorDashboardView = withStyles(styles)(SupervisorDashboardViewRaw)
