import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { CLIENT_USER_MANAGERS_LIST } from '@constants/mocks'
import { TranslationKey } from '@constants/translations/translation-key'

import { AvatarEditorForm } from '@components/forms/avatar-editor-form'
import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form'
import { UserInfoEditForm } from '@components/forms/user-info-edit-form'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { ContentModal } from '@components/user/users-views/user-profile-view/content-modal'
import { UserProfile } from '@components/user/users-views/user-profile-view/user-profile'

import { t } from '@utils/translations'

import { loadingStatuses } from '@typings/enums/loading-status'

import { useStyles } from './user-profile-view.style'

import { ProfileViewModel } from './user-profile-view.model'

export const UserProfileView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ProfileViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <UserProfile
        user={viewModel.userInfo}
        headerInfoData={viewModel.headerInfoData}
        tabHistory={viewModel.tabHistory}
        setTabHistory={viewModel.onChangeTabHistory}
        reviews={viewModel.reviews}
        onClickChangeAvatar={() => viewModel.onTriggerOpenModal('showAvatarEditModal')}
        onClickChangeUserInfo={() => viewModel.onTriggerOpenModal('showUserInfoModal')}
        onClickReview={() => viewModel.onTriggerOpenModal('showConfirmWorkResultFormModal')}
      />

      {[mapUserRoleEnumToKey[UserRole.SUPERVISOR], mapUserRoleEnumToKey[UserRole.BUYER]].includes(
        viewModel.userInfo?.role,
      ) ? (
        <>
          <p className={styles.title}>{t(TranslationKey['Active offers on the commodity exchange'])}</p>

          <CustomDataGrid
            useResizeContainer
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.currentData}
            rowHeight={100}
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
            onPaginationModelChange={viewModel.onPaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
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
        openModal={viewModel.showAvatarEditModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAvatarEditModal')}
      >
        <AvatarEditorForm
          onSubmit={viewModel.onSubmitAvatarEdit}
          onCloseModal={() => viewModel.onTriggerOpenModal('showAvatarEditModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showUserInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showUserInfoModal')}
      >
        <UserInfoEditForm
          resetProfileDataValidation={viewModel.resetProfileDataValidation}
          user={viewModel.userInfo}
          clearError={viewModel.clearError}
          wrongPassword={viewModel.wrongPassword}
          checkValidationNameOrEmail={viewModel.checkValidationNameOrEmail}
          activeSessions={viewModel.activeSessions}
          userInfoEditFormFlag={viewModel.userInfoEditFormFlag}
          onToggleUserInfoEditFormFlag={viewModel.onToggleUserInfoEditFormFlag}
          onLogoutSession={viewModel.onLogoutSession}
          onSubmit={viewModel.onSubmitUserInfoEdit}
          onCloseModal={() => viewModel.onTriggerOpenModal('showUserInfoModal')}
        />
      </Modal>

      {viewModel.showInfoModal ? (
        <WarningInfoModal
          // @ts-ignore
          openModal={viewModel.showInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
          title={viewModel.warningInfoModalTitle}
          btnText={t(TranslationKey.Close)}
          onClickBtn={() => viewModel.onTriggerOpenModal('showInfoModal')}
        />
      ) : null}

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
    </>
  )
})
