import React, {Component} from 'react'

import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getClientDashboardCardConfig} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {UserMoneyTransferModal} from '@components/modals/user-money-transfer-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

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

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={textConsts.appbarTitle} balance={userInfo.balance}>
            <MainContent>
              <div className={classes.mb5}>
                <DashboardBalance user={userInfo} />
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

              <SectionalDashboard
                config={dashboardCardConfig}
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
