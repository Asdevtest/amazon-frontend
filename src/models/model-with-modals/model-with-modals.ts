/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-empty-function */
import { makeObservable } from 'mobx'

import { IListOfModals } from '@typings/shared/data-grid'

import { DefaultModel } from '../default-model'

import { IConfirmModalSettings, IWarningInfoModalSettings } from './model-with-modals-interface'
import { observerConfig } from './observer-config'

export class ModalsModel extends DefaultModel {
  _confirmModalSettings: IConfirmModalSettings | undefined = undefined
  _warningInfoModalSettings: IWarningInfoModalSettings | undefined = undefined

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
        buttonText: '',
        onSubmit: () => {},
      }
    }
    return this._warningInfoModalSettings
  }
  set warningInfoModalSettings(warningInfoModalSettings: IWarningInfoModalSettings) {
    this._warningInfoModalSettings = warningInfoModalSettings
  }

  constructor() {
    super()
    makeObservable(this, observerConfig)
  }

  onTriggerOpenModal(modalName: keyof IListOfModals, value?: boolean) {
    if (value) {
      // @ts-ignore
      this[modalName] = value
    } else {
      // @ts-ignore
      this[modalName] = !this[modalName]
    }
  }
}
