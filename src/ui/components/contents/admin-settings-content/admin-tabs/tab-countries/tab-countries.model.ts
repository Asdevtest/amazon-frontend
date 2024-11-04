import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { SupplierModel } from '@models/supplier-model'

import { t } from '@utils/translations'
import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { isString } from '@typings/guards'

export class AdminSettingsCountriesModel {
  countries: any[] = []
  isEdit = false

  constructor() {
    this.getCountries()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getCountries() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.countries = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async createPaymentMethod(data: any) {
    try {
      await SupplierModel.addSuppliersPaymentMethod(data)
      toast.success(t(TranslationKey['Country successfully saved']))
      this.getCountries()
    } catch (error) {
      toast.error(t(TranslationKey['Country is not saved']))
    }
  }

  async editPaymentMethod(id: string, data: any) {
    try {
      await SupplierModel.editSuppliersPaymentMethod(id, data)
      toast.success(t(TranslationKey['Country successfully saved']))
      this.getCountries()
    } catch (error) {
      toast.error(t(TranslationKey['Country is not saved']))
    }
  }

  async onRemovePaymentMethod(id: string) {
    try {
      await AdministratorModel.removePaymentMethod(id)
      this.getCountries()
    } catch (error) {
      console.error(error)
    }
  }

  async onSaveCountry(values: any) {
    console.log('values', values)
    const icon = isString(values.media?.[0])
      ? await uploadFileByUrl(values.media?.[0])
      : await onPostImage(values.media?.[0])

    this.isEdit ? this.editPaymentMethod('', {}) : this.createPaymentMethod({})
  }
}
