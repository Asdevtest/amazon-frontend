import React from 'react'

import {Box, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Section, SectionMain} from '@components/section-documentation'

import SupervisorMainPage from './assets/supervisor/SupervisorMainPage.jpg'
import SupervisorMainPageRedirect from './assets/supervisor/SupervisorMainPageRedirect.jpg'
import SupervisorProducts from './assets/supervisor/SupervisorProducts.jpg'
import SupervisorReadyToCheck from './assets/supervisor/SupervisorReadyToCheck.jpg'
import SupervisorSettings from './assets/supervisor/SupervisorSettings.jpg'
import {useStyles} from './supervisor.style'

export const Supervisor = ({refs}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Section>
        <SectionMain
          ref={refs.supervisorMainRef}
          img={SupervisorMainPage}
          link={'https://stoic-northcutt-f04ad5.netlify.app/supervisor/dashboard'}
          title={texts.ru.supervisorComponent.mainPage}
        />

        <Typography className={classes.marginTop}>{texts.ru.supervisorComponent.makeMovePages}</Typography>
        <ul>
          <Typography component="li">{texts.ru.supervisorComponent.prepareToSend}</Typography>
          <Typography component="li">{texts.ru.supervisorComponent.myGoods}</Typography>
        </ul>
        <Typography>{texts.ru.supervisorComponent.viewMore}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={SupervisorMainPageRedirect} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          ref={refs.supervisorReadyToCheckRef}
          img={SupervisorReadyToCheck}
          link={'https://stoic-northcutt-f04ad5.netlify.app/supervisor/ready-to-check'}
          title={texts.ru.supervisorComponent.supervisorPrepares}
        />
      </Section>

      <Section>
        <SectionMain
          ref={refs.supervisorProductsRef}
          img={SupervisorProducts}
          link={'https://stoic-northcutt-f04ad5.netlify.app/supervisor/products'}
          title={texts.ru.supervisorComponent.supervisorMyGoods}
        />
      </Section>

      <Section>
        <SectionMain
          ref={refs.supervisorSettingsRef}
          img={SupervisorSettings}
          link={'https://stoic-northcutt-f04ad5.netlify.app/supervisor/settings'}
          title={texts.ru.supervisorComponent.settings}
        />
      </Section>
      <Section>
        <SectionMain
          ref={refs.supervisorSettingsRef}
          img={SupervisorSettings}
          link={'https://stoic-northcutt-f04ad5.netlify.app/supervisor/product'}
          title={texts.ru.supervisorComponent.productVar1}
        />
      </Section>
    </React.Fragment>
  )
}
