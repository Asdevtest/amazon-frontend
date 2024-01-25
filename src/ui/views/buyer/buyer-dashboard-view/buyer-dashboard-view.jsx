import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Paper, Typography } from '@mui/material'

import { getBuyerDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { styles } from './buyer-dashboard-view.style'

import { BuyerDashboardViewModel } from './buyer-dashboard-view.model'

export const BuyerDashboardViewRaw = props => {
  const [viewModel] = useState(() => new BuyerDashboardViewModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const buyerButtonsRoutes = {
    notifications: 'notifications/general-notifications-view',
    messages: 'messages',
  }

  return (
    <>
      <div>
        <Paper className={styles.userInfoWrapper}>
          <div className={styles.userInfoLeftWrapper}>
            <img src={getUserAvatarSrc(viewModel.userInfo._id)} className={styles.cardImg} />

            <DashboardBalance user={viewModel.userInfo} title={t(TranslationKey['My balance'])} />
          </div>

          <DashboardButtons user={viewModel.userInfo} routes={buyerButtonsRoutes} />

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
        {viewModel.currentData &&
          getBuyerDashboardCardConfig().map(item => (
            <DashboardOneLineCardsList
              key={item.key}
              config={item}
              valuesData={viewModel.currentData}
              onClickViewMore={viewModel.onClickInfoCardViewMode}
            />
          ))}
      </div>
    </>
  )
}

export const BuyerDashboardView = withStyles(observer(BuyerDashboardViewRaw), styles)
