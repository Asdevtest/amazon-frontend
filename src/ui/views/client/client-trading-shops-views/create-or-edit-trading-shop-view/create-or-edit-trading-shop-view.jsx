import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CreateOrEditTradingShopContent } from '@components/contents/create-or-edit-trading-shop-content'
import { WarningInfoModal } from '@components/modals/warning-info-modal'

import { t } from '@utils/translations'

import { CreateOrEditTradingShopViewModel } from './create-or-edit-trading-shop-view.model'

export const CreateOrEditTradingShopView = observer(({ history }) => {
  const [viewModel] = useState(() => new CreateOrEditTradingShopViewModel({ history }))

  return (
    <>
      <div>
        <CreateOrEditTradingShopContent
          progressValue={viewModel.progressValue}
          showProgress={viewModel.showProgress}
          requestToEdit={viewModel.requestToEdit}
          history={history}
          onCreateSubmit={viewModel.onSubmitCreateShopSell}
          onEditSubmit={viewModel.onSubmitEditRequest}
        />
      </div>

      <WarningInfoModal
        // @ts-ignore
        openModal={viewModel.showInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
        title={viewModel.infoModalText}
        btnText={t(TranslationKey.Close)}
        onClickBtn={viewModel.onClickOkInfoModal}
      />
    </>
  )
})
