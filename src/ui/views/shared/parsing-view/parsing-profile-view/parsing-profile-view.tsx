import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { FaPlay, FaPlus } from 'react-icons/fa'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './parsing-profile-view.style'

import { ParsingProfileForm } from './parsing-profile-form'
import { ParsingProfileViewModel } from './parsing-profile-view.model'

export const ParsingProfileView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new ParsingProfileViewModel(), [])

  return (
    <>
      <div className={styles.flexRow}>
        <CustomButton
          disabled={!viewModel.selectedRows.length}
          size="large"
          type="primary"
          icon={<FaPlay size={12} />}
          onClick={() => viewModel.onForceStart()}
        >
          {t(TranslationKey['Force start'])}
        </CustomButton>

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by name, email"
          onSearch={viewModel.onSearchSubmit}
        />

        <CustomButton size="large" type="primary" icon={<FaPlus size={12} />} onClick={viewModel.onAddProfileModal}>
          {t(TranslationKey['Add profile'])}
        </CustomButton>
      </div>

      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        isRowSelectable={({ row }: GridRowModel) => row.client && row.access}
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

      <Modal missClickModalOn openModal={viewModel.showToggleProfileModal} setOpenModal={viewModel.onAddProfileModal}>
        <ParsingProfileForm
          profile={viewModel.selectedProfile}
          onClose={viewModel.onAddProfileModal}
          onUpdateData={viewModel.getCurrentData}
        />
      </Modal>
    </>
  )
})
