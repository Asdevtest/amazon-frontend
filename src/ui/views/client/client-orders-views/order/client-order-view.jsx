<<<<<<< HEAD
import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {OrderContent} from '@components/screens/orders-view/order-content'

import {t} from '@utils/translations'

import {ClientOrderViewModel} from './client-order-view.model'
import {styles} from './client-order-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_ORDERS

@observer
class ClientOrderViewRaw extends Component {
  viewModel = new ClientOrderViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      userInfo,
      volumeWeightCoefficient,
      warningInfoModalSettings,
      orderBoxes,
      drawerOpen,
      order,
      history,
      showConfirmModal,
      showWarningInfoModal,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickCancelOrder,
      onSubmitCancelOrder,
      onSubmitChangeBoxFields,
    } = this.viewModel
    const {classes: classNames} = this.props

    const goBack = () => {
      history.goBack()
    }
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
              <div className={classNames.backButtonWrapper}>
                <Button className={classNames.backButton} onClick={goBack}>
                  {t(TranslationKey.Back)}
                </Button>
              </div>
              {order ? (
                <OrderContent
                  userInfo={userInfo}
                  volumeWeightCoefficient={volumeWeightCoefficient}
                  order={order}
                  boxes={orderBoxes}
                  history={history}
                  onClickCancelOrder={onClickCancelOrder}
                  onSubmitChangeBoxFields={onSubmitChangeBoxFields}
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

          <WarningInfoModal
            isWarning={warningInfoModalSettings.isWarning}
            openModal={showWarningInfoModal}
            setOpenModal={() => onTriggerOpenModal('showWarningInfoModal')}
            title={warningInfoModalSettings.title}
            btnText={t(TranslationKey.Ok)}
            onClickBtn={() => {
              onTriggerOpenModal('showWarningInfoModal')
            }}
          />
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientOrderView = withStyles(ClientOrderViewRaw, styles)
=======
import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {OrderContent} from '@components/screens/orders-view/order-content'

import {t} from '@utils/translations'

import {ClientOrderViewModel} from './client-order-view.model'
import {styles} from './client-order-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_ORDERS

@observer
class ClientOrderViewRaw extends Component {
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
      isClient,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickCancelOrder,
      onSubmitCancelOrder,
    } = this.viewModel
    const {classes: classNames} = this.props

    const goBack = () => {
      history.goBack()
    }
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
              <div className={classNames.backButtonWrapper}>
                <Button className={classNames.backButton} onClick={goBack}>
                  {t(TranslationKey.Back)}
                </Button>
              </div>
              {order ? (
                <OrderContent
                  volumeWeightCoefficient={volumeWeightCoefficient}
                  order={order}
                  boxes={orderBoxes}
                  history={history}
                  isClient={isClient}
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

export const ClientOrderView = withStyles(ClientOrderViewRaw, styles)
>>>>>>> 47a548d6 (4410: a different product status message is displayed to the client)
