import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowParams } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IOrder } from '@typings/models/orders/order'

import { useStyles } from './admin-orders-views.style'

import { getSwitcherConfig } from './admin-orders-views.config'
import { AdminOrdersAllViewModel } from './admin-orders-views.model'

export const AdminOrdersViews = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new AdminOrdersAllViewModel())

  return (
    <div>
      <div className={styles.searchContainer}>
        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>

      <div className={styles.filterBtnWrapper}>
        <CustomSwitcher
          switchMode="medium"
          condition={viewModel.activeCategory}
          switcherSettings={getSwitcherConfig()}
          changeConditionHandler={viewModel.onChangeActiveCategory}
        />
      </div>

      <div className={styles.datagridWrapper}>
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
          getRowId={({ _id }: IOrder) => _id}
          slotProps={{
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
            },
          }}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowDoubleClick={(params: GridRowParams) => viewModel.onClickTableRow(params.row)}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>
    </div>
  )
})
