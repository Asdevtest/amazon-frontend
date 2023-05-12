// import {Typography} from '@mui/material'
import {Paper, Typography} from '@mui/material'

import {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {Button} from '@components/shared/buttons/button'
import {Field} from '@components/shared/field'
import {Input} from '@components/shared/input'
import {OnOffSelector} from '@components/shared/selectors/on-off-selector'

// import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
// import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
import {t} from '@utils/translations'

import {AdminTechnicalViewModel} from './admin-technical-view.model'
import {styles} from './admin-technical-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_SETTINGS

@observer
export class AdminTechnicalViewRaw extends Component {
  viewModel = new AdminTechnicalViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, serverWorkOn, onBackBtn, onTriggerTechnicalWorks} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={this.onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={this.onTriggerDrawer} title={t(TranslationKey.Settings)}>
            <MainContent>
              <div className={classNames.mainWrapper}>
                <div className={classNames.btnsWrapper}>
                  <Button className={classNames.backBtn} onClick={onBackBtn}>
                    {t(TranslationKey.Back)}
                  </Button>
                </div>

                <Field
                  oneLine
                  labelClasses={classNames.fieldLabel}
                  label={t(TranslationKey['Access for users'])}
                  inputComponent={
                    <div className={classNames.selectorMainWrapper}>
                      <div className={classNames.selectorWrapper}>
                        <OnOffSelector value={serverWorkOn} onClick={onTriggerTechnicalWorks} />
                      </div>

                      <Typography className={classNames.noticeAttention}>
                        {t(TranslationKey['Notify users before disconnecting']) + '!'}
                      </Typography>
                    </div>
                  }
                />
                <div className={classNames.noticesWrapper}>
                  <Paper className={classNames.noticesPaper}>
                    <Field
                      labelClasses={classNames.fieldLabel}
                      label={t(TranslationKey['Notice of technical work'])}
                      inputComponent={
                        <div className={classNames.technicalWorkNoticeWrapper}>
                          <Typography className={classNames.technicalWorkNoticeAttention}>
                            {t(TranslationKey.Attention).toUpperCase() + '!'}
                          </Typography>

                          <Typography className={classNames.technicalWorkNoticeText}>
                            {t(
                              TranslationKey[
                                'We recommend that you save any unsaved changes and finish the work.\n When the technical work begins, all unsaved changes will be lost.\n\nWe apologize for the inconvenience!'
                              ],
                            )}
                          </Typography>

                          <Button disabled>{t(TranslationKey['Send a notice'])}</Button>
                        </div>
                      }
                    />
                  </Paper>

                  <Paper className={classNames.noticesPaper}>
                    <Field
                      labelClasses={classNames.fieldLabel}
                      label={t(TranslationKey['Notice to users'])}
                      inputComponent={
                        <div className={classNames.usersNoticeWrapper}>
                          <Input
                            multiline
                            minRows={6}
                            maxRows={6}
                            placeholder={t(TranslationKey['Enter notification text'])}
                            className={classNames.usersNoticeInput}
                          />

                          <Button disabled>{t(TranslationKey.Send)}</Button>
                        </div>
                      }
                    />
                  </Paper>
                </div>
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </>
    )
  }
}

export const AdminTechnicalView = withStyles(AdminTechnicalViewRaw, styles)
