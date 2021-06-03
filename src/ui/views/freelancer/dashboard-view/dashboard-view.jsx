import React, {useState} from 'react'

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

export const DashboardView = () => {
  const [activeCategory, setCategory] = useState(0)
  const [activeSubCategory, setSubCategory] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(true)

  return (
    <React.Fragment>
      <Navbar
        activeItem={activeCategory}
        setItem={setCategory}
        activeSubItem={activeSubCategory}
        categoriesList={categoriesList.freelancer}
        setSubItem={setSubCategory}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        user={textConsts.appUser}
      />
      <Main>
        <Appbar
          title={textConsts.appBarTitle}
          notificationCount={2}
          avatarSrc={avatar}
          username={textConsts.appBarUsername}
          setDrawerOpen={setDrawerOpen}
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
