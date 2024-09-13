import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { AdminSentBatchesViewModel } from './admin-sent-batches-view.model'

export const AdminSentBatchesView = observer(props => {
  const viewModel = useMemo(() => new AdminSentBatchesViewModel({ history: props.history }), [])

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
        rows={viewModel.currentData}
        sortingMode="client"
        paginationMode="client"
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
        onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData)}
      />

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={'confirmMessage'}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.onClickConfirmSendToBatchBtn}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      {viewModel.showBatchInfoModal ? (
        <BatchInfoModal
          // @ts-ignore
          openModal={viewModel.showBatchInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBatchInfoModal')}
          batch={viewModel.curBatch}
        />
      ) : null}
    </div>
  )
})
