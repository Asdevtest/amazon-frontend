import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
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
      <MainContent>
        <div className={classNames.topHeaderBtnsWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by ASIN, Title'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>
        <MemoDataGrid
          pagination
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          classes={{
            row: classNames.row,
            root: classNames.root,
            footerContainer: classNames.footerContainer,
            footerCell: classNames.footerCell,
            toolbarContainer: classNames.toolbarContainer,
          }}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          pageSizeOptions={[15, 25, 50, 100]}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          slots={{
            toolbar: DataGridCustomToolbar,
            columnMenuIcon: FilterAltOutlinedIcon,
          }}
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
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onChangePaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
        />
      </MainContent>

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
