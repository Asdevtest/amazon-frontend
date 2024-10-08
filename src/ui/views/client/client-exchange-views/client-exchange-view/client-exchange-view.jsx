import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SelectShopsModal } from '@components/modals/select-shops-modal/select-shops-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './client-exchange-view.style'

import { ClientExchangeViewModel } from './client-exchange-view.model'

export const ClientExchangeView = observer(() => {
  const [viewModel] = useState(() => new ClientExchangeViewModel())
  const { classes: styles } = useStyles()

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={styles.tableWrapper}>
        <CustomDataGrid
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          getRowHeight={() => 'auto'}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <Modal openModal={viewModel.showOrderModal} setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}>
        <OrderProductModal
          platformSettings={viewModel.platformSettings}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepers}
          requestStatus={viewModel.requestStatus}
          selectedProductsData={[viewModel.selectedProduct]}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onDoubleClickBarcode={viewModel.onDoubleClickBarcode}
          onSubmit={viewModel.onClickOrderNowBtn}
          onClickCancel={viewModel.onClickCancelBtn}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSelectShopsModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSelectShopsModal')}
      >
        <SelectShopsModal
          isNotDisabled
          title={viewModel.confirmModalSettings.confirmTitle}
          message={viewModel.confirmModalSettings.confirmMessage}
          shops={viewModel.shopsData}
          onClickSuccessBtn={viewModel.onClickBuyProductBtn}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showSelectShopsModal')}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
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
      ) : null}

      {viewModel.showSuccessModal ? (
        <SuccessInfoModal
          // @ts-ignore
          openModal={viewModel.showSuccessModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
          title={t(TranslationKey['Order successfully created!'])}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        />
      ) : null}
    </>
  )
})
