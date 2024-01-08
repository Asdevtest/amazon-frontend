import { observer } from 'mobx-react'
import { useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditShopForm } from '@components/forms/add-or-edit-shop-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { useStyles } from './client-shops-view.style'

import { ShopsViewModel } from './client-shops-view.model'

export const ClientShopsView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ShopsViewModel())
  viewModel.initHistory()

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.buttonsWrapper}>
          <Button
            tooltipInfoContent={t(TranslationKey['Open the window to add a store'])}
            onClick={viewModel.onClickAddBtn}
          >
            {t(TranslationKey['Add shop'])}
          </Button>

          <Button
            disabled={!viewModel.selectedRows.length || viewModel.requestStatus === loadingStatuses.IS_LOADING}
            onClick={viewModel.updateShops}
          >
            {t(TranslationKey.Update)}
          </Button>
        </div>

        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.Title)}`}
          value={viewModel.unserverSearchValue}
          onChange={viewModel.onChangeUnserverSearchValue}
        />

        <div />
      </div>

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
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          rowSelectionModel={viewModel.selectedRows}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
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

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningModal')
        }}
      />

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
