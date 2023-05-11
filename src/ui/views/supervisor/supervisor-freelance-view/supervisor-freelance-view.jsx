import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {SupervisorFreelanceViewModel} from './supervisor-freelance-view.model'
import {styles} from './supervisor-freelance-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DEALS

@observer
class SupervisorFreelanceViewRaw extends Component {
  viewModel = new SupervisorFreelanceViewModel({history: this.props.history})

  render() {
    const {drawerOpen, onChangeDrawerOpen, onClickVacantDeals, onClickDealsOnReview} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onChangeDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Freelance)} setDrawerOpen={onChangeDrawerOpen}>
            <MainContent>
              <div>
                <Typography className={classNames.title}>
                  {t(TranslationKey['Choose a section in Freelance'])}
                </Typography>

                <div className={classNames.btnsWrapper}>
                  <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickVacantDeals}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Vacant deals'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button>

                  <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickDealsOnReview}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Deals on review'])}</Typography>
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

export const SupervisorFreelanceView = withStyles(SupervisorFreelanceViewRaw, styles)
