import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ClientLast30DaySellerBoardViewModel} from './client-last-30-day-seller-board-view.model'
import {styles} from './client-last-30-day-seller-board-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientLast30DaySellerBoardView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_INTEGRATIONS
const navbarActiveSubCategory = 1

@observer
class ClientLast30DaySellerBoardViewRaw extends Component {
  viewModel = new ClientLast30DaySellerBoardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      currentShop,
      shopsData,
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

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onClickShopBtn,
    } = this.viewModel
    const {classes: className} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />

        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawer}>
            <MainContent>
              <div className={className.shopsFiltersWrapper}>
                <Button
                  disabled={!currentShop?._id}
                  className={clsx({[className.selectedShopBtn]: !currentShop?._id})}
                  variant="text"
                  color="primary"
                  onClick={onClickShopBtn}
                >
                  {`Все магазины`}
                </Button>

                {shopsData.map(shop => (
                  <Button
                    key={shop._id}
                    disabled={currentShop?._id === shop._id}
                    className={clsx(className.button, {[className.selectedShopBtn]: currentShop?._id === shop._id})}
                    variant="text"
                    color="primary"
                    onClick={() => onClickShopBtn(shop)}
                  >
                    {shop.name}
                  </Button>
                ))}
              </div>

              <DataGrid
                pagination
                useResizeContainer
                classes={{
                  row: className.row,
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

export const ClientLast30DaySellerBoardView = withStyles(styles)(ClientLast30DaySellerBoardViewRaw)
