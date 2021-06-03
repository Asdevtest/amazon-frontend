import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {SUPERVISOR_DASHBOARD_LIST} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {DashboardCard} from '@components/freelancer/dashboard-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './freelancerAvatar.jpg'
import {styles} from './supervisor-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').freelancerDashboardView

export class SupervisorDashboardViewRaw extends Component {
  state = {
    activeCategory: 0,
    activeSubCategory: null,
    drawerOpen: true,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state
    const {classes: classNames} = this.props
    return (
      <React.Fragment>
        <Navbar
          activeItem={activeCategory}
          setItem={this.onChangeCategory}
          activeSubItem={activeSubCategory}
          categoriesList={categoriesList.freelancer}
          setSubItem={this.onChangeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={this.onChangeDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            username={textConsts.appBarUsername}
            setDrawerOpen={this.onChangeDrawerOpen}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.amountWithLabelCardsWrapper}>
                <Grid container justify="center" spacing={3}>
                  {SUPERVISOR_DASHBOARD_LIST.map((item, index) => (
                    <Grid key={index} item xs={6} lg={4}>
                      <DashboardCard
                        value={item.value}
                        title={item.title}
                        color={item.color}
                        route="/freelancer/products"
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  onChangeCategory = category => {
    this.setState({activeCategory: category})
  }

  onChangeSubCategory = subCategory => {
    this.setState({activeSubCategory: subCategory})
  }

  onChangeDrawerOpen = drawerOpenStatus => {
    this.setState({drawerOpen: drawerOpenStatus})
  }
}

export const SupervisorDashboardView = withStyles(styles)(SupervisorDashboardViewRaw)
