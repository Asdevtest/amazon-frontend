import { observer } from 'mobx-react'
import { useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditShopForm } from '@components/forms/add-or-edit-shop-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './client-shops-view.style'

import { ShopsViewModel } from './client-shops-view.model'
import { Header } from './header/header'

export const ClientShopsView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ShopsViewModel())
  viewModel.initHistory()

  console.log('viewModel.filterModel :>> ', viewModel.filterModel)

  return (
    <>
      <Header
        requestStatus={viewModel.requestStatus}
        unserverSearchValue={viewModel.unserverSearchValue}
        selectedRows={viewModel.selectedRows}
        updateShops={viewModel.updateShops}
        onClickAddBtn={viewModel.onClickAddBtn}
        onChangeUnserverSearchValue={viewModel.onChangeUnserverSearchValue}
      />

      <div className={styles.tabledWrapper}>
        <CustomDataGrid
          useResizeContainer
          checkboxSelection
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }) => _id}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: (model, details) =>
                  viewModel.onColumnVisibilityModelChange(model, details, true),
              },
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          rowSelectionModel={viewModel.selectedRows}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={(model, details) => viewModel.onChangeSortingModel(model, details, true)}
          onColumnVisibilityModelChange={(model, details) =>
            viewModel.onColumnVisibilityModelChange(model, details, true)
          }
          onPaginationModelChange={(model, details) => viewModel.onPaginationModelChange(model, details, true)}
          onFilterModelChange={(model, details) => viewModel.onChangeFilterModel(model, details, true)}
        />
      </div>

      <Modal
        openModal={viewModel.showAddOrEditShopModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditShopModal')}
      >
        <AddOrEditShopForm
          shopToEdit={viewModel.selectedShop}
          onCloseModal={() => viewModel.onTriggerOpenModal('showAddOrEditShopModal')}
          onSubmit={viewModel.onSubmitShopForm}
        />
      </Modal>

      <ConfirmationModal
        isWarning
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={viewModel.confirmModalSettings.title}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
        onClickCancelBtn={viewModel.confirmModalSettings.onCancel}
      />
    </>
  )
})
