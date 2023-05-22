import { restApiService } from '@services/rest-api-service/rest-api-service'

class ShopSellModelStatic {
  createShopSell = async data => {
    const response = await restApiService.shopSellApi.apiV1ShopSellPost({ body: data })
    return response
  }

  editShopSell = async (id, data) => {
    const response = await restApiService.shopSellApi.apiV1ShopSellGuidPatch(id, { body: data })
    return response
  }

  getShopSells = async () => {
    const response = await restApiService.shopSellApi.apiV1ShopSellGet()
    return response
  }

  getShopSellById = async id => {
    const response = await restApiService.shopSellApi.apiV1ShopSellGuidGet(id)
    return response
  }
}

export const ShopSellModel = new ShopSellModelStatic()
