import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { OtherModel } from '@models/other-model'
import { ProductModel } from '@models/product-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

const fieldsOfProductAllowedToUpdate = [
  'listingName',
  'listingBulletPoints',
  'listingProductDetails',
  'listingSearchTerms',
  'listingSubjectMatters',
  'listingImages',
]

export class ListingModel {
  history = undefined

  listingProduct = undefined
  payments = []
  boxes = []
  curImage = undefined
  imagesFromBoxes = []

  progressValue = 0

  showImageModal = false
  showProgress = false
  showCompetitorModal = false

  tmpListingImages = []
  imagesToLoad = []

  get userRole() {
    return UserModel.userInfo?.role
  }

  constructor({ history, productId }) {
    this.history = history

    this.productId = productId
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onSaveSubmit() {
    try {
      await onSubmitPostImages.call(this, { images: this.tmpListingImages, type: 'imagesToLoad' })

      await this.onSaveProductData()

      this.tmpListingImages = new Array()

      this.loadData()

      toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
    }
  }

  onCancel() {
    this.history.goBack()
  }

  setTmpListingImages(images) {
    this.tmpListingImages = images
  }

  onChangeArrayField(e, fieldName, itemIndex) {
    const newFormFields = { ...this.listingProduct }
    newFormFields[fieldName][itemIndex] = e.target.value
    this.listingProduct = newFormFields
  }

  onChangeField(e, fieldName) {
    const newFormFields = { ...this.listingProduct }
    newFormFields[fieldName] = e.target.value
    this.listingProduct = newFormFields
  }

  onRemoveCompetitor(index) {
    const newFormFields = { ...this.listingProduct }

    newFormFields.listingSupplierCompetitors.splice(index, 1)

    this.listingProduct = newFormFields
  }

  async loadData() {
    await this.getProductById()
    await this.getBoxes()
    this.getPayments()
  }

  async getProductById() {
    try {
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.listingProduct = {
          ...result,

          listingName: result.listingName || '',

          listingBulletPoints: result.listingBulletPoints || [],

          listingProductDetails: result.listingProductDetails || '',

          listingSearchTerms: result.listingSearchTerms || '',

          listingSubjectMatters: result.listingSubjectMatters || [],

          listingImages: result.listingImages || [],
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onSaveProductData() {
    try {
      const updateProductData = getObjectFilteredByKeyArrayWhiteList(
        this.listingProduct,
        fieldsOfProductAllowedToUpdate,
      )

      await SupervisorModel.updateProductListing(this.listingProduct._id, {
        ...updateProductData,
        listingImages: updateProductData.listingImages.concat(this.imagesToLoad),
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getPayments() {
    try {
      const result = await OtherModel.getPaymentsByProductId(this.productId)

      runInAction(() => {
        this.payments = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      this.payments = []
      console.error(error)
    }
  }

  getImagesFromBoxes(boxes) {
    const res = []
    boxes.forEach(cur => cur.images !== null && res.push(...cur.images))
    this.imagesFromBoxes = res
  }

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxesByProductIdLight(this.listingProduct._id)

      runInAction(() => {
        this.boxes = result
        this.getImagesFromBoxes(result)
      })
    } catch (error) {
      this.payments = []
      console.error(error)
    }
  }
}
