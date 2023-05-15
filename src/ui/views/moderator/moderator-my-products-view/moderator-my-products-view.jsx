// import { GridToolbar} from '@mui/x-data-grid'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

// import {MemoDataGrid} from '@components/memo-data-grid'
import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

// import {loadingStatuses} from '@constants/loading-statuses'
// import {ProductStatus} from '@constants/product-status'
import {MainContent} from '@components/layout/main-content'

// import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {ModeratorMyProductsViewModel} from './moderator-my-products-view.model'
import {styles} from './moderator-my-products-view.style'

// const attentionStatuses = [ProductStatus.BUYER_PICKED_PRODUCT, ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT]
@observer
export class ModeratorMyProductsViewRaw extends Component {
  viewModel = new ModeratorMyProductsViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    const {classes: classNames} = this.props

    // const getRowClassName = params =>
    //   attentionStatuses.includes(params.row.status) && classNames.attentionRow

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
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={100}
                components={{
                  Toolbar: GridToolbar,
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                onSelectionModelChange={newSelection => {
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
}

export const ModeratorMyProductsView = withStyles(ModeratorMyProductsViewRaw, styles)
