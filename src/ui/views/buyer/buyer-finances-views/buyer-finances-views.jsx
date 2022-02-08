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

import avatar from '../assets/buyerAvatar.jpg'
import {BuyerFinancesViewsModel} from './buyer-finances-views.model'
import {styles} from './buyer-finances-views.style'

const textConsts = getLocalizedTexts(texts, 'ru').buyerFinancesView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_FINANCES

@observer
class BuyerFinancesViewsRaw extends Component {
  viewModel = new BuyerFinancesViewsModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getPayments(this.viewModel.activeSubCategory)
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
      rowsPerPage,
      curPage,
      onChangeDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    const getRowClassName = params =>
      params.getValue(params.id, 'sum') < 0
        ? classNames.redRow
        : params.getValue(params.id, 'sum') > 0 && classNames.greenRow

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.BUYER}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            curUserRole={UserRole.BUYER}
            setDrawerOpen={onChangeDrawerOpen}
          >
            <MainContent>
              <div className={classNames.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  autoHeight
                  getRowClassName={getRowClassName}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  rowHeight={75}
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
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const BuyerFinancesViews = withStyles(styles)(BuyerFinancesViewsRaw)
