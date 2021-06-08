import React, {Component} from 'react'

import {Button, Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getClientDashboardCardConfig, ClientDashboardCardDataKey} from '@constants/dashboard-configs'
import {clientBalance, clientUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ClientDashboardViewModel} from './client-dashboard-view.model'
import {styles} from './client-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientDashboardView

const dashboardCardConfig = getClientDashboardCardConfig(textConsts)
const navbarActiveCategory = 0

@observer
export class ClientDashboardViewRaw extends Component {
  viewModel = new ClientDashboardViewModel({history: this.props.history})
  state = {
    drawerOpen: false,
  }

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, onTriggerDrawer} = this.viewModel
    const {classes} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
          >
            <MainContent>
              <div className={classes.mb5}>
                <Typography paragraph variant="h6">
                  {textConsts.balance}
                </Typography>
                <Typography className={classes.balanceTitle}>{clientBalance}</Typography>
                <Button disableElevation className={classes.mr2} color="primary" variant="contained">
                  {textConsts.withdraw}
                </Button>
                <Button disableElevation color="primary">
                  {textConsts.replenish}
                </Button>
              </div>
              {this.renderInfoCarsSections(dashboardCardConfig)}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  renderInfoCarsSections = sections =>
    sections.map(section => (
      <div key={`dashboardSection_${section.key}`} className={this.props.classes.mb5}>
        <Typography paragraph variant="h5">
          {section.title}
        </Typography>
        <Grid container justify="center" spacing={3}>
          {section.items.map(item => this.renderInfoCard(item, section))}
        </Grid>
      </div>
    ))

  renderInfoCard = (infoCardData, section) => (
    <Grid key={`dashboardSection_${section.dataKey}_infoCard_${infoCardData.dataKey}`} item lg={4} sm={6} xs={12}>
      <DashboardInfoCard
        color={infoCardData.color}
        title={infoCardData.title}
        value={this.getCardValueByDataKey(infoCardData.dataKey)}
        onClickViewMore={this.onClickViewMore}
      />
    </Grid>
  )

  getCardValueByDataKey = dataKey => {
    const {productsMy} = this.viewModel
    switch (dataKey) {
      case ClientDashboardCardDataKey.IN_INVENTORY:
        return productsMy.length
      case ClientDashboardCardDataKey.FULL_COST:
        return 1
      case ClientDashboardCardDataKey.REPURCHASE_ITEMS:
        return 2
      case ClientDashboardCardDataKey.NOT_PAID_ORDERS:
        return 3
      case ClientDashboardCardDataKey.PAID_ORDERS:
        return 4
      case ClientDashboardCardDataKey.CANCELED_ORDERS:
        return 5
      case ClientDashboardCardDataKey.SOLD_ITEMS_ON_EXCHANGE:
        return 6
      case ClientDashboardCardDataKey.ACCURED_TO_RESERCHERS:
        return 7
      case ClientDashboardCardDataKey.DISPUTS_FOR_PRODUCTS:
        return 8
    }
  }

  onClickViewMore = () => {
    const {history} = this.props
    history.push('/client/inventory')
  }
}

const ClientDashboardView = withStyles(styles)(ClientDashboardViewRaw)

export {ClientDashboardView}
