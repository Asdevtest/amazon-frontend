import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

import { tabFreelanceColumns } from './tab-freelance.column'

export class AdminSettingsFreelanceModel {
  // uncomment everything if you need delete specs functionality
  requestStatus = undefined

  showAddOrEditTextModal = false
  editedSpecTitle = ''
  specs = []

  rowSelectionModel = []
  rowHandlers = {
    onEditSpec: (id, isEditSpec) => this.onEditSpec(id, isEditSpec),
    moveSpecToArchive: (id, specTitle) => this.onMoveSpecToArchive(id, specTitle),
    onChangeSpecTitle: specTitle => this.onChangeSpecTitle(specTitle),
    onClickToggleAddOrEditTextModal: () => this.onClickToggleAddOrEditTextModal(),
  }
  columnsModel = tabFreelanceColumns(this.rowHandlers)

  constructor() {
    this.getSpecs()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onChangeSpecTitle(specTitle) {
    this.editedSpecTitle = specTitle
  }

  onChangeSpecById(id) {
    this.specs = this.specs.map(spec => (spec._id === id ? { ...spec, isEditSpec: !spec.isEditSpec } : spec))
  }

  async getSpecs() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const response = await UserModel.getSpecs()

      runInAction(() => {
        this.specs = response.map(spec => ({ ...spec, isEditSpec: false }))
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)

      runInAction(() => {
        this.specs = []
      })
    }
  }

  async onCreateSpec(specTitle) {
    try {
      await AdministratorModel.createSpec(specTitle)
      this.getSpecs()
    } catch (error) {
      console.log(error)
    }
  }

  async onEditSpec(id, isEditSpec) {
    try {
      if (isEditSpec) {
        await AdministratorModel.editSpec(id, this.editedSpecTitle)
        this.getSpecs()
        this.onChangeSpecById(id)
      } else {
        this.onChangeSpecById(id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async onMoveSpecToArchive(id, specTitle) {
    try {
      await AdministratorModel.editSpec(id, specTitle, true) // third parameter - "archive"
      this.getSpecs()
    } catch (error) {
      console.log(error)
    }
  }

  /* async onRemoveSpecs() {
    try {
      if (this.rowSelectionModel.length) {
        for (const id of this.rowSelectionModel) {
          await AdministratorModel.removeSpec(id)
        }
      }

      this.getSpecs()
    } catch (error) {
      console.log(error)
    }
  } */

  onClickToggleAddOrEditTextModal() {
    this.showAddOrEditTextModal = !this.showAddOrEditTextModal
  }
}
