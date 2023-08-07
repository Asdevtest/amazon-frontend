import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { AdminSettingsDestinationsModel } from './tab-destinations.model'
import { useClassNames } from './tab-destinations.style'

export const TabDestinations = observer(() => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminSettingsDestinationsModel())

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <div className={classNames.wrapper}>
      <Button success className={classNames.saveButton} onClick={() => viewModel.onClickAddBtn()}>
        {t(TranslationKey['Add a destination'])}
      </Button>

      <div className={classNames.datagridWrapper}>
        <MemoDataGrid
          pagination
          useResizeContainer
          classes={{
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
          rowHeight={70}
          slots={{
            toolbar: DataGridCustomToolbar,
            columnMenuIcon: FilterAltOutlinedIcon,
          }}
          slotProps={{
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          onSortModelChange={viewModel.onChangeSortingModel}
          onPaginationModelChange={viewModel.onChangePaginationModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <Modal openModal={viewModel.showAddOrEditDestinationModal} setOpenModal={viewModel.onClickToggleAddOrEditModal}>
        <AddOrEditDestinationForm
          destinationToEdit={viewModel.destinationToEdit}
          onCloseModal={viewModel.onClickCancelBtn}
          onCreateSubmit={viewModel.onCreateDestination}
          onEditSubmit={viewModel.onEditDestination}
        />
      </Modal>

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={viewModel.onClickToggleConfirmModal}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickSuccess}
        onClickCancelBtn={viewModel.onClickToggleConfirmModal}
      />
    </div>
  )
})
