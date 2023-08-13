import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { styles } from './client-my-orders-view.style'

import { ClientMyOrdersViewModel } from './client-my-orders-view.model'

export const ClientMyOrdersViewRaw = props => {
  const [viewModel] = useState(() => new ClientMyOrdersViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <div>
        <div>
          <Typography className={classNames.title}>{t(TranslationKey['Choose a section in My orders'])}</Typography>

          <div className={classNames.btnsWrapper}>
            <Button className={classNames.button} color="primary" variant="outlined" onClick={viewModel.onClickOrders}>
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey.Orders)}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickPendingOrders}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Pending orders'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const ClientMyOrdersView = withStyles(observer(ClientMyOrdersViewRaw), styles)
