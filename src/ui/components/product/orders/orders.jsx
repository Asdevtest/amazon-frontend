import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useClassNames } from './orders.style'

import { statusesForChecking } from './orders.constant'
import { OrdersModel } from './orders.model'

export const Orders = observer(({ productId, showAtProcessOrders, modal }) => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const model = useRef(new OrdersModel({ history, productId, showAtProcessOrders }))

  const {
    orderStatusData,
    platformSettings,
    storekeepers,
    destinations,
    reorderOrder,
    selectedProduct,
    successModalText,
    confirmModalSettings,
    getCurrentData,
    requestStatus,
    columnsModel,
    showSetBarcodeModal,
    showOrderModal,
    showSuccessModal,
    showConfirmModal,
    paginationModel,
    onClickTableRow,
    onTriggerOpenModal,
    onConfirmSubmitOrderProductModal,
    onClickSaveBarcode,
    onDoubleClickBarcode,
    setDataGridState,
    isSomeFilterOn,
    onChangePaginationModelChange,
    onColumnVisibilityModelChange,
    columnVisibilityModel,
    onClickResetFilters,
  } = model.current

  useEffect(() => {
    model.current.loadData()
  }, [])

  return (
    <div className={cx(classNames.mainWrapper, { [classNames.modalWrapper]: modal })}>
      <CustomDataGrid
        useResizeContainer
        localeText={getLocalizationByLanguageTag()}
        columnVisibilityModel={model.current.columnVisibilityModel}
        paginationModel={paginationModel}
        rows={getCurrentData()}
        rowHeight={100}
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
        loading={requestStatus === loadingStatuses.IS_LOADING}
        onPaginationModelChange={onChangePaginationModelChange}
        onRowDoubleClick={e => onClickTableRow(e.row)}
        onStateChange={setDataGridState}
      />

      <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
        <SetBarcodeModal
          item={selectedProduct}
          onClickSaveBarcode={onClickSaveBarcode}
          onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
        />
      </Modal>

      <Modal missClickModalOn openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
        <OrderProductModal
          isSetDeadline
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

      <SuccessInfoModal
        openModal={showSuccessModal}
        setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
        title={successModalText}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          onTriggerOpenModal('showSuccessModal')
        }}
      />

      <ConfirmationModal
        openModal={showConfirmModal}
        setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
        isWarning={confirmModalSettings?.isWarning}
        title={confirmModalSettings.confirmTitle}
        message={confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
      />
    </div>
  )
})
