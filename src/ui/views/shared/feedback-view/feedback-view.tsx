import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { ContentEditorForm } from '@components/forms/content-editor-form'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './feedback-view.style'

import { FeedbackViewModel } from './feedback-view.model'
import { TicketForm } from './ticket-form'

export const FeedbackView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new FeedbackViewModel(), [])

  return (
    <div className="viewWrapper">
      <div className={styles.flexRow}>
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search"
          onSearch={viewModel.onSearchSubmit}
        />
        {!viewModel.creator ? (
          <CustomButton type="primary" size="large" onClick={viewModel.onToggleContentEditorForm}>
            {t(TranslationKey['Create ticket'])}
          </CustomButton>
        ) : null}
      </div>

      <CustomDataGrid
        disableRowSelectionOnClick
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        pinnedColumns={viewModel.pinnedColumns}
        rowSelectionModel={viewModel.selectedRows}
        paginationModel={viewModel.paginationModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        getRowId={({ _id }: GridRowModel) => _id}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          columnMenu: viewModel.columnMenuSettings,
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
            tablePresets: {
              showPresetsSelect: viewModel.showPresetsSelect,
              presetsTableData: viewModel.presetsTableData,
              handleChangeSelectState: viewModel.onChangeShowPresetsSelect,
              handleSetPresetActive: viewModel.handleSetPresetActive,
              handleCreateTableSettingsPreset: viewModel.handleCreateTableSettingsPreset,
              handleDeleteTableSettingsPreset: viewModel.handleDeleteTableSettingsPreset,
              handleUpdateTableSettingsPreset: viewModel.handleUpdateTableSettingsPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        rowCount={viewModel.rowCount}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />

      <Modal
        missClickModalOn
        openModal={viewModel.showContentEditorForm}
        setOpenModal={viewModel.onToggleContentEditorForm}
      >
        <ContentEditorForm
          title={viewModel.contentEditorFormTitle}
          onSubmit={viewModel.onCreateFeedback}
          onClose={viewModel.onToggleContentEditorForm}
        />
      </Modal>

      <Modal openModal={viewModel.showTicketForm} setOpenModal={viewModel.onToggleTicketForm}>
        <TicketForm onSubmit={() => {}} onClose={viewModel.onToggleTicketForm} />
      </Modal>
    </div>
  )
})
