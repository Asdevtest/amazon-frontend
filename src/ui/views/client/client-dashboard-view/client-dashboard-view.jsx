import {cx} from '@emotion/css'
import {Avatar, Paper, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

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

export const ClientDashboardViewRaw = props => {
  const [viewModel] = useState(() => new ClientDashboardViewModel({history: props.history}))
  const {classes} = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const clientButtonsRoutes = {
    notifications: 'notifications/orders-notifications',
    messages: 'messages',
  }

  return (
    <React.Fragment>
      <MainContent>
        <Paper className={classes.userInfoWrapper}>
          <div className={classes.userInfoLeftWrapper}>
            <Avatar src={getUserAvatarSrc(viewModel.userInfo._id)} className={classes.cardImg} />
            <div className={classes.balanceWrapper}>
              <DashboardBalance user={viewModel.userInfo} title={t(TranslationKey['My balance'])} />

              <div className={classes.buttonWrapper}>
                <Button
                  tooltipInfoContent={t(TranslationKey['Contact to request a withdrawal'])}
                  className={classes.button}
                  onClick={viewModel.onClickWithdrawMoney}
                >
                  {t(TranslationKey.Deposit)}
                  <img src="/assets/icons/white-plus.svg" className={classes.icon} />
                </Button>
                <Button
                  tooltipInfoContent={t(TranslationKey['Contact to request a deposit'])}
                  className={cx(classes.button, classes.withdrawBtn)}
                  variant="text"
                  onClick={viewModel.onClickAddMoney}
                >
                  {t(TranslationKey.Withdraw)}
                </Button>
              </div>
            </div>
          </div>

          <DashboardButtons user={viewModel.userInfo} routes={clientButtonsRoutes} />

          {viewModel.userInfo.masterUser && (
            <div className={classes.masterUserWrapper}>
              <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

              <UserLink
                blackText
                name={viewModel.userInfo.masterUser?.name}
                userId={viewModel.userInfo.masterUser?._id}
              />
            </div>
          )}
        </Paper>
        <DashboardWidgetsCard
          config={getClientDashboardCardConfig()}
          valuesData={viewModel.dashboardData}
          onClickViewMore={viewModel.onClickInfoCardViewMode}
          onClickAddProduct={viewModel.onClickAddProduct}
        />
      </MainContent>
      <UserMoneyTransferModal
        openModal={viewModel.showTransferModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showTransferModal')}
        isWithdraw={viewModel.transferModalSettings.isWithdraw}
      />
    </React.Fragment>
  )
}

export const ClientDashboardView = withStyles(observer(ClientDashboardViewRaw), styles)
