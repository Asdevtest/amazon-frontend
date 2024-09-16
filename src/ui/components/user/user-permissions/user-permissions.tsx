import { RadioChangeEvent } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditGroupPermissionForm } from '@components/forms/add-or-edit-group-permission-form'
import { AddOrEditSinglePermissionForm } from '@components/forms/add-or-edit-single-permission-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'
import { IPermission } from '@typings/models/permissions/permission'

import { useStyles } from './user-permissions.style'

import { switcherSettings } from './user-permissions.config'
import { UserPermissionsModel } from './user-permissions.model'

export const UserPermissions = observer(() => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new UserPermissionsModel(), [])

  return (
    <div className="viewWrapper">
      <div className={styles.buttons}>
        <CustomRadioButton
          size="large"
          buttonStyle="solid"
          options={switcherSettings()}
          defaultValue={viewModel.tabIndex}
          onChange={(e: RadioChangeEvent) => viewModel.onChangeTabIndex(e.target.value)}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Title, Key, URL"
          onSearch={viewModel.onChangeUnserverSearchValue}
        />

        <div className={styles.buttons}>
          <Button onClick={viewModel.onClickExportPermissions}>{t(TranslationKey['Export to file'])}</Button>
          <Button onClick={viewModel.onClickImportPermissions}>{t(TranslationKey['Import permissions'])}</Button>
          <Button styleType={ButtonStyle.SUCCESS} onClick={viewModel.onClickAddBtn}>
            {t(TranslationKey.Add)}
          </Button>
        </div>
      </div>

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
        getRowId={({ _id }: IPermission) => _id}
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
            tablePresets: {
              showPresetsSelect: viewModel.showPresetsSelect,
              presetsTableData: viewModel.presetsTableData,
              handleChangeSelectState: viewModel.onChangeShowPresetsSelect,
              handleSetPresetActive: viewModel.handleSetPresetActive,
              handleCreateTableSettingsPreset: viewModel.handleCreateTableSettingsPreset,
              handleDeleteTableSettingsPreset: viewModel.handleDeleteTableSettingsPreset,
              handleUpdateTableSettingsPreset: viewModel.handleUpdateTableSettingsPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
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
        missClickModalOn
        openModal={viewModel.showAddOrEditGroupPermissionModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditGroupPermissionModal')}
      >
        <AddOrEditGroupPermissionForm
          existingGroupPermissions={viewModel.groupPermissions}
          singlePermissions={viewModel.singlePermissions}
          permissionToEdit={viewModel.addOrEditPermissionSettings.permission}
          isEdit={viewModel.addOrEditPermissionSettings.isEdit}
          onCloseModal={viewModel.onClickCancelBtn}
          onSubmit={viewModel.addOrEditPermissionSettings.onSubmit}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showAddOrEditSinglePermissionModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditSinglePermissionModal')}
      >
        <AddOrEditSinglePermissionForm
          existingSinglePermissions={viewModel.currentData}
          permissionToEdit={viewModel.addOrEditPermissionSettings.permission}
          isEdit={viewModel.addOrEditPermissionSettings.isEdit}
          onCloseModal={viewModel.onClickCancelBtn}
          onSubmit={viewModel.addOrEditPermissionSettings.onSubmit}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </div>
  )
})
