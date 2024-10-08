import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { Launches } from '@typings/enums/launches'
import { IProduct } from '@typings/models/products/product'

import { IPermissionsData } from '@hooks/use-products-permissions'

export const reportModalConfig = {
  requestTableStatus: observable,
  product: observable,
  reportId: observable,
  newProductPrice: observable,
  description: observable,
  listingLaunches: observable,
  launchOptions: observable,
  selectLaunchValue: observable,
  columnsProps: observable,
  columnsModel: observable,

  launches: computed,
  disabledSaveButton: computed,
  requests: computed,
  asinOptions: computed,

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
  setRequestTableStatus: action.bound,
  updateProductAndColumns: action.bound,
  onGetProducts: action.bound,
  onPopupScroll: action.bound,
  onDropdownVisibleChange: action.bound,
}

export const launchOptions = Object.values(Launches).map(value => ({
  value,
  label: getLaunchName(value),
}))

export const excludedLaunches = [Launches.CUSTOM, Launches.AB_TEST, Launches.PRICE_CHANGE]

export const getAsinOptions = (products: IPermissionsData[]) =>
  products?.map(product => {
    const mediaFile = product?.images?.[0]
    const displayedMediaFile = checkIsImageLink(mediaFile) ? getAmazonImageUrl(mediaFile) : '/assets/img/no-photo.jpg'

    return {
      ...product,
      value: product?._id,
      label: `${t(TranslationKey.ASIN)}: ${product?.asin || t(TranslationKey.Missing)}`,
      image: displayedMediaFile,
    }
  })

export const getDefaultAsinOption = (product?: IProduct) =>
  product
    ? {
        value: product?._id,
        label: `${t(TranslationKey.ASIN)}: ${product?.asin || t(TranslationKey.Missing)}`,
        asin: product?.asin,
        skuByClient: product?.skuByClient,
        image: getAmazonImageUrl(product?.images[0]),
        buyerId: product?.buyer?._id,
      }
    : undefined
