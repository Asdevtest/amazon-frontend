import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Typography } from '@mui/material'

import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { VacantDealsListCard } from '@components/cards/vacant-deals-list-card'
import { ConfirmationModal } from '@components/modals/confirmation-modal'

import { sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc } from '@utils/date-time'
import { t } from '@utils/translations'

import { styles } from './vacant-deals-view.style'

import { VacantDealsViewModel } from './vacant-deals-view.model'

export const VacantDealsViewRaw = props => {
  const [viewModel] = useState(() => new VacantDealsViewModel({ history: props.history }))
  const { classes: styles } = props

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
    <>
      <div>
        <div className={styles.tablePanelWrapper}>
          <div className={styles.tablePanelSortWrapper} onClick={viewModel.onTriggerSortMode}>
            <Typography className={styles.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

            {viewModel.sortMode === tableSortMode.DESK ? (
              <ArrowDropDownIcon color="primary" />
            ) : (
              <ArrowDropUpIcon color="primary" />
            )}
          </div>
        </div>
        <div className={styles.vacantDealsWrapper}>
          {getSortedData(viewModel.sortMode).length ? (
            <>
              {getSortedData(viewModel.sortMode).map((deal, index) =>
                viewModel.viewMode === tableViewMode.LIST ? (
                  <VacantDealsListCard
                    key={index}
                    item={deal}
                    onClickViewMore={viewModel.onClickViewMore}
                    onClickGetToWorkModal={viewModel.onClickGetToWorkModal}
                  />
                ) : null,
              )}
            </>
          ) : (
            <div className={styles.emptyTableWrapper}>
              <img src="/assets/icons/empty-table.svg" />
              <Typography variant="h5" className={styles.emptyTableText}>
                {t(TranslationKey['No deals yet'])}
              </Typography>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Taking the deal check to work?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => viewModel.onClickGetToWork(viewModel.proposalId, viewModel.requestId)}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
    </>
  )
}

export const VacantDealsView = withStyles(observer(VacantDealsViewRaw), styles)
