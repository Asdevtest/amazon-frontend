import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import { ProductWrapper } from '@components/product/product-wrapper'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { AdminProductViewModel } from './admin-product-view.model'

export const AdminProductView = observer(props => {
  const [viewModel] = useState(
    () =>
      new AdminProductViewModel({
        history: props.history,
        location: props.location,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        {viewModel.product ? (
          <ProductWrapper
            platformSettings={viewModel.platformSettings}
            userRole={viewModel.userInfo.role}
            product={viewModel.product}
            imagesForLoad={viewModel.imagesForLoad}
            selectedSupplier={viewModel.selectedSupplier}
            formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
            handleSupplierButtons={viewModel.onClickSupplierButtons}
            handleProductActionButtons={viewModel.handleProductActionButtons}
            onClickSupplier={viewModel.onChangeSelectedSupplier}
            onChangeField={viewModel.onChangeProductFields}
          />
        ) : undefined}
      </div>

      <Modal
        missClickModalOn={!viewModel.supplierModalReadOnly}
        openModal={viewModel.showAddOrEditSupplierModal}
        setOpenModal={viewModel.onTriggerAddOrEditSupplierModal}
      >
        <AddOrEditSupplierModalContent
          product={viewModel.product}
          storekeepersData={viewModel.storekeepersData}
          onlyRead={viewModel.supplierModalReadOnly}
          sourceYuanToDollarRate={viewModel.yuanToDollarRate}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          title={t(TranslationKey['Adding and editing a supplier'])}
          supplier={viewModel.selectedSupplier}
          onTriggerShowModal={viewModel.onTriggerAddOrEditSupplierModal}
        />
      </Modal>
    </React.Fragment>
  )
})
