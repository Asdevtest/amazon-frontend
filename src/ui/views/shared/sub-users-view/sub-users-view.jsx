import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import AddIcon from '@mui/icons-material/Add'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AddOrEditUserPermissionsForm } from '@components/forms/add-or-edit-user-permissions-form'
import { LinkSubUserForm } from '@components/forms/link-sub-user-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { checkIsClient, checkIsWithoutProductPermissions } from '@utils/checks'
import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './sub-users-view.style'

import { SubUsersViewModel } from './sub-users-view.model'

export const SubUsersViewRaw = props => {
  const [viewModel] = useState(() => new SubUsersViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <div className={classNames.subUserHeader}>
          <div />

          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by name, email'])}
            value={viewModel.nameSearchValue}
            onChange={viewModel.onChangeNameSearchValue}
          />
          <div className={classNames.buttonWrapper}>
            <Button
              success
              tooltipInfoContent={t(TranslationKey['Add your own sub-user'])}
              className={classNames.addUserButton}
              onClick={() => viewModel.onTriggerOpenModal('showAddSubUserModal')}
            >
              <AddIcon />
              {t(TranslationKey['Add a user'])}
            </Button>
          </div>
        </div>
        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            pagination
            disableEnforceFocus
            useResizeContainer
            disableRowSelectionOnClick
            classes={{
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
              filterForm: classNames.filterForm,
            }}
            localeText={getLocalizationByLanguageTag()}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.getCurrentData()}
            getRowHeight={() => 'auto'}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
            }}
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
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </div>
      <Modal
        openModal={viewModel.showAddSubUserModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddSubUserModal')}
      >
        <LinkSubUserForm
          closeModal={() => viewModel.onTriggerOpenModal('showAddSubUserModal')}
          onSubmit={viewModel.onSubmitlinkSubUser}
        />
      </Modal>
      <Modal
        openModal={viewModel.showPermissionModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showPermissionModal')}
      >
        <AddOrEditUserPermissionsForm
          isWithoutProductPermissions={checkIsWithoutProductPermissions(UserRoleCodeMap[viewModel.userInfo.role])}
          isWithoutShopsDepends={!checkIsClient(UserRoleCodeMap[viewModel.userInfo.role])}
          curUserProductPermissions={viewModel.curUserProductPermissions}
          permissionsToSelect={viewModel.singlePermissions}
          permissionGroupsToSelect={viewModel.groupPermissions}
          sourceData={viewModel.selectedSubUser}
          shops={viewModel.shopsData}
          productPermissionsData={viewModel.productPermissionsData}
          onCloseModal={() => viewModel.onTriggerOpenModal('showPermissionModal')}
          onSubmit={viewModel.onSubmitUserPermissionsForm}
        />
      </Modal>

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningModal')
        }}
      />
      <ConfirmationModal
        isWarning
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Are you sure you want to unbind the sub-user?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.onSubmitUnlinkSubUser}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
    </React.Fragment>
  )
}

export const SubUsersView = withStyles(observer(SubUsersViewRaw), styles)
