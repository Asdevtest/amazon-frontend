import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {DELIVERY_OPTIONS} from '@constants/delivery-options'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {OrderContent} from '@components/screens/client/orders-view/order-content'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientOrderViewModel} from './client-order-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderView

@observer
export class ClientOrderView extends Component {
  viewModel = new ClientOrderViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {orderBoxes, drawerOpen, order, onTriggerDrawerOpen} = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Typography variant="h3">{textConsts.mainTitle}</Typography>
              <OrderContent order={order} boxes={orderBoxes} deliveryOptions={DELIVERY_OPTIONS} />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
