import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {OrderContent} from '@components/screens/orders-view/order-content'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ClientOrderViewModel} from './client-order-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_ORDERS

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
    const {
      orderBoxes,
      drawerOpen,
      order,
      history,
      showConfirmModal,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickCancelOrder,
      onSubmitCancelOrder,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <Typography variant="h3">{textConsts.mainTitle}</Typography>
              <OrderContent
                order={order}
                boxes={orderBoxes}
                history={history}
                onClickCancelOrder={onClickCancelOrder}
              />
            </MainContent>
          </Appbar>

          <ConfirmationModal
            isWarning
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={textConsts.confirmTitle}
            message={textConsts.confirmMessage}
            successBtnText={textConsts.yesBtn}
            cancelBtnText={textConsts.noBtn}
            onClickSuccessBtn={() => {
              onSubmitCancelOrder()
            }}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />
        </Main>
      </React.Fragment>
    )
  }
}
