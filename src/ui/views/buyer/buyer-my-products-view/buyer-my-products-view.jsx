import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { ProductStatus } from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { styles } from './buyer-my-products-view.style'

import { BuyerMyProductsViewModel } from './buyer-my-products-view.model'

const attentionStatuses = [
  ProductStatus.TO_BUYER_FOR_RESEARCH,
  ProductStatus.BUYER_PICKED_PRODUCT,
  ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
  ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT,
]

export const BuyerMyProductsViewRaw = props => {
  const { classes: styles, history } = props

  const [viewModel] = useState(() => new BuyerMyProductsViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const ideasSheldStyle = params =>
    (!params.row.originalData.ideasOnCheck && !!params.row.originalData.ideasVerified && styles.ideaRowGreen) ||
    (!!params.row.originalData.ideasOnCheck && styles.ideaRowYellow)

  const getRowClassName = params =>
    cx(ideasSheldStyle(params), {
      [styles.attentionRow]: attentionStatuses.includes(params.row.statusForAttention),
      [styles.attentionRowShort]:
        (!params.row.originalData.ideasOnCheck && !!params.row.originalData.ideasVerified) ||
        !!params.row.originalData.ideasOnCheck,
    })

  return (
    <>
      <div>
        <div className={styles.headerWrapper}>
          <SearchInput
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            inputClasses={styles.searchInput}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>

        <div className={styles.dataGridWrapper}>
          <CustomDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            getRowClassName={getRowClassName}
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.currentData}
            getRowHeight={() => 'auto'}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
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
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onPaginationModelChange}
            onRowClick={params => viewModel.onClickProductModal(params.row)}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>

        {viewModel.productCardModal && (
          <ProductCardModal
            role={viewModel.userInfo.role}
            history={viewModel.history}
            openModal={viewModel.productCardModal}
            setOpenModal={() => viewModel.onClickProductModal()}
            updateDataHandler={() => viewModel.loadData()}
            onClickOpenNewTab={id => viewModel.onClickShowProduct(id)}
          />
        )}
      </div>
    </>
  )
}

export const BuyerMyProductsView = withStyles(observer(BuyerMyProductsViewRaw), styles)
