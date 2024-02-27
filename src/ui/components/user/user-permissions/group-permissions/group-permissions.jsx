import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditGroupPermissionForm } from '@components/forms/add-or-edit-group-permission-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './group-permissions.style'

import { GroupPermissionsModel } from './group-permissions.model'

export const GroupPermissions = observer(() => {
  const { classes: styles } = useStyles()
  const history = useHistory()
  const gpModel = useRef(new GroupPermissionsModel({ history }))

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

    columnVisibilityModel,
    paginationModel,

    addOrEditGroupPermissionSettings,
    confirmModalSettings,
    showAddOrEditGroupPermissionModal,
    showConfirmModal,
    singlePermissions,
    onTriggerOpenModal,
    onClickAddBtn,
    onClickCancelBtn,

    onChangeSortingModel,
    onChangeFilterModel,
    onColumnVisibilityModelChange,
    onChangePaginationModelChange,
  } = gpModel.current

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.placeAddBtnWrapper}>
        <Button styleType={ButtonStyle.SUCCESS} className={styles.addPermissonsBtn} onClick={() => onClickAddBtn()}>
          {t(TranslationKey.Add)}
        </Button>
      </div>
      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          sortModel={sortModel}
          filterModel={filterModel}
          sortingMode="client"
          paginationMode="client"
          columnVisibilityModel={columnVisibilityModel}
          paginationModel={paginationModel}
          rows={getCurrentData()}
          getRowHeight={() => 'auto'}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
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
          loading={requestStatus === loadingStatuses.IS_LOADING}
          onSortModelChange={onChangeSortingModel}
          onPaginationModelChange={onChangePaginationModelChange}
          onFilterModelChange={onChangeFilterModel}
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
        isWarning={confirmModalSettings?.isWarning}
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
