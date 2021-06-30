import React, {Component} from 'react'

import {Typography, Box} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {CLIENT_SUB_USERS_TABLE_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

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

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      activeSubCategory,
      drawerOpen,
      subUsersData,
      modalAddSubUser,
      modalEditSubUser,
      modalPermission,
      rowsPerPage,
      paginationPage,
      onChangeModalEditSubUser,
      onChangeModalPermission,
      onChangeModalAddSubUser,
      onChangeDrawerOpen,
      onChangePagination,
      onChangeRowsPerPage,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeDrawerOpen}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Typography>{textConsts.mainTitle}</Typography>

              <Table
                renderButtons={this.renderButtons}
                currentPage={paginationPage}
                data={subUsersData}
                handlerPageChange={onChangePagination}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(subUsersData.length / rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={{onEdit: onChangeModalEditSubUser}}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={modalPermission} setOpenModal={onChangeModalPermission}>
          <PermissionContentModal setModalPermission={onChangeModalPermission} />
        </Modal>
        <Modal openModal={modalAddSubUser} setOpenModal={onChangeModalAddSubUser}>
          <ContentModal
            title={textConsts.modalAddTitle}
            buttonLabel={textConsts.modalAddBtn}
            setModalSubUser={onChangeModalAddSubUser}
            setModalPermission={onChangeModalPermission}
          />
        </Modal>
        <Modal openModal={modalEditSubUser} setOpenModal={onChangeModalEditSubUser}>
          <ContentModal
            title={textConsts.modalEditTitle}
            buttonLabel={textConsts.modalEditBtn}
            setModalSubUser={onChangeModalEditSubUser}
            setModalPermission={onChangeModalPermission}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={CLIENT_SUB_USERS_TABLE_CELLS} />)

  renderButtons = () => (
    <Box className={this.props.classes.buttonBox}>
      <Button color="secondary" onClick={() => this.viewModel.onChangeModalAddSubUser()}>
        {textConsts.addUserBtn}
      </Button>
    </Box>
  )
}

export const ClientSubUsersView = withStyles(styles)(ClientSubUsersViewRaw)
