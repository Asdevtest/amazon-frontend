import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {Box} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {LinkSubUserForm} from '@components/forms/link-sub-user-form'
import {NewAddOrEditUserPermissionsForm} from '@components/forms/new-add-or-edit-user-permissions-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {SupervisorSubUsersViewModel} from './supervisor-sub-users-view.model'
import {styles} from './supervisor-sub-users-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_USERS

@observer
class SupervisorSubUsersViewRaw extends Component {
  viewModel = new SupervisorSubUsersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      showConfirmModal,
      showAddSubUserModal,
      showWarningModal,
      showPermissionModal,
      warningInfoModalSettings,
      singlePermissions,
      groupPermissions,
      selectedSubUser,

      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      drawerOpen,
      rowsPerPage,
      curPage,
      activeSubCategory,
      onChangeDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeSubCategory,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      onTriggerOpenModal,
      onSubmitlinkSubUser,
      onSubmitUserPermissionsForm,
      onSubmitUnlinkSubUser,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          onChangeSubCategory={onChangeSubCategory}
        />
        <Main>
          <Appbar title={t(TranslationKey.Users)} notificationCount={2} setDrawerOpen={onChangeDrawerOpen}>
            <MainContent>
              <Box className={this.props.classes.buttonBox}>
                <SuccessButton onClick={() => onTriggerOpenModal('showAddSubUserModal')}>
                  {t(TranslationKey['Add a sub-user'])}
                </SuccessButton>
              </Box>

              <DataGrid
                pagination
                useResizeContainer
                localeText={getLocalizationByLanguageTag()}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={200}
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
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showAddSubUserModal} setOpenModal={() => onTriggerOpenModal('showAddSubUserModal')}>
          <LinkSubUserForm
            closeModal={() => onTriggerOpenModal('showAddSubUserModal')}
            onSubmit={onSubmitlinkSubUser}
          />
        </Modal>

        <Modal openModal={showPermissionModal} setOpenModal={() => onTriggerOpenModal('showPermissionModal')}>
          <NewAddOrEditUserPermissionsForm
            permissionsToSelect={singlePermissions}
            permissionGroupsToSelect={groupPermissions}
            sourceData={selectedSubUser}
            onCloseModal={() => onTriggerOpenModal('showPermissionModal')}
            onSubmit={onSubmitUserPermissionsForm}
          />
        </Modal>

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Are you sure you want to unbind the sub-user?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={onSubmitUnlinkSubUser}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const SupervisorSubUsersView = withStyles(styles)(SupervisorSubUsersViewRaw)
