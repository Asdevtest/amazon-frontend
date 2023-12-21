import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BindStockGoodsToInventoryForm } from '@components/forms/bind-stock-goods-to-inventory-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SelectionSupplierModal } from '@components/modals/selection-supplier-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './stock-report.style'

import { StockReportModel } from './stock-report.model'

export const StockReport = observer(({ curShop }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new StockReportModel({ history, curShop }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const onClickPrevButton = () => {
    viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')
    viewModel.onTriggerOpenModal('showSelectionSupplierModal')
  }

  return (
    <React.Fragment>
      <div className={styles.shopsFiltersWrapper}>
        <WithSearchSelect
          selectedItemName={
            (!viewModel.currentShop?._id && t(TranslationKey['All shops'])) ||
            (viewModel.currentShop && viewModel.currentShop.name)
          }
          data={viewModel.shopsData.filter(shop => viewModel.currentShop?.id !== shop._id)}
          searchFields={['name']}
          firstItems={
            viewModel.currentShop?._id && (
              <Button
                disabled={!viewModel.currentShop?._id}
                className={styles.button}
                variant="text"
                color="primary"
                onClick={viewModel.onClickShopBtn}
              >
                {t(TranslationKey['All shops'])}
              </Button>
            )
          }
          onClickSelect={shop => viewModel.onClickShopBtn(shop)}
        />
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          useResizeContainer
          checkboxSelection
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          rowSelectionModel={viewModel.selectedRows}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.getCurrentData()}
          getRowHeight={() => 'auto'}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
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
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

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

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
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
})
