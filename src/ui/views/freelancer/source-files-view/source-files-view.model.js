/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {RequestProposalModel} from '@models/request-proposal'
import {SettingsModel} from '@models/settings-model'

import {sourceFilesColumns} from '@views/freelancer/source-files-columns/source-files-columns'

import {SourceFilesDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class SourceFilesViewModel {
  history = undefined
  error = undefined

  drawerOpen = false

  nameSearchValue = ''

  sortMode = tableSortMode.DESK

  currentData = []

  sourceFiles = []

  showWarningModal = false
  showConfirmModal = false

  selectionModel = []

  activeSubCategory = 0

  requestStatus = undefined

  editField = undefined

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
    onClickSaveBtn: row => this.onClickSaveBtn(row),
    onChangeText: fileName => value => this.onChangeText(fileName)(value),
  }

  firstRowId = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = sourceFilesColumns(this.rowHandlers, this.languageTag, this.editField)
  openModal = null

  confirmModalSettings = {
    isWarning: false,
    title: '',
    message: '',
    onClickSuccess: () => {},
  }

  get languageTag() {
    return SettingsModel.languageTag
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.sourceFiles,
      () => {
        runInAction(() => {
          this.currentData = this.getCurrentData()
        })
      },
    )

    reaction(
      () => this.currentData,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.nameSearchValue,
      () => {
        this.currentData = this.getCurrentData()
      },
    )

    reaction(
      () => this.editField,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  getDataGridState() {
    runInAction(() => {
      this.columnsModel = sourceFilesColumns(this.rowHandlers, this.languageTag, this.editField)
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
      this.selectionModel = model
    })
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
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

      if (this.editField._id === row.originalData._id) {
        await RequestProposalModel.patchFreelanceSourceFilesByGuid(this.editField._id, saveData)

        runInAction(() => {
          this.editField = undefined
        })

        this.getSourceFiles()
      }
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
    const newFormFields = {...this.editField}
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
