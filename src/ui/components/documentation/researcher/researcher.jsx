import React from 'react'

import {Box, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Section, SectionMain} from '@components/section-documentation'

import ResearcherMainPage from './assets/researcher/ResearcherMainPage.jpg'
import ResearcherMainPageRedirect from './assets/researcher/ResearcherMainPageRedirect.jpg'
import ResearcherOrders from './assets/researcher/ResearcherOrders.jpg'
import ResearcherSettings from './assets/researcher/ResearcherSettings.jpg'
import {useStyles} from './researcher.style'

export const Researcher = ({refs}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Section>
        <SectionMain
          ref={refs.researcherMainRef}
          img={ResearcherMainPage}
          link={'https://stoic-northcutt-f04ad5.netlify.app/researcher/dashboard'}
          title={texts.ru.researcherComponent.mainPage}
        />

        <Typography className={classes.marginTop}>{texts.ru.researcherComponent.moveToMyOrders}</Typography>
        <Typography>{texts.ru.researcherComponent.viewMore}</Typography>

        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ResearcherMainPageRedirect} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          ref={refs.researcherOrdersRef}
          img={ResearcherOrders}
          link={'https://stoic-northcutt-f04ad5.netlify.app/researcher/orders'}
          title={texts.ru.researcherComponent.myOrders}
        />
      </Section>

      <Section>
        <SectionMain
          ref={refs.researcherSettingsRef}
          img={ResearcherSettings}
          link={'https://stoic-northcutt-f04ad5.netlify.app/researcher/settings'}
          title={texts.ru.researcherComponent.settings}
        />
      </Section>
    </React.Fragment>
  )
}
