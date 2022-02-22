import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {Box} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

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

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseSubUsersViewModel} from './warehouse-sub-users-view.model'
import {styles} from './warehouse-sub-users-view.style'

const textConsts = getLocalizedTexts(texts, 'en').warehouseSubUsersView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_USERS

@observer
class WarehouseSubUsersViewRaw extends Component {
  viewModel = new WarehouseSubUsersViewModel({history: this.props.history})

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
    console.log(warningInfoModalSettings)
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
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={''}
            setDrawerOpen={onChangeDrawerOpen}
          >
            <MainContent>
              <Box className={this.props.classes.buttonBox}>
                <SuccessButton onClick={() => onTriggerOpenModal('showAddSubUserModal')}>
                  {textConsts.addUserBtn}
                </SuccessButton>
              </Box>

              <DataGrid
                pagination
                useResizeContainer
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
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={textConsts.confirmTitle}
          message={textConsts.confirmRemoveMessage}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
          onClickSuccessBtn={onSubmitUnlinkSubUser}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const WarehouseSubUsersView = withStyles(styles)(WarehouseSubUsersViewRaw)
