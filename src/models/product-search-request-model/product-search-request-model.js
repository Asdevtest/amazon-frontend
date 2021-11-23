import {restApiService} from '@services/rest-api-service/rest-api-service'

class ProductSearchRequestModelStatic {
  createProductSearchRequest = async data => {
    const response = await restApiService.productSearchRequestApi.apiV1ProductSearchRequestsAddRequestPost(data)
    return response
  }

  getProductSearchRequests = async () => {
    const response = await restApiService.productSearchRequestApi.apiV1ProductSearchRequestsClientsGet()
    return response
  }

  updateProductSearchRequest = async (id, data) => {
    const response = await restApiService.productSearchRequestApi.apiV1ProductSearchRequestsUpdateRequestGuidPatch(id, {
      InlineObject27: data,
    })
    return response
  }

  removeProductSearchRequests = async id => {
    const response = await restApiService.productSearchRequestApi.apiV1ProductSearchRequestsRemoveRequestGuidPatch(id)
    return response
  }

  getProductSearchRequestsForResearcher = async () => {
    const response = await restApiService.productSearchRequestApi.apiV1ProductSearchRequestsResearchersGet()
    return response
  }
}

export const ProductSearchRequestModel = new ProductSearchRequestModelStatic()
