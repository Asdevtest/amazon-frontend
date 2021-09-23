import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {adminUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {AdminContentModal} from '@components/screens/users-views/sub-users-view/admin-content-modal'
import {PermissionContentModal} from '@components/screens/users-views/sub-users-view/permission-modal'

import {formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/adminAvatar.jpg'
import {AdminUsersViewModel} from './admin-users-view.model'
import {styles} from './admin-users-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminUsersView
const navbarActiveCategory = 6

const renderAdminSubUsersTableCells = renderBtns => [
  {
    field: 'createdAt',
    headerName: 'Created',
    renderCell: params => (params.value ? formatNormDateTimeWithParseISO(params.value) : 'N/A'),
    width: 150,
    type: 'date',
  },

  {field: 'name', headerName: 'Name', width: 150},
  {
    field: 'balance',
    headerName: 'Balance',
    renderCell: params => !params.value && 'N/A',
    width: 150,
    type: 'number',
  },

  {
    field: 'balanceFreeze',
    headerName: 'Freeze',
    renderCell: params => !params.value && '0',
    width: 150,
    type: 'number',
  },
  {field: 'email', headerName: 'Email', width: 150},

  {field: 'rate', headerName: 'Rate', renderCell: params => !params.value && 'N/A', width: 150, type: 'number'},
  {
    field: 'role',
    headerName: 'Role',
    renderCell: params => UserRoleCodeMap[params.value],
    filterable: false,
    // valueParser: value => {

    //   switch (value.toUpperCase()) {
    //     case UserRole.ADMIN:
    //       return '0' // НЕ РАБОТАЕТ С НУЛЕМ
    //     case UserRole.CLIENT:
    //       return '10'
    //     case UserRole.SUPERVISOR:
    //       return '20'
    //     case UserRole.RESEARCHER:
    //       return '30'
    //     case UserRole.BUYER:
    //       return '40'
    //     case UserRole.STOREKEEPER:
    //       return '50'
    //     default:
    //       return value
    //   }
    // },
    width: 150,
  },

  {
    field: 'active',
    headerName: 'User status',
    renderCell: params => (params.value === true ? 'Active' : 'Banned'),
    width: 150,
    valueParser: value => {
      switch (value) {
        case 'Active':
          return 'true'
        case 'Banned':
          return 'false'
        default:
          return value
      }
    },
  },
  {
    field: '',
    headerName: 'Admin',
    renderCell: params => renderBtns(params),
    width: 300,
  },
]

@observer
class AdminUsersViewRaw extends Component {
  viewModel = new AdminUsersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getUsers()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      getCurrentData,
      sortModel,
      filterModel,
      requestStatus,
      drawerOpen,
      curPage,
      rowsPerPage,
      editUserFormFields,
      showEditUserModal,
      showPermissionModal,
      submitEditUserForm,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeFormField,
      onTriggerEditUserModal,
      onTriggerPermissionModal,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            curUserRole={UserRole.ADMIN}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={adminUsername}
          >
            <MainContent>
              <Typography paragraph variant="h5" className={classNames.example}>
                {textConsts.mainTitle}
              </Typography>
              <DataGrid
                pagination
                useResizeContainer
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[5, 10, 15, 20]}
                rows={getCurrentData()}
                columns={renderAdminSubUsersTableCells(this.renderAdminBtns)}
                loading={requestStatus === loadingStatuses.isLoading}
                components={{
                  Toolbar: GridToolbar,
                }}
                onSelectionModelChange={newSelection => {
                  onSelectionModel(newSelection.selectionModel[0])
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={e => setDataGridState(e.state)}
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
      </React.Fragment>
    )
  }

  renderAdminBtns = params => (
    <React.Fragment>
      <Button
        className={this.props.classes.editBtn}
        variant="contained"
        onClick={() => this.viewModel.onClickEditUser()}
      >
        {textConsts.editBtn}
      </Button>
      <Button variant="contained" onClick={() => this.viewModel.onClickBalance(params.row)}>
        {textConsts.balanceBtn}
      </Button>
    </React.Fragment>
  )
}

export const AdminUsersView = withStyles(styles)(AdminUsersViewRaw)
