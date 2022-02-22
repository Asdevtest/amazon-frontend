import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {adminOrdersBtnsConfig} from '@constants/tables-filter-btns-configs'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {ColoredChip} from '@components/colored-chip'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/adminAvatar.jpg'
import {AdminOrdersAllViewModel} from './admin-orders-views.model'
import {styles} from './admin-orders-views.style'

const textConsts = getLocalizedTexts(texts, 'ru').adminOrdersView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_ORDERS

@observer
class AdminOrdersViewsRaw extends Component {
  viewModel = new AdminOrdersAllViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getOrdersByStatus(this.viewModel.activeSubCategory)
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
      activeSubCategory,
      onChangeDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      onChangeSubCategory,

      setDataGridState,
      onChangeSortingModel,
      onClickTableRow,
      onChangeFilterModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          user={textConsts.appUser}
          onChangeSubCategory={onChangeSubCategory}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            setDrawerOpen={onChangeDrawerOpen}
          >
            <MainContent>
              <Grid container spacing={2}>
                {adminOrdersBtnsConfig.map((buttonConfig, index) => (
                  <Grid key={buttonConfig.statusKey} item>
                    <ColoredChip
                      label={buttonConfig.label}
                      color={buttonConfig.color}
                      colorHover={buttonConfig.colorHover}
                      selected={activeSubCategory === index}
                      onClick={() => onChangeSubCategory(index)}
                    />
                  </Grid>
                ))}
              </Grid>

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
              />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const AdminOrdersViews = withStyles(styles)(AdminOrdersViewsRaw)
