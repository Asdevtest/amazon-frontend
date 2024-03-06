import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import { ProductWrapper } from '@components/product/product-wrapper'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { AdminProductViewModel } from './admin-product-view.model'

export const AdminProductView = observer(({ history }) => {
  const [viewModel] = useState(() => new AdminProductViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <ProductWrapper
        platformSettings={viewModel.platformSettings}
        userRole={viewModel.userInfo.role}
        product={viewModel.product}
        imagesForLoad={viewModel.product?.images}
        selectedSupplier={viewModel.selectedSupplier}
        formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
        handleSupplierButtons={viewModel.onClickSupplierButtons}
        handleProductActionButtons={viewModel.handleProductActionButtons}
        onClickSupplier={viewModel.onChangeSelectedSupplier}
      />

      <Modal
        missClickModalOn
        openModal={viewModel.showAddOrEditSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
      >
        <AddOrEditSupplierModalContent
          onlyRead
          product={viewModel.product}
          storekeepersData={viewModel.storekeepers}
          sourceYuanToDollarRate={viewModel.platformSettings?.yuanToDollarRate}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          title={t(TranslationKey['Adding and editing a supplier'])}
          supplier={viewModel.selectedSupplier}
          onTriggerShowModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
        />
      </Modal>
    </>
  )
})
