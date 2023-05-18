import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { mapUserRoleEnumToKey, UserRole } from '@constants/keys/user-roles'
import { CLIENT_USER_MANAGERS_LIST } from '@constants/mocks'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AvatarEditorForm } from '@components/forms/avatar-editor-form'
import { UserInfoEditForm } from '@components/forms/user-info-edit-form'
import { MainContent } from '@components/layout/main-content'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
// import {ActiveOrders} from '@components/screens/users-views/user-profile-view/active-orders'
import { ContentModal } from '@components/user/users-views/user-profile-view/content-modal'
import { UserProfile } from '@components/user/users-views/user-profile-view/user-profile'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ProfileViewModel } from './user-profile-view.model'
import { styles } from './user-profile-view.style'

export const UserProfileViewRaw = props => {
  const [viewModel] = useState(() => new ProfileViewModel({ history: props.history }))

  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <MainContent>
        <UserProfile
          user={viewModel.user}
          timer={'14 минут'}
          headerInfoData={viewModel.headerInfoData}
          tabReview={viewModel.tabReview}
          tabHistory={viewModel.tabHistory}
          setTabHistory={viewModel.onChangeTabHistory}
          setTabReview={viewModel.onChangeTabReview}
          onClickChangeAvatar={viewModel.onClickChangeAvatar}
          onClickChangeUserInfo={viewModel.onClickChangeUserInfo}
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
              pagination
              useResizeContainer
              classes={{
                row: classNames.row,
                root: classNames.root,
                footerContainer: classNames.footerContainer,
                footerCell: classNames.footerCell,
                toolbarContainer: classNames.toolbarContainer,
              }}
              localeText={getLocalizationByLanguageTag()}
              sortModel={viewModel.sortModel}
              filterModel={viewModel.filterModel}
              page={viewModel.curPage}
              pageSize={viewModel.rowsPerPage}
              rowsPerPageOptions={[15, 25, 50, 100]}
              rows={viewModel.getCurrentData()}
              rowHeight={100}
              components={{
                Toolbar: DataGridCustomToolbar,
                ColumnMenuIcon: FilterAltOutlinedIcon,
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
          </>
        ) : null}
      </MainContent>
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
    </>
  )
}

export const UserProfileView = withStyles(observer(UserProfileViewRaw), styles)
