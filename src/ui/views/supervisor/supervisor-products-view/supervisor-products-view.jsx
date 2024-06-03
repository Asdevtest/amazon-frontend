import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './supervisor-products-view.style'

import { filterStatusConfig, warningStatuses } from './supervisor-products-view.constants'
import { SupervisorProductsViewModel } from './supervisor-products-view.model'

export const SupervisorProductsView = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new SupervisorProductsViewModel())

  const customSwitcherConfig = filterStatusConfig.map(status => ({
    icon: viewModel.userInfo[status.userInfoKey] ? (
      <span className={styles.badge}>{viewModel.userInfo[status.userInfoKey]}</span>
    ) : null,
    label: () => t(status.label),
    value: status.value,
  }))

  const getRowClassName = params => warningStatuses.includes(params.row.statusForAttention) && styles.attentionRow

  return (
    <>
      <CustomSwitcher
        switchMode="medium"
        condition={viewModel.switcherFilterStatuses}
        switcherSettings={customSwitcherConfig}
        changeConditionHandler={viewModel.onClickStatusFilterButton}
      />

      <div className={styles.searchInputWrapper}>
        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.nameSearchValue}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>

      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          disableRowSelectionOnClick
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          pinnedColumns={viewModel.pinnedColumns}
          paginationModel={viewModel.paginationModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }) => _id}
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
              sortSettings: {
                sortModel: viewModel.sortModel,
                columnsModel: viewModel.columnsModel,
                onSortModelChange: viewModel.onChangeSortingModel,
              },
            },
          }}
          rowCount={viewModel.rowCount}
          getRowClassName={getRowClassName}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onPinnedColumnsChange={viewModel.handlePinColumn}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onRowDoubleClick={({ row }) => viewModel.onClickProductModal(row?._id)}
        />
      </div>

      {viewModel.showProductModal && (
        <ProductCardModal
          role={viewModel.userInfo.role}
          history={viewModel.history}
          openModal={viewModel.showProductModal}
          setOpenModal={viewModel.onClickProductModal}
          updateDataHandler={viewModel.getCurrentData}
          onClickOpenNewTab={id => viewModel.onClickTableRow(id)}
        />
      )}
    </>
  )
})
