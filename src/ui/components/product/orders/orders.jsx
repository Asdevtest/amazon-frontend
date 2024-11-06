import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './orders.style'

import { statusesForChecking } from './orders.constant'
import { OrdersModel } from './orders.model'

export const Orders = observer(({ productId, filterStatus, modal }) => {
  const { classes: styles, cx } = useStyles()

  const model = useRef(new OrdersModel({ productId, filterStatus }))

  const {
    orderStatusData,
    platformSettings,
    storekeepers,
    destinations,
    reorderOrder,
    selectedProduct,
    confirmModalSettings,
    getCurrentData,
    requestStatus,
    columnsModel,
    showSetBarcodeModal,
    showOrderModal,
    showConfirmModal,
    paginationModel,
    onClickTableRow,
    onTriggerOpenModal,
    onConfirmSubmitOrderProductModal,
    onClickSaveBarcode,
    onDoubleClickBarcode,
    setDataGridState,
    isSomeFilterOn,
    onPaginationModelChange,
    onColumnVisibilityModelChange,
    columnVisibilityModel,
    onClickResetFilters,
    isPendingOrdering,
  } = model.current

  useEffect(() => {
    model.current.loadData()
  }, [])

  return (
    <div className={cx(styles.mainWrapper, { [styles.modalWrapper]: modal })}>
      <CustomDataGrid
        columnVisibilityModel={columnVisibilityModel}
        paginationModel={paginationModel}
        rows={getCurrentData()}
        sortingMode="client"
        paginationMode="client"
        getRowHeight={() => 'auto'}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          columnMenu: { orderStatusData },
          toolbar: {
            resetFiltersBtnSettings: {
              onClickResetFilters,
              isSomeFilterOn,
            },
            columsBtnSettings: {
              columnsModel,
              columnVisibilityModel,
              onColumnVisibilityModelChange,
            },
          },
        }}
        columns={columnsModel}
        loading={requestStatus === loadingStatus.IS_LOADING}
        onPaginationModelChange={onPaginationModelChange}
        onRowDoubleClick={e => onClickTableRow(e.row)}
        onStateChange={setDataGridState}
      />

      <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
        <SetBarcodeModal
          barCode={selectedProduct?.barCode}
          onClickSaveBarcode={onClickSaveBarcode}
          onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
        />
      </Modal>

      <Modal missClickModalOn openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
        <OrderProductModal
          isSetDeadline
          isPendingOrdering={isPendingOrdering}
          statusesForChecking={statusesForChecking}
          reorderOrdersData={[reorderOrder]}
          platformSettings={platformSettings}
          destinations={destinations}
          storekeepers={storekeepers}
          onTriggerOpenModal={onTriggerOpenModal}
          onDoubleClickBarcode={onDoubleClickBarcode}
          onSubmit={onConfirmSubmitOrderProductModal}
        />
      </Modal>

      {showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          isWarning={confirmModalSettings?.isWarning}
          title={confirmModalSettings.confirmTitle}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </div>
  )
})
