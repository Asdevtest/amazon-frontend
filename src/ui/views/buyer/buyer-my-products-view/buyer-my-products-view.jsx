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

  const getRowClassName = params =>
    cx(
      { [classNames.attentionRow]: attentionStatuses.includes(params.row.statusForAttention) },
      { [classNames.ideaRow]: !!params.row.originalData.ideaCount },
    )

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.headerWrapper}>
          <SearchInput
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>

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
          page={viewModel.curPage}
          pageSize={viewModel.rowsPerPage}
          rowsPerPageOptions={[15, 25, 50, 100]}
          rows={viewModel.currentData}
          rowHeight={160}
          components={{
            Toolbar: DataGridCustomToolbar,
            ColumnMenuIcon: FilterAltOutlinedIcon,
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          componentsProps={{
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                changeColumnsModel: viewModel.changeColumnsModel,
              },
            },
          }}
          onSelectionModelChange={newSelection => {
            viewModel.onSelectionModel(newSelection[0])
          }}
          onSortModelChange={viewModel.onChangeSortingModel}
          onPageSizeChange={viewModel.onChangeRowsPerPage}
          onPageChange={viewModel.onChangeCurPage}
          onStateChange={viewModel.setDataGridState}
          onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
          onFilterModelChange={model => viewModel.onChangeFilterModel(model)}
        />
      </MainContent>
    </React.Fragment>
  )
}

export const BuyerMyProductsView = withStyles(observer(BuyerMyProductsViewRaw), styles)
