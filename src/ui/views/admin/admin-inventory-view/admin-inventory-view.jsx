import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { AdminInventoryViewModel } from './admin-inventory-view.model'
import { styles } from './admin-inventory-view.style'

export const AdminInventoryViewRaw = props => {
  const [viewModel] = useState(() => new AdminInventoryViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.getProducts()
    viewModel.getDataGridState()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.topHeaderBtnsWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>
        <MemoDataGrid
          pagination
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          classes={{
            row: classNames.row,
            root: classNames.root,
            footerContainer: classNames.footerContainer,
            footerCell: classNames.footerCell,
            toolbarContainer: classNames.toolbarContainer,
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          page={viewModel.curPage}
          pageSize={viewModel.rowsPerPage}
          rowHeight={100}
          pageSizeOptions={[15, 25, 50, 100]}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
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
          rows={viewModel.currentData}
          onRowSelectionModelChange={newSelection => {
            viewModel.onSelectionModel(newSelection[0])
          }}
          onSortModelChange={viewModel.onChangeSortingModel}
          onPageSizeChange={viewModel.onChangeRowsPerPage}
          onPageChange={viewModel.onChangeCurPage}
          onStateChange={viewModel.setDataGridState}
          onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
          onFilterModelChange={model => viewModel.onChangeFilterModel(model)}
        />
      </MainContent>
    </React.Fragment>
  )
}

export const AdminInventoryView = withStyles(observer(AdminInventoryViewRaw), styles)
