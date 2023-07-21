import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { ProductModel } from '@models/product-model'

import { checkIsImageUrlValid } from '@utils/checks'
import { t } from '@utils/translations'
import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

export class AdminSettingsRedFlagsModel {
  history = undefined
  requestStatus = undefined

  infoModalText = undefined
  showInfoModal = false
  showConfirmModal = false
  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  flag = { title: '', iconImage: '' }
  redFlags = []
  isValidUrl = false
  currentImageName = undefined

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getRedFlags()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getRedFlags() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await ProductModel.getProductRedFlags()

      runInAction(() => {
        this.redFlags = result
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onCreateRedFlag(redFlag) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.createRedFlag(redFlag)

      this.infoModalText = t(TranslationKey['Red flag successfully saved'])

      this.onTriggerOpenModal('showInfoModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.infoModalText = t(TranslationKey['Red flag is not saved'])

      this.onTriggerOpenModal('showInfoModal')

      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onRemoveRedFlag(id) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.removeRedFlag(id)

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onClickRemoveRedFlag(id) {
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the red flag?']),
      onClickSuccess: () => this.onRemoveRedFlag(id),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitRedFlag() {
    const result =
      typeof this.flag.iconImage === 'string'
        ? await uploadFileByUrl(this.flag.iconImage)
        : await onPostImage(this.flag.iconImage)

    this.flag.iconImage = result

    this.onCreateRedFlag(this.flag)

    this.flag = { title: '', iconImage: '' }
  }

  onChangeTitle(event) {
    this.flag.title = event.target.value
  }

  async onChangeIconImage(event) {
    this.currentImageName = this.flag.title
    this.flag.iconImage = event.target.value

    this.isValidUrl = await checkIsImageUrlValid(event.target.value)
  }

  onRemoveImg() {
    this.flag.iconImage = ''
  }

  onImageUpload(event) {
    const file = event.target.files[0]
    const reader = new FileReader()

    if (file) {
      this.currentImageName = file.name

      reader.onload = async e => {
        this.isValidUrl = await checkIsImageUrlValid(e.target.result)
        this.flag.iconImage = {
          data_url: e.target.result,
          file,
        }
      }

      event.target.value = ''

      reader.readAsDataURL(file)
    } else {
      this.flag.iconImage = ''
    }
  }

  onClickToggleInfoModal() {
    this.onTriggerOpenModal('showInfoModal')
  }

  onClickToggleConfirmModal() {
    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
