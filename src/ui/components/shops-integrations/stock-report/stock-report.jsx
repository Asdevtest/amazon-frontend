import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { BindStockGoodsToInventoryForm } from '@components/forms/bind-stock-goods-to-inventory-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SelectionSupplierModal } from '@components/modals/selection-supplier-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { StockReportModel } from './stock-report.model'
import { styles } from './stock-report.style'

export const StockReportRaw = props => {
  const [viewModel] = useState(() => new StockReportModel({ history: props.history, curShop: props.curShop }))
  const { classes: className } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const onClickPrevButton = () => {
    viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')
    viewModel.onTriggerOpenModal('showSelectionSupplierModal')
  }

  return (
    <React.Fragment>
      <div className={className.shopsFiltersWrapper}>
        <WithSearchSelect
          selectedItemName={
            (!viewModel.currentShop?._id && t(TranslationKey['All shops'])) ||
            (viewModel.currentShop && viewModel.currentShop.name)
          }
          data={viewModel.shopsData.filter(shop => viewModel.currentShop?.id !== shop._id)}
          searchFields={['name']}
          firstItems={
            <>
              {viewModel.currentShop?._id && (
                <Button
                  disabled={!viewModel.currentShop?._id}
                  // tooltipInfoContent={t(TranslationKey['Filter for sorting by store'])}
                  className={className.button}
                  variant="text"
                  color="primary"
                  onClick={viewModel.onClickShopBtn}
                >
                  {t(TranslationKey['All shops'])}
                </Button>
              )}
            </>
          }
          onClickSelect={shop => viewModel.onClickShopBtn(shop)}
        />
      </div>

      <div className={className.btnsWrapper}>
        <div className={className.btnsSubWrapper}>
          <Button
            tooltipInfoContent={t(
              TranslationKey['Moves selected products to the "Inventory" section with linked integration'],
            )}
            disabled={viewModel.selectedRows.length === 0}
            variant="contained"
            onClick={viewModel.onSubmitMoveToInventoryGoods}
          >
            {t(TranslationKey['Move to inventory'])}
          </Button>

          <Button
            tooltipInfoContent={t(
              TranslationKey['Adds integration from the report to the selected item from the inventory'],
            )}
            disabled={viewModel.selectedRows.length === 0}
            className={className.rightButton}
            variant="contained"
            onClick={viewModel.onClickBindStockGoodsToInventoryBtn}
          >
            {t(TranslationKey['Bind to an item in the inventory'])}
          </Button>
        </div>

        <Button
          danger
          disabled={!viewModel.selectedRows.length || viewModel.selectedRows.length > 1}
          variant="contained"
          onClick={viewModel.onClickDeleteBtn}
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
          sortModel={viewModel.sortModel}
          rowSelectionModel={viewModel.selectedRows}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          pageSizeOptions={[15, 25, 50, 100]}
          rows={viewModel.getCurrentData()}
          // rowHeight={100}
          getRowHeight={() => 'auto'}
          slots={{
            toolbar: DataGridCustomToolbar,
            columnMenuIcon: FilterAltOutlinedIcon,
          }}
          slotProps={{
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onChangePaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
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

      {viewModel.showCircularProgressModal ? <CircularProgressWithLabel /> : null}

      <Modal
        openModal={viewModel.showBindStockGoodsToInventoryModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBindStockGoodsToInventoryModal')}
      >
        <BindStockGoodsToInventoryForm
          goodsToSelect={viewModel.getCurrentData().filter(item => viewModel.selectedRows.includes(item.id))}
          inventoryData={viewModel.inventoryProducts}
          updateInventoryData={viewModel.getProductsMy}
          onSubmit={viewModel.onSubmitBindStockGoods}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showAddOrEditSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
      >
        <AddOrEditSupplierModalContent
          outsideProduct
          sourceYuanToDollarRate={viewModel.yuanToDollarRate}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          title={t(TranslationKey['Add a new supplier'])}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          onClickPrevButton={() => onClickPrevButton()}
          onClickSaveBtn={viewModel.onSubmitSaveSupplier}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSelectionSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSelectionSupplierModal')}
      >
        <SelectionSupplierModal
          onClickFinalAddSupplierButton={viewModel.onClickAddSupplierButton}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSelectionSupplierModal')}
          onSubmitSeekSupplier={viewModel.onSubmitCalculateSeekSupplier}
        />
      </Modal>

      <SuccessInfoModal
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={viewModel.successModalText}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          viewModel.onTriggerOpenModal('showSuccessModal')
        }}
      />

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
        title={viewModel.infoModalText}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showInfoModal')
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
        isWarning={viewModel.confirmModalSettings.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={viewModel.confirmModalSettings.title}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
        onClickCancelBtn={viewModel.confirmModalSettings.onCancel}
      />
    </React.Fragment>
  )
}

export const StockReport = withStyles(observer(StockReportRaw), styles)
