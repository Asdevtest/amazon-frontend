import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { useHistory } from 'react-router-dom'

import { Typography } from '@mui/material'

import {
  /* tableViewMode,*/
  tableSortMode,
} from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { TradingShopCard } from '@components/cards/trading-shop-card'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './client-sell-shops-deals.style'

import { ClientSellShopsDealsModel } from './client-sell-shops-deals.model'

export const ClientSellShopsDeals = observer(() => {
  const { classes: styles } = useStyles()
  const history = useHistory()
  const model = useRef(new ClientSellShopsDealsModel({ history }))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    nameSearchValue,
    // viewMode,
    getCurrentData,
    sortMode,
    onTriggerSortMode,
    onClickViewMore,
    onChangeNameSearchValue,
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
          <div className={styles.tablePanelWrapper}>
            <div></div>

            <CustomInputSearch
              allowClear
              placeholder="Search"
              value={nameSearchValue}
              onChange={onChangeNameSearchValue}
            />

            <div className={styles.tablePanelSortWrapper} onClick={onTriggerSortMode}>
              <Typography className={styles.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

              {sortMode === tableSortMode.DESK ? (
                <MdArrowDropDown size={22} className={styles.icon} />
              ) : (
                <MdArrowDropUp size={22} className={styles.icon} />
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
