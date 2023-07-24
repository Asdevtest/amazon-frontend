import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './buyer-ideas-notifications-view.style'

import { BuyerIdeasNotificationsViewModel } from './buyer-ideas-notifications-view.model'

export const BuyerIdeasNotificationsViewRaw = props => {
  const [viewModel] = useState(() => new BuyerIdeasNotificationsViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <Button variant="outlined" className={classNames.archiveHandler} onClick={viewModel.handleArchive}>
          {viewModel.isArchived ? t(TranslationKey['New notifications']) : t(TranslationKey['Open archive'])}
        </Button>

        <div className={classNames.tableWrapper}>
          <MemoDataGrid
            pagination
            useResizeContainer
            disableVirtualization
            localeText={getLocalizationByLanguageTag()}
            classes={{
              row: classNames.row,
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.getCurrentData()}
            // getRowHeight={() => 'auto'}
            rowHeight={120}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
            }}
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
      </MainContent>
    </React.Fragment>
  )
}

export const BuyerIdeasNotificationsView = withStyles(observer(BuyerIdeasNotificationsViewRaw), styles)
