import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useRef } from 'react'

import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AddOrEditSinglePermissionForm } from '@components/forms/add-or-edit-single-permission-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { SinglePermissionsModel } from './single-permissions.model'
import { useClassNames } from './single-permissions.style'

export const SinglePermissions = observer(() => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const spModel = useRef(new SinglePermissionsModel({ history }))

  useEffect(() => {
    spModel.current.loadData()
  }, [])

  const {
    singlePermissions,
    requestStatus,
    getCurrentData,
    sortModel,
    filterModel,
    densityModel,
    columnsModel,

    columnVisibilityModel,
    paginationModel,
    addOrEditSinglePermissionSettings,
    confirmModalSettings,
    showAddOrEditSinglePermissionModal,
    showConfirmModal,
    onTriggerOpenModal,
    onClickAddBtn,
    onClickCancelBtn,

    onChangeSortingModel,
    onChangeFilterModel,
    onColumnVisibilityModelChange,
    onChangePaginationModelChange,
  } = spModel.current

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.placeAddBtnWrapper}>
        <Button success className={classNames.addPermissonsBtn} onClick={() => onClickAddBtn()}>
          {t(TranslationKey.Add)}
        </Button>
      </div>
      <div className={classNames.datagridWrapper}>
        <MemoDataGrid
          disableVirtualization
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
          getRowHeight={() => 'auto'}
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
        openModal={showAddOrEditSinglePermissionModal}
        setOpenModal={() => onTriggerOpenModal('showAddOrEditSinglePermissionModal')}
      >
        <AddOrEditSinglePermissionForm
          existingSinglePermissions={singlePermissions}
          permissionToEdit={addOrEditSinglePermissionSettings.permission}
          isEdit={addOrEditSinglePermissionSettings.isEdit}
          onCloseModal={() => onClickCancelBtn()}
          onSubmit={addOrEditSinglePermissionSettings.onSubmit}
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
