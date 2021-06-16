import {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {AdminDashboardCardDataKey, getAdminDashboardCardConfig} from '@constants/dashboard-configs'
import {adminUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './admin-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminDashboardView

const dashboardCardConfig = getAdminDashboardCardConfig(textConsts)
const navbarActiveCategory = 0
export class AdminDashboardViewRaw extends Component {
  state = {
    drawerOpen: false,
  }

  render() {
    const {drawerOpen} = this.state
    const {classes: classNames} = this.props
    return (
      <>
        <Navbar
          activeCategory={navbarActiveCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={this.onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            handlerTriggerDrawer={this.onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={adminUsername}
          >
            <MainContent>
              <Typography paragraph variant="h5">
                {textConsts.mainTitle}
              </Typography>
              <Grid container className={classNames.dashboardCardWrapper} justify="center" spacing={3}>
                {this.renderDashboardCards()}
              </Grid>
            </MainContent>
          </Appbar>
        </Main>
      </>
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
      case AdminDashboardCardDataKey.EXCHANGE_WAITING_TO_CHECK:
        return 0
      case AdminDashboardCardDataKey.EXCHANGE_BEING_CHECKED:
        return 10
      case AdminDashboardCardDataKey.EXCHANGE_CHECKED:
        return 11
      case AdminDashboardCardDataKey.EXCHANGE_REJECTED:
        return 100

      case AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_RESEARCHERS:
        return 301
      case AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_SUPERVISORS:
        return 120
      case AdminDashboardCardDataKey.FINANCES_SUPERVISORS_FINES:
        return 132
      case AdminDashboardCardDataKey.FINANCES_RESEARCHERS_FINES:
        return 312
    }
  }

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }

  onClickViewMore = () => {
    alert('Redirect to section')
  }
}

export const AdminDashboardView = withStyles(styles)(AdminDashboardViewRaw)
