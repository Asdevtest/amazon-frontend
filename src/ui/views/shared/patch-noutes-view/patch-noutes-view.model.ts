import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { GridPaginationModel } from '@mui/x-data-grid-premium'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IPatchNote, IPatchNotes } from '@typings/shared/patch-notes'

import { moderatorUpdatedColumns } from './patch-noutes-view.columns'
import { IPatchNoteToCreate, ModalNames } from './patch-noutes-view.type'

export class PatchNoutesViewModel {
  patchNotes: IPatchNote[] = []
  patchNoteVersions: string[] = []
  editPatchNote?: IPatchNote = undefined
  selectedPatchNoteId?: string = undefined

  showPatchNoteModal = false
  showConfirmModal = false

  rowCount = 0
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  columnsProps = {
    onToggleEditPatchNote: (row: IPatchNote) => this.onToggleEditPatchNote(row),
    onClickRemovePatchNote: (id: string) => this.onClickRemovePatchNote(id),
  }
  columnsModel = moderatorUpdatedColumns(this.columnsProps)

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

  async getPatchNoteVersions() {
    try {
      const response = await AdministratorModel.getPatchNoteVersions()

      runInAction(() => {
        this.patchNoteVersions = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async createPatchNotes(data: IPatchNoteToCreate[]) {
    try {
      const dataToSend = data.map(patchNote => ({ ...patchNote, role: Number(patchNote.role) }))

      for (const patchNote of dataToSend) {
        await AdministratorModel.createPatchNote(patchNote)
      }

      toast.success(t(TranslationKey['Patch notes added successfully']))

      this.loadData()
    } catch (error) {
      console.error(error)
      toast.error(t(TranslationKey['No patch notes added']))
    } finally {
      this.onToggleModal(ModalNames.PATCH)
    }
  }

  async updatePatchNote(id: string, data: IPatchNoteToCreate) {
    try {
      const { title, version, description, role } = data
      const dataToSend = { title, version, description, role: Number(role) }

      await AdministratorModel.updatePatchNote(id, dataToSend)

      toast.success(t(TranslationKey['Patch notes successfully modified']))

      this.loadData()
    } catch (error) {
      console.error(error)
      toast.error(t(TranslationKey['Patch notes not changed']))
    } finally {
      this.onToggleModal(ModalNames.PATCH)
    }
  }

  onClickRemovePatchNote(id: string) {
    this.selectedPatchNoteId = id
    this.onToggleModal(ModalNames.CONFIRM)
  }

  async onRemovePatchNote() {
    try {
      await AdministratorModel.removePatchNote(this.selectedPatchNoteId)

      this.loadData()
    } catch (error) {
      console.error(error)
    } finally {
      this.onToggleModal(ModalNames.CONFIRM)
    }
  }

  async onOpenPatchNoteForm() {
    await this.getPatchNoteVersions()

    this.onToggleModal(ModalNames.PATCH)
  }

  onToggleEditPatchNote(data: IPatchNote) {
    this.editPatchNote = data
    this.onOpenPatchNoteForm()
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
