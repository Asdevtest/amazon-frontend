import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Typography } from '@mui/material'

import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { VacantDealsListCard } from '@components/cards/vacant-deals-list-card'

import { sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'
import { t } from '@utils/translations'

import { styles } from './deals-on-review-view.style'

import { DealsOnReviewModel } from './deals-on-review-view.model'

export const DealsOnReviewViewRaw = props => {
  const [viewModel] = useState(() => new DealsOnReviewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getSortedData = mode => {
    switch (mode) {
      case tableSortMode.DESK:
        return viewModel.getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))

      case tableSortMode.ASC:
        return viewModel.getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
    }
  }

  return (
    <React.Fragment>
      <div>
        <div className={classNames.tablePanelWrapper}>
          <div className={classNames.tablePanelSortWrapper} onClick={viewModel.onTriggerSortMode}>
            <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

            {viewModel.sortMode === tableSortMode.DESK ? (
              <ArrowDropDownIcon color="primary" />
            ) : (
              <ArrowDropUpIcon color="primary" />
            )}
          </div>
        </div>

        <div className={classNames.dealsOnReviewWrapper}>
          {getSortedData(viewModel.sortMode).length ? (
            getSortedData(viewModel.sortMode).map((deal, index) =>
              viewModel.viewMode === tableViewMode.LIST ? (
                <VacantDealsListCard
                  key={index}
                  showDetails
                  item={deal}
                  onClickViewMore={viewModel.onClickViewMore}
                  // onClickGetToWorkModal={viewModel.onClickGetToWorkModal}
                />
              ) : null,
            )
          ) : (
            <div className={classNames.emptyTableWrapper}>
              <img src="/assets/icons/empty-table.svg" />
              <Typography variant="h5" className={classNames.emptyTableText}>
                {t(TranslationKey['No deals yet'])}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export const DealsOnReviewView = withStyles(observer(DealsOnReviewViewRaw), styles)
