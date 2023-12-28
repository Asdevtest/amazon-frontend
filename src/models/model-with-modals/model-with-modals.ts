/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-empty-function */
import { action, computed, makeObservable, observable } from 'mobx'

import { IListOfModals } from '@typings/data-grid'

import { DefaultModel } from '../default-model'

import { IConfirmModalSettings, IWarningInfoModalSettings } from './model-with-modals-interface'

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

  constructor(history?: History) {
    super(history)

    makeObservable(this, {
      _confirmModalSettings: observable,
      _warningInfoModalSettings: observable,

      confirmModalSettings: computed,
      warningInfoModalSettings: computed,

      onTriggerOpenModal: action.bound,
    })
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
