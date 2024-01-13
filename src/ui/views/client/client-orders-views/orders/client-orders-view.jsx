import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { CheckPendingOrderForm } from '@components/forms/check-pending-order-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MyOrderModal } from '@components/modals/my-order-modal/my-order-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './client-orders-view.style'

import { ClientOrdersViewModel } from './client-orders-view.model'

export const ClientOrdersView = observer(history => {
  const { classes: styles, cx } = useStyles()

  const [viewModel] = useState(() => new ClientOrdersViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div className={styles.topHeaderBtnsWrapper}>
        {viewModel.isPendingOrdering ? (
          <div className={styles.topHeaderBtnsSubWrapper}>
            <Button
              success
              disabled={!viewModel.selectedRowIds.length}
              className={styles.button}
              onClick={viewModel.onClickManyReorder}
            >
              {t(TranslationKey['To order'])}
            </Button>

            <Button
              danger
              disabled={!viewModel.selectedRowIds.length}
              className={cx(styles.button, styles.buttonDanger)}
              onClick={viewModel.onConfirmCancelManyReorder}
            >
              {t(TranslationKey['Cancel order'])}
            </Button>
          </div>
        ) : (
          <div />
        )}

        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
          onSubmit={viewModel.onSearchSubmit}
        />

        <div className={cx({ [styles.invis]: viewModel.isPendingOrdering })} />
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          useResizeContainer
          disableRowSelectionOnClick
          checkboxSelection={viewModel.isPendingOrdering}
          localeText={getLocalizationByLanguageTag()}
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            columnMenu: viewModel.columnMenuSettings,
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
          rowSelectionModel={viewModel.selectedRowIds}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowClick={params => viewModel.onClickMyOrderModal(params.row)}
        />
      </div>

      {viewModel.showSetBarcodeModal && (
        <Modal
          openModal={viewModel.showSetBarcodeModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showSetBarcodeModal')}
        >
          <SetBarcodeModal
            item={viewModel.selectedProduct}
            onClickSaveBarcode={viewModel.onClickSaveBarcode}
            onCloseModal={() => viewModel.onTriggerOpenModal('showSetBarcodeModal')}
          />
        </Modal>
      )}

      {viewModel.showOrderModal && (
        <Modal
          missClickModalOn
          openModal={viewModel.showOrderModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}
        >
          <OrderProductModal
            isPendingOrdering={viewModel.isPendingOrdering}
            reorderOrdersData={viewModel.reorderOrdersData}
            platformSettings={viewModel.platformSettings}
            destinations={viewModel.destinations}
            storekeepers={viewModel.storekeepers}
            destinationsFavourites={viewModel.destinationsFavourites}
            setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
            onTriggerOpenModal={viewModel.onTriggerOpenModal}
            onDoubleClickBarcode={viewModel.onDoubleClickBarcode}
            onSubmit={viewModel.onConfirmSubmitOrderProductModal}
          />
        </Modal>
      )}

      {viewModel.showCheckPendingOrderFormModal && (
        <Modal
          openModal={viewModel.showCheckPendingOrderFormModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showCheckPendingOrderFormModal')}
        >
          <CheckPendingOrderForm
            existingProducts={viewModel.existingProducts}
            onClickPandingOrder={viewModel.onClickPandingOrder}
            onClickContinueBtn={() => viewModel.onClickContinueBtn(viewModel.existingProducts?.[0])}
            onClickCancelBtn={() => viewModel.onTriggerOpenModal('showCheckPendingOrderFormModal')}
          />
        </Modal>
      )}

      {viewModel.showConfirmModal && (
        <ConfirmationModal
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          isWarning={viewModel.confirmModalSettings?.isWarning}
          title={viewModel.confirmModalSettings.confirmTitle}
          message={viewModel.confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      )}

      {viewModel.alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
          acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
        />
      )}

      {viewModel.showMyOrderModal ? (
        <MyOrderModal
          isClient
          isPendingOrdering={viewModel.isPendingOrdering}
          order={viewModel.order}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepers}
          platformSettings={viewModel.platformSettings}
          switcherCondition={viewModel.switcherCondition}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          openModal={viewModel.showMyOrderModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showMyOrderModal')}
          onClickOpenNewTab={viewModel.onClickOpenNewTab}
          onClickChangeCondition={viewModel.onClickChangeCondition}
          onClickCancelOrder={viewModel.onClickCancelOrder}
          onClickReorder={viewModel.onClickReorder}
          onSubmitSaveOrder={viewModel.onSubmitSaveOrder}
        />
      ) : null}

      {viewModel.showWarningInfoModal ? (
        <WarningInfoModal
          isWarning={viewModel.warningInfoModalSettings.isWarning}
          openModal={viewModel.showWarningInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
          title={viewModel.warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            viewModel.onTriggerOpenModal('showWarningInfoModal')
          }}
        />
      ) : null}
    </React.Fragment>
  )
})
