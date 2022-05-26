import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {getResearcherDashboardCardConfig} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {SectionalDashboard} from '@components/dashboards/sectional-dashboard'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

import {ResearcherDashboardViewModel} from './researcher-dashboard-view.model'
import {styles} from './researcher-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').researcherDashboardView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class ResearcherDashboardViewRaw extends Component {
  viewModel = new ResearcherDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {userInfo, drawerOpen, dashboardData, onTriggerDrawerOpen, onClickInfoCardViewMode} = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar
            title={t(TranslationKey.Dashboard)}
            notificationCount={2}
            drawerOpen={drawerOpen}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <DashboardBalance user={userInfo} />

              <div className={classNames.amountWithLabelCardsWrapper}>
                <SectionalDashboard
                  config={getResearcherDashboardCardConfig(textConsts)}
                  valuesData={dashboardData}
                  onClickViewMore={onClickInfoCardViewMode}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ResearcherDashboardView = withStyles(styles)(ResearcherDashboardViewRaw)
