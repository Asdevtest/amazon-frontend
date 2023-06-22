/* eslint-disable no-unused-vars */

import { Modal } from '@components/shared/modal'

import { useClassNames } from './product-card-modal.style'
import { ClientProductView } from '@views/client/client-product-view'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { ProductWrapper } from '@components/product/product-wrapper'
import { ClientProductViewModel } from '@views/client/client-product-view/client-product-view.model'
import { useLocation } from 'react-router-dom'

export const ProductCardModal = observer(props => {
  const { classes: classNames } = useClassNames()

  const { openModal, setOpenModal, history, location } = props

  const { search } = useLocation()
  const [viewModel] = useState(
    () =>
      new ClientProductViewModel({
        history: props.history,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  useEffect(() => {
    const queries = new URLSearchParams(search)
    const productId = queries.get('product-id')

    if (productId) {
      viewModel.clearReadyImages()
      viewModel.updateProductId(productId)
    }
  }, [search])

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.root}>
        {viewModel.product && (
          <ProductWrapper
            showTab={viewModel.showTab}
            user={viewModel.userInfo}
            userRole={viewModel.userInfo.role}
            imagesForLoad={viewModel.imagesForLoad}
            showProgress={viewModel.showProgress}
            progressValue={viewModel.progressValue}
            product={viewModel.getCurrentData()}
            shops={viewModel.shopsData}
            acceptMessage={viewModel.acceptMessage}
            actionStatus={viewModel.actionStatus}
            productBase={viewModel.productBase}
            selectedSupplier={viewModel.selectedSupplier}
            handleSupplierButtons={viewModel.onClickSupplierButtons}
            handleProductActionButtons={viewModel.handleProductActionButtons}
            formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
            onClickSupplier={viewModel.onChangeSelectedSupplier}
            onChangeField={viewModel.onChangeProductFields}
            onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
            onClickParseProductData={viewModel.onClickParseProductData}
          />
        )}
      </div>
      {/* {isFileDownloading && <CircularProgressWithLabel />} */}
    </Modal>
  )
})
