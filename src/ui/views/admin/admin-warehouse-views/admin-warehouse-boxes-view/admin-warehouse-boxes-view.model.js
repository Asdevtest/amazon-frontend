import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { BoxesModel } from '@models/boxes-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { adminBoxesViewColumns } from '@components/table/table-columns/admin/boxes-columns'

import { adminBoxesDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

export class AdminWarehouseBoxesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''

  boxesData = []
  boxes = []

  currentData = []

  curBox = undefined

  volumeWeightCoefficient = undefined

  showBoxViewModal = false

  selectedBoxes = []

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = adminBoxesViewColumns()

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.boxes,
      () =>
        runInAction(() => {
          this.currentData = toJS(this.boxes)
        }),
    )
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })

    if (this.nameSearchValue) {
      runInAction(() => {
        this.boxes = this.boxesData.filter(box =>
          box.originalData.items.some(
            item =>
              item.product.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
              item.product.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
              item.product.skusByClient[0]?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ),
        )
      })
    } else {
      runInAction(() => {
        this.boxes = this.boxesData
      })
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  onSelectionModel(model) {
    const boxes = this.boxesMy.filter(box => model.includes(box.id))
    const res = boxes.reduce((ac, el) => ac.concat(el._id), [])

    runInAction(() => {
      this.selectedBoxes = res
    })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_BOXES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_BOXES]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()

      await this.getBoxes()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxes()

      runInAction(() => {
        this.boxesData = adminBoxesDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
        this.boxes = adminBoxesDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async setCurrentOpenedBox(row) {
    try {
      const box = await BoxesModel.getBoxById(row._id)
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.curBox = box
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }
}
