import {restApiService} from '@services/rest-api-service/rest-api-service'

class ProductModelStatic {
  createProduct = async data => {
    const response = await restApiService.product.apiV1ProductsPost(data)
    return response
  }

  getProduct = async id => {
    const response = await restApiService.product.apiV1ProductsIdGet(id)
    return response
  }

  updateProduct = async (id, data) => {
    const response = await restApiService.product.apiV1ProductsIdPatch(id, {InlineObject22: data})
    return response
  }

  removeProduct = async id => {
    const response = await restApiService.product.apiV1ProductsIdDelete(id)
    return response
  }

  addSuppliersToProduct = async (id, supplier) => {
    const response = await restApiService.product.apiV1ProductsAddSuppliersGuidPost(id, {
      InlineObject29: {suppliersIds: supplier},
    })
    return response
  }

  removeSuppliersFromProduct = async (id, supplier) => {
    const response = await restApiService.product.apiV1ProductsRemoveSuppliersGuidPost(id, {
      InlineObject30: {suppliersIds: supplier},
    })
    return response
  }
}

export const ProductModel = new ProductModelStatic()
