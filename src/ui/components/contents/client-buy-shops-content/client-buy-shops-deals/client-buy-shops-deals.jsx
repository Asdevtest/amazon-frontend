import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SearchIcon from '@mui/icons-material/Search'
import TableRowsIcon from '@mui/icons-material/TableRows'
import ViewModuleIcon from '@mui/icons-material/ViewModule'

import React, {useEffect, useRef} from 'react'

import {Box, InputAdornment, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {VacantRequestListCard} from '@components/cards/vacant-request-list-card'
import {VacantRequestShortCard} from '@components/cards/vacant-request-short-card'
import {Field} from '@components/field'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'

import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {ClientBuyShopsDealsModel} from './client-buy-shops-deals.model'
import {useClassNames} from './client-buy-shops-deals.style'

export const ClientBuyShopsDeals = observer(() => {
  const classNames = useClassNames()
  const history = useHistory()
  const model = useRef(new ClientBuyShopsDealsModel({history}))

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
    onChangeViewMode,
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
      <div className={classNames.tablePanelWrapper}>
        <div className={classNames.tablePanelViewWrapper}>
          <ToggleBtnGroup disabled exclusive value={viewMode} onChange={onChangeViewMode}>
            <ToggleBtn value={tableViewMode.LIST}>
              <TableRowsIcon color="#fff" />
            </ToggleBtn>
            <ToggleBtn value={tableViewMode.BLOCKS}>
              <ViewModuleIcon color="#fff" />
            </ToggleBtn>
          </ToggleBtnGroup>
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
          {getSortedData(sortMode)?.map(item =>
            viewMode === tableViewMode.LIST ? (
              <VacantRequestListCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
            ) : (
              <VacantRequestShortCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
            ),
          )}
        </Box>
      ) : (
        <div className={classNames.emptyTableWrapper}>
          <img src="/assets/icons/empty-table.svg" />
          <Typography variant="h5" className={classNames.emptyTableText}>
            {t(TranslationKey['No deals yet'])}
          </Typography>
        </div>
      )}
    </>
  )
})
