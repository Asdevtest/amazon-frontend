import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { AdminContentModal } from '@components/user/users-views/sub-users-view/admin-content-modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './admin-users-view.style'

import { AdminUsersViewModel } from './admin-users-view.model'

export const AdminUsersViewRaw = props => {
  const [viewModel] = useState(() => new AdminUsersViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <SearchInput
          inputClasses={classNames.searchInput}
          value={viewModel.nameSearchValue}
          placeholder={t(TranslationKey.search)}
          onChange={viewModel.onChangeNameSearchValue}
        />

        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            useResizeContainer
            localeText={getLocalizationByLanguageTag()}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rowHeight={80}
            rows={viewModel.getCurrentData()}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
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
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
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

      <ConfirmationModal
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
    </React.Fragment>
  )
}

export const AdminUsersView = withStyles(observer(AdminUsersViewRaw), styles)
