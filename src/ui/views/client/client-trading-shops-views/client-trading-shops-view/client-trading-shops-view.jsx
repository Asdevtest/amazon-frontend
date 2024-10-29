import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { styles } from './client-trading-shops-view.style'

import { ClientTradingShopsViewModel } from './client-trading-shops-view.model'

export const ClientTradingShopsViewRaw = props => {
  const viewModel = useMemo(() => new ClientTradingShopsViewModel({ history: props.history }), [])
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Trading Shops'])}</p>

      <div className={styles.btnsWrapper}>
        <CustomButton variant="outlined" onClick={viewModel.onClickBuyShops}>
          {t(TranslationKey['Buy store'])}
        </CustomButton>

        <CustomButton variant="outlined" onClick={viewModel.onClickSellShops}>
          {t(TranslationKey['Sell the store'])}
        </CustomButton>
      </div>
    </>
  )
}

export const ClientTradingShopsView = withStyles(observer(ClientTradingShopsViewRaw), styles)
