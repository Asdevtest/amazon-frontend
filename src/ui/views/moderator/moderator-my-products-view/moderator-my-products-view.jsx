import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { styles } from './moderator-my-products-view.style'

export const ModeratorMyProductsViewRaw = props => {
  // const [viewModel] = useState(() => new ModeratorMyProductsViewModel({ history: props.history }));
  const { classes: styles } = props

  return (
    <>
      <div>
        <p className={styles.inProcess}>{'В разработке...'}</p>
        {/* <CustomDataGrid
                getRowClassName={getRowClassName}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                
                rows={getCurrentData()}
                getRowHeight={() => 'auto'}
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
