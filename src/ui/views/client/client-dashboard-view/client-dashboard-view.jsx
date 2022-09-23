import React, {Component} from 'react'

import {Avatar, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getClientDashboardCardConfig} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardButtons} from '@components/dashboards/dashboard-buttons'
import {DashboardWidgetsCard} from '@components/dashboards/dashboard-widgets-card'
// import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {UserMoneyTransferModal} from '@components/modals/user-money-transfer-modal'
import {Navbar} from '@components/navbar'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {ClientDashboardViewModel} from './client-dashboard-view.model'
import {styles} from './client-dashboard-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class ClientDashboardViewRaw extends Component {
  viewModel = new ClientDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      userInfo,
      dashboardData,
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
    const clientButtonsRoutes = {
      notifications: 'notifications/orders-notifications',
      messages: 'messages',
    }
    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Dashboard)} balance={userInfo.balance}>
            <MainContent>
              <Paper className={classes.userInfoWrapper}>
                <div className={classes.userInfoLeftWrapper}>
                  <Avatar src={getUserAvatarSrc(userInfo._id)} className={classes.cardImg} />
                  <div className={classes.balanceWrapper}>
                    <DashboardBalance user={userInfo} title={t(TranslationKey['My balance'])} />

                    <div className={classes.buttonWrapper}>
                      <Button
                        tooltipInfoContent={t(TranslationKey['Contact to request a withdrawal'])}
                        className={classes.button}
                        color="primary"
                        variant="contained"
                        onClick={onClickWithdrawMoney}
                      >
                        {t(TranslationKey.Deposit)}
                        <img src="/assets/icons/white-plus.svg" className={classes.icon} />
                      </Button>
                      <Button
                        tooltipInfoContent={t(TranslationKey['Contact to request a deposit'])}
                        className={[classes.button, classes.withdrawBtn]}
                        color="primary"
                        variant="text"
                        onClick={onClickAddMoney}
                      >
                        {t(TranslationKey.Withdraw)}
                      </Button>
                    </div>
                  </div>
                </div>

                <DashboardButtons user={userInfo} routes={clientButtonsRoutes} />
              </Paper>
              <DashboardWidgetsCard
                config={getClientDashboardCardConfig()}
                valuesData={dashboardData}
                onClickViewMore={onClickInfoCardViewMode}
              />
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
}

export const ClientDashboardView = withStyles(styles)(ClientDashboardViewRaw)
