import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {MainContent} from '@components/layout/main-content'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {ClientProductExchangeViewModel} from './client-product-exchange-view.model'
import {styles} from './client-product-exchange-view.style'

@observer
class ClientProductExchangeViewRaw extends Component {
  viewModel = new ClientProductExchangeViewModel({history: this.props.history})

  render() {
    const {onClickForksExchange, onClickPrivateLabel} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <div>
            <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Freelance'])}</Typography>

            <div className={classNames.btnsWrapper}>
              <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickForksExchange}>
                <div className={classNames.btnTextWrapper}>
                  <Typography className={classNames.btnText}>{t(TranslationKey['Deal exchange'])}</Typography>
                  <ArrowRightAltIcon color="primary" />
                </div>
              </Button>

              <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickPrivateLabel}>
                <div className={classNames.btnTextWrapper}>
                  <Typography className={classNames.btnText}>{t(TranslationKey['Private Label'])}</Typography>
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

export const ClientProductExchangeView = withStyles(ClientProductExchangeViewRaw, styles)
