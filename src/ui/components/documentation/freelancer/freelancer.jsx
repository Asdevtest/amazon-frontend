import React from 'react'

import {Box, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Section, SectionMain} from '@components/section-documentation'

import FreelancerMainPage from './assets/freelancer/FreelancerMainPage.jpg'
import FreelancerMainPageRedirect from './assets/freelancer/FreelancerMainPageRedirect.jpg'
import FreelancerOrders from './assets/freelancer/FreelancerOrders.jpg'
import FreelancerSettings from './assets/freelancer/FreelancerSettings.jpg'
import {useStyles} from './freelancer.style'

export const Freelancer = ({refs}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Section>
        <SectionMain
          img={FreelancerMainPage}
          link={'https://stoic-northcutt-f04ad5.netlify.app/freelancer/dashboard'}
          ref={refs.freelancerMainRef}
          title={texts.ru.freelancerComponent.mainPage}
        />

        <Typography className={classes.marginTop}>{texts.ru.freelancerComponent.moveToMyOrders}</Typography>
        <Typography>{texts.ru.freelancerComponent.viewMore}</Typography>

        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={FreelancerMainPageRedirect} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          img={FreelancerOrders}
          link={'https://stoic-northcutt-f04ad5.netlify.app/freelancer/orders'}
          ref={refs.freelancerOrdersRef}
          title={texts.ru.freelancerComponent.myOrders}
        />
      </Section>

      <Section>
        <SectionMain
          img={FreelancerSettings}
          link={'https://stoic-northcutt-f04ad5.netlify.app/freelancer/settings'}
          ref={refs.freelancerSettingsRef}
          title={texts.ru.freelancerComponent.settings}
        />
      </Section>
    </React.Fragment>
  )
}
