import { makeAutoObservable, runInAction } from 'mobx'

import { RequestProposalModel } from '@models/request-proposal'

import { sourceFilesColumns } from '@components/table/table-columns/freelancer/source-files-columns/source-files-columns'

import { loadingStatus } from '@typings/enums/loading-status'

export class SourceFilesViewModel {
  nameSearchValue = ''

  get currentData() {
    if (this.nameSearchValue) {
      return this.sourceFiles.filter(
        el =>
          el?.title?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el?.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          String(el?.xid)?.includes(this.nameSearchValue),
      )
    } else {
      return this.sourceFiles
    }
  }

  sourceFiles = []
  rowSelectionModel = []
  requestStatus = undefined

  rowHandlers = {
    onClickRemoveBtn: id => this.removeSourceData(id),
    onClickSaveBtn: (id, field, text) => this.onClickSaveBtn(id, field, text),
  }

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = sourceFilesColumns(this.rowHandlers)
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  constructor() {
    this.getSourceFiles()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onPaginationModelChange(model) {
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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async onClickSaveBtn(id, field, text) {
    try {
      await RequestProposalModel.patchFreelanceSourceFilesByGuid(id, { [field]: text })

      this.getSourceFiles()
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async removeSourceData(id) {
    try {
      await RequestProposalModel.deleteFreelanceSourceFilesByGuid(id)

      this.getSourceFiles()
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getSourceFiles() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await RequestProposalModel.getFreelanceSourceFiles()

      runInAction(() => {
        this.sourceFiles = result
        this.rowCount = this.sourceFiles.length
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  onChangeNameSearchValue(value) {
    this.nameSearchValue = value
  }
}
