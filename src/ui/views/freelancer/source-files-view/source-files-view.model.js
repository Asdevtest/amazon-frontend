import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { tableSortMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestProposalModel } from '@models/request-proposal'

import { sourceFilesColumns } from '@components/table/table-columns/freelancer/source-files-columns/source-files-columns'

import { SourceFilesDataConverter } from '@utils/data-grid-data-converters'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

export class SourceFilesViewModel {
  history = undefined
  error = undefined

  nameSearchValue = ''

  sortMode = tableSortMode.DESK

  currentData = []

  sourceFiles = []

  showWarningModal = false
  showConfirmModal = false

  rowSelectionModel = []

  activeSubCategory = 0

  requestStatus = undefined

  editField = undefined

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
    onClickSaveBtn: row => this.onClickSaveBtn(row),
    onChangeText: fileName => value => this.onChangeText(fileName)(value),
  }

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = sourceFilesColumns(this.rowHandlers, () => this.editField)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  openModal = null

  confirmModalSettings = {
    isWarning: false,
    title: '',
    message: '',
    onClickSuccess: () => {},
  }

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.sourceFiles,
      () => {
        runInAction(() => {
          this.currentData = this.getCurrentData()
        })
      },
    )

    reaction(
      () => this.nameSearchValue,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.sourceFiles).filter(
        el =>
          el?.title?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el?.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return toJS(this.sourceFiles)
    }
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.rowSelectionModel = model
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getSourceFiles()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onTriggerSortMode() {
    runInAction(() => {
      if (this.sortMode === tableSortMode.DESK) {
        this.sortMode = tableSortMode.ASC
      } else {
        this.sortMode = tableSortMode.DESK
      }
    })
  }

  onClickEditBtn(row) {
    runInAction(() => {
      this.editField = row
    })
  }

  async onClickSaveBtn(row) {
    try {
      const saveData = getObjectFilteredByKeyArrayWhiteList(this.editField, ['sourceFile', 'comments'])

      await RequestProposalModel.patchFreelanceSourceFilesByGuid(row._id, saveData)

      runInAction(() => {
        this.editField = undefined
      })

      this.getSourceFiles()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickRemoveBtn(row) {
    this.confirmModalSettings = {
      isWarning: true,
      title: t(TranslationKey.Attention),
      message: t(TranslationKey['Do you want to delete the source file?']),
      onClickSuccess: () => this.removeSourceData(row),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeSourceData(row) {
    try {
      if (row.originalData._id) {
        await RequestProposalModel.deleteFreelanceSourceFilesByGuid(row.originalData._id)

        runInAction(() => {
          this.editField = undefined
        })

        this.getSourceFiles()
      }

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onChangeText = fieldName => value => {
    const newFormFields = { ...this.editField }

    newFormFields[fieldName] = value

    runInAction(() => {
      this.editField = newFormFields
    })
  }

  async getSourceFiles() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await RequestProposalModel.getFreelanceSourceFiles()

      runInAction(() => {
        this.sourceFiles = SourceFilesDataConverter(result)
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
