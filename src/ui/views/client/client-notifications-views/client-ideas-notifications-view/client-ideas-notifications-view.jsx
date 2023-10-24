import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './client-ideas-notifications-view.style'

import { ClientIdeasNotificationsViewModel } from './client-ideas-notifications-view.model'

export const ClientIdeasNotificationsViewRaw = props => {
  const [viewModel] = useState(() => new ClientIdeasNotificationsViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <Button variant="outlined" className={classNames.archiveHandler} onClick={viewModel.handleArchive}>
          {viewModel.isArchived ? t(TranslationKey['New notifications']) : t(TranslationKey['Open archive'])}
        </Button>

        <div className={classNames.tableWrapper}>
          <MemoDataGrid
            useResizeContainer
            localeText={getLocalizationByLanguageTag()}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.getCurrentData()}
            rowHeight={120}
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
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onRowDoubleClick={e => viewModel.setCurrentOpenedBox(e.row.originalData)}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export const ClientIdeasNotificationsView = withStyles(observer(ClientIdeasNotificationsViewRaw), styles)
