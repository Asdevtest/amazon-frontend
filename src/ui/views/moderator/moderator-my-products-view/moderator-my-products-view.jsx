import { observer } from 'mobx-react'
import React from 'react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { MainContent } from '@components/layout/main-content'

import { styles } from './moderator-my-products-view.style'

export const ModeratorMyProductsViewRaw = props => {
  // const [viewModel] = useState(() => new ModeratorMyProductsViewModel({ history: props.history }));
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <MainContent>
        <Typography className={classNames.inProcess}>{'В разработке...'}</Typography>
        {/* <MemoDataGrid
                pagination
                useResizeContainer
                sx={{
                  border: 0,
                  boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                  backgroundColor: theme.palette.background.general,
                }}
                localeText={getLocalizationByLanguageTag()}
                classes={{
                  row: classNames.row,
                }}
                getRowClassName={getRowClassName}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                pageSizeOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={100}
                components={{
                  Toolbar: GridToolbar,
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                onRowSelectionModelChange={newSelection => {
                  onSelectionModel(newSelection[0])
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onRowDoubleClick={e => onClickTableRow(e.row)}
                onFilterModelChange={model => onChangeFilterModel(model)}
              /> */}
      </MainContent>
    </React.Fragment>
  )
}

export const ModeratorMyProductsView = withStyles(observer(ModeratorMyProductsViewRaw), styles)
