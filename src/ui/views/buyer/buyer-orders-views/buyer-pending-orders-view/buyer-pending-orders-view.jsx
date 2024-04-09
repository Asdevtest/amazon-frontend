import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { BUYER_MY_ORDERS_MODAL_HEAD_CELLS } from '@constants/table/table-head-cells'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditOrderModal } from '@components/modals/edit-order-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './buyer-pending-orders-view.style'

import { BuyerMyOrdersViewModel } from './buyer-pending-orders-view.model'

export const BuyerPendingOrdersView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new BuyerMyOrdersViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={styles.headerWrapper}>
        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>

      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          sortingMode="client"
          paginationMode="client"
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
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowDoubleClick={e => viewModel.onClickOrder(e.row.originalData._id)}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
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
          userInfo={viewModel.userInfo}
          requestStatus={viewModel.requestStatus}
          boxes={viewModel.curBoxesOfOrder}
          order={viewModel.selectedOrder}
          modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS()}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onSubmitSaveOrder={viewModel.onSubmitSaveOrder}
          onSaveOrderItem={viewModel.onSaveOrderItem}
          onClickSaveSupplierBtn={viewModel.onClickSaveSupplierBtn}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
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
      ) : null}

      {viewModel.showSuccessModal ? (
        <SuccessInfoModal
          // @ts-ignore
          openModal={viewModel.showSuccessModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
          title={viewModel.showSuccessModalText}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        />
      ) : null}
    </>
  )
})
