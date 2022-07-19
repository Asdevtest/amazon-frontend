import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {AddOrEditSinglePermissionForm} from '@components/forms/add-or-edit-single-permission-form'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {SinglePermissionsModel} from './single-permissions.model'
import {useClassNames} from './single-permissions.style'

export const SinglePermissions = observer(() => {
  const classNames = useClassNames()
  const history = useHistory()
  const spModel = useRef(new SinglePermissionsModel({history}))

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

    curPage,
    rowsPerPage,
    addOrEditSinglePermissionSettings,
    confirmModalSettings,
    showAddOrEditSinglePermissionModal,
    showConfirmModal,
    onChangeCurPage,
    onChangeRowsPerPage,
    onTriggerOpenModal,
    onClickAddBtn,
    onClickCancelBtn,

    setDataGridState,
    onChangeSortingModel,
    onChangeFilterModel,
  } = spModel.current

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.placeAddBtnWrapper}>
        <Button success onClick={() => onClickAddBtn()}>
          {t(TranslationKey.Add)}
        </Button>
      </div>

      <DataGrid
        pagination
        useResizeContainer
        sx={{
          border: 0,
          boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
          backgroundColor: '#fff',
        }}
        localeText={getLocalizationByLanguageTag()}
        sortModel={sortModel}
        filterModel={filterModel}
        page={curPage}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[15, 25, 50, 100]}
        rows={getCurrentData()}
        rowHeight={90}
        components={{
          Toolbar: GridToolbar,
        }}
        density={densityModel}
        columns={columnsModel}
        loading={requestStatus === loadingStatuses.isLoading}
        onSortModelChange={onChangeSortingModel}
        onPageSizeChange={onChangeRowsPerPage}
        onPageChange={onChangeCurPage}
        onStateChange={setDataGridState}
        onFilterModelChange={model => onChangeFilterModel(model)}
      />
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
