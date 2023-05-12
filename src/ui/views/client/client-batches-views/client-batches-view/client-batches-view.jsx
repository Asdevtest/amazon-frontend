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

import {ClientBatchesViewModel} from './client-batches-view.model'
import {styles} from './client-batches-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_BATCHES

@observer
class ClientBatchesViewRaw extends Component {
  viewModel = new ClientBatchesViewModel({history: this.props.history})

  render() {
    const {drawerOpen, onChangeDrawerOpen, onClickAwaitingSend, onClickSentBatches} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onChangeDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Batches)} setDrawerOpen={onChangeDrawerOpen}>
            <MainContent>
              <div>
                <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Batches'])}</Typography>

                <div className={classNames.btnsWrapper}>
                  <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickAwaitingSend}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Awaiting send'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button>

                  <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickSentBatches}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Sent boxes'])}</Typography>
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

export const ClientBatchesView = withStyles(ClientBatchesViewRaw, styles)
