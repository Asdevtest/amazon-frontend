import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {OrderContent} from '@components/screens/orders-view/order-content'

import {t} from '@utils/translations'

import {ClientOrderViewModel} from './client-order-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_ORDERS

@observer
export class ClientOrderView extends Component {
  viewModel = new ClientOrderViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      volumeWeightCoefficient,
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
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar
            title={t(TranslationKey.Order)}
            setDrawerOpen={onTriggerDrawerOpen}
            lastCrumbAdditionalText={` № ${order?.id}`}
          >
            <MainContent>
              <Typography variant="h3">{t(TranslationKey.Order)}</Typography>
              {order ? (
                <OrderContent
                  volumeWeightCoefficient={volumeWeightCoefficient}
                  order={order}
                  boxes={orderBoxes}
                  history={history}
                  onClickCancelOrder={onClickCancelOrder}
                />
              ) : null}
            </MainContent>
          </Appbar>

          <ConfirmationModal
            isWarning
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={t(TranslationKey.Attention)}
            message={t(TranslationKey['Are you sure you want to cancel the order?'])}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.No)}
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
