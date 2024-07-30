import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ParserModel } from '@models/parser-model'

import { t } from '@utils/translations'

import { FieldType } from './product-data-form.type'

export class ParsingProfileFormModel {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onCreateProfile(values: FieldType) {
    try {
      await ParserModel.createProfile(values)

      toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
    }
  }

  async onEditProfile(id: string, values: FieldType) {
    try {
      const data = {
        name: values.name,
        spreadsheetsIdMain: values.spreadsheetsIdMain,
        spreadsheetsIdPerformance: values.spreadsheetsIdPerformance,
        spreadsheetsIdImport: values.spreadsheetsIdImport,
        otp: values.otp,
      }
      await ParserModel.editProfile(id, data)

      toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
    }
  }
}
