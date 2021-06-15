import React, {Component} from 'react'

import {Box, Typography, Paper, Checkbox} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRoleCodeMap, UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/researcherAvatar.jpg'
import {ResearcherSettingsViewModel} from './researcher-settings-view.model'
import {styles} from './researcher-settings-view.style'

const textConsts = getLocalizedTexts(texts, 'en').researcherSettingsView

const navbarActiveCategory = 2

@observer
class ResearcherSettingsViewRaw extends Component {
  viewModel = new ResearcherSettingsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getUserInfo()
  }

  render() {
    const {drawerOpen, formFields, onTriggerDrawerOpen, onChangeFormFields, onClickSaveUserInfo, onClickCancelEditing} =
      this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.RESEARCHER}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              {formFields ? (
                <Paper className={this.props.classes.card}>
                  <Typography variant="h3">{textConsts.mainTitle}</Typography>
                  <Field
                    label={textConsts.fieldName}
                    placeholder={'researcher'}
                    value={formFields.name}
                    onChange={onChangeFormFields('name')}
                  />
                  <Field
                    label={textConsts.fieldEmail}
                    placeholder={'researcher@test.com'}
                    value={formFields.email}
                    onChange={onChangeFormFields('email')}
                  />
                  <Field label={textConsts.fieldRate} value={formFields.rate} onChange={onChangeFormFields('rate')} />
                  <Field
                    disabled
                    label={textConsts.fieldRole}
                    placeholder={'Researcher'}
                    value={UserRoleCodeMap[formFields.role]}
                    onChange={onChangeFormFields('role')}
                  />
                  <Field
                    label={textConsts.fieldFba}
                    inputComponent={<Checkbox value={formFields.fba} onChange={onChangeFormFields('fba')} />}
                  />
                  <Box className={this.props.classes.buttonsBox}>
                    <Button className={this.props.classes.button} onClick={onClickSaveUserInfo}>
                      {textConsts.saveBtn}
                    </Button>
                    <SuccessButton onClick={onClickCancelEditing}>{textConsts.cancelBtn}</SuccessButton>
                  </Box>
                </Paper>
              ) : undefined}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ResearcherSettingsView = withStyles(styles)(ResearcherSettingsViewRaw)
