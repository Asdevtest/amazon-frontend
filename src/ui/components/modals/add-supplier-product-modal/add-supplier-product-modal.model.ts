import { makeObservable, runInAction } from 'mobx'

import { DefaultModel } from '@models/default-model'
import { OtherModel } from '@models/other-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'
import { UserModel } from '@models/user-model'

import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { isString } from '@typings/guards'
import { ICategory } from '@typings/shared/category'
import { IPlatformSettings } from '@typings/shared/patform-settings'
import { UploadFileType } from '@typings/shared/upload-file'

import { ICreateSupplierProductModal } from './add-supplier-product-modal.type'
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

  async uploadFiles(files: UploadFileType[] = []) {
    try {
      const result: string[] = []
      const alreadyUploadedFiles: string[] = []

      for (const file of files) {
        if (isString(file)) {
          if (file?.includes('/uploads/')) {
            alreadyUploadedFiles.push(file)
          } else {
            const uploaddedFile = await uploadFileByUrl(file)
            result.push(uploaddedFile)
          }
        } else {
          const uploaddedFile = (await onPostImage(file)) as string
          result.push(uploaddedFile)
        }
      }

      return result?.concat(alreadyUploadedFiles)
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async createSupplierCard(values: ICreateSupplierProductModal) {
    try {
      console.log('values :>> ', values)
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const images = await this.uploadFiles(values?.images)
      const imageUnit = await this.uploadFiles(values?.imageUnit)

      const body = { ...values, images, imageUnit }

      console.log('body :>> ', body)

      const result = SupplierV2Model?.createSupplierCard(values)

      return result
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS)
    }
  }
}
