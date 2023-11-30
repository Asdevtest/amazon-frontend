import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { ClientFreelanceNotificationsViewModel } from '@views/client/client-notifications-views/client-freelance-notifications-view/client-freelance-notifications-view.model'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './client-freelance-notifications-view.styles'

export const ClientFreelanceNotificationsView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientFreelanceNotificationsViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <div className={styles.tableWrapper}>
      <CustomDataGrid
        useResizeContainer
        sortingMode="client"
        paginationMode="client"
        localeText={getLocalizationByLanguageTag()}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        rowHeight={120}
        rowCount={viewModel.rowCount}
        getRowId={row => row._id}
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
          },
        }}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatuses.isLoading}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        // onRowDoubleClick={e => viewModel.setCurrentOpenedBox(e.row.originalData)}
        onFilterModelChange={viewModel.onChangeFilterModel}
      />
    </div>
  )
})
