/* eslint-disable no-unused-vars */
import {th} from 'date-fns/locale'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {ClientModel} from '@models/client-model'
import {RequestProposalModel} from '@models/request-proposal'
import {SettingsModel} from '@models/settings-model'
import {ShopModel} from '@models/shop-model'

import {sourceFilesColumns} from '@views/freelancer/source-files-columns/source-files-columns'

import {addIdDataConverter, SourceFilesDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class SourceFilesViewModel {
  history = undefined
  error = undefined

  drawerOpen = false

  sortMode = tableSortMode.DESK

  currentData = []

  sourceFiles = []

  showWarningModal = false
  showConfirmModal = false

  selectionModel = []

  activeSubCategory = 0

  requestStatus = undefined

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  firstRowId = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = sourceFilesColumns(this.rowHandlers, this.languageTag)
  openModal = null
  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  get languageTag() {
    return SettingsModel.languageTag || {}
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
    // runInAction(() => {
    //   this.columnsModel = sourceFilesColumns(this.handlers, this.languageTag)
    // })
  }

  getCurrentData() {
    return toJS(this.sourceFiles)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getSourseFiles()

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

  async getSourseFiles() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await RequestProposalModel.getSourseFiles()

      runInAction(() => {
        this.sourceFiles = SourceFilesDataConverter(result)
      })
      console.log('this.sourceFiles', this.sourceFiles)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
