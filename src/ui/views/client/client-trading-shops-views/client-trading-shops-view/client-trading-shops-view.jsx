import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/types/button.type'

import { styles } from './client-trading-shops-view.style'

import { ClientTradingShopsViewModel } from './client-trading-shops-view.model'

export const ClientTradingShopsViewRaw = props => {
  const [viewModel] = useState(() => new ClientTradingShopsViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <div>
        <div>
          <Typography className={styles.title}>{t(TranslationKey['Choose a section in Trading Shops'])}</Typography>

          <div className={styles.btnsWrapper}>
            <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickBuyShops}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['Buy store'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickSellShops}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['Sell the store'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const ClientTradingShopsView = withStyles(observer(ClientTradingShopsViewRaw), styles)
