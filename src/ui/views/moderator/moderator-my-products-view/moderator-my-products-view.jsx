import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { styles } from './moderator-my-products-view.style'

export const ModeratorMyProductsViewRaw = props => {
  // const [viewModel] = useState(() => new ModeratorMyProductsViewModel({ history: props.history }));
  const { classes: styles } = props

  return (
    <>
      <div>
        <Typography className={styles.inProcess}>{'В разработке...'}</Typography>
        {/* <CustomDataGrid
                getRowClassName={getRowClassName}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                
                rows={getCurrentData()}
                rowHeight={100}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatus.IS_LOADING}
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
    </>
  )
}

export const ModeratorMyProductsView = withStyles(observer(ModeratorMyProductsViewRaw), styles)
