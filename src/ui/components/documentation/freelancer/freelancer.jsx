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
          ref={refs.freelancerMainRef}
          img={FreelancerMainPage}
          link={'https://stoic-northcutt-f04ad5.netlify.app/freelancer/dashboard'}
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
          ref={refs.freelancerOrdersRef}
          img={FreelancerOrders}
          link={'https://stoic-northcutt-f04ad5.netlify.app/freelancer/orders'}
          title={texts.ru.freelancerComponent.myOrders}
        />
      </Section>

      <Section>
        <SectionMain
          ref={refs.freelancerSettingsRef}
          img={FreelancerSettings}
          link={'https://stoic-northcutt-f04ad5.netlify.app/freelancer/settings'}
          title={texts.ru.freelancerComponent.settings}
        />
      </Section>
    </React.Fragment>
  )
}
