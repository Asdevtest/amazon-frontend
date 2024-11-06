import { restApiService } from '@services/rest-api-service/rest-api-service'

class SupplierV2ModelStatic {
  createSupplier = async body => {
    const response = await restApiService.supplierV2Api.apiV2SuppliersPost({ body })
    return response.data
  }
}

export const SupplierV2Model = new SupplierV2ModelStatic()
