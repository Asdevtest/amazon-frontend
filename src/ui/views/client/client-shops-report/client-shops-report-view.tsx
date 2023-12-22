import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridColumnVisibilityModel } from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'

import { t } from '@utils/translations'

import { useStyles } from './client-shops-report-view.style'

import { ClientShopsViewModel } from './client-shops-report-view.model'
import { getClassParams } from './helpers/get-class-params'
import { tabsValues } from './helpers/tabs-value'

export const ClientShopsReportView = observer(() => {
  const { classes: styles } = useStyles()

  const [tabIndex, setTabIndex] = useState(tabsValues.STOCK_REPORT)

  const { getMainDataMethod, columnsModel } = getClassParams(tabIndex)

  const [viewModel] = useState(() => new ClientShopsViewModel(getMainDataMethod, columnsModel))

  console.log('viewModel', viewModel)
  console.log('viewModel.columnVisibilityModel', viewModel.columnVisibilityModel)

  const [curShop, setCurShop] = useState('')

  return (
    <>
      <CustomSwitcher
        fullWidth
        switchMode={'big'}
        condition={tabIndex}
        switcherSettings={[
          { label: () => t(TranslationKey['Warehouse report']), value: tabsValues.STOCK_REPORT },
          { label: () => t(TranslationKey['Dashboard by goods/days']), value: tabsValues.GOODS_DAYS_REPORT },

          { label: () => 'Inventory', value: tabsValues.INVENTORY },
          { label: () => 'PPC-Organic by Weeks', value: tabsValues.PPC },
          { label: () => 'Inventory Shipments', value: tabsValues.INVENTORY_SHIPMENTS },
        ]}
        changeConditionHandler={value => {
          if (typeof value === 'string') {
            setTabIndex(value as tabsValues)
          }
        }}
      />

      {/* <ControllButtons selectedRows onSubmitMoveToInventoryGoods onClickBindStockGoodsToInventoryBtn onClickDeleteBtn /> */}

      <div className={styles.tabledWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          sortModel={viewModel.sortModel}
          // filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.tableData}
          getRowHeight={() => 90}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: (model: GridColumnVisibilityModel) =>
                  viewModel.onColumnVisibilityModelChange(model),
              },
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          // rowSelectionModel={viewModel.rowSelectionModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          // onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      {/* <TabPanel value={tabIndex} index={tabsValues.STOCK_REPORT}>
        <StockReport curShop={curShop} />
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.GOODS_DAYS_REPORT}>
        <GoodsDaysReport curShop={curShop} />
      </TabPanel> */}
    </>
  )
})
