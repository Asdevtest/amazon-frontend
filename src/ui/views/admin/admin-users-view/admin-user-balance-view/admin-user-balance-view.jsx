import {Component} from 'react'

import {Button, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

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
import {toFixedWithDollarSign} from '@utils/text'

import avatar from '../../assets/adminAvatar.jpg'
import {AdminUserBalanceViewModel} from './admin-user-balance-view.model'
import {styles} from './admin-user-balance-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminUserBalanceView
const navbarActiveCategory = 6

@observer
class AdminUserBalanceViewRaw extends Component {
  viewModel = new AdminUserBalanceViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      user,
      payments,
      drawerOpen,
      showReplenishModal,
      showWithdrawModal,
      makePayment,
      onTriggerReplenishModal,
      onTriggerWithdrawModal,
      onTriggerDrawer,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <>
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
              <Typography variant="h5">{`${textConsts.balance} of ${user.email}`}</Typography>
              <Typography className={classNames.balanceTitle}>{toFixedWithDollarSign(user.balance, 2)}</Typography>
              {user.balanceFreeze !== 0 && (
                <Typography className={classNames.balanceFreeze}>{`${toFixedWithDollarSign(
                  user.balanceFreeze,
                )} -freeze`}</Typography>
              )}
              <Button
                disableElevation
                className={classNames.mr2}
                color="primary"
                variant="contained"
                onClick={onTriggerReplenishModal}
              >
                {textConsts.replenish}
              </Button>
              <Button disableElevation color="primary" onClick={onTriggerWithdrawModal}>
                {textConsts.withdraw}
              </Button>
              <UserBalanceHistory historyData={payments} title={textConsts.balanceHistoryTitle} />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showReplenishModal} setOpenModal={onTriggerReplenishModal}>
          <AdminBalanceModal user={user} onTriggerParentModal={onTriggerReplenishModal} onSubmit={makePayment} />
        </Modal>
        <Modal openModal={showWithdrawModal} setOpenModal={onTriggerWithdrawModal}>
          <AdminBalanceModal
            isWithdraw
            user={user}
            onTriggerParentModal={onTriggerWithdrawModal}
            onSubmit={makePayment}
          />
        </Modal>
      </>
    )
  }
}

export const AdminUserBalanceView = withStyles(styles)(AdminUserBalanceViewRaw)
