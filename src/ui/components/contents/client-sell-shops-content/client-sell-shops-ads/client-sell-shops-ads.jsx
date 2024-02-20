import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { TradingShopCard } from '@components/cards/trading-shop-card'
import { Button } from '@components/shared/buttons/button'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

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
          <Button
            disabled={curFilter === filtersSettings.ALL_ADS}
            className={cx(styles.button, {
              [styles.selectedBoxesBtn]: curFilter === filtersSettings.ALL_ADS,
            })}
            variant={ButtonVariant.OUTLINED}
            styleType={ButtonType.PRIMARY}
            onClick={() => onClickFilterBtn(filtersSettings.ALL_ADS)}
          >
            {t(TranslationKey['All Ads'])}
          </Button>

          <Button
            disabled={curFilter === filtersSettings.SOLD_ADS}
            className={cx(styles.button, {
              [styles.selectedBoxesBtn]: curFilter === filtersSettings.SOLD_ADS,
            })}
            variant={ButtonVariant.OUTLINED}
            styleType={ButtonType.PRIMARY}
            onClick={() => onClickFilterBtn(filtersSettings.SOLD_ADS)}
          >
            {t(TranslationKey['Sold Ads'])}
          </Button>
          <Button
            disabled={curFilter === filtersSettings.PURCHASED_ADS}
            className={cx(styles.button, {
              [styles.selectedBoxesBtn]: curFilter === filtersSettings.PURCHASED_ADS,
            })}
            variant={ButtonVariant.OUTLINED}
            styleType={ButtonType.PRIMARY}
            onClick={() => onClickFilterBtn(filtersSettings.PURCHASED_ADS)}
          >
            {t(TranslationKey['Removed Ads'])}
          </Button>
        </div>

        <Button styleType={ButtonType.SUCCESS} className={styles.addBtn} onClick={onClickAddBtn}>
          {t(TranslationKey['Add shop'])}
        </Button>
      </div>

      <SearchInput
        placeholder={t(TranslationKey.search)}
        inputClasses={styles.searchInput}
        value={nameSearchValue}
        onChange={onChangeNameSearchValue}
      />

      {model.currentData?.length ? (
        <div>
          {model.currentData?.map(item => (
            <TradingShopCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyTableWrapper}>
          <img src="/assets/icons/empty-table.svg" />
          <Typography variant="h5" className={styles.emptyTableText}>
            {t(TranslationKey['No stores for sale yet'])}
          </Typography>
        </div>
      )}
    </>
  )
})
