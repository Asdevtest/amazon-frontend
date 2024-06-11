import { observer } from 'mobx-react'
import { useState } from 'react'

import { CreateOrEditTradingShopContent } from '@components/contents/create-or-edit-trading-shop-content'

import { CreateOrEditTradingShopViewModel } from './create-or-edit-trading-shop-view.model'

export const CreateOrEditTradingShopView = observer(({ history }) => {
  const [viewModel] = useState(() => new CreateOrEditTradingShopViewModel({ history }))

  return (
    <CreateOrEditTradingShopContent
      progressValue={viewModel.progressValue}
      showProgress={viewModel.showProgress}
      requestToEdit={viewModel.requestToEdit}
      history={history}
      onCreateSubmit={viewModel.onSubmitCreateShopSell}
      onEditSubmit={viewModel.onSubmitEditRequest}
    />
  )
})
