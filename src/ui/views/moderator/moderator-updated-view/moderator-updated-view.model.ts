import { makeAutoObservable, runInAction } from 'mobx'

import { GridPaginationModel } from '@mui/x-data-grid-premium'

import { UserModel } from '@models/user-model'

import { loadingStatus } from '@typings/enums/loading-status'
import { IPatchNote, IPatchNotes } from '@typings/shared/patch-notes'

import { moderatorUpdatedColumns } from './moderator-updated-view.columns'
import { ModalNames } from './moderator-updated-view.type'

export class ModeratorUpdatedViewModel {
  patchNotes: IPatchNote[] = []

  showPatchNoteModal = false

  rowCount = 0
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  columnsModel = moderatorUpdatedColumns()

  constructor() {
    this.getPatchNotes()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getPatchNotes() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const { count, rows } = (await UserModel.getPatchNotes()) as IPatchNotes

      runInAction(() => {
        this.rowCount = count
        this.patchNotes = rows
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  setRequestStatus(requestStatus: loadingStatus) {
    this.requestStatus = requestStatus
  }

  onPaginationModelChange(model: GridPaginationModel) {
    this.paginationModel = model
  }

  onToggleModal(modalName: ModalNames) {
    this[modalName] = !this[modalName]
  }
}
