import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './finances-view.style'

import { FinancesViewModel } from './finances-view.model'

export const FinancesView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new FinancesViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params => (params.row.sum < 0 ? styles.redRow : params.row.sum > 0 && styles.greenRow)

  return (
    <div className={styles.tableWrapper}>
      <CustomDataGrid
        getRowClassName={getRowClassName}
        sortModel={viewModel.sortModel}
        sortingMode="client"
        paginationMode="client"
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
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
          },
        }}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
      />
    </div>
  )
})
