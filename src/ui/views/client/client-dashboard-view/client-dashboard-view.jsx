import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { Paper, Typography } from '@mui/material'

import { getClientDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardWidgetsCard } from '@components/dashboards/dashboard-widgets-card'
import { UserMoneyTransferModal } from '@components/modals/user-money-transfer-modal'
import { Button } from '@components/shared/buttons/button'
import { PlusIcon } from '@components/shared/svg-icons'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './client-dashboard-view.style'

import { ClientDashboardViewModel } from './client-dashboard-view.model'

export const ClientDashboardView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()

  const [viewModel] = useState(() => new ClientDashboardViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const clientButtonsRoutes = {
    notifications: 'notifications/orders-notifications',
    messages: 'messages',
  }

  return (
    <>
      <div>
        <Paper className={styles.userInfoWrapper}>
          <div className={styles.userInfoLeftWrapper}>
            <img src={getUserAvatarSrc(viewModel.userInfo._id)} className={styles.cardImg} />
            <div className={styles.balanceWrapper}>
              <DashboardBalance user={viewModel.userInfo} title={t(TranslationKey['My balance'])} />

              <div className={styles.buttonWrapper}>
                <Button
                  tooltipInfoContent={t(TranslationKey['Contact to request a deposit'])}
                  className={styles.button}
                  onClick={viewModel.onClickWithdrawMoney}
                >
                  <PlusIcon className={styles.icon} />
                  {t(TranslationKey.Deposit)}
                </Button>
                <Button
                  tooltipInfoContent={t(TranslationKey['Contact to request a withdrawal'])}
                  className={cx(styles.button, styles.withdrawBtn)}
                  variant={ButtonVariant.OUTLINED}
                  onClick={viewModel.onClickAddMoney}
                >
                  {t(TranslationKey.Withdraw)}
                </Button>
              </div>
            </div>
          </div>

          <DashboardButtons user={viewModel.userInfo} routes={clientButtonsRoutes} />

          {viewModel.userInfo.masterUser && (
            <div className={styles.masterUserWrapper}>
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
        />
      </div>
      <UserMoneyTransferModal
        openModal={viewModel.showTransferModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showTransferModal')}
        isWithdraw={viewModel.transferModalSettings.isWithdraw}
      />
    </>
  )
})
