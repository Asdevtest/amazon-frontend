import React, {Component} from 'react'

import {Typography, Box} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {AddOrEditUserPermissionsForm} from '@components/forms/add-or-edit-user-permissions-form'
import {LinkSubUserForm} from '@components/forms/link-sub-user-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {onStateChangeHandler} from '@utils/for-data-grid'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {SupervisorSubUsersViewModel} from './supervisor-sub-users-view.model'
import {styles} from './supervisor-sub-users-view.style'

const textConsts = getLocalizedTexts(texts, 'en').supervisorSubUsersView

const navbarActiveCategory = 3

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
          curUserRole={UserRole.SUPERVISOR}
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
            avatarSrc={avatar}
            setDrawerOpen={onChangeDrawerOpen}
            curUserRole={UserRole.SUPERVISOR}
          >
            <MainContent>
              <Typography>{textConsts.mainTitle}</Typography>

              <Box className={this.props.classes.buttonBox}>
                <Button color="secondary" onClick={() => onTriggerOpenModal('showAddSubUserModal')}>
                  {textConsts.addUserBtn}
                </Button>
              </Box>

              <div>
                <DataGrid
                  pagination
                  useResizeContainer
                  autoHeight
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 15, 20]}
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
                  onStateChange={e => onStateChangeHandler(e, setDataGridState)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
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
          <AddOrEditUserPermissionsForm
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

export const SupervisorSubUsersView = withStyles(styles)(SupervisorSubUsersViewRaw)
