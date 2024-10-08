import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { styles } from './admin-inventory-view.style'

import { AdminInventoryViewModel } from './admin-inventory-view.model'

export const AdminInventoryViewRaw = props => {
  const [viewModel] = useState(() => new AdminInventoryViewModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.getProducts()
    viewModel.getDataGridState()
  }, [])

  return (
    <>
      <div>
        <div className={styles.topHeaderBtnsWrapper}>
          <SearchInput
            inputClasses={styles.searchInput}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>
        <div className={styles.datagridWrapper}>
          <CustomDataGrid
            sortingMode="server"
            paginationMode="server"
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rowHeight={100}
            loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
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
            onPaginationModelChange={viewModel.onPaginationModelChange}
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
    </>
  )
}

export const AdminInventoryView = withStyles(observer(AdminInventoryViewRaw), styles)
