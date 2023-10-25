import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Grid } from '@mui/material'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { adminExchangeBtnsConfig } from '@constants/table/tables-filter-btns-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './admin-exchange-views.style'

import { AdminExchangeViewModel } from './admin-exchange-views.model'

export const AdminExchangeViewsRaw = props => {
  const [viewModel] = useState(() => new AdminExchangeViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
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
            localeText={getLocalizationByLanguageTag()}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rowHeight={100}
            rows={viewModel.currentData}
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
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export const AdminExchangeViews = withStyles(observer(AdminExchangeViewsRaw), styles)
