import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { tabFreelanceColumns } from './tab-freelance.column'

export class AdminSettingsFreelanceModel {
  // uncomment everything if you need delete specs functionality
  requestStatus = undefined

  showAddOrEditTextModal = false
  showConfirmModal = false
  confirmModalSettings = {
    isWarning: true,
    message: '',
    onClickSuccess: () => {},
  }

  editedSpecTitle = ''
  specs = []

  rowSelectionModel = []
  rowHandlers = {
    onEditSpec: row => this.onEditSpec(row),
    onMoveSpecToArchive: row => this.onMoveSpecToArchive(row),
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

      const response = await UserModel.getSpecs() // there is a request body(archive?:boolean)

      runInAction(() => {
        this.specs = response.map(spec => ({ ...spec, isEditSpec: false })).toSorted((a, b) => a.archive - b.archive)
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

      toast.success(t(TranslationKey['Specialty successfully created.']))
    } catch (error) {
      console.log(error)

      toast.error(t(TranslationKey['Specialty not created, something went wrong ...']))
    }
  }

  async onEditSpec({ _id, title, isEditSpec, archive }) {
    try {
      if (isEditSpec) {
        await AdministratorModel.editSpec(_id, this.editedSpecTitle || title, archive)
        this.getSpecs()

        toast.success(t(TranslationKey['Specialty successfully changed.']))
      } else {
        this.onChangeSpecById(_id)
      }
    } catch (error) {
      console.log(error)

      toast.error(t(TranslationKey['Specialty not changed, something went wrong ...']))
    }
  }

  onMoveSpecToArchive(row) {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['Are you sure you want to move this specialty to the archives?']),
      onClickSuccess: () => {
        this.onEditSpec(row)
        this.onClickToggleConfirmModal()
      },
    }

    this.onClickToggleConfirmModal()
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

  onClickToggleConfirmModal() {
    this.showConfirmModal = !this.showConfirmModal
  }
}
