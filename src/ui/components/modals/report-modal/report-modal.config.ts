import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { Launches } from '@typings/enums/launches'
import { IProduct } from '@typings/models/products/product'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const launchOptions = Object.values(Launches).map(value => ({
  value,
  label: getLaunchName(value),
}))

export const getAsinOptions = (products: IPermissionsData[]) =>
  products?.map(product => ({
    value: product?._id,
    asin: product?.asin,
    sku: product?.skuByClient,
    label: `${t(TranslationKey.ASIN)}: ${product?.asin || t(TranslationKey.Missing)}`,
    image: getAmazonImageUrl(product?.images?.[0]),
    images: product?.images,
    _id: product?._id,
  }))

export const getDefaultAsinOption = (product?: IProduct) => ({
  value: product?._id,
  asin: product?.asin,
  sku: product?.skuByClient,
  label: `${t(TranslationKey.ASIN)}: ${product?.asin || t(TranslationKey.Missing)}`,
  image: getAmazonImageUrl(product?.images[0]),
})

export const reportModalConfig = {
  product: observable,
  reportId: observable,
  newProductPrice: observable,
  description: observable,
  listingLaunches: observable,
  selectLaunchValue: observable,
  columnsProps: observable,
  columnsModel: observable,

  launches: computed,
  launchOptions: computed,
  disabledSaveButton: computed,
  requests: computed,

  getListingReportById: action.bound,
  createListingReport: action.bound,
  updateListingReport: action.bound,
  onChangeNewProductPrice: action.bound,
  onChangeDescription: action.bound,
  onSelectLaunch: action.bound,
  onSelectProduct: action.bound,
  findLaunchIndex: action.bound,
  onChangeNumberCellValue: action.bound,
  onChangeCommentCellValue: action.bound,
  onChangeDateCellValue: action.bound,
  onAddRequest: action.bound,
  onRemoveRequest: action.bound,
  onRemoveLaunch: action.bound,
  setRequestStatus: action.bound,
  updateProductAndColumns: action.bound,
  onVirtialSelectScroll: action.bound,
}
