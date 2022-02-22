import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientFinancesViewsModel} from './client-finances-views.model'
import {styles} from './client-finances-views.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientFinancesView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_FINANCES

@observer
class ClientFinancesViewsRaw extends Component {
  viewModel = new ClientFinancesViewsModel({history: this.props.history})

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
            setDrawerOpen={onChangeDrawerOpen}
          >
            <MainContent>
              <DataGrid
                pagination
                useResizeContainer
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
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientFinancesViews = withStyles(styles)(ClientFinancesViewsRaw)
