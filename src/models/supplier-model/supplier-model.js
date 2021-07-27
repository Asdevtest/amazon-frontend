import {restApiService} from '@services/rest-api-service/rest-api-service'

class SupplierModelStatic {
  getSuppliers = async () => {
    const response = await restApiService.supplierApi.apiV1SuppliersGet()
    return response
  }

  createSupplier = async data => {
    const response = await restApiService.supplierApi.apiV1SuppliersPost(data)
    return response
  }

  getSupplier = async id => {
    const response = await restApiService.supplierApi.apiV1SuppliersGuidGet(id)
    return response
  }

  updateSupplier = async (id, data) => {
    const response = await restApiService.supplierApi.apiV1SuppliersGuidPatch(id, {
      InlineObject24: data,
    })
    if (response && response.error) {
      throw new Error(response.message)
    }
    return response
  }

  removeSupplier = async id => {
    const response = await restApiService.supplierApi.apiV1SuppliersGuidDelete(id)
    return response
  }
}

export const SupplierModel = new SupplierModelStatic()
