import { SupplierV2ApiApiV2SuppliersPostRequest } from '@services/rest-api-service/codegen'
import { restApiService } from '@services/rest-api-service/rest-api-service'

import { PostSupplier } from '@components/modals/add-supplier-modal/add-supplier-modal.types'

import { ParamsGetPagRequest } from '@typings/models/model/params-get-pag-request'

class SupplierV2ModelStatic {
  createSupplier = async (body: PostSupplier) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersPost({
      body,
    } as SupplierV2ApiApiV2SuppliersPostRequest)
    return response.data
  }

  getSuppliers = async (params: ParamsGetPagRequest) => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersGet(params)
    return response.data
  }
}

export const SupplierV2Model = new SupplierV2ModelStatic()
