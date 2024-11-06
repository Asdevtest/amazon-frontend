import { Form, FormInstance } from 'antd'
import { makeObservable, runInAction } from 'mobx'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { DefaultModel } from '@models/default-model'
import { OtherModel } from '@models/other-model'
import { SupplierModel } from '@models/supplier-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { FieldType } from '@views/shared/parsing-view/parsing-profile-view/parsing-profile-form/product-data-form.type'

import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { isString } from '@typings/guards'
import { ICountry } from '@typings/models/others/country'
import { IPaymentMethod } from '@typings/shared/payment-method'
import { UploadFileType } from '@typings/shared/upload-file'

import { CreateSupplier } from './add-supplier-modal.types'
import { observerConfig } from './observer.config'

export class AddSupplierModalModel extends DefaultModel {
  countries: ICountry[] = []
  paymentMethods: IPaymentMethod[] = []

  countriesRequestStatus: loadingStatus = loadingStatus.SUCCESS
  paymentMethodsRequestStatus: loadingStatus = loadingStatus.SUCCESS

  constructor() {
    super({ getMainDataMethod: () => console.log('call :>> ') })
    makeObservable(this, observerConfig)

    this.getCountries()
    this.getSuppliersPaymentMethods()
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

  async createSupplier(value: CreateSupplier) {
    try {
      const imageToUpload = value?.companyLogo?.[0]

      const uploadedImage = isString(imageToUpload)
        ? await uploadFileByUrl(imageToUpload)
        : await onPostImage(imageToUpload)

      const data = { ...value, companyLogo: uploadedImage }

      SupplierV2Model?.createSupplier(data)
    } catch (error) {
      console.error(error)
    }
  }
}
