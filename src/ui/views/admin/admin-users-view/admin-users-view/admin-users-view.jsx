import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { AdminContentModal } from '@components/user/users-views/sub-users-view/admin-content-modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { styles } from './admin-users-view.style'

import { switcherConfig } from './admin-users-view.constants'
import { AdminUsersViewModel } from './admin-users-view.model'

export const AdminUsersViewRaw = ({ classes: styles }) => {
  const [viewModel] = useState(() => new AdminUsersViewModel())

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.usersOnlineWrapper}>
          {t(TranslationKey['Users online'])}: {viewModel.meta?.onlineUsers}
        </div>
        <CustomSwitcher
          className={styles.switcherWrapper}
          switchMode="medium"
          condition={viewModel.switcherCondition}
          switcherSettings={switcherConfig}
          changeConditionHandler={viewModel.onClickChangeRole}
        />

        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.currentSearchValue}
          placeholder={t(TranslationKey['Search by ASIN, SKU, Title'])}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>

      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          pinnedColumns={viewModel.pinnedColumns}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rowHeight={80}
          rowCount={viewModel.rowCount}
          rows={viewModel.currentData}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          getRowId={({ _id }) => _id}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            columnMenu: viewModel.columnMenuSettings,

            toolbar: {
              resetFiltersBtnSettings: {
                onClickResetFilters: viewModel.onClickResetFilters,
                isSomeFilterOn: viewModel.isSomeFilterOn,
              },
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
              sortSettings: {
                sortModel: viewModel.sortModel,
                columnsModel: viewModel.columnsModel,
                onSortModelChange: viewModel.onChangeSortingModel,
              },
            },
          }}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <Modal
        openModal={viewModel.showEditUserModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditUserModal')}
      >
        <AdminContentModal
          checkValidationNameOrEmail={viewModel.checkValidationNameOrEmail}
          changeNameAndEmail={viewModel.changeNameAndEmail}
          singlePermissions={viewModel.singlePermissions}
          groupPermissions={viewModel.groupPermissions}
          editUserFormFields={viewModel.editUserFormFields}
          title={t(TranslationKey['Edit user'])}
          buttonLabel={t(TranslationKey.Save)}
          onSubmit={viewModel.submitEditUserForm}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditUserModal')}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['This user has sub-users - they will be deactivated! Are you sure?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            viewModel.finalStepSubmitEditUserForm()
            viewModel.onTriggerOpenModal('showConfirmModal')
          }}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </>
  )
}

export const AdminUsersView = withStyles(observer(AdminUsersViewRaw), styles)
