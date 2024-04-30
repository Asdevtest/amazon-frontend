import { observer } from 'mobx-react'
import { useState } from 'react'

import { ProductWrapper } from '@components/product/product-wrapper'

import { AdminProductViewModel } from './admin-product-view.model'

export const AdminProductView = observer(({ history }) => {
  const [viewModel] = useState(() => new AdminProductViewModel({ history }))

  return (
    viewModel?.product && (
      <ProductWrapper
        userRole={viewModel.userInfo.role}
        product={viewModel.product}
        imagesForLoad={viewModel.product?.images}
        formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
        handleProductActionButtons={viewModel.handleProductActionButtons}
      />
    )
  )
})
