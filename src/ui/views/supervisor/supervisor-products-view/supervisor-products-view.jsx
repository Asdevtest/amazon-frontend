import { cx } from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Button } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import {
  ProductStatus,
  ProductStatusByCode,
  ProductStatusByKey,
  productStatusTranslateKey,
} from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

import { SupervisorProductsViewModel } from './supervisor-products-view.model'
import { styles } from './supervisor-products-view.style'

const allowProductStatuses = [
  `${ProductStatusByKey[ProductStatus.DEFAULT]}`,
  `${ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT]}`,
  `${ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]}`,
  `${ProductStatusByKey[ProductStatus.SUPPLIER_FOUND]}`,
  `${ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT]}`,
  `${ProductStatusByKey[ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND]}`,
  `${ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR]}`,
  `${ProductStatusByKey[ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE]}`,
  `${ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP]}`,
  `${ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT]}`,
]

const attentionStatuses = [
  ProductStatus.BUYER_FOUND_SUPPLIER,
  ProductStatus.NEW_PRODUCT,
  ProductStatus.RESEARCHER_FOUND_SUPPLIER,
  ProductStatus.CHECKED_BY_SUPERVISOR,

  ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
  ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,

  ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR,
  ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER,
  ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
  ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
  ProductStatus.RESEARCHER_CREATED_PRODUCT,
]

export const SupervisorProductsViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new SupervisorProductsViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
    viewModel.getDataGridState()
  }, [])

  const getRowClassName = params => attentionStatuses.includes(params.row.statusForAttention) && classNames.attentionRow

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.headerWrapper}>
          {Object.keys({
            ...getObjectFilteredByKeyArrayWhiteList(ProductStatusByCode, allowProductStatuses),
          }).map((status, statusIndex) => {
            const count = viewModel.getProductsCountByStatus(status)

            return (
              <Button
                key={statusIndex}
                variant="text"
                disabled={!count}
                // disabled={Number(statusIndex) === Number(currentFilterStatus)}
                className={cx(classNames.selectStatusFilterButton, {
                  [classNames.selectedStatusFilterButton]: Number(status) === Number(viewModel.currentFilterStatus),
                })}
                onClick={() => viewModel.onClickStatusFilterButton(status)}
              >
                {t(productStatusTranslateKey(ProductStatusByCode[status]))}{' '}
                {count >= 1 && <span className={classNames.badge}>{count}</span>}
              </Button>
            )
          })}

          <div className={classNames.searchInputWrapper}>
            <SearchInput
              inputClasses={classNames.searchInput}
              value={viewModel.nameSearchValue}
              placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
              onChange={viewModel.onChangeNameSearchValue}
            />
          </div>
        </div>
        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
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
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            page={viewModel.curPage}
            pageSize={viewModel.rowsPerPage}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            rowHeight={100}
            components={{
              Toolbar: DataGridCustomToolbar,
              ColumnMenuIcon: FilterAltOutlinedIcon,
            }}
            componentsProps={{
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  changeColumnsModel: viewModel.changeColumnsModel,
                },
              },
            }}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onRowSelectionModelChange={newSelection => {
              viewModel.onSelectionModel(newSelection[0])
            }}
            onSortModelChange={viewModel.onChangeSortingModel}
            onPageSizeChange={viewModel.onChangeRowsPerPage}
            onPageChange={viewModel.onChangeCurPage}
            onStateChange={viewModel.setDataGridState}
            onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const SupervisorProductsView = withStyles(observer(SupervisorProductsViewRaw), styles)
