import React, {Component} from 'react'

import {Box, Typography, Paper, Checkbox} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {SupervisorSettingsViewModel} from './supervisor-settings-view.model'
import {styles} from './supervisor-settings-view.style'

const textConsts = getLocalizedTexts(texts, 'en').supervisorSettingsView

const navbarActiveCategory = 3

@observer
export class SupervisorSettingsViewRaw extends Component {
  viewModel = new SupervisorSettingsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getUserInfo()
  }

  render() {
    const {
      drawerOpen,
      history,
      formFields,
      onChangeFormFields,
      onTriggerDrawerOpen,
      onClickSaveUserInfo,
      onClickCancelEditing,
    } = this.viewModel
    const {classes: classNames} = this.props
    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.SUPERVISOR}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            history={history}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.SUPERVISOR}
          >
            <MainContent>
              {formFields ? (
                <Paper className={classNames.card}>
                  <Typography variant="h3">{textConsts.mainTitle}</Typography>
                  <Field
                    label={textConsts.fieldName}
                    placeholder={'supervisor'}
                    value={formFields.name}
                    onChange={onChangeFormFields('name')}
                  />
                  <Field
                    label={textConsts.fieldEmail}
                    placeholder={'supervisor@test.com'}
                    value={formFields.email}
                    onChange={onChangeFormFields('email')}
                  />
                  <Field label={textConsts.fieldRate} value={formFields.rate} onChange={onChangeFormFields('rate')} />
                  <Field
                    disabled
                    label={textConsts.fieldRole}
                    placeholder={'Supervisor'}
                    value={UserRoleCodeMap[formFields.role]}
                    onChange={onChangeFormFields('role')}
                  />
                  <Field
                    label={textConsts.fieldFba}
                    inputComponent={<Checkbox value={formFields.fba} onChange={onChangeFormFields('fba')} />}
                  />
                  <Box className={classNames.buttonsBox}>
                    <Button className={classNames.button} onClick={onClickSaveUserInfo}>
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

  onChangeDrawerOpen = value => {
    this.setState({drawerOpen: value})
  }
}

export const SupervisorSettingsView = withStyles(styles)(SupervisorSettingsViewRaw)
