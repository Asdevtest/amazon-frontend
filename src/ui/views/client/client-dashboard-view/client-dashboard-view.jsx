import React, {Component} from 'react'

import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getClientDashboardCardConfig, ClientDashboardCardDataKey} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {UserMoneyTransferModal} from '@components/modals/user-money-transfer-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientDashboardViewModel} from './client-dashboard-view.model'
import {styles} from './client-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientDashboardView

const dashboardCardConfig = getClientDashboardCardConfig(textConsts)
const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class ClientDashboardViewRaw extends Component {
  viewModel = new ClientDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      balance,
      drawerOpen,
      showTransferModal,
      transferModalSettings,
      onTriggerDrawer,
      onTriggerOpenModal,
      onClickAddMoney,
      onClickWithdrawMoney,
      onClickInfoCardViewMode,
    } = this.viewModel
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
                <Button
                  disableElevation
                  className={classes.mr2}
                  color="primary"
                  variant="contained"
                  onClick={() => onClickWithdrawMoney()}
                >
                  {textConsts.withdraw}
                </Button>
                <Button disableElevation color="primary" onClick={() => onClickAddMoney()}>
                  {textConsts.replenish}
                </Button>
              </div>

              {/* <SectionalDashboard
                config={dashboardCardConfig} 
                valueByKeyFunction={this.getCardValueByDataKey} 
                onClickViewMore={onClickInfoCardViewMode} 
              /> */}

              {SectionalDashboard(dashboardCardConfig, this.getCardValueByDataKey, onClickInfoCardViewMode)}
            </MainContent>
          </Appbar>
        </Main>
        <UserMoneyTransferModal
          openModal={showTransferModal}
          setOpenModal={() => onTriggerOpenModal('showTransferModal')}
          isWithdraw={transferModalSettings.isWithdraw}
        />
      </React.Fragment>
    )
  }

  getCardValueByDataKey = dataKey => {
    const {productsPaid, orders, boxesMy, batchesBoxes} = this.viewModel
    switch (dataKey) {
      case ClientDashboardCardDataKey.IN_INVENTORY:
        return productsPaid.length

      case ClientDashboardCardDataKey.IN_INVENTORY_BY_CLIENT:
        return productsPaid.filter(el => el.isCreatedByClient).length

      case ClientDashboardCardDataKey.REPURCHASE_ITEMS:
        return productsPaid.filter(el => !el.isCreatedByClient).length

      case ClientDashboardCardDataKey.ALL_ORDERS:
        return orders.length

      case ClientDashboardCardDataKey.PAID_ORDERS:
        return orders.filter(el =>
          [
            OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
            OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
            OrderStatusByKey[OrderStatus.IN_STOCK],
          ].includes(el.status),
        ).length

      case ClientDashboardCardDataKey.CANCELED_ORDERS:
        return orders.filter(el => el.status === OrderStatusByKey[OrderStatus.ORDER_CLOSED]).length

      case ClientDashboardCardDataKey.BOXES_IN_WAREHOUSE:
        return boxesMy.filter(el => !el.isDraft).length

      case ClientDashboardCardDataKey.READY_TO_SEND:
        return batchesBoxes?.filter(el => !el.sendToBatchComplete).length

      case ClientDashboardCardDataKey.SEND_BOXES:
        return batchesBoxes?.filter(el => el.sendToBatchComplete).length
    }
  }
}

export const ClientDashboardView = withStyles(styles)(ClientDashboardViewRaw)
