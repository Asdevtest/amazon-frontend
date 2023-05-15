import {cx} from '@emotion/css'
import {Avatar, Paper, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {getClientDashboardCardConfig} from '@constants/navigation/dashboard-configs'
import {TranslationKey} from '@constants/translations/translation-key'

import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardButtons} from '@components/dashboards/dashboard-buttons'
import {DashboardWidgetsCard} from '@components/dashboards/dashboard-widgets-card'
// import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {MainContent} from '@components/layout/main-content'
import {UserMoneyTransferModal} from '@components/modals/user-money-transfer-modal'
import {Button} from '@components/shared/buttons/button'
import {UserLink} from '@components/user/user-link'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {ClientDashboardViewModel} from './client-dashboard-view.model'
import {styles} from './client-dashboard-view.style'

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
      showTransferModal,
      transferModalSettings,

      onTriggerOpenModal,
      onClickAddMoney,
      onClickWithdrawMoney,
      onClickInfoCardViewMode,
      onClickAddProduct,
    } = this.viewModel
    const {classes} = this.props
    const clientButtonsRoutes = {
      notifications: 'notifications/orders-notifications',
      messages: 'messages',
    }
    return (
      <React.Fragment>
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
                    onClick={onClickWithdrawMoney}
                  >
                    {t(TranslationKey.Deposit)}
                    <img src="/assets/icons/white-plus.svg" className={classes.icon} />
                  </Button>
                  <Button
                    tooltipInfoContent={t(TranslationKey['Contact to request a deposit'])}
                    className={cx(classes.button, classes.withdrawBtn)}
                    variant="text"
                    onClick={onClickAddMoney}
                  >
                    {t(TranslationKey.Withdraw)}
                  </Button>
                </div>
              </div>
            </div>

            <DashboardButtons user={userInfo} routes={clientButtonsRoutes} />

            {userInfo.masterUser && (
              <div className={classes.masterUserWrapper}>
                <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

                <UserLink blackText name={userInfo.masterUser?.name} userId={userInfo.masterUser?._id} />
              </div>
            )}
          </Paper>
          <DashboardWidgetsCard
            config={getClientDashboardCardConfig()}
            valuesData={dashboardData}
            onClickViewMore={onClickInfoCardViewMode}
            onClickAddProduct={onClickAddProduct}
          />
        </MainContent>
        <UserMoneyTransferModal
          openModal={showTransferModal}
          setOpenModal={() => onTriggerOpenModal('showTransferModal')}
          isWithdraw={transferModalSettings.isWithdraw}
        />
      </React.Fragment>
    )
  }
}

export const ClientDashboardView = withStyles(ClientDashboardViewRaw, styles)
