import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
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
          <CustomDataGrid
            useResizeContainer
            sortingMode="server"
            paginationMode="server"
            localeText={getLocalizationByLanguageTag()}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rowHeight={100}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
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
            getRowId={row => row._id}
            rowCount={viewModel.rowsCount}
            rows={viewModel.currentData}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            // onRowDoubleClick={row => viewModel.onClickTableRow(row._id)}
            onRowClick={params => viewModel.onClickProductModal(params.row)}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </div>

      {viewModel.productCardModal && (
        <ProductCardModal
          history={viewModel.history}
          openModal={viewModel.productCardModal}
          setOpenModal={() => viewModel.onClickProductModal()}
          updateDataHandler={() => viewModel.getProducts()}
          onClickOpenNewTab={id => viewModel.onClickShowProduct(id)}
        />
      )}
    </React.Fragment>
  )
}

export const AdminInventoryView = withStyles(observer(AdminInventoryViewRaw), styles)
