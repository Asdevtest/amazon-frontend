import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ParserModel } from '@models/parser-model'

import { cloneDeep } from '@utils/object'
import { t } from '@utils/translations'

import { IParsingProfile } from '@typings/models/parser/parsing-profile'

import { FieldType } from './product-data-form.type'

export class ParsingProfileFormModel {
  loading = false
  profile?: IParsingProfile

  constructor(profile?: IParsingProfile) {
    this.profile = profile && cloneDeep(profile)

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onCreateProfile(values: FieldType) {
    try {
      this.onToggleLoading(true)

      const data = {
        name: values.name?.trim() || '',
        gologinId: values.gologinId?.trim() || '',
        email: values.email?.trim() || '',
        password: values.password?.trim() || '',
        spreadsheetsIdPerformance: values.spreadsheetsIdPerformance?.trim() || '',
        spreadsheetsIdImport: values.spreadsheetsIdImport?.trim() || '',
        spreadsheetsIdMain: values.spreadsheetsIdMain?.trim() || '',
        otp: values.otp?.trim() || '',
      }

      await ParserModel.createProfile(data)

      this.onToggleLoading(false)

      toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
    }
  }

  async onEditProfile(id: string, values: FieldType, isRemove?: boolean) {
    try {
      this.onToggleLoading(true)

      const data = {
        name: values.name?.trim() || '',
        spreadsheetsIdMain: values.spreadsheetsIdMain?.trim() || '',
        spreadsheetsIdPerformance: values.spreadsheetsIdPerformance?.trim() || '',
        spreadsheetsIdImport: values.spreadsheetsIdImport?.trim() || '',
        otp: values.otp?.trim() || '',
        isActive: this.profile?.isActive || false,
        shopId: this.profile?.shop?._id || null,
        clientId: this.profile?.client?._id || null,
      }
      await ParserModel.editProfile(id, data)

      this.onToggleLoading(false)

      !isRemove && toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
    }
  }

  onToggleLoading(value: boolean) {
    this.loading = value
  }

  onResetParsingData() {
    if (this.profile) {
      this.profile.client = null
      this.profile.shop = null
      this.profile.isActive = false
    }
  }

  onToggleParsingData() {
    if (this.profile) {
      this.profile.isActive = !this.profile.isActive
    }
  }

  async onParsingProfileRemoved() {
    try {
      await ParserModel.onParsingProfileRemoved(this.profile?._id)
      toast.success(t(TranslationKey['Parsing profile successfully deleted']))
    } catch (error) {
      toast.error(t(TranslationKey['Error deleting parsing profile']))
    }
  }
}
