import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {MainContent} from '@components/layout/main-content'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {BuyerNotificationsViewModel} from './buyer-notifications-view.model'
import {styles} from './buyer-notifications-view.style'

@observer
class BuyerNotificationsViewRaw extends Component {
  viewModel = new BuyerNotificationsViewModel({history: this.props.history})

  render() {
    const {
      // onClickTariffsNotifications,
      onClickIdeasNotifications,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <div>
            <Typography className={classNames.title}>
              {t(TranslationKey['Choose a section in Notifications'])}
            </Typography>

            <div className={classNames.btnsWrapper}>
              {/*
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
                  </Button> */}

              <Button
                className={classNames.button}
                color="primary"
                variant="outlined"
                onClick={onClickIdeasNotifications}
              >
                <div className={classNames.btnTextWrapper}>
                  <Typography className={classNames.btnText}>{t(TranslationKey['On ideas'])}</Typography>
                  <ArrowRightAltIcon color="primary" />
                </div>
              </Button>
            </div>
          </div>
        </MainContent>
      </React.Fragment>
    )
  }
}

export const BuyerNotificationsView = withStyles(BuyerNotificationsViewRaw, styles)
