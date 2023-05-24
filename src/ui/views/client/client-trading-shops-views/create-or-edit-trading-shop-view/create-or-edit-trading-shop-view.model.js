import { makeAutoObservable, runInAction } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShopSellModel } from '@models/shop-sell-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class CreateOrEditTradingShopViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  showInfoModal = false

  requestToEdit = undefined

  infoModalText = ''

  uploadedFiles = []

  readyImages = []
  progressValue = 0
  showProgress = false

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        this.requestToEdit = location.state.request
      }
    })

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onSubmitCreateShopSell(data, files) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
      }

      const dataWithFiles = { ...data, files: this.uploadedFiles }

      await ShopSellModel.createShopSell(dataWithFiles)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['An request has been created'])
      })
      this.onTriggerOpenModal('showInfoModal')
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The request was not created'])
      })
      this.onTriggerOpenModal('showInfoModal')

      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitEditRequest(data, files) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
      }

      const dataWithFiles = { ...data, files: [...data.files, ...this.uploadedFiles] }

      await ShopSellModel.editShopSell(this.requestToEdit._id, dataWithFiles)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The request has been changed'])
      })
      this.onTriggerOpenModal('showInfoModal')
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The request has not been changed'])
      })
      this.onTriggerOpenModal('showInfoModal')

      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickOkInfoModal() {
    this.onTriggerOpenModal('showInfoModal')
    this.history.goBack()
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
