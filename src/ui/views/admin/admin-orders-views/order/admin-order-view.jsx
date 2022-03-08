import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {OrderContent} from '@components/screens/orders-view/order-content'

import {getLocalizedTexts} from '@utils/get-localized-texts'

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
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            history={history}
            setDrawerOpen={onTriggerDrawerOpen}
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
