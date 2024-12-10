import { makeObservable, runInAction } from 'mobx'

import { DefaultModel } from '@models/default-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { OtherModel } from '@models/other-model'
import { SupplierModel } from '@models/supplier-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { isString } from '@typings/guards'
import { SupplierCardStatus } from '@typings/models/suppliers/supplier-card'
import { ISupplierCard } from '@typings/models/suppliers/supplier-exchange'
import { ICountry } from '@typings/shared/country'
import { IPaymentMethod } from '@typings/shared/payment-method'
import { UploadFileType } from '@typings/shared/upload-file'

import { CreateSupplier, PostSupplier } from './add-supplier-modal.types'
import { observerConfig } from './observer.config'

export class AddSupplierModalModel extends DefaultModel {
  countries: ICountry[] = []
  paymentMethods: IPaymentMethod[] = []

  productsInfinityModel?: InfiniteScrollModel<ISupplierCard>

  productsRequestStatus: loadingStatus = loadingStatus.SUCCESS
  countriesRequestStatus: loadingStatus = loadingStatus.SUCCESS
  paymentMethodsRequestStatus: loadingStatus = loadingStatus.SUCCESS

  images: UploadFileType[] = []

  showImportTemplateModal = false
  showAddSupplierProductModal = false

  get productIsloading() {
    return this.productsRequestStatus === loadingStatus.IS_LOADING
  }
  get requestIsloading() {
    return this.requestStatus === loadingStatus.IS_LOADING
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
      this.productsInfinityModel = new InfiniteScrollModel({
        method: SupplierV2Model.getSupplierCards,
        filterOptions: { guid: supplierId },
      })
      this.getCurrentData()
      this.productsInfinityModel?.getData()
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

  transformSupplierToCreateEditSupplier(supplier: CreateSupplier, images: string[]): PostSupplier {
    const transformedData = { ...supplier, images }

    const supplierEmployees = supplier?.supplierEmployees?.map(employee => ({
      name: employee?.name,
      phoneNumbers: employee?.phoneNumbers?.filter(phone => phone),
      emails: employee?.emails?.filter(email => email),
      links: employee?.links?.filter(link => link),
    }))

    transformedData.supplierEmployees = supplierEmployees

    return transformedData
  }

  async createSupplier(value: CreateSupplier) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const images = await this.uploadFiles(value?.images)

      const data = this.transformSupplierToCreateEditSupplier(value, images)

      const result = await SupplierV2Model?.createSupplier(data)

      return result.guid
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS)
    }
  }

  async editSupplier(supplierId: string, value: CreateSupplier) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const images = await this.uploadFiles(value?.images)

      const data = this.transformSupplierToCreateEditSupplier(value, images)

      SupplierV2Model?.editSupplier(supplierId, data)

      return supplierId
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS)
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

  async onImportProducts() {
    try {
      if (!this.productsInfinityModel) {
        return
      }

      this.productsInfinityModel.hasMore = true
      this.productsInfinityModel?.setOptions({ offset: 0 })
      await this.productsInfinityModel?.getData()
    } catch (error) {
      console.error(error)
    }
  }

  onOpenAddSupplierProductModal() {
    this.onTriggerOpenModal('showAddSupplierProductModal', true)
  }
  onCloseAddSupplierProductModal() {
    this.onTriggerOpenModal('showAddSupplierProductModal', false)
  }

  async changeSupplierStatus(supplierId: string, status: SupplierCardStatus) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      SupplierV2Model.patchSupplierStatus(supplierId, { status })
    } catch (error) {
      console.error(error)
    } finally {
      this.setRequestStatus(loadingStatus.SUCCESS)
    }
  }
}
