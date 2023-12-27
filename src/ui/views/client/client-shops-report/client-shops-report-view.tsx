import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'

import { t } from '@utils/translations'

import { useStyles } from './client-shops-report-view.style'

import { ClientShopsViewModel } from './client-shops-report-view.model'
import { ControllButtons } from './controll-buttons/controll-buttons'
import { tabsValues } from './helpers/tabs-value'

export const ClientShopsReportView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientShopsViewModel(tabsValues.STOCK_REPORT))

  return (
    <div className={styles.root}>
      <CustomSwitcher
        fullWidth
        switchMode={'big'}
        condition={viewModel.tabKey}
        switcherSettings={[
          { label: () => t(TranslationKey['Warehouse report']), value: tabsValues.STOCK_REPORT },
          { label: () => t(TranslationKey['Dashboard by goods/days']), value: tabsValues.GOODS_DAYS_REPORT },

          { label: () => 'Inventory', value: tabsValues.INVENTORY },
          { label: () => 'PPC-Organic by Weeks', value: tabsValues.PPC },
          { label: () => 'Inventory Shipments', value: tabsValues.INVENTORY_SHIPMENTS },
        ]}
        changeConditionHandler={value => viewModel.changeTabHandler(value as tabsValues)}
      />

      <ControllButtons
        selectedRows={viewModel.selectedRows}
        onClickMoveGoodsToInventory={() => viewModel.moveGoodsToInventoryHandler()}
        onClickBindStockGoodsToInventory={() => viewModel.bindStockGoodsToInventoryHandler()}
        onClickDeleteBtn={() => viewModel.deleteReportHandler()}
      />

      <div className={styles.tabledWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          getRowHeight={() => 'auto'}
          slotProps={{
            columnMenu: viewModel.columnMenuSettings,
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              resetFiltersBtnSettings: {
                onClickResetFilters: () => viewModel.onClickResetFilters(),
                isSomeFilterOn: viewModel.isSomeFilterOn,
              },
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: (model: GridColumnVisibilityModel) =>
                  viewModel.onColumnVisibilityModelChange(model),
              },
            },
          }}
          density={viewModel.densityModel}
          rows={viewModel.tableData}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          rowSelectionModel={viewModel.selectedRows}
          getRowId={({ _id }: { _id: string }) => _id}
          onRowSelectionModelChange={(value: string[]) => viewModel.onSelectionModel(value)}
          onSortModelChange={(value: GridSortModel) => viewModel.onChangeSortingModel(value)}
          onColumnVisibilityModelChange={(value: GridColumnVisibilityModel) =>
            viewModel.onColumnVisibilityModelChange(value)
          }
          onPaginationModelChange={(value: GridPaginationModel) => viewModel.onPaginationModelChange(value)}
          onFilterModelChange={(value: GridFilterModel) => viewModel.onChangeFilterModel(value)}
        />
      </div>
    </div>
  )
})
