import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

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

export const SupervisorProductsView = observer(({ history }) => {
  const [viewModel] = useState(() => new SupervisorProductsViewModel({ history }))

  const { classes: styles } = useStyles()

  useEffect(() => {
    viewModel.loadData()
  }, [])

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
        condition={viewModel.currentStatusGroup}
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
          checkboxSelection
          disableRowSelectionOnClick
          rowCount={viewModel.rowCount}
          getRowClassName={getRowClassName}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
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
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.isLoading}
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
          onClickOpenNewTab={id => viewModel.onClickTableRow(id)}
        />
      )}
    </>
  )
})
