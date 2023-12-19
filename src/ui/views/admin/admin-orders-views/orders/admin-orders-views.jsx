import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { adminOrdersBtnsConfig } from '@constants/table/tables-filter-btns-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './admin-orders-views.style'

import { AdminOrdersAllViewModel } from './admin-orders-views.model'

export const AdminOrdersViews = observer(({ history }) => {
  const { classes: classNames } = useStyles()
  const [viewModel] = useState(() => new AdminOrdersAllViewModel({ history }))
  
  useEffect(() => {
    viewModel.getOrdersByStatus(viewModel.activeSubCategory)
  }, [])

  return (
    <div>
      <div className={classNames.searchContainer}>
        <SearchInput
          inputClasses={classNames.searchInput}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>
      <div className={classNames.filterBtnWrapper}>
        <CustomSwitcher
          switchMode={'medium'}
          condition={viewModel.activeSubCategory}
          switcherSettings={[...adminOrdersBtnsConfig]}
          changeConditionHandler={viewModel.onChangeSubCategory}
        />
      </div>
      <div className={classNames.datagridWrapper}>
        <CustomDataGrid
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          rowCount={viewModel.rowsCount}
          getRowId={row => row._id}
          rowHeight={100}
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
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          onRowSelectionModelChange={newSelection => viewModel.onSelectionModel(newSelection[0])}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onChangePaginationModelChange}
          onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>
    </div>
  )
})
