import React, {Component} from 'react'

import {Box, Typography, Paper, Checkbox} from '@material-ui/core'
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

import avatar from '../assets/freelancerAvatar.jpg'
import {styles} from './settings-view.style'

const textConsts = getLocalizedTexts(texts, 'en').freelancerSettingsView

class FreelancerSettingsViewRaw extends Component {
  state = {
    activeCategory: 2,
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
              <Paper className={this.props.classes.card}>
                <Typography variant="h3">{textConsts.mainTitle}</Typography>
                <Field label={textConsts.fieldName} placeholder={'researcher'} />
                <Field label={textConsts.fieldEmail} placeholder={'researcher@test.com'} />
                <Field label={textConsts.fieldRate} />
                <Field label={textConsts.fieldRole} placeholder={'Researcher'} />
                <Field label={textConsts.fieldFba} inputComponent={<Checkbox />} />
                <Box className={this.props.classes.buttonsBox}>
                  <Button className={this.props.classes.button}>{textConsts.saveBtn}</Button>
                  <SuccessButton>{textConsts.cancelBtn}</SuccessButton>
                </Box>
              </Paper>
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

export const FreelancerSettingsView = withStyles(styles)(FreelancerSettingsViewRaw)
