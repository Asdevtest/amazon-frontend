import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {OrderProductModal} from '@components/screens/client/order-product-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {OrdersModel} from './orders.model'
import {useClassNames} from './orders.style'

export const Orders = observer(({productId, showAtProcessOrders}) => {
  const {classes: classNames} = useClassNames()
  const history = useHistory()
  const model = useRef(new OrdersModel({history, productId, showAtProcessOrders}))

  const {
    orderStatusData,

    volumeWeightCoefficient,
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
    updateColumnsModel,
    onTriggerOpenModal,
    onConfirmSubmitOrderProductModal,
    onClickSaveBarcode,
    onDoubleClickBarcode,
    setDataGridState,
  } = model.current

  useEffect(() => {
    model.current.loadData()
  }, [])

  useEffect(() => {
    updateColumnsModel()
  }, [SettingsModel.languageTag])

  return (
    <div className={classNames.mainWrapper}>
      <MemoDataGrid
        pagination
        useResizeContainer
        disableVirtualization
        localeText={getLocalizationByLanguageTag()}
        classes={{
          row: classNames.row,
        }}
        rowsPerPageOptions={[15, 25, 50, 100]}
        rows={getCurrentData()}
        rowHeight={100}
        components={{
          Toolbar: DataGridCustomToolbar,
          ColumnMenuIcon: FilterAltOutlinedIcon,
          ColumnMenu: DataGridCustomColumnMenuComponent,
        }}
        componentsProps={{
          columnMenu: {orderStatusData},
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
          volumeWeightCoefficient={volumeWeightCoefficient}
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
