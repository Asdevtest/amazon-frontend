import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { ProductStatus } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './buyer-my-products-view.style'

import { BuyerMyProductsViewModel } from './buyer-my-products-view.model'

const attentionStatuses = [
  ProductStatus.TO_BUYER_FOR_RESEARCH,
  ProductStatus.BUYER_PICKED_PRODUCT,
  ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
  ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT,
]

export const BuyerMyProductsViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new BuyerMyProductsViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const ideasSheldStyle = params =>
    (!params.row.originalData.ideasOnCheck && !!params.row.originalData.ideasVerified && classNames.ideaRowGreen) ||
    (!!params.row.originalData.ideasOnCheck && classNames.ideaRowYellow)

  const getRowClassName = params =>
    cx(ideasSheldStyle(params), {
      [classNames.attentionRow]: attentionStatuses.includes(params.row.statusForAttention),
      [classNames.attentionRowShort]:
        (!params.row.originalData.ideasOnCheck && !!params.row.originalData.ideasVerified) ||
        !!params.row.originalData.ideasOnCheck,
    })

  return (
    <React.Fragment>
      <div>
        <div className={classNames.headerWrapper}>
          <SearchInput
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            inputClasses={classNames.searchInput}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>

        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
            useResizeContainer
            checkboxSelection
            disableRowSelectionOnClick
            localeText={getLocalizationByLanguageTag()}
            getRowClassName={getRowClassName}
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            rowHeight={160}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
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
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
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
    </React.Fragment>
  )
}

export const BuyerMyProductsView = withStyles(observer(BuyerMyProductsViewRaw), styles)
