import { observer } from 'mobx-react'
import { useMemo, useState } from 'react'

import { GridRowParams } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './admin-exchange-views.style'

import { getSwitcherConfig } from './admin-exchange-views.config'
import { AdminExchangeViewModel } from './admin-exchange-views.model'

export const AdminExchangeViews = observer(() => {
  const [viewModel] = useState(() => new AdminExchangeViewModel())
  const { classes: styles } = useStyles()

  const switcherConfig = useMemo(() => getSwitcherConfig(), [])

  return (
    <div>
      <div className={styles.filterBtnWrapper}>
        <CustomSwitcher
          switchMode="medium"
          condition={viewModel.activeCategory}
          switcherSettings={switcherConfig}
          changeConditionHandler={viewModel.onChangeSubCategory}
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
          getRowId={({ _id }: IProduct) => _id}
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
            },
          }}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowDoubleClick={(params: GridRowParams) => viewModel.onClickProductModal(params.row)}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>

      {viewModel.productCardModal && (
        <ProductCardModal
          history={viewModel.history}
          openModal={viewModel.productCardModal}
          setOpenModal={viewModel.onClickProductModal}
          updateDataHandler={viewModel.getCurrentData}
          onClickOpenNewTab={viewModel.onClickShowProduct}
        />
      )}
    </div>
  )
})
