import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BatchStatus } from '@constants/statuses/batch-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { GeneralModel } from '@models/general-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { batchesViewColumns } from '@components/table/table-columns/batches-columns'

import { warehouseBatchesDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

import { filtersFields } from './warehouse-sent-batches-view.constants'

export class WarehouseSentBatchesViewModel {
  requestStatus = undefined

  isArchive = false
  nameSearchValue = ''
  batches = []
  selectedBatches = []
  curBatch = undefined

  showConfirmModal = false
  showBatchInfoModal = false
  uploadedFiles = []
  status = BatchStatus.HAS_DISPATCHED

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  rowHandlers = {
    onClickSaveTrackingNumber: (id, trackingNumber) => this.onClickSaveTrackingNumber(id, trackingNumber),
    onClickSaveArrivalDate: (id, date) => this.onClickSaveArrivalDate(id, date),
  }
  columnsModel = batchesViewColumns(this.rowHandlers, () => this.status)
  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getBatchesPagMy()
      this.getDataGridState()
    },
    filterRequestStatus: undefined,
    ...dataGridFiltersInitializer(filtersFields),
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  get currentData() {
    return this.batches
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.isArchive,
      () => this.loadData(),
    )
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.WAREHOUSE_BATCHES)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.WAREHOUSE_BATCHES)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
    // this.getBatchesPagMy()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getBatchesPagMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getBatchesPagMy()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getBatchesPagMy()
  }

  onSelectionModel(model) {
    this.selectedBatches = model
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getBatchesPagMy()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      await onSubmitPostImages.call(this, { images: data.trackNumberFile, type: 'uploadedFiles' })

      await BoxesModel.editAdditionalInfo(data._id, {
        storekeeperComment: data.storekeeperComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles,
        upsTrackNumber: data.upsTrackNumber,
        prepId: data.prepId,
        // storage: data.storage,
      })

      toast.success(t(TranslationKey['Data saved successfully']))

      await this.loadData()

      this.setCurrentOpenedBatch(this.curBatch?._id, true)
    } catch (error) {
      console.error(error)
    }
  }

  onChangeCurPage(e) {
    this.curPage = e

    this.getBatchesPagMy()
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getBatchesPagMy()
  }

  async getBatchesPagMy() {
    try {
      const result = await BatchesModel.getBatchesWithFiltersPag({
        status: BatchStatus.HAS_DISPATCHED,
        archive: this.isArchive,
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        filters: this.getFilter(),
        storekeeperId: null,
      })

      runInAction(() => {
        this.rowCount = result.count
        this.batches = warehouseBatchesDataConverter(result.rows, result.volumeWeightCoefficient)
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)

      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onClickSaveTrackingNumber(id, trackingNumber) {
    await BatchesModel.changeBatch(id, { trackingNumber })
    this.loadData()
  }

  async onClickSaveArrivalDate(id, date) {
    await BatchesModel.changeBatch(id, { arrivalDate: date })
    this.loadData()
  }

  async setCurrentOpenedBatch(id, notTriggerModal) {
    try {
      const batch = await BatchesModel.getBatchesByGuid(id)

      runInAction(() => {
        this.curBatch = batch
      })

      if (!notTriggerModal) {
        this.onTriggerOpenModal('showBatchInfoModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async patchActualShippingCostBatch(id, cost) {
    await BatchesModel.changeBatch(id, {
      actualShippingCost: cost,
    })

    this.setCurrentOpenedBatch(id, true)
  }

  async onClickConfirmSendToBatchBtn() {
    try {
      const boxesIds = []

      this.batches
        .filter(batch => this.selectedBatches.includes(batch.id))
        .map(batch => batch.originalData)
        .forEach(batch => batch.boxes.forEach(box => boxesIds.push(box._id)))

      await BoxesModel.sendBoxesToBatch(boxesIds)
      runInAction(() => {
        this.selectedBatches = []
      })
      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerArchive() {
    this.isArchive = !this.isArchive
  }

  // * Filtration

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'batches'),
        column,
        `batches/with_filters?filters=${this.getFilter(column)}&status=${BatchStatus.HAS_DISPATCHED}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }

      this.setFilterRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings.filterRequestStatus = requestStatus
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      ...dataGridFiltersInitializer(filtersFields),
    }

    this.getBatchesPagMy()
    this.getDataGridState()
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filtersFields, [
        'amazonTitle',
        'humanFriendlyId',
        'asin',
        'orderHumanFriendlyId',
        'title',
      ]),
    )
  }
}
