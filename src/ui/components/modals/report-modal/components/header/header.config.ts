import { TranslationKey } from '@constants/translations/translation-key'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const getAsinOptions = (products: IPermissionsData[]) =>
  products?.map(product => {
    const mediaFile = product?.images?.[0]
    const displayedMediaFile = checkIsImageLink(mediaFile) ? getAmazonImageUrl(mediaFile) : '/assets/img/no-photo.jpg'

    return {
      value: product?._id,
      asin: product?.asin,
      sku: product?.skuByClient,
      label: `${t(TranslationKey.ASIN)}: ${product?.asin || t(TranslationKey.Missing)}`,
      image: displayedMediaFile,
      images: product?.images,
      _id: product?._id,
    }
  })

export const getDefaultAsinOption = (product?: IProduct) => ({
  value: product?._id,
  asin: product?.asin,
  sku: product?.skuByClient,
  label: `${t(TranslationKey.ASIN)}: ${product?.asin || t(TranslationKey.Missing)}`,
  image: getAmazonImageUrl(product?.images[0]),
})
