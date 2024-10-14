import { IIntegrationResult, IShop, ShopUpdateResult } from '../shop-notification.type'

export const getIntegrationResult = (shopData: IShop['data']) => {
  if (!shopData) {
    return
  }

  const shopDataKeys = Object.keys(shopData)

  return shopDataKeys?.reduce(
    (acc, key) => {
      if (shopData[key].includes('Successfully')) {
        acc[ShopUpdateResult.SUCCESS].push(key)
      } else {
        acc[ShopUpdateResult.ERROR].push({ table: key, error: shopData[key] })
      }

      return acc
    },
    {
      [ShopUpdateResult.SUCCESS]: [] as IIntegrationResult[ShopUpdateResult.SUCCESS],
      [ShopUpdateResult.ERROR]: [] as IIntegrationResult[ShopUpdateResult.ERROR],
    },
  )
}
