/* eslint-disable @typescript-eslint/no-empty-function */
import { makeObservable } from 'mobx'

import { IListOfModals } from '@typings/shared/data-grid'

import { IConfirmModalSettings } from './model-with-modals-interface'
import { observerConfig } from './observer-config'

export class ModalsModel {
  confirmModalSettings: IConfirmModalSettings = {
    isWarning: false,
    title: '',
    message: '',
    onSubmit: () => {},
    onCancel: () => {},
  }

  constructor() {
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
