import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {OrderContent} from '@components/screens/orders-view/order-content'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/adminAvatar.jpg'
import {AdminOrderViewModel} from './admin-order-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').adminOrderView

@observer
export class AdminOrderView extends Component {
  viewModel = new AdminOrderViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {orderBoxes, drawerOpen, order, onTriggerDrawerOpen, history} = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.ADMIN}
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
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.ADMIN}
          >
            <MainContent>
              <Typography variant="h3">{textConsts.mainTitle}</Typography>
              <OrderContent order={order} boxes={orderBoxes} history={history} />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
