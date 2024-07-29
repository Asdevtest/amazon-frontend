import { makeAutoObservable } from 'mobx'

import { ParserModel } from '@models/parser-model'

import { FieldType } from './product-data-form.type'

export class ParsingProfileFormModel {
  constructor({ isEdit }: { isEdit?: boolean }) {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onCreateProfile(values: FieldType) {
    try {
      await ParserModel.createProfile(values)
    } catch (error) {
      console.error(error)
    }
  }
}
