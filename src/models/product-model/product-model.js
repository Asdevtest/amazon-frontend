import { restApiService } from '@services/rest-api-service/rest-api-service'

class ProductModelStatic {
  getProductById = async guid => {
    const response = await restApiService.product.apiV1ProductsGuidGet({ guid })
    return response.data
  }

  addSuppliersToProduct = async (guid, supplier) => {
    const response = await restApiService.product.apiV1ProductsAddSuppliersGuidPost({
      guid,
      body: { suppliersIds: supplier },
    })
    return response.data
  }

  removeSuppliersFromProduct = async (guid, supplier) => {
    const response = await restApiService.product.apiV1ProductsRemoveSuppliersGuidPost({
      guid,
      body: { suppliersIds: supplier },
    })
    return response.data
  }

  parseAmazon = async id => {
    const response = await restApiService.product.apiV1ProductsParseAmazonIdGet({ id })
    return response.data
  }

  parseParseSellerCentral = async (asin, price) => {
    const response = await restApiService.product.apiV1ProductsParseSellercentralGet({ asin, price })
    return response.data
  }

  editProductsHsCods = async body => {
    const response = await restApiService.product.apiV1ProductsEditHsCodePatch({ body })
    return response.data
  }

  getVacProductByUserId = async guid => {
    const response = await restApiService.product.apiV1ProductsByCreatorGuidGet({ guid })
    return response.data
  }

  getProductsHsCodeByGuid = async guid => {
    const response = await restApiService.product.apiV1ProductsHsCodeGuidGet({ guid })
    return response.data
  }

  getProductRedFlags = async () => {
    const response = await restApiService.product.apiV1ProductsRedFlagsGet()
    return response.data
  }

  getProductsVariationsByGuid = async guid => {
    const response = await restApiService.product.apiV1ProductsVariationsGuidGet({ guid })
    return response.data
  }

  unbindProducts = async body => {
    const response = await restApiService.product.apiV1ProductsParentPatch({ body })
    return response.data
  }
}

export const ProductModel = new ProductModelStatic()
