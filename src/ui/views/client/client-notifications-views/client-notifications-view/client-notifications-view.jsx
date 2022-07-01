import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {ClientNotificationsViewModel} from './client-notifications-view.model'
import {styles} from './client-notifications-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS

@observer
class ClientNotificationsViewRaw extends Component {
  viewModel = new ClientNotificationsViewModel({history: this.props.history})

  render() {
    const {
      drawerOpen,
      onChangeDrawerOpen,
      onClickOrdersNotifications,
      onClickBoxesNotifications,
      onClickTariffsNotifications,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onChangeDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Notifications)} setDrawerOpen={onChangeDrawerOpen}>
            <MainContent>
              <div>
                <Typography className={classNames.title}>
                  {t(TranslationKey['Choose a section in Notifications'])}
                </Typography>

                <div className={classNames.btnsWrapper}>
                  <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickOrdersNotifications}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['On orders'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button>

                  <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickBoxesNotifications}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['On boxes'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button>

                  <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickTariffsNotifications}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['On boxes tariffs'])}</Typography>
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

export const ClientNotificationsView = withStyles(styles)(ClientNotificationsViewRaw)
