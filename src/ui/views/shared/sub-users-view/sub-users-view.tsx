import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditUserPermissionsForm } from '@components/forms/add-or-edit-user-permissions-form'
import { LinkSubUserForm } from '@components/forms/link-sub-user-form'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { checkIsClient, checkIsWithoutProductPermissions } from '@utils/checks'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { Header } from './header/header'
import { SubUsersViewModel } from './sub-users-view.model'

export const SubUsersView = observer(() => {
  const viewModel = useMemo(() => new SubUsersViewModel(), [])

  return (
    <div className="viewWrapper">
      <Header
        onChangeUnserverSearchValue={viewModel.onChangeUnserverSearchValue}
        onToggleAddSubUserModal={viewModel.onToggleAddSubUserModal}
      />

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
        <AddOrEditUserPermissionsForm
          // @ts-ignore
          isWithoutProductPermissions={checkIsWithoutProductPermissions(UserRoleCodeMap[viewModel.userRole])}
          isWithoutShopsDepends={!checkIsClient(UserRoleCodeMap[viewModel.userRole])}
          curUserProductPermissions={viewModel.curUserProductPermissions}
          curUserShopsPermissions={viewModel.curUserShopsPermissions}
          permissionsToSelect={viewModel.singlePermissions}
          permissionGroupsToSelect={viewModel.groupPermissions}
          sourceData={viewModel.selectedSubUser}
          shops={viewModel.shopsData}
          specs={viewModel.specs}
          productPermissionsData={viewModel.productPermissionsData}
          onCloseModal={() => viewModel.onTriggerOpenModal('showPermissionModal')}
          onSubmit={viewModel.onSubmitUserPermissionsForm}
        />
      </Modal>
    </div>
  )
})
