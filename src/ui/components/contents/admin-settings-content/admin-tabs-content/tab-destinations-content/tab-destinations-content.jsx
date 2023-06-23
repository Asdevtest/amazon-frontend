import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { Button } from '@components/shared/buttons/button'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useClassNames } from './tab-destinations-content.style'

import { AdminSettingsModel } from '../../admin-settings-content.model'

export const TabDestinationsContent = observer(() => {
  const { classes: classNames } = useClassNames()

  const asModel = useRef(new AdminSettingsModel({ history }))

  useEffect(() => {
    asModel.current.loadData()
  }, [])

  const {
    onClickAddBtn,
    sortModel,
    filterModel,
    columnVisibilityModel,
    paginationModel,
    getCurrentData,
    columnsModel,
    onColumnVisibilityModelChange,
    densityModel,
    requestStatus,
    onChangeSortingModel,
    onChangePaginationModelChange,
    onChangeFilterModel,
    showAddOrEditDestinationModal,
    onTriggerOpenModal,
    destinationToEdit,
    onClickCancelBtn,
    onSubmitCreateDestination,
    onSubmitEditDestination,
    confirmModalSettings,
    showConfirmModal,
  } = asModel.current

  return (
    <div className={classNames.contentWrapper}>
      <div className={classNames.placeAddBtnWrapper}>
        <Button success onClick={() => onClickAddBtn()}>
          {t(TranslationKey['Add a destination'])}
        </Button>
      </div>
      <div className={classNames.datagridWrapper}>
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
          sortModel={sortModel}
          filterModel={filterModel}
          columnVisibilityModel={columnVisibilityModel}
          paginationModel={paginationModel}
          pageSizeOptions={[15, 25, 50, 100]}
          rows={getCurrentData()}
          rowHeight={120}
          slots={{
            toolbar: DataGridCustomToolbar,
            columnMenuIcon: FilterAltOutlinedIcon,
          }}
          slotProps={{
            toolbar: {
              columsBtnSettings: {
                columnsModel,
                columnVisibilityModel,
                onColumnVisibilityModelChange,
              },
            },
          }}
          density={densityModel}
          columns={columnsModel}
          loading={requestStatus === loadingStatuses.isLoading}
          onSortModelChange={onChangeSortingModel}
          onPaginationModelChange={onChangePaginationModelChange}
          onFilterModelChange={onChangeFilterModel}
        />
      </div>

      <Modal
        openModal={showAddOrEditDestinationModal}
        setOpenModal={() => onTriggerOpenModal('showAddOrEditDestinationModal')}
      >
        <AddOrEditDestinationForm
          destinationToEdit={destinationToEdit}
          onCloseModal={() => onClickCancelBtn()}
          onCreateSubmit={onSubmitCreateDestination}
          onEditSubmit={onSubmitEditDestination}
        />
      </Modal>

      <ConfirmationModal
        isWarning={confirmModalSettings.isWarning}
        openModal={showConfirmModal}
        setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={confirmModalSettings.onClickSuccess}
        onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
      />
    </div>
  )
})
