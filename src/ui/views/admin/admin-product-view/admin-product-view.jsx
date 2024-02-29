import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { ProductWrapper } from '@components/product/product-wrapper'

import { AdminProductViewModel } from './admin-product-view.model'

export const AdminProductView = observer(({ history }) => {
  const [viewModel] = useState(() => new AdminProductViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return viewModel.product ? (
    <ProductWrapper
      platformSettings={viewModel.platformSettings}
      userRole={viewModel.userInfo.role}
      product={viewModel.product}
      imagesForLoad={viewModel.imagesForLoad}
      formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
      handleProductActionButtons={viewModel.handleProductActionButtons}
    />
  ) : null
})
