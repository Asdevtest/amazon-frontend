import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { TradingShopCard } from '@components/cards/trading-shop-card'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './client-sell-shops-ads.style'

import { ClientSellShopsAdsModel } from './client-sell-shops-ads.model'

export const ClientSellShopsAds = observer(() => {
  const { classes: styles, cx } = useStyles()
  const history = useHistory()
  const [model] = useState(new ClientSellShopsAdsModel({ history }))

  useEffect(() => {
    model.loadData()
  }, [])

  const {
    curFilter,
    filtersSettings,
    nameSearchValue,

    onClickViewMore,
    onChangeNameSearchValue,
    onClickAddBtn,
    onClickFilterBtn,
  } = model

  return (
    <>
      <div className={styles.btnsWrapper}>
        <div className={styles.boxesFiltersWrapper}>
          <CustomButton
            disabled={curFilter === filtersSettings.ALL_ADS}
            className={cx(styles.button, {
              [styles.selectedBoxesBtn]: curFilter === filtersSettings.ALL_ADS,
            })}
            variant={ButtonVariant.OUTLINED}
            onClick={() => onClickFilterBtn(filtersSettings.ALL_ADS)}
          >
            {t(TranslationKey['All Ads'])}
          </CustomButton>

          <CustomButton
            disabled={curFilter === filtersSettings.SOLD_ADS}
            className={cx(styles.button, {
              [styles.selectedBoxesBtn]: curFilter === filtersSettings.SOLD_ADS,
            })}
            variant={ButtonVariant.OUTLINED}
            onClick={() => onClickFilterBtn(filtersSettings.SOLD_ADS)}
          >
            {t(TranslationKey['Sold Ads'])}
          </CustomButton>
          <CustomButton
            disabled={curFilter === filtersSettings.PURCHASED_ADS}
            variant={ButtonVariant.OUTLINED}
            onClick={() => onClickFilterBtn(filtersSettings.PURCHASED_ADS)}
          >
            {t(TranslationKey['Removed Ads'])}
          </CustomButton>
        </div>

        <CustomButton type={ButtonStyle.PRIMARY} onClick={onClickAddBtn}>
          {t(TranslationKey['Add shop'])}
        </CustomButton>
      </div>

      <CustomInputSearch allowClear placeholder="Search" value={nameSearchValue} onChange={onChangeNameSearchValue} />

      {model.currentData?.length ? (
        <div>
          {model.currentData?.map(item => (
            <TradingShopCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyTableWrapper}>
          <img src="/assets/icons/empty-table.svg" />
          <h5 className={styles.emptyTableText}>{t(TranslationKey['No stores for sale yet'])}</h5>
        </div>
      )}
    </>
  )
})
