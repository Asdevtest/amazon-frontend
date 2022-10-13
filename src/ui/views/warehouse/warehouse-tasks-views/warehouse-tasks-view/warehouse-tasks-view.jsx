import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {WarehouseTasksViewModel} from './warehouse-tasks-view.model'
import {styles} from './warehouse-tasks-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TASKS

@observer
class WarehouseTasksViewRaw extends Component {
  viewModel = new WarehouseTasksViewModel({history: this.props.history})

  render() {
    const {
      drawerOpen,
      onChangeDrawerOpen,
      onClickVacantTask,
      onClickMyTasks,
      onClickCompletedTasks,
      onClickCanceledTasks,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onChangeDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Tasks)} setDrawerOpen={onChangeDrawerOpen}>
            <MainContent>
              <div>
                <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Tasks'])}</Typography>

                <div className={classNames.btnsWrapper}>
                  <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickVacantTask}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['New tasks'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button>

                  <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickMyTasks}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['My tasks'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button>

                  <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickCompletedTasks}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Completed tasks'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button>

                  <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickCanceledTasks}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Canceled tasks'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button>
                </div>
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const WarehouseTasksView = withStyles(WarehouseTasksViewRaw, styles)
