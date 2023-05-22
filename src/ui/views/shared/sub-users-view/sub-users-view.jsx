import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AddOrEditUserPermissionsForm } from '@components/forms/add-or-edit-user-permissions-form'
import { LinkSubUserForm } from '@components/forms/link-sub-user-form'
// import {LinkSubUserForm} from '@components/forms/link-sub-user-form'
import { MainContent } from '@components/layout/main-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { checkIsClient, checkIsStorekeeper } from '@utils/checks'
import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { SubUsersViewModel } from './sub-users-view.model'
import { styles } from './sub-users-view.style'

export const SubUsersViewRaw = props => {
  const [viewModel] = useState(() => new SubUsersViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
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
              {t(TranslationKey['Add a user'])}
            </Button>
          </div>
        </div>
        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            pagination
            disableEnforceFocus
            useResizeContainer
            disableSelectionOnClick
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
            page={viewModel.curPage}
            pageSize={viewModel.rowsPerPage}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            rowHeight={145}
            components={{
              Toolbar: DataGridCustomToolbar,
              ColumnMenuIcon: FilterAltOutlinedIcon,
            }}
            componentsProps={{
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  changeColumnsModel: viewModel.changeColumnsModel,
                },
              },
            }}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onSortModelChange={viewModel.onChangeSortingModel}
            onPageSizeChange={viewModel.onChangeRowsPerPage}
            onPageChange={viewModel.onChangeCurPage}
            onStateChange={viewModel.setDataGridState}
            onFilterModelChange={model => viewModel.onChangeFilterModel(model)}
          />
        </div>
      </MainContent>
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
          isWithoutProductPermissions={checkIsStorekeeper(UserRoleCodeMap[viewModel.userInfo.role])}
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
