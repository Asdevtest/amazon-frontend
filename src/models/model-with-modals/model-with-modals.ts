/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-empty-function */
import { IListOfModals } from '@typings/data-grid'

import { DefaultModel } from '../default-model'

import { IConfirmModalSettings, IWarningInfoModalSettings } from './model-with-modals-interface'

export class ModalsModel extends DefaultModel {
  private _confirmModalSettings: IConfirmModalSettings | undefined = undefined
  private _warningInfoModalSettings: IWarningInfoModalSettings | undefined = undefined

  get confirmModalSettings() {
    if (!this._confirmModalSettings) {
      this._confirmModalSettings = {
        isWarning: false,
        title: '',
        message: '',
        onSubmit: () => {},
        onCancel: () => {},
      }
    }
    return this._confirmModalSettings
  }
  set confirmModalSettings(confirmModalSettings: IConfirmModalSettings) {
    this._confirmModalSettings = confirmModalSettings
  }

  get warningInfoModalSettings() {
    if (!this._warningInfoModalSettings) {
      this._warningInfoModalSettings = {
        isWarning: false,
        title: '',
      }
    }
    return this._warningInfoModalSettings
  }
  set warningInfoModalSettings(warningInfoModalSettings: IWarningInfoModalSettings) {
    this._warningInfoModalSettings = warningInfoModalSettings
  }

  constructor(history?: History, listOfModals?: IListOfModals) {
    super(history)

    if (listOfModals) {
      Object.assign(this, listOfModals)
    }
  }

  onTriggerOpenModal(modalName: keyof ModalsModel, value: boolean) {
    if (value) {
      // @ts-ignore
      this[modalName] = value
    } else {
      // @ts-ignore
      this[modalName] = !this[modalName]
    }
  }
}
