import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {BatchInfoModal} from '@components/modals/batch-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/adminAvatar.jpg'
import {AdminWarehouseBatchesViewModel} from './admin-warehouse-batches-view.model'
import {styles} from './admin-warehouse-batches-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').adminBatchesView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const navbarActiveSubCategory = 2

@observer
class AdminWarehouseBatchesViewRaw extends Component {
  viewModel = new AdminWarehouseBatchesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      curBatch,
      showBatchInfoModal,
      onTriggerOpenModal,

      getCurrentData,
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,

      drawerOpen,
      curPage,
      rowsPerPage,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel
    const {classes: className} = this.props
    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.ADMIN}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            curUserRole={UserRole.ADMIN}
            user={textConsts.appUser}
            setDrawerOpen={onTriggerDrawer}
          >
            <MainContent>
              <div className={className.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  autoHeight
                  classes={{
                    row: className.row,
                  }}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  rowHeight={200}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={newSelection => {
                    onSelectionModel(newSelection)
                  }}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={setDataGridState}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <BatchInfoModal
          openModal={showBatchInfoModal}
          setOpenModal={() => onTriggerOpenModal('showBatchInfoModal')}
          batch={curBatch}
        />
      </React.Fragment>
    )
  }
}

export const AdminWarehouseBatchesView = withStyles(styles)(AdminWarehouseBatchesViewRaw)
