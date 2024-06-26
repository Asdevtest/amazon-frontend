import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './buyer-search-supplier-by-supervisor-view.style'

import { BuyerSearchSupplierBySupervisorModel } from './buyer-search-supplier-by-supervisor-view.model'

export const BuyerSearchSupplierBySupervisorView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new BuyerSearchSupplierBySupervisorModel({ history }))

  return (
    <div>
      <div className={styles.btnsWrapper}>
        <Button
          disabled={viewModel.selectedRowIds.length === 0}
          tooltipInfoContent={t(TranslationKey['Assign several supplier search tasks to a Buyer'])}
          onClick={viewModel.onPickupSomeItems}
        >
          {t(TranslationKey['Take on the work of the selected'])}
        </Button>
      </div>
      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
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
            },
          }}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          rowHeight={80}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
        />
      </div>
    </div>
  )
})
