import { TranslationKey } from '@constants/translations/translation-key'

import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { Launches } from '@typings/enums/launches'
import { IProduct } from '@typings/models/products/product'

export const launchOptions = Object.values(Launches).map(value => ({
  value,
  label: getLaunchName(value),
}))

export const getAsinOptions = (product: IProduct) => [
  {
    value: product.asin,
    sku: product.skuByClient,
    label: `${t(TranslationKey.ASIN)}: ${product.asin}`,
    image: getAmazonImageUrl(product.images[0]),
  },
]
