import {action, makeAutoObservable, runInAction} from 'mobx'

import {UserModel} from '@models/user-model'

export class SupervisorSettingsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  formFields = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async getUserInfo() {
    const userInfo = await UserModel.getUserInfo()
    runInAction(() => {
      this.formFields = {...userInfo}
    })
  }

  async onClickSaveUserInfo() {}

  onClickCancelEditing() {
    this.formFields = {...UserModel.userInfo}
  }

  onChangeFormFields = fieldName =>
    action(e => {
      this.formFields[fieldName] = e.target.value
    })

  onTriggerDrawerOpen = () => {
    this.drawerOpen = !this.drawerOpen
  }
}
