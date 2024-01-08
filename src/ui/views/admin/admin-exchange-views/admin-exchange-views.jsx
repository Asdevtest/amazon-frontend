import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { AdminExchangeStatusesCategories, adminExchangeBtnsConfig } from '@constants/table/tables-filter-btns-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './admin-exchange-views.style'

import { AdminExchangeViewModel } from './admin-exchange-views.model'

export const AdminExchangeViewsRaw = props => {
  const [viewModel] = useState(() => new AdminExchangeViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <div className={classNames.filterBtnWrapper}>
          <CustomSwitcher
            switchMode={'medium'}
            condition={viewModel.activeCategory}
            switcherSettings={[
              ...adminExchangeBtnsConfig,
              { label: () => t(TranslationKey.All), value: AdminExchangeStatusesCategories.all },
            ]}
            changeConditionHandler={viewModel.onChangeSubCategory}
          />
        </div>

        <div className={classNames.datagridWrapper}>
          <CustomDataGrid
            localeText={getLocalizationByLanguageTag()}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rowHeight={100}
            rows={viewModel.currentData}
            rowCount={viewModel.rowsCount}
            getRowId={row => row._id}
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
            loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
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
          updateDataHandler={() => viewModel.getProductsByStatus()}
          onClickOpenNewTab={id => viewModel.onClickShowProduct(id)}
        />
      )}
    </React.Fragment>
  )
}

export const AdminExchangeViews = withStyles(observer(AdminExchangeViewsRaw), styles)
