import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { styles } from './client-trading-shops-view.style'

import { ClientTradingShopsViewModel } from './client-trading-shops-view.model'

export const ClientTradingShopsViewRaw = props => {
  const [viewModel] = useState(() => new ClientTradingShopsViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <MainContent>
        <div>
          <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Trading Shops'])}</Typography>

          <div className={classNames.btnsWrapper}>
            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickBuyShops}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Buy store'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickSellShops}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Sell the store'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const ClientTradingShopsView = withStyles(observer(ClientTradingShopsViewRaw), styles)
