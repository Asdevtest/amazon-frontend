import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Button } from '@mui/material'

import {
  ProductStatus,
  ProductStatusByCode,
  ProductStatusByKey,
  ProductStatusGroups,
  productStatusTranslateKey,
} from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './supervisor-products-view.style'

import { SupervisorProductsViewModel } from './supervisor-products-view.model'

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

const statusesList = [
  {
    userInfoKey: ProductStatusGroups.allProducts,
    status: ProductStatusByKey[ProductStatus.DEFAULT],
  },
  {
    userInfoKey: ProductStatusGroups.atTheBuyerInWork,
    status: ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT],
  },
  {
    userInfoKey: ProductStatusGroups.buyerFoundSupplier,
    status: ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
  },
  {
    userInfoKey: ProductStatusGroups.paidByTheClient,
    status: ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  },
  {
    userInfoKey: ProductStatusGroups.productIsAppropriate,
    status: ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR],
  },
  {
    userInfoKey: ProductStatusGroups.rejectedBySupervisor,
    status: ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
  },
  {
    userInfoKey: ProductStatusGroups.searchComplete,
    status: ProductStatusByKey[ProductStatus.SUPPLIER_FOUND],
  },
  {
    userInfoKey: ProductStatusGroups.supplierPriceDoesNotFit,
    status: ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
  },
  {
    userInfoKey: ProductStatusGroups.supplierWasNotFound,
    status: ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
  },
  {
    userInfoKey: ProductStatusGroups.onCheckWithSupervisor,
    status: ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT],
  },
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
      <div>
        <div className={classNames.headerWrapper}>
          {statusesList.map(el => (
            <Button
              key={el.status}
              variant="text"
              disabled={!viewModel.userInfo[el.userInfoKey]}
              // disabled={Number(statusIndex) === Number(currentFilterStatus)}
              className={cx(classNames.selectStatusFilterButton, {
                [classNames.selectedStatusFilterButton]: el.userInfoKey === viewModel.currentStatusGroup,
              })}
              onClick={() => viewModel.onClickStatusFilterButton(el.userInfoKey)}
            >
              {t(productStatusTranslateKey(ProductStatusByCode[el.status]))}{' '}
              <span className={classNames.badge}>{viewModel.userInfo[el.userInfoKey]}</span>
            </Button>
          ))}
        </div>
        <div className={classNames.searchInputWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            value={viewModel.nameSearchValue}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            onChange={viewModel.onChangeNameSearchValue}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>
        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
            pagination
            useResizeContainer
            checkboxSelection
            rowCount={viewModel.rowCount}
            sortingMode="server"
            paginationMode="server"
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
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            getRowHeight={() => 'auto'}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
              columnMenu: DataGridCustomColumnMenuComponent,
            }}
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
            onClickOpenNewTab={row => viewModel.onClickTableRow(row)}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export const SupervisorProductsView = withStyles(observer(SupervisorProductsViewRaw), styles)
