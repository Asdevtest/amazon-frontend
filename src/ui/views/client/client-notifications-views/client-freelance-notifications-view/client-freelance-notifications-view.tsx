import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { ClientFreelanceNotificationsViewModel } from '@views/client/client-notifications-views/client-freelance-notifications-view/client-freelance-notifications-view.model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IFreelanceNotice } from '@typings/shared/info-counters'

import { useStyles } from './client-freelance-notifications-view.style'

export const ClientFreelanceNotificationsView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientFreelanceNotificationsViewModel())

  return (
    <div className={styles.tableWrapper}>
      <CustomDataGrid
        sortingMode="client"
        paginationMode="client"
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        pinnedColumns={viewModel.pinnedColumns}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        getRowId={(row: IFreelanceNotice) => row?.chatId}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        rowSelectionModel={viewModel.selectedRows}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },

          toolbar: {
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
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onFilterModelChange={viewModel.onChangeFilterModel}
      />
    </div>
  )
})
