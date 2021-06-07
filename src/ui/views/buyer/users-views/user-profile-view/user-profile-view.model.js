import {makeAutoObservable} from 'mobx'

import {UserModel} from '@models/user-model'

export class UserProfileViewModel {
  history = undefined
  requestStatus = undefined

  userDataMy = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getUserDataMy() {
    console.log(UserModel.userInfo)
    const result = await UserModel.getUserInfo()
    this.userDataMy = result
  }
}
