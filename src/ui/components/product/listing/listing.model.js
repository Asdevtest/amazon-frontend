import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {UserRoleCodeMap} from '@constants/user-roles'

import {BoxesModel} from '@models/boxes-model'
import {OtherModel} from '@models/other-model'
import {SupervisorModel} from '@models/supervisor-model'
import {UserModel} from '@models/user-model'

import {checkIsBuyer} from '@utils/checks'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {onSubmitPostImages} from '@utils/upload-files'

const fieldsOfProductAllowedToUpdate = [
  'listingName',
  'listingBulletPoints',
  'listingProductDetails',
  'listingSearchTerms',
  'listingSubjectMatters',
  'listingImages',
  'listingTaskToFindSupplier',
  'listingSupplierImportantPoints',
  'listingExtraInfo',
  'listingSupplierCompetitors',
]

export class ListingModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  listingProduct = {}
  payments = []
  boxes = []
  curImage = undefined
  imagesFromBoxes = []

  bigImagesOptions = {images: [], imgIndex: 0}

  progressValue = 0

  showImageModal = false
  showSuccessModal = false
  showProgress = false
  showCompetitorModal = false

  tmpListingImages = []
  imagesToLoad = []

  get userRole() {
    return UserModel.userInfo?.role
  }

  constructor({history, product}) {
    this.history = history
    this.listingProduct = {
      ...product,

      listingName: product.listingName || '',

      listingBulletPoints: product.listingBulletPoints || [],

      listingProductDetails: product.listingProductDetails || '',

      listingSearchTerms: product.listingSearchTerms || '',

      listingSubjectMatters: product.listingSubjectMatters || [],

      listingImages: product.listingImages || [],

      listingTaskToFindSupplier: product.listingTaskToFindSupplier || '',

      listingSupplierImportantPoints: product.listingSupplierImportantPoints || '',

      listingExtraInfo: product.listingExtraInfo || '',

      listingSupplierCompetitors: product.listingSupplierCompetitors || [],
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onSaveSubmit() {
    try {
      await onSubmitPostImages.call(this, {images: this.tmpListingImages, type: 'imagesToLoad'})

      await this.onSaveProductData()

      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      this.error = error
    }
  }

  onCancel() {
    this.history.goBack()
  }

  setTmpListingImages(images) {
    this.tmpListingImages = images
  }

  onChangeArrayField(e, fieldName, itemIndex) {
    const newFormFields = {...this.listingProduct}
    newFormFields[fieldName][itemIndex] = e.target.value
    this.listingProduct = newFormFields
  }

  onChangeField(e, fieldName) {
    const newFormFields = {...this.listingProduct}
    newFormFields[fieldName] = e.target.value
    this.listingProduct = newFormFields
  }

  onRemoveCompetitor(index) {
    const newFormFields = {...this.listingProduct}

    newFormFields.listingSupplierCompetitors.splice(index, 1)

    this.listingProduct = newFormFields
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getBoxes()
      !checkIsBuyer(UserRoleCodeMap[this.userRole]) && (await this.getPayments())

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
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
      console.log('error', error)
    }
  }

  async getPayments() {
    try {
      const result = await OtherModel.getPaymentsByProductId(this.listingProduct._id)

      runInAction(() => {
        this.payments = result
      })
    } catch (error) {
      this.payments = []
      console.log(error)
    }
  }

  getImagesFromBoxes(boxes) {
    const res = []
    boxes.forEach(cur => cur.images !== null && res.push(...cur.images))
    this.imagesFromBoxes = res

    // this.imagesFromBoxes = boxes.reduce((sum, cur) =>cur.images !== null && sum.push(...cur.images), []) не пойму почему это не работает(
  }

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxesByProductId(this.listingProduct._id)

      runInAction(() => {
        this.boxes = result
        this.getImagesFromBoxes(result)
      })
    } catch (error) {
      this.payments = []
      console.log(error)
    }
  }

  onClickImg(opt) {
    this.onTriggerOpenModal('showImageModal')
    this.setBigImagesOptions(opt)
  }

  setBigImagesOptions(opt) {
    this.bigImagesOptions = {images: opt.images, imgIndex: opt.imgIndex}
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
