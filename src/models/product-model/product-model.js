import { restApiService } from '@services/rest-api-service/rest-api-service'

class ProductModelStatic {
  createProduct = async data => {
    const response = await restApiService.product.apiV1ProductsPost(data)
    return response
  }

  getProductById = async id => {
    const response = await restApiService.product.apiV1ProductsGuidGet(id)
    return response.data
  }

  updateProduct = async (id, data) => {
    const response = await restApiService.product.apiV1ProductsIdPatch(id, { body: data })
    return response
  }

  removeProduct = async id => {
    const response = await restApiService.product.apiV1ProductsIdDelete(id)
    return response
  }

  addSuppliersToProduct = async (id, supplier) => {
    const response = await restApiService.product.apiV1ProductsAddSuppliersGuidPost(id, {
      body: { suppliersIds: supplier },
    })
    return response
  }

  removeSuppliersFromProduct = async (id, supplier) => {
    const response = await restApiService.product.apiV1ProductsRemoveSuppliersGuidPost(id, {
      body: { suppliersIds: supplier },
    })
    return response
  }

  parseAmazon = async id => {
    const response = await restApiService.product.apiV1ProductsParseAmazonIdGet(id)
    return response
  }

  parseParseSellerCentral = async (asin, data) => {
    const response = await restApiService.product.apiV1ProductsParseSellercentralGet(asin, data)
    return response
  }

  editProductsHsCods = async data => {
    const response = await restApiService.product.apiV1ProductsEditHsCodePatch({ body: data })
    return response
  }

  getVacProductByUserId = async id => {
    const response = await restApiService.product.apiV1ProductsByCreatorGuidGet(id)
    return response
  }

  getProductsHsCodeByGuid = async id => {
    const response = await restApiService.product.apiV1ProductsHsCodeGuidGet(id)
    return response
  }

  getProductRedFlags = async () => {
    const response = await restApiService.product.apiV1ProductsRedFlagsGet()
    return response
  }

  getProductsVariationsByGuid = async id => {
    const response = await restApiService.product.apiV1ProductsVariationsGuidGet(id)
    return response
  }

  unbindProducts = async data => {
    const response = await restApiService.product.apiV1ProductsParentPatch({ body: data })
    return response
  }
}

export const ProductModel = new ProductModelStatic()
