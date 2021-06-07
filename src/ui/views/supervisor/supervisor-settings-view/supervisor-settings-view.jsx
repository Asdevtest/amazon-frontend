import React, {Component} from 'react'

import {Box, Typography, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'
import {styles} from './supervisor-settings-view.style'

const textConsts = getLocalizedTexts(texts, 'en').supervisorSettingsView

export class SupervisorSettingsViewRaw extends Component {
  state = {
    activeCategory: 3,
    activeSubCategory: 0,
    drawerOpen: false,
  }
  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state
    const {classes: classNames} = this.props
    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          setItem={this.onChangeCategory}
          activeSubItem={activeSubCategory}
          categoriesList={categoriesList.supervisor}
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
            setDrawerOpen={this.setDrawerOpen}
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
                  <SuccessButton success>{textConsts.cancelBtn}</SuccessButton>
                </Box>
              </Paper>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  onChangeCategory = categoryIndex => {
    this.setState({activeCategory: categoryIndex})
  }

  onChangeSubCategory = subCategory => {
    this.setState({setSubCategory: subCategory})
  }

  onChangeDrawerOpen = value => {
    this.setState({drawerOpen: value})
  }
}

export const SupervisorSettingsView = withStyles(styles)(SupervisorSettingsViewRaw)
