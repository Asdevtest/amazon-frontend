import {Component} from 'react'

import {Button, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {adminUsername, ADMIN_BALANCE_HISTORY_DATA, clientBalance} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {UserBalanceHistory} from '@components/screens/user-balance-history'
import {AdminBalanceModal} from '@components/screens/users-views/sub-users-view/admin-balance-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './admin-user-balance-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminUserBalanceView

export class AdminUserBalanceViewRaw extends Component {
  state = {
    drawerOpen: false,
    selectedUser: {date: '12/09/2019', email: 'email@example.com'},
    showBalanceReplenishModal: false,
    showBalanceWithdrawModal: false,
  }

  render() {
    const {drawerOpen, selectedUser, showBalanceReplenishModal, showBalanceWithdrawModal} = this.state
    const activeCategory = 6
    const {classes: classNames} = this.props

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
              <Typography variant="h5">{`${textConsts.balance} of ${selectedUser.email}`}</Typography>
              <Typography className={classNames.balanceTitle}>{clientBalance}</Typography>
              <Button
                disableElevation
                className={classNames.mr2}
                color="primary"
                variant="contained"
                onClick={() => this.onTriggerModal('showBalanceReplenishModal')}
              >
                {textConsts.replenish}
              </Button>
              <Button disableElevation color="primary" onClick={() => this.onTriggerModal('showBalanceWithdrawModal')}>
                {textConsts.withdraw}
              </Button>
              <UserBalanceHistory historyData={ADMIN_BALANCE_HISTORY_DATA} />
            </MainContent>
          </Appbar>
        </Main>
        <Modal
          openModal={showBalanceReplenishModal}
          setOpenModal={() => this.onTriggerModal('showBalanceReplenishModal')}
        >
          <AdminBalanceModal user={selectedUser} />
        </Modal>
        <Modal
          openModal={showBalanceWithdrawModal}
          setOpenModal={() => this.onTriggerModal('showBalanceWithdrawModal')}
        >
          <AdminBalanceModal isWithdraw user={selectedUser} closeModalBalance={this.onTriggerModal} />
        </Modal>
      </>
    )
  }

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }

  onTriggerModal = modalState => {
    this.setState({[modalState]: !this.state[modalState]})
  }
}

export const AdminUserBalanceView = withStyles(styles)(AdminUserBalanceViewRaw)
