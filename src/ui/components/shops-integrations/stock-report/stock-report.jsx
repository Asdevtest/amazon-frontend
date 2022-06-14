import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {BindStockGoodsToInventoryForm} from '@components/forms/bind-stock-goods-to-inventory-form'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SelectionSupplierModal} from '@components/modals/selection-supplier-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

import {StockReportModel} from './stock-report.model'
import {styles} from './stock-report.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientDailySellerBoardView

@observer
class StockReportRaw extends Component {
  viewModel = new StockReportModel({history: this.props.history, curShop: this.props.curShop})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      getCurrentData,
      infoModalText,
      currentShop,
      shopsData,
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,
      confirmMessage,
      successModalText,
      progressValue,
      showProgress,
      yuanToDollarRate,
      volumeWeightCoefficient,
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
      onTriggerOpenModal,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeFilterModel,
      setDataGridState,
      onChangeSortingModel,
      onSelectionModel,

      onSubmitSaveSupplier,
      onSubmitSeekSupplier,
      onSubmitCalculateSeekSupplier,

      onClickShopBtn,
      onSubmitMoveToInventoryGoods,
      onClickAddSupplierButton,
    } = this.viewModel
    const {classes: className} = this.props

    const onClickPrevButton = () => {
      onTriggerOpenModal('showAddOrEditSupplierModal')
      onTriggerOpenModal('showSelectionSupplierModal')
    }

    return (
      <React.Fragment>
        <div className={className.shopsFiltersWrapper}>
          <Button
            disabled={!currentShop?._id}
            className={clsx({[className.selectedShopBtn]: !currentShop?._id})}
            variant="text"
            color="primary"
            onClick={onClickShopBtn}
          >
            {t(TranslationKey['All shops'])}
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

        <div className={className.btnsWrapper}>
          <Button
            disableElevation
            tooltipAttentionContent={t(TranslationKey['Move the selected item from the Seller Board to the inventory'])}
            disabled={selectedRows.length === 0}
            variant="contained"
            color="primary"
            onClick={onSubmitMoveToInventoryGoods}
          >
            {t(TranslationKey['Move to inventory'])}
          </Button>

          <Button
            disableElevation
            disabled={selectedRows.length === 0}
            className={className.button}
            variant="contained"
            color="primary"
            onClick={onClickBindStockGoodsToInventoryBtn}
          >
            {t(TranslationKey['Bind to an item in the inventory'])}
          </Button>
        </div>

        <div className={className.dataGridWrapper}>
          <DataGrid
            pagination
            useResizeContainer
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

        {/* <Modal
          openModal={showAddProductSellerboardModal}
          setOpenModal={() => onTriggerOpenModal('showAddProductSellerboardModal')}
        >
          <AddProductSellerboardForm
            goodsToSelect={getCurrentData().filter(item => selectedRows.includes(item.id))}
            showProgress={showProgress}
            progressValue={progressValue}
            onSubmit={onSubmitCreateAndBindProduct}
          />
        </Modal> */}

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
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
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
            onClickFinalAddSupplierButton={onClickAddSupplierButton}
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
          title={infoModalText}
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

export const StockReport = withStyles(styles)(StockReportRaw)
