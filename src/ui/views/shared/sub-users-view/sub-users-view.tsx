import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { LinkSubUserForm } from '@components/forms/link-sub-user-form'
import { PermissionsForm } from '@components/forms/permissions-form'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './sub-users-view.style'

import { SubUsersViewModel } from './sub-users-view.model'

export const SubUsersView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new SubUsersViewModel(), [])

  return (
    <div className="viewWrapper">
      <div className={styles.header}>
        <CustomButton
          disabled
          size="large"
          type="primary"
          onClick={() => viewModel.onTriggerOpenModal('showPermissionModal')}
        >
          {t(TranslationKey['Assign permissions'])}
        </CustomButton>
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by name, email"
          onSearch={viewModel.onChangeUnserverSearchValue}
        />
        <CustomButton type="primary" size="large" icon={<FiPlus />} onClick={viewModel.onToggleAddSubUserModal}>
          {t(TranslationKey['Add a user'])}
        </CustomButton>
      </div>

      <CustomDataGrid
        disableEnforceFocus
        disableRowSelectionOnClick
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
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
      />

      <Modal
        openModal={viewModel.showAddSubUserModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddSubUserModal')}
      >
        <LinkSubUserForm
          onToggleModal={() => viewModel.onTriggerOpenModal('showAddSubUserModal')}
          onSubmit={viewModel.onSubmitlinkSubUser}
        />
      </Modal>

      <Modal
        openModal={viewModel.showPermissionModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showPermissionModal')}
      >
        <PermissionsForm
          subUser={viewModel.selectedSubUser}
          onCloseModal={() => viewModel.onTriggerOpenModal('showPermissionModal')}
          onUpdateData={viewModel.getCurrentData}
        />
      </Modal>
    </div>
  )
})
