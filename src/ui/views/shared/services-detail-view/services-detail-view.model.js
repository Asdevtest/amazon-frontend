/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {ChatModel} from '@models/chat-model'
import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

import {toFixed} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class ServiceDetailsViewModel {
  history = undefined
  error = undefined
  uploadedFiles = []
  drawerOpen = false

  announcementData = null

  rowCount = 0

  get user() {
    return UserModel.userInfo
  }

  constructor({history, location}) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        runInAction(() => {
          this.announcementData = location.state.data
        })
      }
    })
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      ;() => {}
    } catch (error) {
      console.log(error)
    }
  }

  onClickEditBtn() {
    this.history.push(`/freelancer/freelance/my-services/service-detailds/edit-service`, {
      request: this.announcementData,
    })
  }

  onClickBackBtn() {
    this.history.push(`/freelancer/freelance/my-services`)
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }
}
