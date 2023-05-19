import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ClientIdeasNotificationsViewModel } from './client-ideas-notifications-view.model'
import { styles } from './client-ideas-notifications-view.style'

export const ClientIdeasNotificationsViewRaw = props => {
  const [viewModel] = useState(() => new ClientIdeasNotificationsViewModel({ history: props.history }))
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
            page={viewModel.curPage}
            pageSize={viewModel.rowsPerPage}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.getCurrentData()}
            // getRowHeight={() => 'auto'}
            rowHeight={120}
            components={{
              Toolbar: DataGridCustomToolbar,
              ColumnMenuIcon: FilterAltOutlinedIcon,
            }}
            componentsProps={{
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  changeColumnsModel: viewModel.changeColumnsModel,
                },
              },
            }}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onPageSizeChange={viewModel.onChangeRowsPerPage}
            onPageChange={viewModel.onChangeCurPage}
            onStateChange={viewModel.setDataGridState}
            onRowDoubleClick={e => viewModel.setCurrentOpenedBox(e.row.originalData)}
            onFilterModelChange={model => viewModel.onChangeFilterModel(model)}
          />
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const ClientIdeasNotificationsView = withStyles(observer(ClientIdeasNotificationsViewRaw), styles)
