import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BoxStatus} from '@constants/box-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientBoxesReadyToBatchViewColumns} from '@components/table-columns/client/client-boxes-ready-to-batch-columns'

import {clientWarehouseDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class ClientReadyBoxesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''
  boxesMy = []
  curBox = undefined

  drawerOpen = false
  selectedBoxes = []
  currentStorekeeper = undefined
  storekeepersData = []

  showBoxViewModal = false
  showConfirmModal = false
  showWarningInfoModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientBoxesReadyToBatchViewColumns()

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
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

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_BOXES_READY_TO_BATCH)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_BOXES_READY_TO_BATCH]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientBoxesReadyToBatchViewColumns().map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onSelectionModel(model) {
    this.selectedBoxes = model
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }

  // getCurrentData() {
  //   return toJS(this.boxesMy)
  // }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.boxesMy).filter(
        el =>
          el.originalData.items.some(item =>
            item.product?.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ) ||
          el.originalData.items.some(item =>
            item.product?.skusByClient[0]?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ) ||
          el.originalData.items.some(item =>
            item.product?.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ),
      )
    } else {
      return toJS(this.boxesMy)
    }
  }

  onClickStorekeeperBtn(storekeeper) {
    this.selectedBoxes = []

    this.currentStorekeeper = storekeeper ? storekeeper : undefined

    this.getBoxesMy()
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.REQUESTED_SEND_TO_BATCH)

      this.storekeepersData = result
        .filter(storekeeper => storekeeper.boxesCount !== 0)
        .sort((a, b) => a.name.localeCompare(b.name))
      // console.log('this.storekeepersData', this.storekeepersData)
      this.onClickStorekeeperBtn(this.storekeepersData[0])
    } catch (error) {
      console.log(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getStorekeepers()

      this.getBoxesMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      await ClientModel.updateBoxComment(data._id, {clientComment: data.clientComment})

      this.loadData()

      this.onTriggerOpenModal('showBoxViewModal')
      this.warningInfoModalSettings = {
        isWarning: false,
        title: t(TranslationKey['Data saved successfully']),
      }

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e
  }

  async setCurrentOpenedBox(row) {
    try {
      this.curBox = row
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async returnBoxesToStock() {
    try {
      await ClientModel.returnBoxFromBatch(this.selectedBoxes.map(boxId => ({boxId})))
      this.selectedBoxes = []

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      this.error = error

      this.onTriggerOpenModal('showConfirmModal')

      this.warningInfoModalSettings = {
        isWarning: true,
        title: t(TranslationKey.Error),
      }

      this.onTriggerOpenModal('showWarningInfoModal')
    }
  }

  async getBoxesMy() {
    try {
      const result = await BoxesModel.getBoxesForCurClient(
        BoxStatus.REQUESTED_SEND_TO_BATCH,
        this.currentStorekeeper && this.currentStorekeeper._id,
      )

      const volumeWeightCoefficient = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.boxesMy = clientWarehouseDataConverter(result, volumeWeightCoefficient).sort(
          sortObjectsArrayByFiledDateWithParseISO('createdAt'),
        )
      })
    } catch (error) {
      console.log(error)
      this.error = error

      this.boxesMy = []
    }
  }
}
