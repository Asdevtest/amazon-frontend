import { TranslationKey } from '@constants/translations/translation-key'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { Launches } from '@typings/enums/launches'
import { IProduct } from '@typings/models/products/product'

export const launchOptions = Object.values(Launches).map(value => ({
  value,
  label: value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/^\w/, c => c.toUpperCase()),
}))

export const getAsinOptions = (product: IProduct) => [
  {
    value: product.asin,
    sku: product.skuByClient,
    label: `${t(TranslationKey.ASIN)}: ${product.asin}`,
    image: getAmazonImageUrl(product.images[0]),
  },
]
