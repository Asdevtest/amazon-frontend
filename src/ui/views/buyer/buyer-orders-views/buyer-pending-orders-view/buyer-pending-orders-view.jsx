import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { BUYER_MY_ORDERS_MODAL_HEAD_CELLS } from '@constants/table/table-head-cells'
import { TranslationKey } from '@constants/translations/translation-key'

import { EditOrderModal } from '@components/modals/edit-order-modal'
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
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowDoubleClick={e => viewModel.onClickOrder(e.row.originalData._id)}
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
          order={viewModel.selectedOrder}
          hsCodeData={viewModel.hsCodeData}
          modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS()}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onSubmitSaveOrder={viewModel.onSubmitSaveOrder}
          onSaveOrderItem={viewModel.onSaveOrderItem}
          onClickSaveSupplierBtn={viewModel.onClickSaveSupplierBtn}
        />
      </Modal>
    </>
  )
})
