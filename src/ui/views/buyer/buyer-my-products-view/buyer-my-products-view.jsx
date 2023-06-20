import { cx } from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { ProductStatus } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { BuyerMyProductsViewModel } from './buyer-my-products-view.model'
import { styles } from './buyer-my-products-view.style'
import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'

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
    })

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.headerWrapper}>
          <SearchInput
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>

        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
            disableVirtualization
            pagination
            useResizeContainer
            localeText={getLocalizationByLanguageTag()}
            classes={{
              row: classNames.row,
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            getRowClassName={getRowClassName}
            sortingMode="server"
            paginationMode="server"
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
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
              columnMenu: DataGridCustomColumnMenuComponent,
            }}
            slotProps={{
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
            onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const BuyerMyProductsView = withStyles(observer(BuyerMyProductsViewRaw), styles)
