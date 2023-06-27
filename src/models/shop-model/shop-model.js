import { restApiService } from '@services/rest-api-service/rest-api-service'

class ShopModelStatic {
  createShop = async data => {
    const response = await restApiService.shopApi.apiV1ShopsPost({ body: data })
    return response
  }

  getMyShops = async () => {
    const response = await restApiService.shopApi.apiV1ShopsGet()
    return response
  }

  getMyShopNames = async () => {
    const response = await restApiService.shopApi.apiV1ShopsNamesGet()
    return response
  }

  editShop = async (id, data) => {
    const response = await restApiService.shopApi.apiV1ShopsGuidPatch(id, { body: data })
    return response
  }

  removeShopById = async id => {
    const response = await restApiService.shopApi.apiV1ShopsGuidDelete(id)
    return response
  }
}

export const ShopModel = new ShopModelStatic()
