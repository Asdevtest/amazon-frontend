import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { AdminAwaitingBatchesViewModel } from './admin-awaiting-batches-view.model'

export const AdminAwaitingBatchesView = observer(props => {
  const viewModel = useMemo(() => new AdminAwaitingBatchesViewModel({ history: props.history }), [])

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <div className="viewWrapper">
      <CustomInputSearch
        enterButton
        allowClear
        size="large"
        placeholder="Search by SKU, ASIN, Title"
        onSearch={viewModel.onSearchSubmit}
      />

      <CustomDataGrid
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        sortingMode="client"
        paginationMode="client"
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
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
      />

      {viewModel.showBatchInfoModal ? (
        <BatchInfoModal
          // @ts-ignore
          batch={viewModel.curBatch}
          openModal={viewModel.showBatchInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBatchInfoModal')}
        />
      ) : null}
    </div>
  )
})
