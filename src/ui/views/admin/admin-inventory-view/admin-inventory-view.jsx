import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './admin-inventory-view.style'

import { AdminInventoryViewModel } from './admin-inventory-view.model'

export const AdminInventoryViewRaw = props => {
  const [viewModel] = useState(() => new AdminInventoryViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.getProducts()
    viewModel.getDataGridState()
  }, [])

  return (
    <React.Fragment>
      <div>
        <div className={classNames.topHeaderBtnsWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>
        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            useResizeContainer
            localeText={getLocalizationByLanguageTag()}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rowHeight={100}
            pageSizeOptions={[15, 25, 50, 100]}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
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
            rows={viewModel.currentData}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export const AdminInventoryView = withStyles(observer(AdminInventoryViewRaw), styles)
