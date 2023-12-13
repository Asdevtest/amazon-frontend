import { restApiService } from '@services/rest-api-service/rest-api-service'

class ShopSellModelStatic {
  createShopSell = async body => {
    const response = await restApiService.shopSellApi.apiV1ShopSellPost({ body })
    return response.data
  }

  editShopSell = async (guid, body) => {
    const response = await restApiService.shopSellApi.apiV1ShopSellGuidPatch({ guid, body })
    return response.data
  }

  getShopSells = async () => {
    const response = await restApiService.shopSellApi.apiV1ShopSellGet()
    console.log('response', response)
    return response.data
  }

  getShopSellById = async guid => {
    const response = await restApiService.shopSellApi.apiV1ShopSellGuidGet({ guid })
    return response.data
  }
}

export const ShopSellModel = new ShopSellModelStatic()
