import { makeAutoObservable, runInAction } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShopSellModel } from '@models/shop-sell-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class CreateOrEditTradingShopViewModel {
  history = undefined

  showInfoModal = false

  requestToEdit = undefined

  infoModalText = ''

  uploadedFiles = []
  progressValue = 0
  showProgress = false

  constructor({ history }) {
    this.history = history

    if (history.location.state) {
      this.requestToEdit = history.location.state.request
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onSubmitCreateShopSell(data, files) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
      }

      const dataWithFiles = { ...data, files: this.uploadedFiles }

      await ShopSellModel.createShopSell(dataWithFiles)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['An request has been created'])
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The request was not created'])
      })
    } finally {
      this.onTriggerOpenModal('showInfoModal')
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
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The request has not been changed'])
      })
    } finally {
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  onClickOkInfoModal() {
    this.onTriggerOpenModal('showInfoModal')
    this.history.goBack()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
