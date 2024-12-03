import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './parsing-reports.style'

import { getSearchPlaceholder } from './helpers/get-search-placeholder'
import { LinkCascader } from './link-cascader'
import { getSelectConfig } from './parsing-reports.config'
import { ParsingReportsModel } from './parsing-reports.model'
import { ParsingReportsType } from './parsing-reports.type'

interface ParsingReportsProps {
  productId?: string
  table?: ParsingReportsType
  className?: string
}

export const ParsingReports: FC<ParsingReportsProps> = observer(({ table, productId, className }) => {
  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new ParsingReportsModel({ table, productId }), [])

  return (
    <div className={cx('viewWrapper', className)}>
      <div className={styles.flexRow}>
        <div className={styles.flexRow}>
          <CustomSelect
            showSearch
            size="large"
            options={getSelectConfig()}
            value={viewModel.table}
            listHeight={384}
            filterOption={(inputValue, option) =>
              (option?.label as string)?.toLowerCase?.()?.includes?.(inputValue.toLowerCase())
            }
            onChange={viewModel.onChangeActiveTable}
          />

          {productId ? null : <LinkCascader />}
        </div>

        <CustomInputSearch
          enterButton
          allowClear
          disabled={!viewModel.fieldsForSearch.length}
          size="large"
          placeholder={getSearchPlaceholder(viewModel.table)}
          onSearch={viewModel.onSearchSubmit}
        />
      </div>

      <CustomDataGrid
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        pinnedColumns={viewModel.pinnedColumns}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
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
              handleDownloadPreset: viewModel.handleDownloadPreset,
              handleLoadPreset: viewModel.handleLoadPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
      />
    </div>
  )
})
