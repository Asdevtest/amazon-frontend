import {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {adminUsername, ADMIN_SUB_USERS_INITIAL_DATA} from '@constants/mocks'
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

import {styles} from './admin-users-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminUsersView

export class AdminUsersViewRaw extends Component {
  state = {
    drawerOpen: false,
    curPage: 1,
    rowsPerPage: 5,
    selectedUser: null,
    showEditUserModal: false,
    showPermissionModal: false,
  }

  render() {
    const {drawerOpen, curPage, rowsPerPage, selectedUser, showEditUserModal, showPermissionModal} = this.state
    const activeCategory = 6
    const {classes: classNames} = this.props
    const rowsHandlers = {
      onEdit: user => this.onClickEditUser(user),
      onClickBalance: () => this.onClickBalanceBtn(),
    }

    return (
      <>
        <Navbar
          activeCategory={activeCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={this.onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            handlerTriggerDrawer={this.onTriggerDrawer}
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
                data={ADMIN_SUB_USERS_INITIAL_DATA}
                handlerPageChange={this.onChangeCurPage}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(ADMIN_SUB_USERS_INITIAL_DATA.length / rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={rowsHandlers}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showEditUserModal} setOpenModal={() => this.onTriggerModal('showEditUserModal')}>
          <AdminContentModal
            selectedUser={selectedUser}
            title={textConsts.modalEditTitle}
            buttonLabel={textConsts.modalEditBtn}
            closeModal={() => this.onTriggerModal('showEditUserModal')}
            openPermissionModal={() => this.onTriggerModal('showPermissionModal')}
          />
        </Modal>
        <Modal openModal={showPermissionModal} setOpenModal={() => this.onTriggerModal('showPermissionModal')}>
          <PermissionContentModal setModalPermission={() => this.onTriggerModal('showPermissionModal')} />
        </Modal>
      </>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={ADMIN_SUB_USERS_TABLE_CELLS} />)

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }
  onChangeCurPage = value => {
    this.setState({curPage: value})
  }
  onTriggerModal = modalState => {
    this.setState({[modalState]: !this.state[modalState]})
  }
  onClickEditUser = user => {
    this.onTriggerModal('showEditUserModal')
    this.setState({selectedUser: user})
  }
  onClickBalanceBtn = () => {
    const {history} = this.props
    history.push('/admin/user/user_id/balance')
  }
}

export const AdminUsersView = withStyles(styles)(AdminUsersViewRaw)
