import { makeObservable } from 'mobx'

import { DefaultModel } from '@models/default-model'

import { observerConfig } from './observer.config'

export class AddSupplierProductModalModel extends DefaultModel {
  constructor() {
    super({
      getMainDataMethod: () => {},
    })
    makeObservable(this, observerConfig)
  }
}
