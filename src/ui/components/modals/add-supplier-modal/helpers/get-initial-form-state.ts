import { ISupplierV2 } from '@typings/models/suppliers/supplier-v2'

import { emptyEmployee } from '../add-supplier-modal.constants'
import { CreateSupplier } from '../add-supplier-modal.types'

export const getInitialFormState = (supplier: ISupplierV2): CreateSupplier => {
  const { companyName, link, images, comment } = supplier

  const paymentMethodIds = supplier?.paymentMethods?.map(({ _id }) => _id)

  return {
    companyName,
    link,
    images,
    countryId: '',
    comment,
    paymentMethodIds,
    supplierEmployees: [emptyEmployee],
  }
}
