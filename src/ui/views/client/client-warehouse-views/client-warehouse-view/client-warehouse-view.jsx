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

import {ClientWarehouseViewModel} from './client-warehouse-view.model'
import {styles} from './client-warehouse-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_WAREHOUSE

@observer
class ClientWarehouseViewRaw extends Component {
  viewModel = new ClientWarehouseViewModel({history: this.props.history})

  render() {
    const {drawerOpen, onChangeDrawerOpen, onClickInStock, onClickReadyToBatch} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onChangeDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Warehouse)} setDrawerOpen={onChangeDrawerOpen}>
            <MainContent>
              <div>
                <Typography className={classNames.title}>
                  {t(TranslationKey['Choose a section in Warehouse'])}
                </Typography>

                <div className={classNames.btnsWrapper}>
                  <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickInStock}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Boxes in stock'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button>

                  <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickReadyToBatch}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Boxes ready to send'])}</Typography>
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

export const ClientWarehouseView = withStyles(ClientWarehouseViewRaw, styles)
