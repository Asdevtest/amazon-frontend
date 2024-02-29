import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './tab-destinations.style'

import { AdminSettingsDestinationsModel } from './tab-destinations.model'

export const TabDestinations = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new AdminSettingsDestinationsModel())

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <div className={styles.wrapper}>
      <Button styleType={ButtonStyle.SUCCESS} onClick={() => viewModel.onClickAddBtn()}>
        {t(TranslationKey['Add a destination'])}
      </Button>

      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          sortingMode="client"
          paginationMode="client"
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          rowHeight={70}
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
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
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
        isWarning={viewModel.confirmModalSettings?.isWarning}
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
