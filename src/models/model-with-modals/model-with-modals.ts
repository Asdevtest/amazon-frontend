/* eslint-disable @typescript-eslint/no-empty-function */
import { makeObservable } from 'mobx'

import { IListOfModals } from '@typings/shared/data-grid'

import { DefaultModel } from '../default-model'

import { IConfirmModalSettings, IWarningInfoModalSettings } from './model-with-modals-interface'
import { observerConfig } from './observer-config'

export class ModalsModel extends DefaultModel {
  confirmModalSettings: IConfirmModalSettings = {
    isWarning: false,
    title: '',
    message: '',
    onSubmit: () => {},
    onCancel: () => {},
  }
  warningInfoModalSettings: IWarningInfoModalSettings = {
    isWarning: false,
    title: '',
    buttonText: '',
    onSubmit: () => {},
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
