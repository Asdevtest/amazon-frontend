import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Typography } from '@mui/material'

import React, { useEffect, useRef } from 'react'

import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { tableSortMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { TradingShopCard } from '@components/cards/trading-shop-card'
import { SearchInput } from '@components/shared/search-input'

import { sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'
import { t } from '@utils/translations'

import { ClientBuyShopsDealsModel } from './client-buy-shops-deals.model'
import { useClassNames } from './client-buy-shops-deals.style'

export const ClientBuyShopsDeals = observer(() => {
  const { classes: classNames } = useClassNames()
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

          {getSortedData(sortMode)?.length ? (
            <div>
              {getSortedData(sortMode)?.map(item => (
                <TradingShopCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
              ))}
            </div>
          ) : (
            <div className={classNames.emptyTableWrapper}>
              <img src="/assets/icons/empty-table.svg" />
              <Typography variant="h5" className={classNames.emptyTableText}>
                {t(TranslationKey['No deals yet'])}
              </Typography>
            </div>
          )}
        </>
      )}
    </>
  )
})
