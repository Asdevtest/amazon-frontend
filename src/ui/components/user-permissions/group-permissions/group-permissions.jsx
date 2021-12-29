import React, {useEffect, useRef} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {SuccessButton} from '@components/buttons/success-button/success-button'
import {AddOrEditGroupPermissionForm} from '@components/forms/add-or-edit-group-permission-form'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'

import {onStateChangeHandler} from '@utils/data-grid-handlers'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {GroupPermissionsModel} from './group-permissions.model'
import {useClassNames} from './group-permissions.style'

const textConsts = getLocalizedTexts(texts, 'ru').groupPermissions

export const GroupPermissions = observer(() => {
  const classNames = useClassNames()
  const history = useHistory()
  const gpModel = useRef(new GroupPermissionsModel({history}))

  useEffect(() => {
    gpModel.current.loadData()
  }, [])

  const {
    groupPermissions,
    requestStatus,
    getCurrentData,
    sortModel,
    filterModel,
    densityModel,
    columnsModel,

    curPage,
    rowsPerPage,
    addOrEditGroupPermissionSettings,
    confirmModalSettings,
    showAddOrEditGroupPermissionModal,
    showConfirmModal,
    singlePermissions,
    onChangeCurPage,
    onChangeRowsPerPage,
    onTriggerOpenModal,
    onClickAddBtn,
    onClickCancelBtn,

    setDataGridState,
    onChangeSortingModel,
    onChangeFilterModel,
  } = gpModel.current

  return (
    <div className={classNames.mainWrapper}>
      <Typography variant="h6">{textConsts.mainTitle}</Typography>

      <div className={classNames.placeAddBtnWrapper}>
        <SuccessButton onClick={() => onClickAddBtn()}>{textConsts.addBtn}</SuccessButton>
      </div>

      <div className={classNames.tableWrapper}>
        <DataGrid
          pagination
          useResizeContainer
          autoHeight
          sortModel={sortModel}
          filterModel={filterModel}
          page={curPage}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 20]}
          rows={getCurrentData()}
          rowHeight={70}
          components={{
            Toolbar: GridToolbar,
          }}
          density={densityModel}
          columns={columnsModel}
          loading={requestStatus === loadingStatuses.isLoading}
          onSortModelChange={onChangeSortingModel}
          onPageSizeChange={onChangeRowsPerPage}
          onPageChange={onChangeCurPage}
          onStateChange={e => onStateChangeHandler(e, setDataGridState)}
          onFilterModelChange={model => onChangeFilterModel(model)}
        />
      </div>

      <Modal
        openModal={showAddOrEditGroupPermissionModal}
        setOpenModal={() => onTriggerOpenModal('showAddOrEditGroupPermissionModal')}
      >
        <AddOrEditGroupPermissionForm
          existingGroupPermissions={groupPermissions}
          singlePermissions={singlePermissions}
          permissionToEdit={addOrEditGroupPermissionSettings.permission}
          isEdit={addOrEditGroupPermissionSettings.isEdit}
          onCloseModal={() => onClickCancelBtn()}
          onSubmit={addOrEditGroupPermissionSettings.onSubmit}
        />
      </Modal>

      <ConfirmationModal
        isWarning={confirmModalSettings.isWarning}
        openModal={showConfirmModal}
        setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
        title={textConsts.confirmTitle}
        message={confirmModalSettings.message}
        successBtnText={textConsts.yesBtn}
        cancelBtnText={textConsts.noBtn}
        onClickSuccessBtn={confirmModalSettings.onClickSuccess}
        onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
      />
    </div>
  )
})
