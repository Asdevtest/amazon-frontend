import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Typography } from '@mui/material'

import { tableSortMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { TradingShopCard } from '@components/cards/trading-shop-card'
import { Button } from '@components/shared/button'
import { SearchInput } from '@components/shared/search-input'

import { sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './client-buy-shops-ads.style'

import { ClientBuyShopsAdsModel } from './client-buy-shops-ads.model'

export const ClientBuyShopsAds = observer(() => {
  const { classes: styles, cx } = useStyles()
  const history = useHistory()
  const model = useRef(new ClientBuyShopsAdsModel({ history }))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    curFilter,
    filtersSettings,
    nameSearchValue,
    getCurrentData,
    sortMode,
    onTriggerSortMode,
    onClickViewMore,
    onChangeNameSearchValue,
    onClickFilterBtn,
  } = model.current

  const getSortedData = mode => {
    switch (mode) {
      case tableSortMode.DESK:
        return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))

      case tableSortMode.ASC:
        return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
    }
  }

  return (
    <>
      {SettingsModel.languageTag && (
        <>
          <div className={styles.boxesFiltersWrapper}>
            <Button
              disabled={curFilter === filtersSettings.ALL_ADS}
              className={cx(styles.button, {
                [styles.selectedBoxesBtn]: curFilter === filtersSettings.ALL_ADS,
              })}
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: 'none',
                },
              }}
              variant={ButtonVariant.OUTLINED}
              onClick={() => onClickFilterBtn(filtersSettings.ALL_ADS)}
            >
              {t(TranslationKey['All Ads'])}
            </Button>

            <Button
              disabled={curFilter === filtersSettings.PURCHASED_ADS} // Вернуть чтобы откатится
              className={cx(styles.button, {
                [styles.selectedBoxesBtn]: curFilter === filtersSettings.PURCHASED_ADS,
              })}
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: 'none',
                },
              }}
              variant={ButtonVariant.OUTLINED}
              onClick={() => onClickFilterBtn(filtersSettings.PURCHASED_ADS)}
            >
              {t(TranslationKey['Purchased Ads'])}
            </Button>
          </div>

          <div className={styles.tablePanelWrapper}>
            <div></div>

            <SearchInput
              placeholder={t(TranslationKey.search)}
              inputClasses={styles.searchInput}
              value={nameSearchValue}
              onChange={onChangeNameSearchValue}
            />

            <div className={styles.tablePanelSortWrapper} onClick={onTriggerSortMode}>
              <Typography className={styles.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

              {sortMode === tableSortMode.DESK ? (
                <ArrowDropDownIcon color="primary" />
              ) : (
                <ArrowDropUpIcon color="primary" />
              )}
            </div>
          </div>

          {getSortedData(sortMode)?.length ? (
            <div>
              {getSortedData(sortMode)?.map(item => (
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
      )}
    </>
  )
})
