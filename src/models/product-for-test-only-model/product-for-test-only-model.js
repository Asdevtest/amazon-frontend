import {restApiService} from '@services/rest-api-service/rest-api-service'

class ProductForTestOnlyStatic {
  createProduct = async data => {
    const response = await restApiService.productForTestOnlyApi.apiV1ProductsPost(data)
    return response
  }

  getProduct = async id => {
    const response = await restApiService.productForTestOnlyApi.apiV1ProductsIdGet(id)
    return response
  }

  updateProduct = async (id, data) => {
    const response = await restApiService.productForTestOnlyApi.apiV1ProductsIdPatch(id, {InlineObject13: data})
    return response
  }

  removeProduct = async id => {
    const response = await restApiService.productForTestOnlyApi.apiV1ProductsIdDelete(id)
    return response
  }
}

export const ProductForTestOnly = new ProductForTestOnlyStatic()
