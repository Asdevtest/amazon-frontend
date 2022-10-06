import {Typography} from '@mui/material'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {
  CLIENT_USER_MANAGERS_LIST,
  /* CLIENT_USER_INITIAL_LIST*/
} from '@constants/mocks'
import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {AvatarEditorForm} from '@components/forms/avatar-editor-form'
import {UserInfoEditForm} from '@components/forms/user-info-edit-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
// import {ActiveOrders} from '@components/screens/users-views/user-profile-view/active-orders'
import {ContentModal} from '@components/screens/users-views/user-profile-view/content-modal'
import {UserProfile} from '@components/screens/users-views/user-profile-view/user-profile'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ProfileViewModel} from './user-profile-view.model'
import {styles} from './user-profile-view.style'

@observer
export class UserProfileViewRaw extends Component {
  viewModel = new ProfileViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      sortModel,
      filterModel,
      curPage,
      rowsPerPage,
      densityModel,
      columnsModel,
      requestStatus,
      drawerOpen,
      tabHistory,
      tabReview,
      showTabModal,
      selectedUser,
      user,
      checkValidationNameOrEmail,
      headerInfoData,
      showAvatarEditModal,
      showInfoModal,
      showUserInfoModal,
      onTriggerDrawerOpen,
      onChangeTabHistory,
      onChangeTabReview,
      onTriggerShowTabModal,

      onTriggerOpenModal,
      onSubmitAvatarEdit,
      onClickChangeAvatar,
      onClickChangeUserInfo,
      onSubmitUserInfoEdit,

      getCurrentData,
      setDataGridState,
      onChangeFilterModel,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeSortingModel,
    } = this.viewModel
    const {classes: classNames} = this.props
    return (
      <>
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Profile)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <UserProfile
                user={user}
                timer={'14 минут'}
                headerInfoData={headerInfoData}
                tabReview={tabReview}
                tabHistory={tabHistory}
                setTabHistory={onChangeTabHistory}
                setTabReview={onChangeTabReview}
                onClickChangeAvatar={onClickChangeAvatar}
                onClickChangeUserInfo={onClickChangeUserInfo}
              />

              {/* <ActiveOrders
                tabExchange={tabExchange}
                setTabExchange={onChangeTabExchange}
                productList={CLIENT_USER_INITIAL_LIST}
                handlerClickButtonPrivateLabel={onClickButtonPrivateLabel}
              /> */}

              {[
                mapUserRoleEnumToKey[UserRole.RESEARCHER],
                mapUserRoleEnumToKey[UserRole.SUPERVISOR],
                mapUserRoleEnumToKey[UserRole.BUYER],
              ].includes(user.role) ? (
                <>
                  <Typography variant="h6">{t(TranslationKey['Active offers on the commodity exchange'])}</Typography>

                  <DataGrid
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
                    sortModel={sortModel}
                    filterModel={filterModel}
                    page={curPage}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[15, 25, 50, 100]}
                    rows={getCurrentData()}
                    rowHeight={100}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    density={densityModel}
                    columns={columnsModel}
                    loading={requestStatus === loadingStatuses.isLoading}
                    onSortModelChange={onChangeSortingModel}
                    onPageSizeChange={onChangeRowsPerPage}
                    onPageChange={onChangeCurPage}
                    onStateChange={setDataGridState}
                    onFilterModelChange={model => onChangeFilterModel(model)}
                  />
                </>
              ) : null}
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showTabModal} setOpenModal={onTriggerShowTabModal}>
          <ContentModal
            setOpenModal={onTriggerShowTabModal}
            selected={selectedUser}
            managersList={CLIENT_USER_MANAGERS_LIST}
          />
        </Modal>

        <Modal openModal={showAvatarEditModal} setOpenModal={() => onTriggerOpenModal('showAvatarEditModal')}>
          <AvatarEditorForm
            onSubmit={onSubmitAvatarEdit}
            onCloseModal={() => onTriggerOpenModal('showAvatarEditModal')}
          />
        </Modal>

        <Modal openModal={showUserInfoModal} setOpenModal={() => onTriggerOpenModal('showUserInfoModal')}>
          <UserInfoEditForm
            user={user}
            checkValidationNameOrEmail={checkValidationNameOrEmail}
            onSubmit={onSubmitUserInfoEdit}
            onCloseModal={() => onTriggerOpenModal('showUserInfoModal')}
          />
        </Modal>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={t(TranslationKey['The avatar has been uploaded. The update will take place within a few minutes.'])}
          btnText={t(TranslationKey.Close)}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />
      </>
    )
  }
}

export const UserProfileView = withStyles(styles)(UserProfileViewRaw)
