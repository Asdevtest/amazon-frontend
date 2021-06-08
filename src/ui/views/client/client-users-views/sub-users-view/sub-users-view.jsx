import React, {Component} from 'react'

import {Typography, Box} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {CLIENT_SUB_USERS_INITIAL_DATA, CLIENT_SUB_USERS_TABLE_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {ContentModal} from '@components/screens/users-views/sub-users-view/content-modal'
import {PermissionContentModal} from '@components/screens/users-views/sub-users-view/permission-modal'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/sub-users-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/sub-users-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientSubUsersViewModel} from './sub-users-view.model'
import {styles} from './sub-users-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientSubUsersView

const navbarActiveCategory = 6

@observer
class ClientSubUsersViewRaw extends Component {
  viewModel = new ClientSubUsersViewModel({history: this.props.history})
  state = {
    activeSubCategory: 1,
    drawerOpen: false,
    selected: null,
    modalAddSubUser: false,
    modalEditSubUser: false,
    modalPermission: false,
    rowsPerPage: 5,
    paginationPage: 1,
  }

  render() {
    const {activeSubCategory, drawerOpen} = this.state

    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={this.onChangeDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            username={textConsts.appBarUsername}
            setDrawerOpen={this.onChangeDrawerOpen}
          >
            <MainContent>
              <Typography>{textConsts.mainTitle}</Typography>

              <Table
                buttons={this.renderButtons}
                currentPage={this.state.paginationPage}
                data={CLIENT_SUB_USERS_INITIAL_DATA}
                handlerPageChange={this.onChangePagination}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(CLIENT_SUB_USERS_INITIAL_DATA.length / this.state.rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={this.state.rowsPerPage}
                rowsHandlers={{onEdit: this.onChangeModalEditSubUser}}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={this.state.modalPermission} setOpenModal={this.onChangeModalPermission}>
          <PermissionContentModal setModalPermission={this.onChangeModalPermission} />
        </Modal>
        <Modal openModal={this.state.modalAddSubUser} setOpenModal={this.onChangeModalAddSubUser}>
          <ContentModal
            title={textConsts.modalAddTitle}
            buttonLabel={textConsts.modalAddBtn}
            setModalSubUser={this.onChangeModalAddSubUser}
            setModalPermission={this.onChangeModalPermission}
          />
        </Modal>
        <Modal openModal={this.state.modalEditSubUser} setOpenModal={this.onChangeModalEditSubUser}>
          <ContentModal
            title={textConsts.modalEditTitle}
            buttonLabel={textConsts.modalEditBtn}
            setModalSubUser={this.onChangeModalEditSubUser}
            setModalPermission={this.onChangeModalPermission}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={CLIENT_SUB_USERS_TABLE_CELLS} />)

  renderButtons = (
    <Box className={this.props.classes.buttonBox}>
      <Button color="secondary" onClick={() => this.onChangeModalAddSubUser()}>
        {textConsts.addUserBtn}
      </Button>
    </Box>
  )

  onChangeModalEditSubUser = () => {
    this.setState({modalEditSubUser: !this.state.modalEditSubUser})
  }

  onChangeModalPermission = () => {
    this.setState({modalPermission: !this.state.modalPermission})
  }

  onChangeModalAddSubUser = () => {
    this.setState({modalAddSubUser: !this.state.modalAddSubUser})
  }

  onChangeDrawerOpen = (e, value) => {
    this.setState({drawerOpen: value})
  }

  onChangePagination = (e, value) => {
    this.setState({paginationPge: value})
  }

  onChangeRowsPerPage = e => {
    this.setState({rowsPerPage: Number(e.target.value), paginationPge: 1})
  }
}

const ClientSubUsersView = withStyles(styles)(ClientSubUsersViewRaw)

export {ClientSubUsersView}
