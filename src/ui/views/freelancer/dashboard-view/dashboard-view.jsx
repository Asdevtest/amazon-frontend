import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'

import {FREELANCER_DASHBOARD_LIST} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {DashboardCard} from '@components/freelancer/dashboard-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/freelancerAvatar.jpg'

const textConsts = getLocalizedTexts(texts, 'en').freelancerDashboardView

export class FreelancerDashboardView extends Component {
  state = {
    activeCategory: 0,
    activeSubCategory: 0,
    drawerOpen: false,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          setItem={this.onChangeCategory}
          activeSubCategory={activeSubCategory}
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
              <Typography variant="h4">{textConsts.mainTitle}</Typography>
              <Grid container justify="center" spacing={3}>
                {FREELANCER_DASHBOARD_LIST.map((item, index) => (
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
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
  onChangeDrawerOpen = (e, value) => {
    this.setState({drawerOpen: value})
  }

  onChangeCategory = (e, value) => {
    this.setState({activeCategory: value})
  }

  onChangeSubCategory = (e, value) => {
    this.setState({activeSubCategory: value})
  }
}
