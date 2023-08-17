import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SelectShopsModal } from '@components/modals/select-shops-modal/select-shops-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './client-exchange-view.style'

import { ClientExchangeViewModel } from './client-exchange-view.model'

export const ClientExchangeViewRaw = props => {
  const [viewModel] = useState(() => new ClientExchangeViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
    viewModel.getDataGridState()
  }, [])

  return (
    <React.Fragment>
      <div>
        <MemoDataGrid
          pagination
          useResizeContainer
          classes={{
            root: classNames.root,
            footerContainer: classNames.footerContainer,
            footerCell: classNames.footerCell,
            toolbarContainer: classNames.toolbarContainer,
          }}
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          pageSizeOptions={[15, 25, 50, 100]}
          rows={viewModel.getCurrentData()}
          rowHeight={100}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          slots={{
            toolbar: DataGridCustomToolbar,
            columnMenuIcon: FilterAltOutlinedIcon,
          }}
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
          onPaginationModelChange={viewModel.onChangePaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <Modal openModal={viewModel.showOrderModal} setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}>
        <OrderProductModal
          // volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
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
          title={viewModel.confirmModalSettings.confirmTitle}
          message={viewModel.confirmModalSettings.confirmMessage}
          shops={viewModel.shopsData}
          onClickSuccessBtn={viewModel.onClickBuyProductBtn}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showSelectShopsModal')}
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

      <WarningInfoModal
        openModal={viewModel.showWarningModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningModal')}
        title={viewModel.showWarningModalText}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningModal')
        }}
      />

      <SuccessInfoModal
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={t(TranslationKey['Order successfully created!'])}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          viewModel.onTriggerOpenModal('showSuccessModal')
        }}
      />
    </React.Fragment>
  )
}

export const ClientExchangeView = withStyles(observer(ClientExchangeViewRaw), styles)
