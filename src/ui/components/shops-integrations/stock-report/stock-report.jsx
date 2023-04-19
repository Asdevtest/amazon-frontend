import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {BindStockGoodsToInventoryForm} from '@components/forms/bind-stock-goods-to-inventory-form'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SelectionSupplierModal} from '@components/modals/selection-supplier-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {WithSearchSelect} from '@components/selects/with-search-select'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {StockReportModel} from './stock-report.model'
import {styles} from './stock-report.style'

@observer
class StockReportRaw extends Component {
  viewModel = new StockReportModel({history: this.props.history, curShop: this.props.curShop})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      confirmModalSettings,
      getCurrentData,
      infoModalText,
      currentShop,
      shopsData,
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,
      successModalText,
      progressValue,
      showProgress,
      yuanToDollarRate,
      volumeWeightCoefficient,
      showBindStockGoodsToInventoryModal,
      showInfoModal,
      showAddOrEditSupplierModal,
      showCircularProgressModal,
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
      onSubmitCalculateSeekSupplier,

      onClickShopBtn,
      onSubmitMoveToInventoryGoods,
      onClickAddSupplierButton,

      changeColumnsModel,
      onClickDeleteBtn,
    } = this.viewModel
    const {classes: className} = this.props

    const onClickPrevButton = () => {
      onTriggerOpenModal('showAddOrEditSupplierModal')
      onTriggerOpenModal('showSelectionSupplierModal')
    }

    return (
      <React.Fragment>
        <div className={className.shopsFiltersWrapper}>
          <WithSearchSelect
            selectedItemName={
              (!currentShop?._id && t(TranslationKey['All shops'])) || (currentShop && currentShop.name)
            }
            data={shopsData.filter(shop => currentShop?.id !== shop._id)}
            searchFields={['name']}
            firstItems={
              <>
                {currentShop?._id && (
                  <Button
                    disabled={!currentShop?._id}
                    // tooltipInfoContent={t(TranslationKey['Filter for sorting by store'])}
                    className={className.button}
                    variant="text"
                    color="primary"
                    onClick={onClickShopBtn}
                  >
                    {t(TranslationKey['All shops'])}
                  </Button>
                )}
              </>
            }
            onClickSelect={shop => onClickShopBtn(shop)}
          />
        </div>

        <div className={className.btnsWrapper}>
          <div className={className.btnsSubWrapper}>
            <Button
              tooltipInfoContent={t(
                TranslationKey['Moves selected products to the "Inventory" section with linked integration'],
              )}
              disabled={selectedRows.length === 0}
              variant="contained"
              onClick={onSubmitMoveToInventoryGoods}
            >
              {t(TranslationKey['Move to inventory'])}
            </Button>

            <Button
              tooltipInfoContent={t(
                TranslationKey['Adds integration from the report to the selected item from the inventory'],
              )}
              disabled={selectedRows.length === 0}
              className={className.rightButton}
              variant="contained"
              onClick={onClickBindStockGoodsToInventoryBtn}
            >
              {t(TranslationKey['Bind to an item in the inventory'])}
            </Button>
          </div>

          <Button
            danger
            disabled={!selectedRows.length || selectedRows.length > 1}
            variant="contained"
            onClick={onClickDeleteBtn}
          >
            {t(TranslationKey.Remove)}
          </Button>
        </div>

        <div className={className.dataGridWrapper}>
          <MemoDataGrid
            pagination
            useResizeContainer
            checkboxSelection
            localeText={getLocalizationByLanguageTag()}
            classes={{
              row: className.row,
              root: className.root,
              footerContainer: className.footerContainer,
              footerCell: className.footerCell,
              toolbarContainer: className.toolbarContainer,
            }}
            sortModel={sortModel}
            selectionModel={selectedRows}
            filterModel={filterModel}
            page={curPage}
            pageSize={rowsPerPage}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rows={getCurrentData()}
            // rowHeight={100}
            getRowHeight={() => 'auto'}
            components={{
              Toolbar: DataGridCustomToolbar,
              ColumnMenuIcon: FilterAltOutlinedIcon,
            }}
            componentsProps={{
              toolbar: {
                columsBtnSettings: {columnsModel, changeColumnsModel},
              },
            }}
            density={densityModel}
            columns={columnsModel}
            loading={requestStatus === loadingStatuses.isLoading}
            onSelectionModelChange={onSelectionModel}
            onSortModelChange={onChangeSortingModel}
            onPageSizeChange={onChangeRowsPerPage}
            onPageChange={onChangeCurPage}
            onStateChange={setDataGridState}
            onFilterModelChange={onChangeFilterModel}
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

        {showCircularProgressModal ? <CircularProgressWithLabel /> : null}

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
          missClickModalOn
          openModal={showAddOrEditSupplierModal}
          setOpenModal={() => onTriggerOpenModal('showAddOrEditSupplierModal')}
        >
          <AddOrEditSupplierModalContent
            outsideProduct
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
            title={t(TranslationKey['Add a new supplier'])}
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
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessModal')
          }}
        />

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={infoModalText}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />

        {/* <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            onSubmitSeekSupplier()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        /> */}

        <ConfirmationModal
          isWarning={confirmModalSettings.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={confirmModalSettings.title}
          message={confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={confirmModalSettings.onSubmit}
          onClickCancelBtn={confirmModalSettings.onCancel}
        />
      </React.Fragment>
    )
  }
}

export const StockReport = withStyles(StockReportRaw, styles)
