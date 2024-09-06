import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid'

import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { CLIENT_USER_MANAGERS_LIST } from '@constants/mocks'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form'
import { UserInfoEditForm } from '@components/forms/user-info-edit-form'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { ContentModal } from '@components/user/users-views/user-profile-view/content-modal'
import { UserProfile } from '@components/user/users-views/user-profile-view/user-profile'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './user-profile-view.style'

import { ProfileViewModel } from './user-profile-view.model'

export const UserProfileView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new ProfileViewModel(), [])

  return (
    <div className="viewWrapper">
      <UserProfile
        // @ts-ignore
        user={viewModel.userInfo}
        headerInfoData={viewModel.headerInfoData}
        tabHistory={viewModel.tabHistory}
        setTabHistory={viewModel.onChangeTabHistory}
        reviews={viewModel.reviews}
        onSubmitAvatarEdit={viewModel.onSubmitAvatarEdit}
        onClickChangeUserInfo={() => viewModel.onTriggerOpenModal('showUserInfoModal')}
        onClickReview={() => viewModel.onTriggerOpenModal('showConfirmWorkResultFormModal')}
      />

      {[mapUserRoleEnumToKey[UserRole.SUPERVISOR], mapUserRoleEnumToKey[UserRole.BUYER]].includes(
        viewModel.userInfo?.role,
      ) ? (
        <>
          <p className={styles.title}>{t(TranslationKey['Active offers on the commodity exchange'])}</p>

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              sortModel={viewModel.sortModel}
              filterModel={viewModel.filterModel}
              pinnedColumns={viewModel.pinnedColumns}
              paginationModel={viewModel.paginationModel}
              columnVisibilityModel={viewModel.columnVisibilityModel}
              rows={viewModel.currentData}
              getRowHeight={() => 'auto'}
              getRowId={({ _id }: GridRowModel) => _id}
              slotProps={{
                baseTooltip: {
                  title: t(TranslationKey.Filter),
                },
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
              rowCount={viewModel.rowCount}
              columns={viewModel.columnsModel}
              loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
              onPinnedColumnsChange={viewModel.handlePinColumn}
              onSortModelChange={viewModel.onChangeSortingModel}
              onFilterModelChange={viewModel.onChangeFilterModel}
              onPaginationModelChange={viewModel.onPaginationModelChange}
              onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            />
          </div>
        </>
      ) : null}

      <Modal openModal={viewModel.showTabModal} setOpenModal={() => viewModel.onTriggerOpenModal('showTabModal')}>
        <ContentModal
          setOpenModal={() => viewModel.onTriggerOpenModal('showTabModal')}
          selected={viewModel.selectedUser}
          managersList={CLIENT_USER_MANAGERS_LIST}
        />
      </Modal>

      <Modal
        openModal={viewModel.showUserInfoModal}
        setOpenModal={() => {
          viewModel.onTriggerOpenModal('showUserInfoModal')
          viewModel.onTriggerEnterInformation()
        }}
      >
        <UserInfoEditForm
          // @ts-ignore
          user={viewModel.userInfo}
          activeSessions={viewModel.activeSessions}
          userInfoEditFormFlag={viewModel.userInfoEditFormFlag}
          onToggleUserInfoEditFormFlag={viewModel.onToggleUserInfoEditFormFlag}
          onLogoutSession={viewModel.onLogoutSession}
          onSubmit={viewModel.onSubmitUserInfoEdit}
          onCloseModal={() => viewModel.onTriggerOpenModal('showUserInfoModal')}
        />
      </Modal>

      {viewModel.showConfirmWorkResultFormModal ? (
        <RequestProposalAcceptOrRejectResultForm
          // @ts-ignore
          openModal={viewModel.showConfirmWorkResultFormModal}
          title={t(TranslationKey['Confirm acceptance of the work result'])}
          rateLabel={t(TranslationKey['Rate the performer'])}
          reviewLabel={t(TranslationKey["Review of the performer's work"])}
          confirmButtonText={t(TranslationKey.Confirm)}
          cancelBtnText={t(TranslationKey.Reject)}
          onSubmit={viewModel.onAcceptReview}
          onClose={() => viewModel.onTriggerOpenModal('showConfirmWorkResultFormModal')}
        />
      ) : null}
    </div>
  )
})
