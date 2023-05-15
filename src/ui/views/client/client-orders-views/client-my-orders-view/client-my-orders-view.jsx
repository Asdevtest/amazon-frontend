import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {MainContent} from '@components/layout/main-content'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {ClientMyOrdersViewModel} from './client-my-orders-view.model'
import {styles} from './client-my-orders-view.style'

@observer
class ClientMyOrdersViewRaw extends Component {
  viewModel = new ClientMyOrdersViewModel({history: this.props.history})

  render() {
    const {onClickOrders, onClickPendingOrders} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <div>
            <Typography className={classNames.title}>{t(TranslationKey['Choose a section in My orders'])}</Typography>

            <div className={classNames.btnsWrapper}>
              <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickOrders}>
                <div className={classNames.btnTextWrapper}>
                  <Typography className={classNames.btnText}>{t(TranslationKey.Orders)}</Typography>
                  <ArrowRightAltIcon color="primary" />
                </div>
              </Button>

              <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickPendingOrders}>
                <div className={classNames.btnTextWrapper}>
                  <Typography className={classNames.btnText}>{t(TranslationKey['Pending orders'])}</Typography>
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

export const ClientMyOrdersView = withStyles(ClientMyOrdersViewRaw, styles)
