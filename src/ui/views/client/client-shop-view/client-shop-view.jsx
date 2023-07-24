import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { MainContent } from '@components/layout/main-content'
import { ShopWrapper } from '@components/traiding-shop/shop-wrapper/shop-wrapper'

import { ClientShopViewModel } from './client-shop-view.model'

export const ClientShopView = observer(props => {
  const [viewModel] = useState(
    () =>
      new ClientShopViewModel({
        history: props.history,
        location: props.location,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        {viewModel.shopInfo ? (
          <ShopWrapper
            userInfo={viewModel.userInfo}
            shopInfo={viewModel.shopInfo}
            onClickEditBtn={viewModel.onClickEditBtn}
          />
        ) : null}
      </MainContent>
    </React.Fragment>
  )
})
