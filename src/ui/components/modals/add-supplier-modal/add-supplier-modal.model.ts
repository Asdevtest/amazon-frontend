import { makeObservable, runInAction } from 'mobx'

import { DefaultModel } from '@models/default-model'
import { OtherModel } from '@models/other-model'
import { SupplierModel } from '@models/supplier-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { isString } from '@typings/guards'
import { ISupplierCard } from '@typings/models/suppliers/supplier-exchange'
import { ICountry } from '@typings/shared/country'
import { IPaymentMethod } from '@typings/shared/payment-method'
import { UploadFileType } from '@typings/shared/upload-file'

import { CreateSupplier, PostSupplier } from './add-supplier-modal.types'
import { observerConfig } from './observer.config'

export class AddSupplierModalModel extends DefaultModel {
  countries: ICountry[] = []
  paymentMethods: IPaymentMethod[] = []
  products: ISupplierCard[] = []

  importProductsRequestStatus: loadingStatus = loadingStatus.SUCCESS
  productsRequestStatus: loadingStatus = loadingStatus.SUCCESS
  countriesRequestStatus: loadingStatus = loadingStatus.SUCCESS
  paymentMethodsRequestStatus: loadingStatus = loadingStatus.SUCCESS

  images: UploadFileType[] = []

  showImportTemplateModal = false

  get productIsloading() {
    return this.productsRequestStatus === loadingStatus.IS_LOADING
  }
  get importProductsIsloading() {
    return this.importProductsRequestStatus === loadingStatus.IS_LOADING
  }

  constructor(supplierId?: string) {
    const defaultGetCurrentDataOptions = () => supplierId

    super({
      getMainDataMethod: SupplierModel?.getSupplier,
      defaultGetCurrentDataOptions,
    })

    makeObservable(this, observerConfig)

    this.getCountries()
    this.getSuppliersPaymentMethods()

    if (supplierId) {
      this.getCurrentData()
      this.getProductsCards(supplierId)
    }
  }

  async getCountries() {
    const requestField = 'countriesRequestStatus'

    try {
      this.setRequestStatus(loadingStatus.IS_LOADING, requestField)
      const response = (await OtherModel.getCountries()) as unknown as ICountry[]

      runInAction(() => {
        this.countries = response
      })
      this.setRequestStatus(loadingStatus.SUCCESS, requestField)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED, requestField)
      console.error(error)
    }
  }

  async getSuppliersPaymentMethods() {
    const requestField = 'paymentMethodsRequestStatus'
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING, requestField)

      const response = (await SupplierModel.getSuppliersPaymentMethods()) as unknown as IPaymentMethod[]

      runInAction(() => {
        this.paymentMethods = response
      })

      this.setRequestStatus(loadingStatus.SUCCESS, requestField)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED, requestField)
      console.error(error)
    }
  }

  async uploadFiles(files: UploadFileType[]) {
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

  async createSupplier(value: CreateSupplier) {
    try {
      const images = await this.uploadFiles(value?.images)

      const data: PostSupplier = { ...value, images }

      SupplierV2Model?.createSupplier(data)
    } catch (error) {
      console.error(error)
    }
  }

  async editSupplier(supplierId: string, value: CreateSupplier) {
    try {
      const images = await this.uploadFiles(value?.images)

      const data: PostSupplier = { ...value, images }

      SupplierV2Model?.editSupplier(supplierId, data)
    } catch (error) {
      console.error(error)
    }
  }

  setImages(images: UploadFileType[]) {
    runInAction(() => {
      this.images = images
    })
  }

  onOpenImportTemplateModal() {
    this.onTriggerOpenModal('showImportTemplateModal', true)
  }

  onCloseImportTemplateModal() {
    this.onTriggerOpenModal('showImportTemplateModal', false)
  }

  async getProductsCards(guid: string) {
    const requestField = 'productsRequestStatus'
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING, requestField)
      const result = await SupplierV2Model.getSupplierCards({ guid })

      runInAction(() => {
        this.products = result?.rows as unknown as ISupplierCard[]
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS, requestField)
    }
  }

  async onImportProducts(guid: string) {
    const requestField = 'importProductsRequestStatus'
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING, requestField)
      await this.getProductsCards(guid)
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS, requestField)
    }
  }
}
