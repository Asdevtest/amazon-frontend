import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Typography } from '@mui/material'

import { tableSortMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { TradingShopCard } from '@components/cards/trading-shop-card'
import { Button } from '@components/shared/buttons/button'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { useClassNames } from './client-sell-shops-ads.style'

import { ClientSellShopsAdsModel } from './client-sell-shops-ads.model'

export const ClientSellShopsAds = observer(() => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const [model] = useState(new ClientSellShopsAdsModel({ history }))

  useEffect(() => {
    model.loadData()
  }, [])

  const {
    curFilter,
    filtersSettings,
    nameSearchValue,
    // viewMode,
    sortMode,
    onTriggerSortMode,
    onClickViewMore,
    onChangeNameSearchValue,
    onClickAddBtn,
    onClickFilterBtn,
  } = model

  return (
    <>
      <div className={classNames.btnsWrapper}>
        <div className={classNames.boxesFiltersWrapper}>
          <Button
            disabled={curFilter === filtersSettings.ALL_ADS}
            className={cx(classNames.button, {
              [classNames.selectedBoxesBtn]: curFilter === filtersSettings.ALL_ADS,
            })}
            sx={{
              '&.Mui-disabled': {
                backgroundColor: 'none',
              },
            }}
            variant="text"
            color="primary"
            onClick={() => onClickFilterBtn(filtersSettings.ALL_ADS)}
          >
            {t(TranslationKey['All Ads'])}
          </Button>

          <Button
            disabled={curFilter === filtersSettings.SOLD_ADS}
            className={cx(classNames.button, {
              [classNames.selectedBoxesBtn]: curFilter === filtersSettings.SOLD_ADS,
            })}
            sx={{
              '&.Mui-disabled': {
                backgroundColor: 'none',
              },
            }}
            variant="text"
            color="primary"
            onClick={() => onClickFilterBtn(filtersSettings.SOLD_ADS)}
          >
            {t(TranslationKey['Sold Ads'])}
          </Button>
          <Button
            disabled={curFilter === filtersSettings.PURCHASED_ADS}
            className={cx(classNames.button, {
              [classNames.selectedBoxesBtn]: curFilter === filtersSettings.PURCHASED_ADS,
            })}
            sx={{
              '&.Mui-disabled': {
                backgroundColor: 'none',
              },
            }}
            variant="text"
            color="primary"
            onClick={() => onClickFilterBtn(filtersSettings.PURCHASED_ADS)}
          >
            {t(TranslationKey['Removed Ads'])}
          </Button>
        </div>

        <Button success className={classNames.addBtn} onClick={onClickAddBtn}>
          {t(TranslationKey['Add shop'])}
        </Button>
      </div>

      <div className={classNames.tablePanelWrapper}>
        <div></div>
        <SearchInput
          placeholder={t(TranslationKey.search)}
          inputClasses={classNames.searchInput}
          value={nameSearchValue}
          onChange={onChangeNameSearchValue}
        />

        <div className={classNames.tablePanelSortWrapper} onClick={onTriggerSortMode}>
          <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

          {sortMode === tableSortMode.DESK ? (
            <ArrowDropDownIcon color="primary" />
          ) : (
            <ArrowDropUpIcon color="primary" />
          )}
        </div>
      </div>

      {model.currentData?.length ? (
        <div>
          {model.currentData?.map(item => (
            <TradingShopCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
          ))}
        </div>
      ) : (
        <div className={classNames.emptyTableWrapper}>
          <img src="/assets/icons/empty-table.svg" />
          <Typography variant="h5" className={classNames.emptyTableText}>
            {t(TranslationKey['No stores for sale yet'])}
          </Typography>
        </div>
      )}
    </>
  )
})
