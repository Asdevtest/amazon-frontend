import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { GridPaginationModel } from '@mui/x-data-grid-premium'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { loadingStatus } from '@typings/enums/loading-status'
import { IPatchNote, IPatchNotes } from '@typings/shared/patch-notes'

import { moderatorUpdatedColumns } from './patch-noutes-view.columns'
import { IPatchNoteToCreate, ModalNames } from './patch-noutes-view.type'

export class PatchNoutesViewModel {
  patchNotes: IPatchNote[] = []
  editPatchNote?: IPatchNote = undefined

  showPatchNoteModal = false

  rowCount = 0
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  rowHandlers = {
    onToggleEditPatchNote: (row: IPatchNote) => this.onToggleEditPatchNote(row),
  }
  columnsModel = moderatorUpdatedColumns(this.rowHandlers)

  get currentData() {
    return this.patchNotes
  }

  constructor() {
    this.loadData()

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.showPatchNoteModal,
      () => {
        if (!this.showPatchNoteModal) {
          this.editPatchNote = undefined
        }
      },
    )
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getPatchNotes()
    } catch (error) {
      console.error()
    }
  }

  async getPatchNotes() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const { count, rows } = (await UserModel.getPatchNotes({
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: 'updatedAt',
        sortType: 'DESC',
      })) as IPatchNotes

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

  async createPatchNotes(data: IPatchNoteToCreate[]) {
    try {
      const dataToSend = data.map(patchNote => ({ ...patchNote, role: Number(patchNote.role) }))

      dataToSend.forEach(async patchNote => {
        await AdministratorModel.createPatchNote(patchNote)
      })

      this.onToggleModal(ModalNames.PATCH)
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async updatePatchNote(id: string, data: IPatchNoteToCreate) {
    try {
      const { title, description, role } = data
      const dataToSend = { title, description, role: Number(role) }

      await AdministratorModel.updatePatchNote(id, dataToSend)

      this.onToggleModal(ModalNames.PATCH)
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onToggleEditPatchNote(data: IPatchNote) {
    this.editPatchNote = data
    this.onToggleModal(ModalNames.PATCH)
  }

  setRequestStatus(requestStatus: loadingStatus) {
    this.requestStatus = requestStatus
  }

  onPaginationModelChange(model: GridPaginationModel) {
    this.paginationModel = model
    this.setDataGridState()
    this.loadData()
  }

  getDataGridState() {
    // @ts-ignore
    const state = SettingsModel.dataGridState[DataGridTablesKeys.UPDATED_PATH_NOUTES]

    if (state) {
      this.paginationModel = state.paginationModel
    }
  }

  setDataGridState() {
    const requestState = {
      paginationModel: this.paginationModel,
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.UPDATED_PATH_NOUTES)
  }

  onToggleModal(modalName: ModalNames) {
    this[modalName] = !this[modalName]
  }
}
