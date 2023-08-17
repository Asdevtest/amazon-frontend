import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { CheckPendingOrderForm } from '@components/forms/check-pending-order-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './client-orders-view.style'

import { ClientOrdersViewModel } from './client-orders-view.model'

export const ClientOrdersViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new ClientOrdersViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <div className={classNames.topHeaderBtnsWrapper}>
          {viewModel.isPendingOrdering ? (
            <div className={classNames.topHeaderBtnsSubWrapper}>
              <Button
                success
                disabled={!viewModel.selectedRowIds.length}
                className={classNames.button}
                onClick={viewModel.onClickManyReorder}
              >
                {t(TranslationKey['To order'])}
              </Button>

              <Button
                danger
                disabled={!viewModel.selectedRowIds.length}
                className={classNames.button}
                onClick={viewModel.onConfirmCancelManyReorder}
              >
                {t(TranslationKey['Cancel order'])}
              </Button>
            </div>
          ) : (
            <div />
          )}

          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
            onSubmit={viewModel.onSearchSubmit}
          />

          <div className={cx({ [classNames.invis]: viewModel.isPendingOrdering })} />
        </div>
        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            disableVirtualization
            pagination
            useResizeContainer
            checkboxSelection={viewModel.isPendingOrdering}
            localeText={getLocalizationByLanguageTag()}
            classes={{
              row: classNames.row,
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            sortingMode="server"
            paginationMode="server"
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            // rowHeight={100}
            getRowHeight={() => 'auto'}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
              columnMenu: DataGridCustomColumnMenuComponent,
            }}
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
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </div>

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

      <Modal
        openModal={viewModel.showCheckPendingOrderFormModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showCheckPendingOrderFormModal')}
      >
        <CheckPendingOrderForm
          existingOrders={viewModel.existingOrders}
          checkPendingData={viewModel.checkPendingData}
          onClickPandingOrder={viewModel.onClickPandingOrder}
          onClickContinueBtn={() => viewModel.onClickContinueBtn(viewModel.isOrder)}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showCheckPendingOrderFormModal')}
        />
      </Modal>

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

      {viewModel.alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
          acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
        />
      )}
    </React.Fragment>
  )
}

export const ClientOrdersView = withStyles(observer(ClientOrdersViewRaw), styles)
