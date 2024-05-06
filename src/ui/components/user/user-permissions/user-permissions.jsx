import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditGroupPermissionForm } from '@components/forms/add-or-edit-group-permission-form'
import { AddOrEditSinglePermissionForm } from '@components/forms/add-or-edit-single-permission-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './user-permissions.style'

import { switcherSettings } from './user-permissions.config'
import { UserPermissionsModel } from './user-permissions.model'

export const UserPermissions = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new UserPermissionsModel())

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <div className={styles.customSwitcherContainer}>
          <CustomSwitcher
            fullWidth
            switchMode="medium"
            condition={viewModel.tabIndex}
            switcherSettings={switcherSettings}
            changeConditionHandler={viewModel.onChangeTabIndex}
          />
        </div>

        <div className={styles.buttons}>
          <Button onClick={viewModel.onClickExportPermissions}>{t(TranslationKey['Export to file'])}</Button>
          <Button onClick={viewModel.onClickImportPermissions}>{t(TranslationKey['Import permissions'])}</Button>
          <Button styleType={ButtonStyle.SUCCESS} onClick={viewModel.onClickAddBtn}>
            {t(TranslationKey.Add)}
          </Button>
        </div>
      </div>

      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          sortingMode="client"
          paginationMode="client"
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
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onSortModelChange={viewModel.onChangeSortingModel}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <Modal
        openModal={viewModel.showAddOrEditGroupPermissionModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditGroupPermissionModal')}
      >
        <AddOrEditGroupPermissionForm
          existingGroupPermissions={viewModel.groupPermissions}
          singlePermissions={viewModel.singlePermissions}
          permissionToEdit={viewModel.addOrEditPermissionSettings.permission}
          isEdit={viewModel.addOrEditPermissionSettings.isEdit}
          onCloseModal={viewModel.onClickCancelBtn}
          onSubmit={viewModel.addOrEditPermissionSettings.onSubmit}
        />
      </Modal>

      <Modal
        openModal={viewModel.showAddOrEditSinglePermissionModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditSinglePermissionModal')}
      >
        <AddOrEditSinglePermissionForm
          existingSinglePermissions={viewModel.singlePermissions}
          permissionToEdit={viewModel.addOrEditPermissionSettings.permission}
          isEdit={viewModel.addOrEditPermissionSettings.isEdit}
          onCloseModal={viewModel.onClickCancelBtn}
          onSubmit={viewModel.addOrEditPermissionSettings.onSubmit}
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
