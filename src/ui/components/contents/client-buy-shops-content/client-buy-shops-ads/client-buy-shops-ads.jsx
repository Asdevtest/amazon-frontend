import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SearchIcon from '@mui/icons-material/Search'
import TableRowsIcon from '@mui/icons-material/TableRows'

import React, {useEffect, useRef} from 'react'

import {Box, InputAdornment, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {TradingShopCard} from '@components/cards/trading-shop-card'
import {Field} from '@components/field'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'

import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {ClientBuyShopsAdsModel} from './client-buy-shops-ads.model'
import {useClassNames} from './client-buy-shops-ads.style'

export const ClientBuyShopsAds = observer(() => {
  const classNames = useClassNames()
  const history = useHistory()
  const model = useRef(new ClientBuyShopsAdsModel({history}))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    nameSearchValue,
    viewMode,
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
      {/* <div className={classNames.btnsWrapper}>
        <Button success className={classNames.addBtn}  onClick={() => onClickAddBtn()}>
          {t(TranslationKey['Add shop'])}
        </Button>
      </div> */}

      <div className={classNames.tablePanelWrapper}>
        <div className={classNames.tablePanelViewWrapper}>
          <ToggleBtn disabled value={tableViewMode.LIST}>
            <TableRowsIcon color="#fff" />
          </ToggleBtn>
        </div>

        <div>
          <Field
            containerClasses={classNames.searchContainer}
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            }
            onChange={onChangeNameSearchValue}
          />
        </div>

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
        <Box
          container
          classes={{root: classNames.dashboardCardWrapper}}
          display="grid"
          gridTemplateColumns={
            viewMode === tableViewMode.LIST
              ? 'repeat(auto-fill, minmax(100%, 1fr))'
              : 'repeat(auto-fill, minmax(330px, 1fr))'
          }
          gridGap="20px"
        >
          {getSortedData(sortMode)?.map(item => (
            <TradingShopCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
          ))}
        </Box>
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
