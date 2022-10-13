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

import {UsersViewModel} from './users-view.model'
import {styles} from './users-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_USERS

@observer
class UsersViewRaw extends Component {
  viewModel = new UsersViewModel({history: this.props.history})

  render() {
    const {drawerOpen, onChangeDrawerOpen, onClickSubUsers} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onChangeDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Users)} setDrawerOpen={onChangeDrawerOpen}>
            <MainContent>
              <div>
                <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Users'])}</Typography>

                <div className={classNames.btnsWrapper}>
                  <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickSubUsers}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['My users'])}</Typography>
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

export const UsersView = withStyles(UsersViewRaw, styles)
