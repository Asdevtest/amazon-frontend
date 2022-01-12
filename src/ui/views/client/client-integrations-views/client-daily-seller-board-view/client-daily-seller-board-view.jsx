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
import {Button} from '@components/buttons/button'
import {AddProductSellerboardForm} from '@components/forms/add-product-to-sellerbord-form'
import {BindStockGoodsToInventoryForm} from '@components/forms/bind-stock-goods-to-inventory-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'

import {onStateChangeHandler} from '@utils/data-grid-handlers'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientDailySellerBoardViewModel} from './client-daily-seller-board-view.model'
import {styles} from './client-daily-seller-board-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientDailySellerBoardView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_INTEGRATIONS
const navbarActiveSubCategory = 0

@observer
class ClientDailySellerBoardViewRaw extends Component {
  viewModel = new ClientDailySellerBoardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      getCurrentData,
      addProductSettings,
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,
      selectedRow,
      drawerOpen,
      showAddProductSellerboardModal,
      showBindStockGoodsToInventoryModal,
      curPage,
      rowsPerPage,
      selectedRows,
      inventoryProducts,
      getProductsMy,
      // getInventoryData,
      onClickBindStockGoodsToInventoryBtn,
      onTriggerDrawer,
      onTriggerOpenModal,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeFilterModel,
      setDataGridState,
      onChangeSortingModel,
      onSelectionModel,
    } = this.viewModel
    const {classes: className} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
          user={textConsts.appUser}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            setDrawerOpen={onTriggerDrawer}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Typography variant="h6" className={className.mainTitle}>
                {textConsts.mainTitle}
              </Typography>

              <Button
                disableElevation
                tooltipContent="Пример тултипа"
                disabled={selectedRows.length === 0}
                variant="contained"
                color="primary"
                onClick={() => onTriggerOpenModal('showAddProductSellerboardModal')}
              >
                {textConsts.moveToInventoryBtn}
              </Button>

              <Button
                disableElevation
                tooltipContent="Пример тултипа"
                disabled={selectedRows.length === 0}
                className={className.button}
                variant="contained"
                color="primary"
                onClick={onClickBindStockGoodsToInventoryBtn}
              >
                {textConsts.bindBtn}
              </Button>
              <div className={className.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  autoHeight
                  checkboxSelection
                  classes={{
                    row: className.row,
                  }}
                  sortModel={sortModel}
                  selectionModel={selectedRows}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rows={getCurrentData()}
                  rowHeight={100}
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
                  onStateChange={e => onStateChangeHandler(e, setDataGridState)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal
          openModal={showAddProductSellerboardModal}
          setOpenModal={() => onTriggerOpenModal('showAddProductSellerboardModal')}
        >
          <AddProductSellerboardForm
            goodsToSelect={getCurrentData().filter(item => selectedRows.includes(item.id))}
            selectedProduct={selectedRow}
            productToEdit={addProductSettings.product}
          />
        </Modal>

        <Modal
          openModal={showBindStockGoodsToInventoryModal}
          setOpenModal={() => onTriggerOpenModal('showBindStockGoodsToInventoryModal')}
        >
          <BindStockGoodsToInventoryForm
            goodsToSelect={getCurrentData().filter(item => selectedRows.includes(item.id))}
            inventoryData={inventoryProducts}
            updateInventoryData={getProductsMy}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export const ClientDailySellerBoardView = withStyles(styles)(ClientDailySellerBoardViewRaw)
