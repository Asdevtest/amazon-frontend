import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {AdminContentModal} from '@components/screens/users-views/sub-users-view/admin-content-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/adminAvatar.jpg'
import {AdminUsersViewModel} from './admin-users-view.model'
import {styles} from './admin-users-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminUsersView
const navbarActiveCategory = navBarActiveCategory.NAVBAR_USERS

@observer
class AdminUsersViewRaw extends Component {
  viewModel = new AdminUsersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      groupPermissions,
      singlePermissions,

      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      requestStatus,
      drawerOpen,
      curPage,
      rowsPerPage,
      editUserFormFields,
      showEditUserModal,
      checkValidationNameOrEmail,
      changeNameAndEmail,
      showConfirmModal,
      finalStepSubmitEditUserForm,
      submitEditUserForm,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      onTriggerOpenModal,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            curUserRole={UserRole.ADMIN}
            setDrawerOpen={onTriggerDrawer}
            title={textConsts.appbarTitle}
          >
            <MainContent>
              <DataGrid
                pagination
                useResizeContainer
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                components={{
                  Toolbar: GridToolbar,
                }}
                onSelectionModelChange={newSelection => {
                  onSelectionModel(newSelection[0])
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onFilterModelChange={model => onChangeFilterModel(model)}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showEditUserModal} setOpenModal={() => onTriggerOpenModal('showEditUserModal')}>
          <AdminContentModal
            checkValidationNameOrEmail={checkValidationNameOrEmail}
            changeNameAndEmail={changeNameAndEmail}
            singlePermissions={singlePermissions}
            groupPermissions={groupPermissions}
            editUserFormFields={editUserFormFields}
            title={textConsts.modalEditTitle}
            buttonLabel={textConsts.modalEditBtn}
            onSubmit={submitEditUserForm}
            onCloseModal={() => onTriggerOpenModal('showEditUserModal')}
          />
        </Modal>

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={textConsts.confirmTitle}
          message={textConsts.confirmMessage}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
          onClickSuccessBtn={() => {
            finalStepSubmitEditUserForm()
            onTriggerOpenModal('showConfirmModal')
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const AdminUsersView = withStyles(styles)(AdminUsersViewRaw)
