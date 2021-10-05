import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/adminAvatar.jpg'
import {AdminExchangeViewModel} from './admin-exchange-views.model'
import {styles} from './admin-exchange-views.style'

const textConsts = getLocalizedTexts(texts, 'en').adminProductsWaitingView
const activeCategory = 1

@observer
class AdminExchangeViewsRaw extends Component {
  viewModel = new AdminExchangeViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getProductsByStatus(this.viewModel.activeSubCategory)
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      activeSubCategory,
      drawerOpen,
      curPage,
      rowsPerPage,
      requestStatus,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      onChangeSubCategory,
      onTriggerDrawer,
      setDataGridState,
      onChangeSortingModel,
      onClickTableRow,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
          onChangeSubCategory={onChangeSubCategory}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            curUserRole={UserRole.ADMIN}
            setDrawerOpen={onTriggerDrawer}
            title={textConsts.appbarTitle}
          >
            <MainContent>
              <Typography paragraph variant="h5" className={classNames.example}>
                {textConsts.mainTitle}
              </Typography>
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
                rowHeight={100}
                rows={getCurrentData()}
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
                onStateChange={e => e.state.containerSizes?.isVirtualized && setDataGridState(e.state)}
                onRowDoubleClick={e => onClickTableRow(e.row)}
              />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const AdminExchangeViews = withStyles(styles)(AdminExchangeViewsRaw)
