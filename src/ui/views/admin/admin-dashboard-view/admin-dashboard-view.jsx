import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {AdminDashboardCardDataKey, getAdminDashboardCardConfig} from '@constants/dashboard-configs'
import {adminUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/adminAvatar.jpg'
import {AdminDashboardViewModel} from './admin-dashboard-view.model'
import {styles} from './admin-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminDashboardView

const dashboardCardConfig = getAdminDashboardCardConfig(textConsts)
const navbarActiveCategory = 0
export class AdminDashboardViewRaw extends Component {
  viewModel = new AdminDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, onChangeTriggerDrawerOpen} = this.viewModel
    const {classes: classNames} = this.props
    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onChangeTriggerDrawerOpen}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            handlerTriggerDrawer={onChangeTriggerDrawerOpen}
            title={textConsts.appbarTitle}
            username={adminUsername}
          >
            <MainContent>
              <Typography paragraph variant="h5">
                {textConsts.mainTitle}
              </Typography>
              <Grid container className={classNames.dashboardCardWrapper} justify="center" spacing={3}>
                {this.renderInfoCardsSections(dashboardCardConfig)}
              </Grid>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  renderInfoCardsSections = sections =>
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

  renderInfoCard = (infoCardData, section) => (
    <Grid key={`dashboardSection_${section.dataKey}_infoCard_${infoCardData.dataKey}`} item lg={4} sm={6} xs={12}>
      <DashboardInfoCard
        color={infoCardData.color}
        title={infoCardData.title}
        value={this.getCardValueByDataKey(infoCardData.dataKey)}
      />
    </Grid>
  )

  getCardValueByDataKey = dataKey => {
    const {productsWaitingToChek, productsOnCheking} = this.viewModel
    switch (dataKey) {
      case AdminDashboardCardDataKey.EXCHANGE_WAITING_TO_CHECK:
        return productsWaitingToChek.length
      case AdminDashboardCardDataKey.EXCHANGE_BEING_CHECKED:
        return productsOnCheking.length
      case AdminDashboardCardDataKey.EXCHANGE_CHECKED:
        return 11
      case AdminDashboardCardDataKey.EXCHANGE_REJECTED:
        return 100

      case AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_RESEARCHERS:
        return 301
      case AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_SUPERVISORS:
        return 120
      case AdminDashboardCardDataKey.FINANCES_SUPERVISORS_FINES:
        return 132
      case AdminDashboardCardDataKey.FINANCES_RESEARCHERS_FINES:
        return 312
    }
  }
}

export const AdminDashboardView = withStyles(styles)(AdminDashboardViewRaw)
