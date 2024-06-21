import { restApiService } from '@services/rest-api-service/rest-api-service'

class ShopModelStatic {
  createShop = async body => {
    const response = await restApiService.shopApi.apiV1ShopsPost({ body })
    return response.data
  }

  getMyShops = async () => {
    const response = await restApiService.shopApi.apiV1ShopsGet()
    return response.data
  }

  getMyShopNames = async () => {
    const response = await restApiService.shopApi.apiV1ShopsNamesGet()
    return response.data
  }

  editShop = async (guid, body) => {
    const response = await restApiService.shopApi.apiV1ShopsGuidPatch({ guid, body })
    return response.data
  }

  removeShopById = async guid => {
    const response = await restApiService.shopApi.apiV1ShopsGuidDelete({ guid })
    return response.data
  }
}

export const ShopModel = new ShopModelStatic()
