import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { CreateOrEditTradingShopContent } from '@components/contents/create-or-edit-trading-shop-content'
import { WarningInfoModal } from '@components/modals/warning-info-modal'

import { t } from '@utils/translations'

import { CreateOrEditTradingShopViewModel } from './create-or-edit-trading-shop-view.model'

export const CreateOrEditTradingShopView = observer(props => {
  const [viewModel] = useState(
    () =>
      new CreateOrEditTradingShopViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  // const {classes: styles} = props

  return (
    <>
      <div>
        {SettingsModel.languageTag && (
          <CreateOrEditTradingShopContent
            progressValue={viewModel.progressValue}
            showProgress={viewModel.showProgress}
            requestToEdit={viewModel.requestToEdit}
            history={props.history}
            onCreateSubmit={viewModel.onSubmitCreateShopSell}
            onEditSubmit={viewModel.onSubmitEditRequest}
          />
        )}
      </div>

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
        title={viewModel.infoModalText}
        btnText={t(TranslationKey.Close)}
        onClickBtn={viewModel.onClickOkInfoModal}
      />
    </>
  )
})
