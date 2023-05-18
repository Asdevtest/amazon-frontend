import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Grid} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {adminExchangeBtnsConfig} from '@constants/table/tables-filter-btns-configs'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {MainContent} from '@components/layout/main-content'
import {Button} from '@components/shared/buttons/button'
import {MemoDataGrid} from '@components/shared/memo-data-grid'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'

import {AdminExchangeViewModel} from './admin-exchange-views.model'
import {styles} from './admin-exchange-views.style'

export const AdminExchangeViewsRaw = props => {
  const [viewModel] = useState(() => new AdminExchangeViewModel({history: props.history}))
  const {classes: classNames} = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <Grid container spacing={2} className={classNames.filterBtnWrapper}>
          {adminExchangeBtnsConfig()?.map((buttonConfig, index) => (
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
            rowsPerPageOptions={[15, 25, 50, 100]}
            rowHeight={100}
            rows={viewModel.getCurrentData()}
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

export const AdminExchangeViews = withStyles(observer(AdminExchangeViewsRaw), styles)
