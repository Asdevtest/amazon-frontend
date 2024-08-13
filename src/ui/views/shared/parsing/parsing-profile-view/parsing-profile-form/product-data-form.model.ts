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
        ...values,
        driverSessionData: {},
        port: Number(values.port),
      }

      await ParserModel.createProfile(data)

      this.onToggleLoading(false)

      toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
    }
  }

  async onEditProfile(id: string, values: FieldType) {
    try {
      this.onToggleLoading(true)

      const data = {
        name: values.name,
        spreadsheetsIdMain: values.spreadsheetsIdMain,
        spreadsheetsIdPerformance: values.spreadsheetsIdPerformance,
        spreadsheetsIdImport: values.spreadsheetsIdImport,
        otp: values.otp,
        isActive: this.profile?.isActive,
        shopId: this.profile?.shop?._id || null,
        clientId: this.profile?.client?._id || null,
      }
      await ParserModel.editProfile(id, data)

      this.onToggleLoading(false)

      toast.success(t(TranslationKey['Data saved successfully']))
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
    }
  }

  onToggleParsingData() {
    if (this.profile) {
      this.profile.isActive = !this.profile.isActive
    }
  }
}
