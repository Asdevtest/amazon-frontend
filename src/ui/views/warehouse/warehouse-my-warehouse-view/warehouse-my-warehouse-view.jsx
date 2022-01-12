import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {onStateChangeHandler} from '@utils/data-grid-handlers'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {WarehouseMyWarehouseViewModel} from './warehouse-my-warehouse-view.model'
import {styles} from './warehouse-my-warehouse-view.style'

const textConsts = getLocalizedTexts(texts, 'en').warehouseMyWarehouseView

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = null
@observer
export class WarehouseMyWarehouseViewRaw extends Component {
  viewModel = new WarehouseMyWarehouseViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      drawerOpen,
      curPage,
      rowsPerPage,
      selectedBoxes,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,

      onChangeFilterModel,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          curUserRole={UserRole.STOREKEEPER}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            setDrawerOpen={onTriggerDrawer}
            title={textConsts.appbarTitle}
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
                  autoHeight
                  checkboxSelection
                  isRowSelectable={params => params.row.isDraft === false}
                  getRowClassName={params => params.getValue(params.id, 'isDraft') === true && classNames.isDraftRow}
                  selectionModel={selectedBoxes}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rows={getCurrentData()}
                  rowHeight={150}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                  onStateChange={e => onStateChangeHandler(e, setDataGridState)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const WarehouseMyWarehouseView = withStyles(styles)(WarehouseMyWarehouseViewRaw)
