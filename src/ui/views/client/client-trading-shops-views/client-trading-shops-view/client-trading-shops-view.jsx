import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { styles } from './client-trading-shops-view.style'

import { ClientTradingShopsViewModel } from './client-trading-shops-view.model'

export const ClientTradingShopsViewRaw = props => {
  const [viewModel] = useState(() => new ClientTradingShopsViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Trading Shops'])}</p>

      <div className={styles.btnsWrapper}>
        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickBuyShops}>
          {t(TranslationKey['Buy store'])}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickSellShops}>
          {t(TranslationKey['Sell the store'])}
        </Button>
      </div>
    </>
  )
}

export const ClientTradingShopsView = withStyles(observer(ClientTradingShopsViewRaw), styles)
