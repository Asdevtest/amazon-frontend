import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { AdminDestinationsViewModel } from './admin-destinations-view.model'

export const AdminDestinationsView = observer(props => {
  const viewModel = useMemo(() => new AdminDestinationsViewModel({ history }), [])

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <div className="viewWrapper">
      <CustomButton type="primary" onClick={() => viewModel.onClickAddBtn()}>
        {t(TranslationKey['Add a destination'])}
      </CustomButton>

      <CustomDataGrid
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
        }}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
      />

      <Modal
        openModal={viewModel.showAddOrEditDestinationModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditDestinationModal')}
      >
        <AddOrEditDestinationForm
          destinationToEdit={viewModel.destinationToEdit}
          onCloseModal={() => viewModel.onClickCancelBtn()}
          onCreateSubmit={viewModel.onSubmitCreateDestination}
          onEditSubmit={viewModel.onSubmitEditDestination}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickSuccess}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </div>
  )
})
