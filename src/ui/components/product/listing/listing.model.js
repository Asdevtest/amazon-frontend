import {makeAutoObservable, runInAction} from 'mobx'

import {BACKEND_API_URL} from '@constants/env'
import {loadingStatuses} from '@constants/loading-statuses'
import {UserRoleCodeMap} from '@constants/user-roles'

import {BoxesModel} from '@models/boxes-model'
import {OtherModel} from '@models/other-model'
import {SupervisorModel} from '@models/supervisor-model'
import {UserModel} from '@models/user-model'

import {checkIsBuyer} from '@utils/checks'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

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

  tmpImagesLoadMap = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  }

  progressValue = 0

  tmpListingImages = []

  showImageModal = false
  showSuccessModal = false
  showProgress = false

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

      listingSupplierCompetitors: product.listingSupplierCompetitors || '',
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onSaveSubmith() {
    try {
      await this.onSubmitPostImages({images: this.tmpImagesLoadMap, type: 'tmpListingImages'})

      await this.onSaveProductData()

      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      this.error = error
    }
  }

  async onSubmitPostImages({images, type}) {
    const imageFilesArray = Object.values(images).filter(el => el !== false)
    const loadingStep = 100 / imageFilesArray.length

    this[type] = []
    this.showProgress = true

    for (const key in images) {
      if (images[key]) {
        const image = images[key]
        await this.onPostImage(image, type)
        this.progressValue = this.progressValue + loadingStep
      }
    }

    this.showProgress = false
    this.progressValue = 0
  }

  async onPostImage(imageData, imagesType) {
    const formData = new FormData()
    formData.append('filename', imageData)

    try {
      const imageFile = await OtherModel.postImage(formData)

      this[imagesType].push(BACKEND_API_URL + '/uploads/' + imageFile.data.fileName)
    } catch (error) {
      this.error = error
    }
  }

  onCancel() {
    this.history.goBack()
  }

  onRemoveTmpListingImage(index) {
    this.tmpImagesLoadMap[index] = false
  }

  setTmpListingImages(e, index) {
    this.tmpImagesLoadMap[index] = e.target.files[0]
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
        listingImages: updateProductData.listingImages.concat(this.tmpListingImages),
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

  onClickImg(img) {
    this.onTriggerOpenModal('showImageModal')
    this.setCurImage(img)
  }

  setCurImage(img) {
    this.curImage = img
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
