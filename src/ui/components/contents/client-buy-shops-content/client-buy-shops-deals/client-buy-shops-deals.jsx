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
import { SearchInput } from '@components/shared/search-input'

import { sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './client-buy-shops-deals.style'

import { ClientBuyShopsDealsModel } from './client-buy-shops-deals.model'

export const ClientBuyShopsDeals = observer(() => {
  const { classes: styles } = useStyles()
  const history = useHistory()
  const model = useRef(new ClientBuyShopsDealsModel({ history }))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const { nameSearchValue, getCurrentData, sortMode, onTriggerSortMode, onClickViewMore, onChangeNameSearchValue } =
    model.current

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
                {t(TranslationKey['No deals yet'])}
              </Typography>
            </div>
          )}
        </>
      )}
    </>
  )
})
