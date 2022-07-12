import {restApiService} from '@services/rest-api-service/rest-api-service'

class ProductModelStatic {
  createProduct = async data => {
    const response = await restApiService.product.apiV1ProductsPost(data)
    return response
  }

  getProductById = async id => {
    const response = await restApiService.product.apiV1ProductsGuidGet(id)
    return response
  }

  updateProduct = async (id, data) => {
    const response = await restApiService.product.apiV1ProductsIdPatch(id, {body: data})
    return response
  }

  removeProduct = async id => {
    const response = await restApiService.product.apiV1ProductsIdDelete(id)
    return response
  }

  addSuppliersToProduct = async (id, supplier) => {
    const response = await restApiService.product.apiV1ProductsAddSuppliersGuidPost(id, {
      body: {suppliersIds: supplier},
    })
    return response
  }

  removeSuppliersFromProduct = async (id, supplier) => {
    const response = await restApiService.product.apiV1ProductsRemoveSuppliersGuidPost(id, {
      body: {suppliersIds: supplier},
    })
    return response
  }

  parseAmazon = async id => {
    const response = await restApiService.product.apiV1ProductsParseAmazonIdGet(id)
    return response
  }

  parseParseSellerCentral = async asin => {
    const response = await restApiService.product.apiV1ProductsParseSellercentralGet(asin)
    return response
  }

  editProductsHsCods = async data => {
    const response = await restApiService.product.apiV1ProductsEditHsCodePatch({body: data})
    return response
  }

  getVacProductByUserId = async id => {
    const response = await restApiService.product.apiV1ProductsByCreatorGuidGet(id)
    return response
  }
}

export const ProductModel = new ProductModelStatic()
