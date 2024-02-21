import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditUserPermissionsForm } from '@components/forms/add-or-edit-user-permissions-form'
import { LinkSubUserForm } from '@components/forms/link-sub-user-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { checkIsClient, checkIsWithoutProductPermissions } from '@utils/checks'
import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './sub-users-view.style'

import { SubUsersViewModel } from './sub-users-view.model'

export const SubUsersView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new SubUsersViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={styles.header}>
        <div />

        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by name, email'])}
          value={viewModel.nameSearchValue}
          onChange={viewModel.onChangeNameSearchValue}
        />

        <Button
          styleType={ButtonType.SUCCESS}
          tooltipInfoContent={t(TranslationKey['Add your own sub-user'])}
          className={styles.addUserButton}
          onClick={() => viewModel.onTriggerOpenModal('showAddSubUserModal')}
        >
          <CustomPlusIcon />
          {t(TranslationKey['Add a user'])}
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          disableEnforceFocus
          useResizeContainer
          disableRowSelectionOnClick
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          sortingMode="client"
          paginationMode="client"
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
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
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onChangePaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
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
          curUserShopsPermissions={viewModel.curUserShopsPermissions}
          permissionsToSelect={viewModel.singlePermissions}
          permissionGroupsToSelect={viewModel.groupPermissions}
          sourceData={viewModel.selectedSubUser}
          shops={viewModel.shopsData}
          specs={viewModel.specs}
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
        onClickBtn={() => viewModel.onTriggerOpenModal('showWarningModal')}
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
    </>
  )
})
