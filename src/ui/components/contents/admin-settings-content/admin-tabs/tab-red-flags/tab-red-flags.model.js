import { makeAutoObservable, runInAction } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { ProductModel } from '@models/product-model'

import { checkIsImageUrlValid } from '@utils/checks'
import { t } from '@utils/translations'
import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { isString } from '@typings/guards'

export class AdminSettingsRedFlagsModel {
  infoModalText = undefined
  showInfoModal = false
  showConfirmModal = false
  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  redFlags = []
  flag = { title: '', iconImage: '' }
  isValidUrl = false
  currentImageName = undefined

  isEdit = false
  editRedFlagId = undefined

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    try {
      this.getRedFlags()
    } catch (error) {
      console.log(error)
    }
  }

  async getRedFlags() {
    try {
      const response = await ProductModel.getProductRedFlags()

      runInAction(() => {
        this.redFlags = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onCreateRedFlag(redFlag) {
    try {
      await AdministratorModel.createRedFlag(redFlag)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['Red flag successfully saved'])
      })

      this.onTriggerOpenModal('showInfoModal')

      this.loadData()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['Red flag is not saved'])
      })

      this.onTriggerOpenModal('showInfoModal')
    }
  }

  async onEditRedFlag(id, redFlag) {
    try {
      await AdministratorModel.editRedFlag(id, redFlag)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['Red flag successfully saved'])
      })

      this.onTriggerOpenModal('showInfoModal')

      this.loadData()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['Red flag is not saved'])
      })

      this.onTriggerOpenModal('showInfoModal')
    }
  }

  async onRemoveRedFlag(id) {
    try {
      await AdministratorModel.removeRedFlag(id)

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.log(error)
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

  async onClickEditRedFlag(id) {
    runInAction(() => {
      this.isEdit = true
      this.editRedFlagId = id
    })

    const findRedFlag = this.redFlags.find(flag => flag._id === id)

    if (findRedFlag) {
      runInAction(() => {
        this.flag = { title: findRedFlag.title, iconImage: findRedFlag.iconImage }
        this.currentImageName = findRedFlag.title
      })

      const isValidImageUrl = await checkIsImageUrlValid(findRedFlag.iconImage)

      runInAction(() => {
        this.isValidUrl = isValidImageUrl
      })
    }
  }

  async onSubmitRedFlag() {
    const resolve = isString(this.flag.iconImage)
      ? await uploadFileByUrl(this.flag.iconImage)
      : await onPostImage(this.flag.iconImage)

    runInAction(() => {
      this.flag.iconImage = resolve
    })

    this.isEdit ? this.onEditRedFlag(this.editRedFlagId, this.flag) : this.onCreateRedFlag(this.flag)

    runInAction(() => {
      this.flag = { title: '', iconImage: '' }
      this.isEdit = false
      this.editRedFlagId = undefined
    })
  }

  onChangeTitle(event) {
    this.flag.title = event.target.value
  }

  async onChangeIconImage(event) {
    runInAction(() => {
      this.currentImageName = this.flag.title
      this.flag.iconImage = event.target.value
    })

    const isValidImageUrl = await checkIsImageUrlValid(event.target.value)

    runInAction(() => {
      this.isValidUrl = isValidImageUrl
    })
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
        const isValidImageUrl = await checkIsImageUrlValid(e.target.result)

        runInAction(() => {
          this.isValidUrl = isValidImageUrl
          this.flag.iconImage = {
            data_url: e.target.result,
            file,
          }
        })
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
