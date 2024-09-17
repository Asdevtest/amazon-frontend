import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { ParsingRequestsViewModel } from './parsing-requests-view.model'
import { ProfilesForm } from './profiles-form'

export const ParsingRequestsView: FC = observer(() => {
  const viewModel = useMemo(() => new ParsingRequestsViewModel(), [])

  return (
    <>
      <div className="viewWrapper">
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by name, email"
          onSearch={viewModel.onSearchSubmit}
        />

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
          onPinnedColumnsChange={viewModel.handlePinColumn}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        />
      </div>

      <Modal openModal={viewModel.showProfilesModal} setOpenModal={viewModel.onToggleProfileModal}>
        <ProfilesForm
          requestId={viewModel.requestId}
          profileId={viewModel.profileId}
          onClose={viewModel.onToggleProfileModal}
          onSubmit={viewModel.onApproveProfile}
        />
      </Modal>
    </>
  )
})
