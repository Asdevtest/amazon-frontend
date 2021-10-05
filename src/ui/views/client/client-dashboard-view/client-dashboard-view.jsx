import React, {Component} from 'react'

import {Button, Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getClientDashboardCardConfig, ClientDashboardCardDataKey} from '@constants/dashboard-configs'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboard-balance'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientDashboardViewModel} from './client-dashboard-view.model'
import {styles} from './client-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientDashboardView

const dashboardCardConfig = getClientDashboardCardConfig(textConsts)
const navbarActiveCategory = 0

@observer
export class ClientDashboardViewRaw extends Component {
  viewModel = new ClientDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {balance, drawerOpen, onTriggerDrawer} = this.viewModel
    const {classes} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            curUserRole={UserRole.CLIENT}
            setDrawerOpen={onTriggerDrawer}
            title={textConsts.appbarTitle}
            balance={balance}
          >
            <MainContent>
              <div className={classes.mb5}>
                <DashboardBalance balance={balance} />
                <Button disableElevation className={classes.mr2} color="primary" variant="contained">
                  {textConsts.withdraw}
                </Button>
                <Button disableElevation color="primary">
                  {textConsts.replenish}
                </Button>
              </div>
              {this.renderInfoCardsSections(dashboardCardConfig)}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  renderInfoCardsSections = sections =>
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
        route={infoCardData.route || false}
        value={this.getCardValueByDataKey(infoCardData.dataKey)}
        onClickViewMore={this.viewModel.onClickInfoCardViewMode}
      />
    </Grid>
  )

  getCardValueByDataKey = dataKey => {
    const {productsPaid, orders} = this.viewModel
    switch (dataKey) {
      case ClientDashboardCardDataKey.IN_INVENTORY:
        return productsPaid.length
      case ClientDashboardCardDataKey.FULL_COST:
        return 'N/A'
      case ClientDashboardCardDataKey.REPURCHASE_ITEMS:
        return 'N/A'
      case ClientDashboardCardDataKey.NOT_PAID_ORDERS:
        return 'N/A'
      case ClientDashboardCardDataKey.PAID_ORDERS:
        return orders.length
      case ClientDashboardCardDataKey.CANCELED_ORDERS:
        return 'N/A'
      case ClientDashboardCardDataKey.SOLD_ITEMS_ON_EXCHANGE:
        return 'N/A'
      case ClientDashboardCardDataKey.ACCURED_TO_RESERCHERS:
        return 'N/A'
      case ClientDashboardCardDataKey.DISPUTS_FOR_PRODUCTS:
        return 'N/A'
    }
  }
}

const ClientDashboardView = withStyles(styles)(ClientDashboardViewRaw)

export {ClientDashboardView}
