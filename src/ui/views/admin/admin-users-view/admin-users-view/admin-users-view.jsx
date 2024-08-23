import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './admin-users-view.style'

import { switcherConfig } from './admin-users-view.config'
import { AdminUsersViewModel } from './admin-users-view.model'

export const AdminUsersView = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new AdminUsersViewModel())

  return (
    <>
      <div className={styles.headerWrapper}>
        <p className={styles.usersOnlineWrapper}>
          {t(TranslationKey['Users online'])}: {viewModel.meta?.onlineUsers}
        </p>
        <CustomSwitcher
          switchMode="medium"
          condition={viewModel.switcherCondition}
          switcherSettings={switcherConfig}
          changeConditionHandler={viewModel.onClickChangeRole}
        />

        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.currentSearchValue}
          placeholder={t(TranslationKey['Search by name, email'])}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>

      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          pinnedColumns={viewModel.pinnedColumns}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          getRowHeight={() => 'auto'}
          rowCount={viewModel.rowCount}
          rows={viewModel.currentData}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
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
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>
    </>
  )
})
