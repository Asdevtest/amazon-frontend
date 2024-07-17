import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReplyFeedbackForm } from '@components/forms/reply-feedback-form'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './admin-feedback-view.style'

import { AdminFeedbackViewModel } from './admin-feedback-view.model'

export const AdminFeedbackView = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new AdminFeedbackViewModel())

  return (
    <>
      <div className={styles.headerWrapper}>
        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by name, email'])}
          value={viewModel.currentSearchValue}
          onChange={viewModel.onChangeUnserverSearchValue}
        />
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          sortingMode="client"
          paginationMode="client"
          rowCount={viewModel.rowCount}
          rows={viewModel.filteredData}
          sortModel={viewModel.sortModel}
          columns={viewModel.columnsModel}
          filterModel={viewModel.filterModel}
          pinnedColumns={viewModel.pinnedColumns}
          rowSelectionModel={viewModel.selectedRows}
          paginationModel={viewModel.paginationModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }: GridRowModel) => _id}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              resetFiltersBtnSettings: {
                onClickResetFilters: viewModel.onClickResetFilters,
                isSomeFilterOn: viewModel.isSomeFilterOn,
              },
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
              sortSettings: {
                sortModel: viewModel.sortModel,
                columnsModel: viewModel.columnsModel,
                onSortModelChange: viewModel.onChangeSortingModel,
              },
            },
          }}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onPinnedColumnsChange={viewModel.handlePinColumn}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        />
      </div>

      <Modal
        openModal={viewModel.showReplyFeedbackModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showReplyFeedbackModal')}
      >
        <ReplyFeedbackForm
          feedback={viewModel.selectedFeedback}
          onCloseModal={() => viewModel.onTriggerOpenModal('showReplyFeedbackModal')}
          onSubmit={viewModel.onClickWrite}
        />
      </Modal>
    </>
  )
})
