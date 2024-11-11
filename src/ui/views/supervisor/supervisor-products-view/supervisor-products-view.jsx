import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './supervisor-products-view.style'

import { createSelectLabel } from './supervisor-products-view.config'
import { filterStatusConfig, warningStatuses } from './supervisor-products-view.constants'
import { SupervisorProductsViewModel } from './supervisor-products-view.model'

export const SupervisorProductsView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new SupervisorProductsViewModel(), [])

  const createStatusOptions = () =>
    filterStatusConfig.map(status => ({
      badge: viewModel.userInfo[status.userInfoKey] || null,
      label: t(TranslationKey[status.label]),
      value: status.value,
      key: viewModel.userInfo[status.userInfoKey] || null,
    }))

  const getRowClassName = params => warningStatuses.includes(params.row.statusForAttention) && styles.attentionRow

  return (
    <div className="viewWrapper">
      <div className={styles.header}>
        <CustomSelect
          size="large"
          virtual={false}
          optionRender={option => (
            <div className={styles.optionRender}>
              <div className={styles.optionRenderLabel}>{option.label}</div>
              {option.data?.badge ? <div className={styles.optionRenderBadge}>{option.data?.badge}</div> : null}
            </div>
          )}
          options={createStatusOptions()}
          labelRender={label => createSelectLabel(label)}
          value={viewModel.switcherFilterStatuses}
          className={styles.select}
          onChange={viewModel.onClickStatusFilterButton}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by SKU, ASIN, Title"
          onSearch={viewModel.onSearchSubmit}
        />
      </div>

      <CustomDataGrid
        disableRowSelectionOnClick
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        pinnedColumns={viewModel.pinnedColumns}
        paginationModel={viewModel.paginationModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        rows={viewModel.currentData}
        rowHeight={130}
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
            tagSearchSettings: {
              tagList: viewModel.columnMenuSettings?.tags?.filterData,
              activeTags: viewModel.columnMenuSettings?.tags?.currentFilterData,
              isLoading: viewModel.columnMenuSettings?.filterRequestStatus === loadingStatus.IS_LOADING,
              getTags: () => viewModel.columnMenuSettings?.onClickFilterBtn('tags', DataGridFilterTables.PRODUCTS),
              setActiveProductsTag: viewModel.setActiveProductsTag,
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
        getRowClassName={getRowClassName}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onRowDoubleClick={({ row }) => viewModel.onClickProductModal(row?._id)}
      />

      {viewModel.showProductModal && (
        <ProductCardModal
          role={viewModel.userInfo.role}
          history={viewModel.history}
          openModal={viewModel.showProductModal}
          setOpenModal={viewModel.onClickProductModal}
          updateDataHandler={viewModel.getCurrentData}
          onClickOpenNewTab={id => viewModel.onClickTableRow(id)}
        />
      )}
    </div>
  )
})
