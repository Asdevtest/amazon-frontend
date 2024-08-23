import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShopSellModel } from '@models/shop-sell-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class CreateOrEditTradingShopViewModel {
  history = undefined
  requestToEdit = undefined
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

      toast.success(t(TranslationKey['An request has been created']))
    } catch (error) {
      console.error(error)
      toast.error(t(TranslationKey['The request was not created']))
    }
  }

  async onSubmitEditRequest(data, files) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
      }

      const dataWithFiles = { ...data, files: [...data.files, ...this.uploadedFiles] }

      await ShopSellModel.editShopSell(this.requestToEdit._id, dataWithFiles)

      toast.success(t(TranslationKey['The request has been changed']))
    } catch (error) {
      console.error(error)
      toast.error(t(TranslationKey['The request has not been changed']))
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
