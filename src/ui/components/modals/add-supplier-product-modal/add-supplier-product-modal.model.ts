import { makeObservable, runInAction } from 'mobx'

import { DefaultModel } from '@models/default-model'
import { OtherModel } from '@models/other-model'
import { UserModel } from '@models/user-model'

import { loadingStatus } from '@typings/enums/loading-status'
import { ICategory } from '@typings/shared/category'
import { IPlatformSettings } from '@typings/shared/patform-settings'
import { UploadFileType } from '@typings/shared/upload-file'

import { observerConfig } from './observer.config'

export class AddSupplierProductModalModel extends DefaultModel {
  categories: ICategory[] = []

  images: UploadFileType[] = []
  unitImages: UploadFileType[] = []

  categoriesLoadingStatus = loadingStatus.SUCCESS

  get systemYuanToDollarRate() {
    return (UserModel.platformSettings as unknown as IPlatformSettings)?.yuanToDollarRate
  }

  get volumeWeightCoefficient() {
    return (UserModel.platformSettings as unknown as IPlatformSettings)?.volumeWeightCoefficient
  }

  constructor() {
    super({
      getMainDataMethod: () => {},
    })
    makeObservable(this, observerConfig)

    this.getCategories()
  }

  async getCategories() {
    const categoriesLoadingStatus = 'categoriesLoadingStatus'

    try {
      this.setRequestStatus(loadingStatus.IS_LOADING, categoriesLoadingStatus)

      const result = (await OtherModel.getCategories()) as unknown as ICategory[]

      runInAction(() => {
        this.categories = result
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS, categoriesLoadingStatus)
    }
  }

  setImages(images: UploadFileType[]) {
    runInAction(() => {
      this.images = images
    })
  }

  setUnitImages(images: UploadFileType[]) {
    runInAction(() => {
      this.unitImages = images
    })
  }
}
