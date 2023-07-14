import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { useEffect, useRef } from 'react'

import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { OrdersModel } from './orders.model'
import { useClassNames } from './orders.style'

export const Orders = observer(({ productId, showAtProcessOrders }) => {
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
    onClickTableRow,
    onTriggerOpenModal,
    onConfirmSubmitOrderProductModal,
    onClickSaveBarcode,
    onDoubleClickBarcode,
    setDataGridState,
  } = model.current

  useEffect(() => {
    model.current.loadData()
  }, [])

  return (
    <div className={classNames.mainWrapper}>
      <MemoDataGrid
        pagination
        useResizeContainer
        disableVirtualization
        localeText={getLocalizationByLanguageTag()}
        classes={{
          row: classNames.row,
          footerContainer: classNames.footerContainer,
          footerCell: classNames.footerCell,
          toolbarContainer: classNames.toolbarContainer,
        }}
        columnVisibilityModel={model.current.columnVisibilityModel}
        pageSizeOptions={[15, 25, 50, 100]}
        rows={getCurrentData()}
        rowHeight={100}
        slots={{
          toolbar: DataGridCustomToolbar,
          columnMenuIcon: FilterAltOutlinedIcon,
          columnMenu: DataGridCustomColumnMenuComponent,
        }}
        slotProps={{
          columnMenu: { orderStatusData },
          toolbar: {
            resetFiltersBtnSettings: {
              onClickResetFilters: model.current.onClickResetFilters,
              isSomeFilterOn: model.current.isSomeFilterOn,
            },
            columsBtnSettings: {
              columnsModel,
              columnVisibilityModel: model.current.columnVisibilityModel,
              onColumnVisibilityModelChange: model.current.onColumnVisibilityModelChange,
            },
          },
        }}
        columns={columnsModel}
        loading={requestStatus === loadingStatuses.isLoading}
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
          reorderOrdersData={[reorderOrder]}
          // volumeWeightCoefficient={volumeWeightCoefficient}
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
        isWarning={confirmModalSettings.isWarning}
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
