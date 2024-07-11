import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './buyer-search-supplier-view.style'

import { BuyerSearchSupplierBySupervisorModel } from './buyer-search-supplier-view.model'

export const BuyerSearchSupplierBySupervisorView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new BuyerSearchSupplierBySupervisorModel())

  return (
    <div className={styles.container}>
      <Button
        disabled={viewModel.selectedRows.length === 0}
        tooltipInfoContent={t(TranslationKey['Assign several supplier search tasks to a Buyer'])}
        onClick={viewModel.onPickupSomeItems}
      >
        {t(TranslationKey['Take on the work of the selected'])}
      </Button>

      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          getRowHeight={() => 'auto'}
          getRowId={(row: IProduct) => row._id}
          pinnedColumns={viewModel.pinnedColumns}
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          rowSelectionModel={viewModel.selectedRows}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
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
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>
    </div>
  )
})
