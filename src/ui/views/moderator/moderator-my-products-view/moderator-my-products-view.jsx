import { observer } from 'mobx-react'
import React from 'react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { styles } from './moderator-my-products-view.style'

export const ModeratorMyProductsViewRaw = props => {
  // const [viewModel] = useState(() => new ModeratorMyProductsViewModel({ history: props.history }));
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <div>
        <Typography className={classNames.inProcess}>{'В разработке...'}</Typography>
        {/* <CustomDataGrid
                useResizeContainer
                localeText={getLocalizationByLanguageTag()}
                getRowClassName={getRowClassName}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                
                rows={getCurrentData()}
                rowHeight={100}
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
      </div>
    </React.Fragment>
  )
}

export const ModeratorMyProductsView = withStyles(observer(ModeratorMyProductsViewRaw), styles)
