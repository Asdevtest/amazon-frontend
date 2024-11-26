import { makeObservable, runInAction } from 'mobx'

import { DefaultModel } from '@models/default-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { OtherModel } from '@models/other-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'
import { UserModel } from '@models/user-model'

import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { isString } from '@typings/guards'
import { ISupplierV2Light } from '@typings/models/suppliers/supplier-v2'
import { ICategory } from '@typings/shared/category'
import { IPlatformSettings } from '@typings/shared/patform-settings'
import { UploadFileType } from '@typings/shared/upload-file'

import {
  IBoxPropertiesDimensionType,
  ICreateSupplierCard,
  ICreateSupplierProductModal,
} from './add-supplier-card-modal.type'
import { observerConfig } from './observer.config'

export class AddSupplierProductModalModel extends DefaultModel {
  categories: ICategory[] = []

  suppliersInfinityModel: InfiniteScrollModel<ISupplierV2Light>

  images: UploadFileType[] = []
  unitImages: UploadFileType[] = []

  categoriesLoadingStatus = loadingStatus.SUCCESS

  get systemYuanToDollarRate() {
    return (UserModel.platformSettings as unknown as IPlatformSettings)?.yuanToDollarRate
  }

  get volumeWeightCoefficient() {
    return (UserModel.platformSettings as unknown as IPlatformSettings)?.volumeWeightCoefficient
  }

  constructor({ supplierId, supplierCardId }: { supplierId?: string; supplierCardId?: string }) {
    super({
      getMainDataMethod: SupplierV2Model.getSupplierCardByGuid,
      defaultGetCurrentDataOptions: () => supplierCardId,
    })
    makeObservable(this, observerConfig)

    this.suppliersInfinityModel = new InfiniteScrollModel({
      method: SupplierV2Model.getSuppliersLight,
      searchFields: ['companyName'],
    })

    if (supplierId) {
      this.suppliersInfinityModel.setOptions({
        filters: `supplier[$eq]=${supplierId}`,
      })
    }

    if (supplierCardId) {
      this.getCurrentData()
    }

    this.getCategories()
    this.suppliersInfinityModel?.getData()
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

  transformValueToCreateSupplier(
    value: ICreateSupplierProductModal,
    propsToAdd: Partial<ICreateSupplierCard>,
  ): ICreateSupplierCard {
    const transformedData = { ...value, ...propsToAdd }

    if (transformedData.priceVariations?.length) {
      for (const priceVariation of transformedData.priceVariations) {
        delete priceVariation.label
      }
    }

    delete (transformedData.boxProperties as Partial<IBoxPropertiesDimensionType>)?.dimensionType
    delete (transformedData as Partial<ICreateSupplierProductModal>).unitDimensionType
    delete (transformedData as Partial<ICreateSupplierProductModal>).yuanToDollarRate

    return transformedData
  }

  async createSupplierCard(values: ICreateSupplierProductModal) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const images = await this.uploadFiles(values?.images)
      const imageUnit = await this.uploadFiles(values?.imageUnit)

      const body = this.transformValueToCreateSupplier(values, { images, imageUnit })

      const result = SupplierV2Model?.createSupplierCard(body)

      return result
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS)
    }
  }

  async editSupplierCard(supplierCardId: string, values: ICreateSupplierProductModal) {
    console.log('supplierCardId :>> ', supplierCardId)

    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const images = await this.uploadFiles(values?.images)
      const imageUnit = await this.uploadFiles(values?.imageUnit)

      const body = this.transformValueToCreateSupplier(values, { images, imageUnit })

      const result = SupplierV2Model?.editSupplierCard(supplierCardId, body)

      return result
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS)
    }
  }
}
