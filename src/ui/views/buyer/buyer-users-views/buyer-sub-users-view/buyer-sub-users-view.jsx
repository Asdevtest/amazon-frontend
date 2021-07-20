import React, {Component} from 'react'

import {Typography, Box} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {BUYER_SUB_USERS_INITIAL_DATA, BUYER_SUB_USERS_TABLE_CELLS} from '@constants/mocks'
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

import avatar from '../../assets/buyerAvatar.jpg'
import {BuyerSubUsersViewModel} from './buyer-sub-users-view.model'
import {styles} from './buyer-sub-users-view.style'

const textConsts = getLocalizedTexts(texts, 'en').buyerSubUsersView

const navbarActiveCategory = 5
const navbarActiveSubCategory = 1

@observer
class BuyerSubUsersViewRaw extends Component {
  viewModel = new BuyerSubUsersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      curPage,
      history,
      rowsPerPage,
      showAddSubUserModal,
      showEditSubUserModal,
      showPermissionsModal,
      onTriggerShowPermissionsModal,
      onTriggerAddSubUserModal,
      onTriggerShowEditSubUserModal,
      onChangePage,
      onChangeRowsPerPage,
      onTriggerDrawerOpen,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.BUYER}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            history={history}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.BUYER}
          >
            <MainContent>
              <Typography>{textConsts.mainTitle}</Typography>

              <Table
                renderButtons={this.renderButtons}
                currentPage={curPage}
                data={BUYER_SUB_USERS_INITIAL_DATA}
                handlerPageChange={onChangePage}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(BUYER_SUB_USERS_INITIAL_DATA.length / rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={{onEdit: onTriggerShowEditSubUserModal}}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showPermissionsModal} setOpenModal={onTriggerShowPermissionsModal}>
          <PermissionContentModal setModalPermission={onTriggerShowPermissionsModal} />
        </Modal>
        <Modal openModal={showAddSubUserModal} setOpenModal={onTriggerAddSubUserModal}>
          <ContentModal
            title={textConsts.modalAddTitle}
            buttonLabel={textConsts.modalAddBtn}
            setModalSubUser={onTriggerAddSubUserModal}
            setModalPermission={onTriggerShowPermissionsModal}
          />
        </Modal>
        <Modal openModal={showEditSubUserModal} setOpenModal={onTriggerShowEditSubUserModal}>
          <ContentModal
            title={textConsts.modalEditTitle}
            buttonLabel={textConsts.modalEditBtn}
            setModalSubUser={onTriggerShowEditSubUserModal}
            setModalPermission={onTriggerShowPermissionsModal}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={BUYER_SUB_USERS_TABLE_CELLS} />)

  renderButtons = () => {
    const {classes: classNames} = this.props
    return (
      <Box className={classNames.buttonBox}>
        <Button color="secondary" onClick={() => this.onChangeModalAddSubUser()}>
          {textConsts.addUserBtn}
        </Button>
      </Box>
    )
  }
}

export const BuyerSubUsersView = withStyles(styles)(BuyerSubUsersViewRaw)
