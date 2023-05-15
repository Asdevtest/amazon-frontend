import {Avatar, Paper, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {getBuyerDashboardCardConfig} from '@constants/navigation/dashboard-configs'
import {TranslationKey} from '@constants/translations/translation-key'

import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardButtons} from '@components/dashboards/dashboard-buttons'
import {DashboardOneLineCardsList} from '@components/dashboards/dashboard-one-line-cards-list'
// import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {MainContent} from '@components/layout/main-content'
import {UserLink} from '@components/user/user-link'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {BuyerDashboardViewModel} from './buyer-dashboard-view.model'
import {styles} from './buyer-dashboard-view.style'

@observer
export class BuyerDashboardViewRaw extends Component {
  viewModel = new BuyerDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {dashboardData, userInfo, onClickInfoCardViewMode} = this.viewModel
    const {classes: classNames} = this.props
    const buyerButtonsRoutes = {
      notifications: 'notifications/ideas-notifications',
      messages: 'messages',
    }
    return (
      <React.Fragment>
        <MainContent>
          <Paper className={classNames.userInfoWrapper}>
            <div className={classNames.userInfoLeftWrapper}>
              <Avatar src={getUserAvatarSrc(userInfo._id)} className={classNames.cardImg} />

              <DashboardBalance user={userInfo} title={t(TranslationKey['My balance'])} />
            </div>

            <DashboardButtons user={userInfo} routes={buyerButtonsRoutes} />

            {userInfo.masterUser && (
              <div className={classNames.masterUserWrapper}>
                <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

                <UserLink blackText name={userInfo.masterUser?.name} userId={userInfo.masterUser?._id} />
              </div>
            )}
          </Paper>
          {getBuyerDashboardCardConfig().map(item => (
            <DashboardOneLineCardsList
              key={item.key}
              config={item}
              valuesData={dashboardData}
              onClickViewMore={onClickInfoCardViewMode}
            />
          ))}
          {/* <div className={classNames.amountWithLabelCardsWrapper}>
                <SectionalDashboard
                  config={getBuyerDashboardCardConfig()}
                  valuesData={dashboardData}
                  onClickViewMore={onClickInfoCardViewMode}
                />
              </div> */}
        </MainContent>
      </React.Fragment>
    )
  }
}

export const BuyerDashboardView = withStyles(BuyerDashboardViewRaw, styles)
