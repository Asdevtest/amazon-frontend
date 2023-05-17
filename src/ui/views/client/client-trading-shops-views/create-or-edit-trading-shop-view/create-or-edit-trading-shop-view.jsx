import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {CreateOrEditTradingShopContent} from '@components/contents/create-or-edit-trading-shop-content'
import {MainContent} from '@components/layout/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {t} from '@utils/translations'

import {CreateOrEditTradingShopViewModel} from './create-or-edit-trading-shop-view.model'

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
      showInfoModal,
      onTriggerOpenModal,
      onSubmitCreateShopSell,
      onSubmitEditRequest,
      onClickOkInfoModal,
    } = this.viewModel

    return (
      <React.Fragment>
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
