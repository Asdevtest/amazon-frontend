import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { OtherModel } from '@models/other-model'

import { t } from '@utils/translations'
import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { isString } from '@typings/guards'
import { ICountry } from '@typings/models/others/country'
import { UploadFileType } from '@typings/shared/upload-file'

import { CountryValues } from './tab-countries.type'

export class AdminSettingsCountriesModel {
  countries: ICountry[] = []
  images: UploadFileType[] = []

  constructor() {
    this.getCountries()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeImages(images: UploadFileType[]) {
    this.images = images
  }

  async getCountries() {
    try {
      const response = (await OtherModel.getCountries()) as unknown as ICountry[]

      runInAction(() => {
        this.countries = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onCreateCountry(data: CountryValues) {
    try {
      await AdministratorModel.addCountry(data)
      toast.success(t(TranslationKey['Country successfully saved']))
      this.getCountries()
    } catch (error) {
      toast.error(t(TranslationKey['Country is not saved']))
    }
  }

  async onEditCountry(id: string, data: CountryValues) {
    try {
      await AdministratorModel.editCountry(id, data)
      toast.success(t(TranslationKey['Country successfully saved']))
      this.getCountries()
    } catch (error) {
      toast.error(t(TranslationKey['Country is not saved']))
    }
  }

  async onRemoveCountry(id: string) {
    try {
      await AdministratorModel.removeCountry(id)
      this.getCountries()
    } catch (error) {
      console.error(error)
    }
  }

  async onSaveCountry(values: CountryValues) {
    const image = isString(values.image?.[0])
      ? await uploadFileByUrl(values.image?.[0])
      : await onPostImage(values.image?.[0])

    const data = {
      title: values.title || '',
      shortTitle: values.shortTitle || '',
      image: image || '',
    }

    values?.id ? await this.onEditCountry(values?.id, data) : await this.onCreateCountry(data)
  }
}
