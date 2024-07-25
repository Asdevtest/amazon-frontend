import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { CLIENT_USER_MANAGERS_LIST } from '@constants/mocks'
import { TranslationKey } from '@constants/translations/translation-key'

import { AvatarEditorForm } from '@components/forms/avatar-editor-form'
import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form'
import { UserInfoEditForm } from '@components/forms/user-info-edit-form'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { ContentModal } from '@components/user/users-views/user-profile-view/content-modal'
import { UserProfile } from '@components/user/users-views/user-profile-view/user-profile'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { Roles } from '@typings/enums/roles'

import { useStyles } from './user-profile-view.style'

import { ProfileViewModel } from './user-profile-view.model'

export const UserProfileView = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ProfileViewModel())

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

      {[Roles.SUPERVISOR, Roles.BUYER].includes(viewModel.userInfo?.role) ? (
        <>
          <p className={styles.title}>{t(TranslationKey['Active offers on the commodity exchange'])}</p>

          <CustomDataGrid
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
            loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
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
        setOpenModal={() => {
          viewModel.onTriggerOpenModal('showUserInfoModal')
          viewModel.onTriggerEnterInformation()
        }}
      >
        <UserInfoEditForm
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
    </>
  )
})
