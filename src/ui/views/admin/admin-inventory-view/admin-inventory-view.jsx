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
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/adminAvatar.jpg'
import {AdminInventoryViewModel} from './admin-inventory-view.model'
import {styles} from './admin-inventory-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminInventoryView

@observer
export class AdminInventoryViewRaw extends Component {
  viewModel = new AdminInventoryViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getProducts()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      requestStatus,
      drawerOpen,
      curPage,
      rowsPerPage,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      onTriggerDrawer,
      setDataGridState,
      onChangeSortingModel,
      onClickTableRow,
      onChangeFilterModel,
    } = this.viewModel

    const activeCategory = navBarActiveCategory.NAVBAR_INVENTORY
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            curUserRole={UserRole.ADMIN}
            setDrawerOpen={onTriggerDrawer}
            title={textConsts.appbarTitle}
          >
            <MainContent>
              <DataGrid
                pagination
                useResizeContainer
                autoHeight
                classes={{
                  row: classNames.row,
                }}
                density={densityModel}
                columns={columnsModel}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowHeight={100}
                rowsPerPageOptions={[15, 25, 50, 100]}
                loading={requestStatus === loadingStatuses.isLoading}
                components={{
                  Toolbar: GridToolbar,
                }}
                rows={getCurrentData()}
                onSelectionModelChange={newSelection => {
                  onSelectionModel(newSelection[0])
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onRowDoubleClick={e => onClickTableRow(e.row)}
                onFilterModelChange={model => onChangeFilterModel(model)}
              />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const AdminInventoryView = withStyles(styles)(AdminInventoryViewRaw)
