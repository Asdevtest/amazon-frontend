import {makeAutoObservable} from 'mobx'

import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

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
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickViewMore() {
    this.history.push(`/${UserRoleCodeMapForRoutes[this.user.role]}/appeals/appeal`)
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  // setActionStatus(actionStatus) {
  //   this.actionStatus = actionStatus
  // }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
