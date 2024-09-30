import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { checkIsAdmin } from '@utils/checks'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './finances-view.style'

import { FinancesViewModel } from './finances-view.model'
import { getEntityTypeConfig, getPaymentTypeConfig } from './finances.config'

export const FinancesView = observer(() => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new FinancesViewModel(), [])

  return (
    <>
      <div className={styles.header}>
        <CustomRadioButton
          size="large"
          options={getPaymentTypeConfig()}
          defaultValue={viewModel.paymentType}
          onChange={viewModel.onSetPaymentType}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by SKU, ASIN, Title"
          onSearch={viewModel.onSearchSubmit}
        />

        <CustomRadioButton
          size="large"
          options={getEntityTypeConfig(checkIsAdmin(UserRoleCodeMap[viewModel?.userRole]))}
          defaultValue={viewModel.entityType}
          onChange={viewModel.onSetEntityType}
        />
      </div>

      <CustomDataGrid
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        rowCount={viewModel.rowCount}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        getRowId={({ _id }: GridRowModel) => _id}
        pinnedColumns={viewModel.pinnedColumns}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },

          columnMenu: viewModel.columnMenuSettings,

          toolbar: {
            resetFiltersBtnSettings: {
              isSomeFilterOn: viewModel.isSomeFilterOn,
              onClickResetFilters: viewModel.onClickResetFilters,
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
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />
    </>
  )
})
