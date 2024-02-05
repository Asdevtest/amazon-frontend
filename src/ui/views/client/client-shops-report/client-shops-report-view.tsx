/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { ShopReportsTabsValues } from '@constants/tabs/shop-report'
import { TranslationKey } from '@constants/translations/translation-key'

import { BindStockGoodsToInventoryForm } from '@components/forms/bind-stock-goods-to-inventory-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { useStyles } from './client-shops-report-view.style'

import { ClientShopsViewModel } from './client-shops-report-view.model'
import { ControllButtons } from './controll-buttons/controll-buttons'
import { switcherConfig } from './helpers/switcher-config'

export const ClientShopsReportView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientShopsViewModel(ShopReportsTabsValues.PPC))
  viewModel.initHistory()

  useEffect(() => {
    viewModel.initUserSettings()
  }, [])

  return (
    <div className={styles.root}>
      <CustomSwitcher
        fullWidth
        switchMode={'big'}
        condition={viewModel.tabKey}
        switcherSettings={switcherConfig}
        changeConditionHandler={value => viewModel.changeTabHandler(value as ShopReportsTabsValues)}
      />

      <ControllButtons
        currentSearchValue={viewModel.currentSearchValue}
        currentTabKey={viewModel.tabKey}
        selectedRows={viewModel.selectedRows}
        onClickMoveGoodsToInventory={viewModel.moveGoodsToInventoryHandler}
        onClickBindStockGoodsToInventory={viewModel.bindStockGoodsToInventoryHandler}
        onClickDeleteBtn={viewModel.deleteReportHandler}
        onChangeSearchValue={viewModel.onSearchSubmit}
      />

      <div className={styles.tabledWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          getRowHeight={() => 'auto'}
          slotProps={{
            columnMenu: viewModel.columnMenuSettings,
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              resetFiltersBtnSettings: {
                onClickResetFilters: viewModel.onClickResetFilters,
                isSomeFilterOn: viewModel.isSomeFilterOn,
              },
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          density={viewModel.densityModel}
          rows={viewModel.tableData}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          rowSelectionModel={viewModel.selectedRows}
          getRowId={({ _id }: { _id: string }) => _id}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <Modal
        openModal={viewModel.showBindStockGoodsToInventoryModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBindStockGoodsToInventoryModal')}
      >
        <BindStockGoodsToInventoryForm
          goodsToSelect={addIdDataConverter(
            viewModel.tableData?.filter(item => viewModel.selectedRows?.includes(item?._id)),
          )}
          inventoryData={viewModel.inventoryProducts}
          updateInventoryData={viewModel.getProductsMy}
          onSubmit={viewModel.submitBindStockGoodsHandler}
        />
      </Modal>

      <WarningInfoModal
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        openModal={viewModel.showWarningInfoModal}
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        title={viewModel.warningInfoModalSettings.title}
        btnText={viewModel.warningInfoModalSettings.buttonText}
        onClickBtn={() => viewModel.warningInfoModalSettings.onSubmit()}
      />

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings?.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings?.onSubmit}
        onClickCancelBtn={viewModel.confirmModalSettings?.onCancel}
      />
    </div>
  )
})
