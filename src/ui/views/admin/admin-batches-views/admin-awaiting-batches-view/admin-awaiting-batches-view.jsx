import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './admin-awaiting-batches-view.style'

import { AdminAwaitingBatchesViewModel } from './admin-awaiting-batches-view.model'

export const AdminAwaitingBatchesViewRaw = props => {
  const [viewModel] = useState(() => new AdminAwaitingBatchesViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div className={classNames.topHeaderBtnsWrapper}>
        <SearchInput
          inputClasses={classNames.searchInput}
          placeholder={t(TranslationKey['Search by ASIN, Title'])}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>
      <div className={classNames.tableWrapper}>
        <CustomDataGrid
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onChangePaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
        />
      </div>

      <BatchInfoModal
        batch={viewModel.curBatch}
        volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
        openModal={viewModel.showBatchInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBatchInfoModal')}
      />
    </React.Fragment>
  )
}

export const AdminAwaitingBatchesView = withStyles(observer(AdminAwaitingBatchesViewRaw), styles)
