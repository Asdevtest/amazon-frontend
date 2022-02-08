import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

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
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SelectionSupplierModal} from '@components/modals/selection-supplier-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'

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
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,
      confirmMessage,
      successModalText,
      progressValue,
      showProgress,
      drawerOpen,
      showAddProductSellerboardModal,
      showBindStockGoodsToInventoryModal,
      showInfoModal,
      showAddOrEditSupplierModal,
      showSelectionSupplierModal,
      showSuccessModal,
      showConfirmModal,
      curPage,
      rowsPerPage,
      selectedRows,
      inventoryProducts,
      onSubmitBindStockGoods,
      getProductsMy,
      onClickBindStockGoodsToInventoryBtn,
      onTriggerDrawer,
      onTriggerOpenModal,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeFilterModel,
      setDataGridState,
      onChangeSortingModel,
      onSelectionModel,

      onSubmitCreateAndBindProduct,
      onSubmitSaveSupplier,
      onSubmitSeekSupplier,
      onSubmitCalculateSeekSupplier,
    } = this.viewModel
    const {classes: className} = this.props

    const onClickPrevButton = () => {
      onTriggerOpenModal('showAddOrEditSupplierModal')
      onTriggerOpenModal('showSelectionSupplierModal')
    }

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
              <Button
                disableElevation
                tooltipContent={textConsts.moveToInventoryBtnTooltip}
                disabled={selectedRows.length === 0}
                variant="contained"
                color="primary"
                onClick={() => onTriggerOpenModal('showAddProductSellerboardModal')}
              >
                {textConsts.moveToInventoryBtn}
              </Button>

              <Button
                disableElevation
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
                  rowsPerPageOptions={[15, 25, 50, 100]}
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
                  onStateChange={setDataGridState}
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
            showProgress={showProgress}
            progressValue={progressValue}
            onSubmit={onSubmitCreateAndBindProduct}
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
            onSubmit={onSubmitBindStockGoods}
          />
        </Modal>

        <Modal
          openModal={showAddOrEditSupplierModal}
          setOpenModal={() => onTriggerOpenModal('showAddOrEditSupplierModal')}
        >
          <AddOrEditSupplierModalContent
            outsideProduct
            title={textConsts.addOrEditSupplierTitle}
            showProgress={showProgress}
            progressValue={progressValue}
            onClickPrevButton={() => onClickPrevButton()}
            onClickSaveBtn={onSubmitSaveSupplier}
          />
        </Modal>

        <Modal
          openModal={showSelectionSupplierModal}
          setOpenModal={() => onTriggerOpenModal('showSelectionSupplierModal')}
        >
          <SelectionSupplierModal
            onTriggerOpenModal={() => onTriggerOpenModal('showAddOrEditSupplierModal')}
            onCloseModal={() => onTriggerOpenModal('showSelectionSupplierModal')}
            onSubmitSeekSupplier={onSubmitCalculateSeekSupplier}
          />
        </Modal>

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={successModalText}
          successBtnText={textConsts.successBtn}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessModal')
          }}
        />

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={textConsts.infoModalTitle}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />

        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={textConsts.confirmTitle}
          message={confirmMessage}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
          onClickSuccessBtn={() => {
            onSubmitSeekSupplier()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const ClientDailySellerBoardView = withStyles(styles)(ClientDailySellerBoardViewRaw)
