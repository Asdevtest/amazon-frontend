import { cx } from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Grid } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { adminOrdersBtnsConfig } from '@constants/table/tables-filter-btns-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { AdminOrdersAllViewModel } from './admin-orders-views.model'
import { styles } from './admin-orders-views.style'

export const AdminOrdersViewsRaw = props => {
  const [viewModel] = useState(() => new AdminOrdersAllViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.getOrdersByStatus(viewModel.activeSubCategory)
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
        <Grid container spacing={1} className={classNames.filterBtnWrapper}>
          {adminOrdersBtnsConfig()?.map((buttonConfig, index) => (
            <Grid key={index} item>
              <Button
                variant={'text'}
                className={cx(classNames.filterBtn, {
                  [classNames.currentFilterBtn]: viewModel.activeSubCategory === index,
                })}
                onClick={() => viewModel.onChangeSubCategory(index)}
              >
                {buttonConfig.label}
              </Button>
            </Grid>
          ))}
        </Grid>
        <div className={classNames.datagridWrapper}>
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
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            page={viewModel.curPage}
            pageSize={viewModel.rowsPerPage}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            rowHeight={100}
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
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const AdminOrdersViews = withStyles(observer(AdminOrdersViewsRaw), styles)
