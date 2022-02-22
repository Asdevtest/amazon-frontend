import {makeAutoObservable} from 'mobx'

import {UserModel} from '@models/user-model'

export class ProductWrapperModel {
  requestStatus = undefined
  error = undefined

  get role() {
    return UserModel.userInfo?.role
  }

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
  }
}
