import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestProposalModel } from '@models/request-proposal'

import { sourceFilesColumns } from '@components/table/table-columns/freelancer/source-files-columns/source-files-columns'

import { SourceFilesDataConverter } from '@utils/data-grid-data-converters'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

export class SourceFilesViewModel {
  history = undefined

  nameSearchValue = ''

  get currentData() {
    if (this.nameSearchValue) {
      return this.sourceFiles.filter(
        el =>
          el?.title?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el?.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return this.sourceFiles
    }
  }

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

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = sourceFilesColumns(this.rowHandlers, this.editField)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

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
      () => this.editField,
      () => (this.columnsModel = sourceFilesColumns(this.rowHandlers, this.editField)), // to update this.editField for sourceFilesColumns
    )
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onChangePaginationModelChange(model) {
    this.paginationModel = model
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }

  loadData() {
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
    this.requestStatus = requestStatus
  }

  onClickEditBtn(row) {
    this.editField = row
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

  onClickRemoveBtn(row) {
    this.confirmModalSettings = {
      isWarning: false,
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

    this.editField = newFormFields
  }

  async getSourceFiles() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await RequestProposalModel.getFreelanceSourceFiles()

      runInAction(() => {
        this.sourceFiles = SourceFilesDataConverter(result)
        this.rowCount = this.sourceFiles.length
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
