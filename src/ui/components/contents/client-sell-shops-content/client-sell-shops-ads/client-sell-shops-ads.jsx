import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SearchIcon from '@mui/icons-material/Search'

import React, {useEffect, useRef} from 'react'

import {InputAdornment, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {
  /* tableViewMode,*/
  tableSortMode,
} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {TradingShopCard} from '@components/cards/trading-shop-card'
import {Field} from '@components/field'

import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {ClientSellShopsAdsModel} from './client-sell-shops-ads.model'
import {useClassNames} from './client-sell-shops-ads.style'

export const ClientSellShopsAds = observer(() => {
  const classNames = useClassNames()
  const history = useHistory()
  const model = useRef(new ClientSellShopsAdsModel({history}))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    curFilter,
    filtersSettings,
    nameSearchValue,
    // viewMode,
    getCurrentData,
    sortMode,
    onTriggerSortMode,
    onClickViewMore,
    onChangeNameSearchValue,
    onClickAddBtn,
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
          <div className={classNames.btnsWrapper}>
            <div className={classNames.boxesFiltersWrapper}>
              <Button
                disabled={curFilter === filtersSettings.ALL_ADS}
                className={clsx(classNames.button, {
                  [classNames.selectedBoxesBtn]: curFilter === filtersSettings.ALL_ADS,
                })}
                variant="text"
                color="primary"
                onClick={() => onClickFilterBtn(filtersSettings.ALL_ADS)}
              >
                {t(TranslationKey['All Ads'])}
              </Button>

              <Button
                disabled={curFilter === filtersSettings.SOLD_ADS}
                className={clsx(classNames.button, {
                  [classNames.selectedBoxesBtn]: curFilter === filtersSettings.SOLD_ADS,
                })}
                variant="text"
                color="primary"
                onClick={() => onClickFilterBtn(filtersSettings.SOLD_ADS)}
              >
                {t(TranslationKey['Sold Ads'])}
              </Button>
              <Button
                disabled={curFilter === filtersSettings.PURCHASED_ADS}
                className={clsx(classNames.button, {
                  [classNames.selectedBoxesBtn]: curFilter === filtersSettings.PURCHASED_ADS,
                })}
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
            <Field
              containerClasses={classNames.searchContainer}
              placeholder={t(TranslationKey.search)}
              inputClasses={classNames.searchInput}
              value={nameSearchValue}
              endAdornment={
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              }
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
                {t(TranslationKey['No stores for sale yet'])}
              </Typography>
            </div>
          )}
        </>
      )}
    </>
  )
})
