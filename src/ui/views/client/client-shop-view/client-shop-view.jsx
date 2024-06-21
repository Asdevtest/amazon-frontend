import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { ShopWrapper } from '@components/traiding-shop/shop-wrapper/shop-wrapper'

import { ClientShopViewModel } from './client-shop-view.model'

export const ClientShopView = observer(({ history }) => {
  const [viewModel] = useState(() => new ClientShopViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return viewModel.shopInfo ? (
    <ShopWrapper
      userInfo={viewModel.userInfo}
      shopInfo={viewModel.shopInfo}
      onClickEditBtn={viewModel.onClickEditBtn}
    />
  ) : null
})
