import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {CreateOrEditTradingShopContent} from '@components/contents/create-or-edit-trading-shop-content'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {t} from '@utils/translations'

import {CreateOrEditTradingShopViewModel} from './create-or-edit-trading-shop-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TRADING_SHOPS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS
@observer
export class CreateOrEditTradingShopView extends Component {
  viewModel = new CreateOrEditTradingShopViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {
      progressValue,
      showProgress,
      requestToEdit,
      infoModalText,
      drawerOpen,
      showInfoModal,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onSubmitCreateShopSell,
      onSubmitEditRequest,
      onClickOkInfoModal,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['Sell the store'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {SettingsModel.languageTag && (
                <CreateOrEditTradingShopContent
                  progressValue={progressValue}
                  showProgress={showProgress}
                  requestToEdit={requestToEdit}
                  history={this.props.history}
                  onCreateSubmit={onSubmitCreateShopSell}
                  onEditSubmit={onSubmitEditRequest}
                />
              )}
            </MainContent>
          </Appbar>
        </Main>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={infoModalText}
          btnText={t(TranslationKey.Close)}
          onClickBtn={onClickOkInfoModal}
        />
      </React.Fragment>
    )
  }
}
