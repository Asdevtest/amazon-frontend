import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { BUYER_MY_ORDERS_MODAL_HEAD_CELLS } from '@constants/table/table-head-cells'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { EditOrderModal } from '@components/modals/edit-order-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './buyer-pending-orders-view.style'

import { BuyerMyOrdersViewModel } from './buyer-pending-orders-view.model'

export const BuyerPendingOrdersView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new BuyerMyOrdersViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <div className={styles.headerWrapper}>
          <SearchInput
            inputClasses={styles.searchInput}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>

        <div className={styles.dataGridWrapper}>
          <CustomDataGrid
            useResizeContainer
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
              columnMenu: { orderStatusData: viewModel.orderStatusData },

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
            loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onPaginationModelChange}
            onRowDoubleClick={e => viewModel.onClickOrder(e.row.originalData._id)}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </div>

      <Modal
        missClickModalOn
        openModal={viewModel.showOrderModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}
      >
        <EditOrderModal
          isPendingOrder
          platformSettings={viewModel.platformSettings}
          paymentMethods={viewModel.paymentMethods}
          imagesForLoad={viewModel.imagesForLoad}
          hsCodeData={viewModel.hsCodeData}
          yuanToDollarRate={viewModel.yuanToDollarRate}
          userInfo={viewModel.userInfo}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          photosToLoad={viewModel.photosToLoad}
          requestStatus={viewModel.requestStatus}
          boxes={viewModel.curBoxesOfOrder}
          order={viewModel.selectedOrder}
          modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS()}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          setPhotosToLoad={viewModel.setPhotosToLoad}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onSubmitSaveOrder={viewModel.onSubmitSaveOrder}
          onSaveOrderItem={viewModel.onSaveOrderItem}
          onSubmitChangeBoxFields={viewModel.onSubmitChangeBoxFields}
          onClickSaveSupplierBtn={viewModel.onClickSaveSupplierBtn}
          onClickHsCode={viewModel.onClickHsCode}
          onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
        />
      </Modal>

      <ConfirmationModal
        isWarning
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey['Attention. Are you sure?'])}
        message={t(TranslationKey['Are you sure you want to cancel the order?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.onSubmitCancelOrder}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      <WarningInfoModal
        openModal={viewModel.showNoDimensionsErrorModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showNoDimensionsErrorModal')}
        title={t(TranslationKey['The fields must be filled in to create the box!'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showNoDimensionsErrorModal')}
      />

      <WarningInfoModal
        openModal={viewModel.showWarningNewBoxesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningNewBoxesModal')}
        title={t(TranslationKey['Creating new boxes. Be careful!'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showWarningNewBoxesModal')}
      />

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
      />

      <WarningInfoModal
        openModal={viewModel.showOrderPriceMismatchModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showOrderPriceMismatchModal')}
        title={t(
          TranslationKey[
            'The "Paid" status will become available after the client confirms the change of the cost of the order. The current status will not be changed! Boxes will not be created'
          ],
        )}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showOrderPriceMismatchModal')}
      />

      <SuccessInfoModal
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={viewModel.showSuccessModalText}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showSuccessModal')}
      />

      <Modal
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          hsCodeData={viewModel.hsCodeData}
          onClickSaveHsCode={viewModel.onClickSaveHsCode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
        />
      </Modal>
    </React.Fragment>
  )
})
