import {Component} from 'react'

import {Button, Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {clientBalance, clientUsername, clientDashboardData} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './client-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientDashboardView

const dashboardSections = [
  {
    key: 'inventory',
    title: textConsts.inventoryTitle,
    items: [
      {
        key: 'productsInInventory',
        title: textConsts.itemsInInventorySectionItemTitle,
        color: '#20a8d8',
      },
      {
        key: 'fullCostOfWarehouse',
        title: textConsts.fullCostOfWarehouseSectionItemTitle,
        color: '#63c2de',
      },
      {
        key: 'repurchaseItems',
        title: textConsts.repurchaseItemsSectionItemTitle,
        color: '#4dbd74',
      },
    ],
  },
  {
    key: 'order',
    title: textConsts.ordersTitle,
    items: [
      {
        key: 'notPaidOrders',
        title: textConsts.notPaidOrdersSectionItemTitle,
        color: '#ffc107',
      },
      {
        key: 'paidOrders',
        title: textConsts.paidOrdersSectionItemTitle,
        color: '#f86c6b',
      },
      {
        key: 'canceledOrders',
        title: textConsts.canceledOrdersSectionItemTitle,
        color: '#20a8d8',
      },
    ],
  },
  {
    key: 'exchange',
    title: textConsts.exchangeTitle,
    items: [
      {
        key: 'soldItemsOnExchange',
        title: textConsts.soldItemsOnExchangeSectionItemTitle,
        color: '#63c2de',
      },
      {
        key: 'accuredToReserchers',
        title: textConsts.accuredToReserchersSectionItemTitle,
        color: '#4dbd74',
      },
      {
        key: 'disputsForProducts',
        title: textConsts.disputsForProductsSectionItemTitle,
        color: '#f86c6b',
      },
    ],
  },
]

export class ClientDashboardViewRaw extends Component {
  state = {
    activeCategory: 0,
    activeSubCategory: null,
    drawerOpen: false,
    dashboardData: clientDashboardData,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state
    const {classes} = this.props

    return (
      <>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.client}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={this.onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            handlerTriggerDrawer={this.onTriggerDrawer}
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
              {this.renderInfoCarsSections(dashboardSections)}
            </MainContent>
          </Appbar>
        </Main>
      </>
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

  renderInfoCard = (infoCardData, section) => {
    const {dashboardData} = this.state
    return (
      <Grid key={`dashboardSection_${section.key}_infoCard_${infoCardData.key}`} item lg={4} sm={6} xs={12}>
        <DashboardInfoCard
          color={infoCardData.color}
          title={infoCardData.title}
          value={dashboardData[infoCardData.key]}
          onClickViewMore={this.onClickViewMore}
        />
      </Grid>
    )
  }

  onChangeCategory = index => {
    this.setState({activeCategory: index})
  }

  onChangeSubCategory = index => {
    this.setState({activeSubCategory: index})
  }

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }

  onClickViewMore = () => {
    const {history} = this.props
    history.push('/client/inventory')
  }
}

const ClientDashboardView = withStyles(styles)(ClientDashboardViewRaw)

export {ClientDashboardView}
