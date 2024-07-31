import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ParserModel } from '@models/parser-model'

import { t } from '@utils/translations'

import { IParsingProfile } from '@typings/models/parser/parsing-profile'

import { FieldType } from './product-data-form.type'

export class ParsingProfileFormModel {
  loading = false

  constructor(profile?: IParsingProfile) {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onCreateProfile(values: FieldType) {
    try {
      this.onToggleLoading(true)

      const data = {
        name: values.name,
        spreadsheetsIdMain: values.spreadsheetsIdMain,
        spreadsheetsIdPerformance: values.spreadsheetsIdPerformance,
        spreadsheetsIdImport: values.spreadsheetsIdImport,
        otp: values.otp,
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
}
