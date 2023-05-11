import {makeAutoObservable, runInAction} from 'mobx'

import {UserRoleCodeMapForRoutes} from '@constants/keys/user-roles'

import {UserModel} from '@models/user-model'

export class ModeratorAppealsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false
  showConfirmModal = false

  get user() {
    return UserModel.userInfo
  }

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickViewMore() {
    this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/appeals/appeal`)
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  // setActionStatus(actionStatus) {
  //   this.actionStatus = actionStatus
  // }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
