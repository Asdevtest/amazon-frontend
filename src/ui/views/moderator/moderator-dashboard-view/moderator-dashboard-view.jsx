import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

// import {getFreelancerDashboardCardConfig} from '@constants/dashboard-configs'
import {TranslationKey} from '@constants/translations/translation-key'

// import {DashboardBalance} from '@components/dashboards/dashboard-balance'
// import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {MainContent} from '@components/layout/main-content'
import {UserLink} from '@components/user/user-link'

import {t} from '@utils/translations'

import {ModeratorDashboardViewModel} from './moderator-dashboard-view.model'
import {styles} from './moderator-dashboard-view.style'

@observer
export class ModeratorDashboardViewRaw extends Component {
  viewModel = new ModeratorDashboardViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    const {userInfo} = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <Typography className={classNames.inProcess}>{'В разработке...'}</Typography>

          {userInfo.masterUser && (
            <div className={classNames.masterUserWrapper}>
              <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

              <UserLink blackText name={userInfo.masterUser?.name} userId={userInfo.masterUser?._id} />
            </div>
          )}
        </MainContent>
      </React.Fragment>
    )
  }
}

export const ModeratorDashboardView = withStyles(ModeratorDashboardViewRaw, styles)
