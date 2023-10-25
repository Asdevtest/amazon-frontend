import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { CLIENT_USER_MANAGERS_LIST } from '@constants/mocks'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AvatarEditorForm } from '@components/forms/avatar-editor-form'
import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form'
import { UserInfoEditForm } from '@components/forms/user-info-edit-form'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { ContentModal } from '@components/user/users-views/user-profile-view/content-modal'
import { UserProfile } from '@components/user/users-views/user-profile-view/user-profile'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './user-profile-view.style'

import { ProfileViewModel } from './user-profile-view.model'

export const UserProfileViewRaw = props => {
  const [viewModel] = useState(() => new ProfileViewModel({ history: props.history }))

  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div>
        <UserProfile
          user={viewModel.user}
          timer={'14 минут'}
          headerInfoData={viewModel.headerInfoData}
          tabReview={viewModel.tabReview}
          tabHistory={viewModel.tabHistory}
          setTabHistory={viewModel.onChangeTabHistory}
          setTabReview={viewModel.onChangeTabReview}
          reviews={viewModel.reviews}
          onClickChangeAvatar={viewModel.onClickChangeAvatar}
          onClickChangeUserInfo={viewModel.onClickChangeUserInfo}
          onClickReview={() => viewModel.onTriggerOpenModal('showConfirmWorkResultFormModal')}
        />

        {/* <ActiveOrders
                tabExchange={tabExchange}
                setTabExchange={onChangeTabExchange}
                productList={CLIENT_USER_INITIAL_LIST}
                handlerClickButtonPrivateLabel={onClickButtonPrivateLabel}
              /> */}

        {[
          // mapUserRoleEnumToKey[UserRole.RESEARCHER],
          mapUserRoleEnumToKey[UserRole.SUPERVISOR],
          mapUserRoleEnumToKey[UserRole.BUYER],
        ].includes(viewModel.user.role) ? (
          <>
            <Typography variant="h6" className={classNames.title}>
              {t(TranslationKey['Active offers on the commodity exchange'])}
            </Typography>

            <MemoDataGrid
              useResizeContainer
              localeText={getLocalizationByLanguageTag()}
              sortModel={viewModel.sortModel}
              filterModel={viewModel.filterModel}
              columnVisibilityModel={viewModel.columnVisibilityModel}
              paginationModel={viewModel.paginationModel}
              pageSizeOptions={[15, 25, 50, 100]}
              rows={viewModel.getCurrentData()}
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
              loading={viewModel.requestStatus === loadingStatuses.isLoading}
              onSortModelChange={viewModel.onChangeSortingModel}
              onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
              onPaginationModelChange={viewModel.onChangePaginationModelChange}
              onFilterModelChange={viewModel.onChangeFilterModel}
            />
          </>
        ) : null}
      </div>
      <Modal openModal={viewModel.showTabModal} setOpenModal={viewModel.onTriggerShowTabModal}>
        <ContentModal
          setOpenModal={viewModel.onTriggerShowTabModal}
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
          user={viewModel.user}
          clearError={viewModel.clearError}
          wrongPassword={viewModel.wrongPassword}
          checkValidationNameOrEmail={viewModel.checkValidationNameOrEmail}
          onSubmit={viewModel.onSubmitUserInfoEdit}
          onCloseModal={() => viewModel.onTriggerOpenModal('showUserInfoModal')}
        />
      </Modal>

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
        title={viewModel.warningInfoModalTitle}
        btnText={t(TranslationKey.Close)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showInfoModal')
        }}
      />

      {viewModel.showConfirmWorkResultFormModal && (
        <RequestProposalAcceptOrRejectResultForm
          openModal={viewModel.showConfirmWorkResultFormModal}
          title={t(TranslationKey['Confirm acceptance of the work result'])}
          rateLabel={t(TranslationKey['Rate the performer'])}
          reviewLabel={t(TranslationKey["Review of the performer's work"])}
          confirmButtonText={t(TranslationKey.Confirm)}
          cancelBtnText={t(TranslationKey.Reject)}
          onSubmit={viewModel.onAcceptReview}
          onClose={() => viewModel.onTriggerOpenModal('showConfirmWorkResultFormModal')}
        />
      )}
    </>
  )
}

export const UserProfileView = withStyles(observer(UserProfileViewRaw), styles)
