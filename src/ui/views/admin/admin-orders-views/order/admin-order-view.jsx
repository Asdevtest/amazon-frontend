import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {OrderContent} from '@components/screens/orders-view/order-content'

import {t} from '@utils/translations'

import {AdminOrderViewModel} from './admin-order-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_ORDERS

@observer
export class AdminOrderView extends Component {
  viewModel = new AdminOrderViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {orderBoxes, drawerOpen, order, onTriggerDrawerOpen, history} = this.viewModel

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar
            title={t(TranslationKey.Order)}
            notificationCount={2}
            history={history}
            setDrawerOpen={onTriggerDrawerOpen}
            lastCrumbAdditionalText={` № ${order?.id}`}
          >
            <MainContent>
              <Typography variant="h3">{t(TranslationKey.Order)}</Typography>
              {order ? <OrderContent order={order} boxes={orderBoxes} history={history} /> : null}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
