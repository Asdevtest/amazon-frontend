import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {UserModel} from '@models/user-model'

export class ResearcherSettingsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  formFields = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getUserInfo()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
