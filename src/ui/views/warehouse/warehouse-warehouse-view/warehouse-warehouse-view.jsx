import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {storekeeperUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {warehouseBoxesViewColumns} from '@components/table-columns/warehouse/warehouse-boxes-columns'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseWarehouseViewModel} from './warehouse-warehouse-view.model'
import {styles} from './warehouse-warehouse-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseWarehouseView

const activeCategory = 5
@observer
export class WarehouseWarehouseViewRaw extends Component {
  viewModel = new WarehouseWarehouseViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      getCurrentData,
      sortModel,
      filterModel,
      requestStatus,

      drawerOpen,
      curPage,
      rowsPerPage,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          curUserRole={UserRole.STOREKEEPER}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={storekeeperUsername}
            curUserRole={UserRole.STOREKEEPER}
          >
            <MainContent>
              <Typography paragraph variant="h5">
                {textConsts.mainTitle}
              </Typography>
              <div className={classNames.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  classes={{
                    row: classNames.row,
                  }}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rows={getCurrentData()}
                  rowHeight={200}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  columns={warehouseBoxesViewColumns()}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={newSelection => {
                    onSelectionModel(newSelection.selectionModel[0])
                  }}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={e => setDataGridState(e.state)}
                />
              </div>

              {/* <Table
                currentPage={curPage}
                data={boxesMy}
                handlerPageChange={onChangeCurPage}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(boxesMy.length / rowsPerPage)}
                BodyRow={WarehouseBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
              /> */}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const WarehouseWarehouseView = withStyles(styles)(WarehouseWarehouseViewRaw)
