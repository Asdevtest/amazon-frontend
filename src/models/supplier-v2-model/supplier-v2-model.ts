import { restApiService } from '@services/rest-api-service/rest-api-service'

import { PostSupplier } from '@components/modals/add-supplier-modal/add-supplier-modal.types'

import { ParamsGetPagRequest } from '@typings/models/model/params-get-pag-request'

class SupplierV2ModelStatic {
  createSupplier = async (body: PostSupplier) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersPost({
      body,
    })
    return response.data
  }

  getSuppliers = async (params: ParamsGetPagRequest) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersGet({
      ...params,
      noCache: true,
    })
    return response.data
  }

  editSupplier = async (guid: string, body: PostSupplier) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  getSupplierCards = async (params: ParamsGetPagRequest) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersGuidCardsGet({
      ...params,
      noCache: true,
    })
    return response.data
  }
}

export const SupplierV2Model = new SupplierV2ModelStatic()
