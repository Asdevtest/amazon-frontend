import { restApiService } from '@services/rest-api-service/rest-api-service'

class SupplierModelStatic {
  getSuppliers = async () => {
    const response = await restApiService.supplierApi.apiV1SuppliersGet()
    return response.data
  }

  createSupplier = async body => {
    const response = await restApiService.supplierApi.apiV1SuppliersPost({ body })
    return response.data
  }

  getSupplier = async guid => {
    const response = await restApiService.supplierApi.apiV1SuppliersGuidGet({ guid })
    return response.data
  }

  updateSupplier = async (guid, body) => {
    const response = await restApiService.supplierApi.apiV1SuppliersGuidPatch({ guid, body })
    return response.data
  }

  removeSupplier = async guid => {
    const response = await restApiService.supplierApi.apiV1SuppliersGuidDelete({ guid })
    return response.data
  }

  getSuppliersPaymentMethods = async () => {
    const response = await restApiService.supplierApi.apiV1SuppliersPaymentMethodsGet()
    return response.data
  }

  addSuppliersPaymentMethod = async data => {
    const response = await restApiService.supplierApi.apiV1SuppliersPaymentMethodsPostWithHttpInfo({ body: data })
    return response.data
  }

  editSuppliersPaymentMethod = async (guid, body) => {
    const response = await restApiService.supplierApi.apiV1SuppliersPaymentMethodsGuidPatch({ guid, body })
    return response.data
  }
}

export const SupplierModel = new SupplierModelStatic()
