import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { BindStockGoodsToInventoryForm } from '@components/forms/bind-stock-goods-to-inventory-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SelectShopsModal } from '@components/modals/select-shops-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ShopReportsTabsValues } from '@typings/enums/shop-report'

import { useStyles } from './client-shops-report-view.style'

import { ClientShopsViewModel } from './client-shops-report-view.model'
import { ControllButtons } from './controll-buttons/controll-buttons'
import { switcherConfig } from './switcher.config'

export const ClientShopsReportView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientShopsViewModel(ShopReportsTabsValues.PPC_ORGANIC_BY_DAY))
  viewModel.initHistory()

  useEffect(() => {
    viewModel.initUserSettings()
  }, [])

  return (
    <div className={styles.root}>
      <CustomSwitcher
        fullWidth
        switchMode="big"
        condition={viewModel.tabKey}
        switcherSettings={switcherConfig}
        changeConditionHandler={viewModel.changeTabHandler}
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
          rows={viewModel.currentData}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          rowSelectionModel={viewModel.selectedRows}
          getRowId={({ _id }: GridRowModel) => _id}
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
            viewModel.currentData?.filter(item => viewModel.selectedRows?.includes(item?._id)),
          )}
          inventoryData={viewModel.inventoryProducts}
          updateInventoryData={viewModel.getProductsMy}
          onSubmit={viewModel.submitBindStockGoodsHandler}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSelectShopsModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSelectShopsModal')}
      >
        <SelectShopsModal
          // @ts-ignore
          title={t(TranslationKey['Choose a store for integration'])}
          shops={viewModel.shopsData}
          onClickSuccessBtn={viewModel.bindReportInventoryHandler}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showSelectShopsModal')}
        />
      </Modal>

      {viewModel.showWarningInfoModal ? (
        <WarningInfoModal
          // @ts-ignore
          setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
          openModal={viewModel.showWarningInfoModal}
          isWarning={viewModel.warningInfoModalSettings.isWarning}
          title={viewModel.warningInfoModalSettings.title}
          btnText={viewModel.warningInfoModalSettings.buttonText}
          onClickBtn={() => viewModel.warningInfoModalSettings.onSubmit()}
        />
      ) : null}

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
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
      ) : null}
    </div>
  )
})
