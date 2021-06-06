import React, {useState} from 'react'

import {Box, Typography, Paper} from '@material-ui/core'

import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/freelancerAvatar.jpg'
import {useClassNames} from './settings-view.style'

const textConsts = getLocalizedTexts(texts, 'en').freelancerSettingsView

export const SettingsView = () => {
  const classNames = useClassNames()
  const [activeCategory, setCategory] = useState(2)
  const [activeSubCategory, setSubCategory] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

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
            <Paper className={classNames.card}>
              <Typography variant="h3">{textConsts.mainTitle}</Typography>
              <Field title={textConsts.fieldName} placeholder={'researcher'} />
              <Field title={textConsts.fieldEmail} placeholder={'researcher@test.com'} />
              <Field title={textConsts.fieldRate} />
              <Field title={textConsts.fieldRole} placeholder={'Researcher'} />
              <Field title={textConsts.fieldFba} />
              <Box className={classNames.buttonsBox}>
                <Button className={classNames.button}>{textConsts.saveBtn}</Button>
                <Button success>{textConsts.cancelBtn}</Button>
              </Box>
            </Paper>
          </MainContent>
        </Appbar>
      </Main>
    </React.Fragment>
  )
}
