import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { checkIsAdmin } from '@utils/checks'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './finances-view.style'

import { FinancesViewModel } from './finances-view.model'
import { getEntityTypeConfig, getPaymentTypeConfig } from './finances.config'

export const FinancesView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new FinancesViewModel())

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <CustomSwitcher
          switchMode="medium"
          condition={viewModel?.paymentType}
          switcherSettings={getPaymentTypeConfig()}
          changeConditionHandler={viewModel?.handleSetPaymentType}
        />

        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={`${t(TranslationKey.ASIN)}, ${t(TranslationKey.SKU)}, ${t(TranslationKey.Title)}`}
          value={viewModel.currentSearchValue}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>

      <CustomSwitcher
        switchMode="medium"
        condition={viewModel?.entityType}
        switcherSettings={getEntityTypeConfig(checkIsAdmin(UserRoleCodeMap[viewModel?.userRole]))}
        changeConditionHandler={viewModel?.handleSetEntityType}
      />

      <div className={styles.tableWrapper}>
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
      </div>
    </div>
  )
})
