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

import {ClientFreelanceViewModel} from './client-freelance-view.model'
import {styles} from './client-freelance-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS

@observer
class ClientFreelanceViewRaw extends Component {
  viewModel = new ClientFreelanceViewModel({history: this.props.history})

  render() {
    const {drawerOpen, onChangeDrawerOpen, onClickMyRequests, onClickServiceExchange} = this.viewModel

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
                  <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickMyRequests}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['My requests'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button>

                  {/* <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickVacRequests}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Vacant requests'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button> */}
                  {/* <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickMyProposals}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['My proposals'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button> */}

                  <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickServiceExchange}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Service exchange'])}</Typography>
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

export const ClientFreelanceView = withStyles(ClientFreelanceViewRaw, styles)
