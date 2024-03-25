import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { ProductStatusByCode, productStatusTranslateKey } from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './supervisor-products-view.style'

import { attentionStatuses, statusesList } from './statuses'
import { SupervisorProductsViewModel } from './supervisor-products-view.model'

export const SupervisorProductsView = observer(({ history }) => {
  const [viewModel] = useState(() => new SupervisorProductsViewModel({ history }))

  const { classes: styles } = useStyles()

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params => attentionStatuses.includes(params.row.statusForAttention) && styles.attentionRow

  const switcherSettingsConfig = statusesList.map(el => ({
    icon: <span className={styles.badge}>{viewModel.userInfo[el.userInfoKey]}</span>,
    label: () => t(productStatusTranslateKey(ProductStatusByCode[el.status])),
    value: el.userInfoKey,
  }))

  return (
    <>
      <CustomSwitcher
        switchMode="medium"
        condition={viewModel.currentStatusGroup}
        switcherSettings={switcherSettingsConfig}
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
          useResizeContainer
          checkboxSelection
          disableRowSelectionOnClick
          rowCount={viewModel.rowCount}
          localeText={getLocalizationByLanguageTag()}
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
          density={viewModel.densityModel}
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
