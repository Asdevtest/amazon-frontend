import {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {adminUsername} from '@constants/mocks'
import {ADMIN_SUB_USERS_TABLE_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {AdminContentModal} from '@components/screens/users-views/sub-users-view/admin-content-modal'
import {PermissionContentModal} from '@components/screens/users-views/sub-users-view/permission-modal'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/admin/sub-users-body-row'
import {TableHeadRow} from '@components/table-rows/sub-users-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/adminAvatar.jpg'
import {AdminUsersViewModel} from './admin-users-view.model'
import {styles} from './admin-users-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminUsersView
const navbarActiveCategory = 6
@observer
class AdminUsersViewRaw extends Component {
  viewModel = new AdminUsersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getUsers()
  }

  render() {
    const {
      users,
      drawerOpen,
      curPage,
      rowsPerPage,
      editUserFormFields,
      showEditUserModal,
      showPermissionModal,
      submitEditUserForm,
      onClickEditUser,
      onClickBalance,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeFormField,
      onTriggerEditUserModal,
      onTriggerPermissionModal,
    } = this.viewModel

    const {classes: classNames} = this.props
    const rowsHandlers = {
      onClickEditUser,
      onClickBalance,
    }

    return (
      <>
        <Navbar
          activeCategory={navbarActiveCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={adminUsername}
          >
            <MainContent>
              <Typography paragraph variant="h5" className={classNames.example}>
                {textConsts.mainTitle}
              </Typography>
              <Table
                buttons={this.renderButtons}
                currentPage={curPage}
                data={users}
                handlerPageChange={onChangeCurPage}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(users.length / rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={rowsHandlers}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showEditUserModal} setOpenModal={onTriggerEditUserModal}>
          <AdminContentModal
            editUserFormFields={editUserFormFields}
            title={textConsts.modalEditTitle}
            buttonLabel={textConsts.modalEditBtn}
            onChangeFormField={onChangeFormField}
            onTriggerEditUserModal={onTriggerEditUserModal}
            onTriggerPermissionModal={onTriggerPermissionModal}
            onSubmit={submitEditUserForm}
          />
        </Modal>
        <Modal openModal={showPermissionModal} setOpenModal={onTriggerPermissionModal}>
          <PermissionContentModal setModalPermission={onTriggerPermissionModal} />
        </Modal>
      </>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={ADMIN_SUB_USERS_TABLE_CELLS} />)
}

export const AdminUsersView = withStyles(styles)(AdminUsersViewRaw)
