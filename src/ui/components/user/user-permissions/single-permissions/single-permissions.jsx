import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditSinglePermissionForm } from '@components/forms/add-or-edit-single-permission-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './single-permissions.style'

import { SinglePermissionsModel } from './single-permissions.model'

export const SinglePermissions = observer(() => {
  const { classes: styles } = useStyles()
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
          columnVisibilityModel={columnVisibilityModel}
          paginationModel={paginationModel}
          rows={getCurrentData()}
          getRowHeight={() => 'auto'}
          sortingMode="client"
          paginationMode="client"
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
