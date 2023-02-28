/* eslint-disable no-unused-vars */
import {makeAutoObservable, runInAction} from 'mobx'

import {TranslationKey} from '@constants/translations/translation-key'

import {RequestModel} from '@models/request-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class CreateOrEditServicesViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  acceptMessage = null
  showAcceptMessage = false

  drawerOpen = false

  requestToEdit = undefined

  uploadedFiles = []

  readyImages = []
  progressValue = 0
  showProgress = false

  constructor({history, location}) {
    runInAction(() => {
      this.history = history

      if (location.state) {
        this.requestToEdit = location.state.request
      }
    })

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }
}
