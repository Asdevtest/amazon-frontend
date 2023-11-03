import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { operationTypes } from '@constants/keys/operation-types'
import { BoxStatus } from '@constants/statuses/box-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { GeneralModel } from '@models/general-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { clientBoxesViewColumns } from '@components/table/table-columns/client/client-boxes-columns'

import { clientWarehouseDataConverter } from '@utils/data-grid-data-converters'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostFilesInData, onSubmitPostImages } from '@utils/upload-files'

const updateBoxWhiteList = [
  'amount',
  'weighGrossKg',
  'volumeWeightKg',
  'shippingLabel',
  'warehouse',
  'deliveryMethod',
  'lengthCmSupplier',
  'widthCmSupplier',
  'heightCmSupplier',
  'weighGrossKgSupplier',
  'lengthCmWarehouse',
  'widthCmWarehouse',
  'heightCmWarehouse',
  'weighGrossKgWarehouse',
  'isBarCodeAttachedByTheStorekeeper',
  'isShippingLabelAttachedByStorekeeper',
  'isBarCodeAlreadyAttachedByTheSupplier',
  'items',
  'images',
  'destinationId',
  'storekeeperId',
  'logicsTariffId',
  'fbaShipment',
  'referenceId',
  'trackNumberFile',
  'trackNumberText',
  'fbaNumber',
  'prepId',
  'variationTariffId',
]

const filtersFields = [
  'shopIds',
  'humanFriendlyId',
  'id',
  'item',
  'asin',
  'skusByClient',
  'amazonTitle',
  'destination',
  'logicsTariff',
  'createdAt',
  'updatedAt',
  'amount',
  'prepId',
  'status',
  'storekeeper',
  'sub',
]

export class ClientInStockBoxesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  selectedBox = undefined

  boxesMy = []
  baseBoxesMy = []

  nameSearchValue = ''

  unitsOption = unitsOfChangeOptions.EU

  curBox = undefined
  showBoxViewModal = false
  isCurrentTarrifsButton = false

  selectedBoxes = []
  selectedRows = []
  curOpenedTask = {}
  toCancelData = {}
  currentStorekeeperId = undefined
  storekeepersData = []
  destinations = []
  clientDestinations = []
  // isFormed = null

  curDestinationId = undefined
  // curShops = []

  currentData = []

  boxesIdsToTask = []
  shopsData = []

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    // onClickObjectFieldMenuItem: (obj, field) => this.onClickObjectFieldMenuItem(obj, field),
    // onClickNormalFieldMenuItem: (str, field) => this.onClickNormalFieldMenuItem(str, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getBoxesMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    isFormedData: { isFormed: null, onChangeIsFormed: value => this.onChangeIsFormed(value) },

    ...filtersFields.reduce(
      (ac, cur) =>
        (ac = {
          ...ac,
          [cur]: {
            filterData: [],
            currentFilterData: [],
          },
        }),
      {},
    ),
  }

  storekeeperFilterData = []
  storekeeperCurrentFilterData = []

  // productSearchGuid = null

  volumeWeightCoefficient = undefined

  hsCodeData = {}

  showEditHSCodeModal = false
  showMergeBoxModal = false
  showSendOwnProductModal = false
  showEditBoxModal = false
  showConfirmModal = false
  showRedistributeBoxModal = false

  showRequestToSendBatchModal = false

  showEditMultipleBoxesModal = false

  showGroupingBoxesModal = false

  showProgress = false

  showSuccessInfoModal = false

  boxesDeliveryCosts = undefined

  showSetShippingLabelModal = false

  modalEditSuccessMessage = ''

  showSetChipValueModal = false

  showWarningInfoModal = false

  showSelectionStorekeeperAndTariffModal = false

  showEditPriorityData = false

  changeItem = null

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  editPriorityData = {
    taskId: null,
    newPriority: null,
  }

  onHover = null

  rowHandlers = {
    onClickFbaShipment: item => this.onClickFbaShipment(item),
    onDoubleClickFbaShipment: item => this.onDoubleClickFbaShipment(item),
    onDeleteFbaShipment: item => this.onDeleteFbaShipment(item),

    onClickShippingLabel: item => this.onClickShippingLabel(item),
    onDoubleClickShippingLabel: item => this.onDoubleClickShippingLabel(item),
    onDeleteShippingLabel: item => this.onDeleteShippingLabel(item),
    onChangeIsFormedInBox: item => this.onChangeIsFormedInBox(item),

    onClickSetDestinationFavourite: item => SettingsModel.setDestinationsFavouritesItem(item),
    onSelectDestination: (id, boxData) => this.editDestination(id, boxData),
    setShowSelectionStorekeeperAndTariffModal: () => this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal'),
    onClickSetTariff: item => this.setChangeItem(item),

    onClickSavePrepId: (item, value) => this.onClickSavePrepId(item, value),

    onChangeUnitsOption: option => this.onChangeUnitsOption(option),
  }

  setChangeItem(item) {
    this.changeItem = item
  }

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
    onClickCancelBtn: () => {},
  }

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }

  densityModel = 'compact'
  columnsModel = clientBoxesViewColumns(
    this.rowHandlers,
    () => this.storekeepersData,
    () => this.destinations,
    () => SettingsModel.destinationsFavourites,
    () => this.columnMenuSettings,
    () => this.onHover,
    () => this.unitsOption,
  )
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  get isChoosenOnlySendToBatchBoxes() {
    if (!this.selectedBoxes.length) {
      return false
    }

    return this.currentData
      .filter(el => this.selectedBoxes.includes(el._id))
      .every(el => el.status === BoxStatus.REQUESTED_SEND_TO_BATCH)
  }

  get isHaveRequestSendToBatch() {
    if (!this.selectedBoxes.length) {
      return false
    }

    return this.currentData
      .filter(el => this.selectedBoxes.includes(el._id))
      .some(el => el.status === BoxStatus.REQUESTED_SEND_TO_BATCH)
  }

  constructor({ history }) {
    const url = new URL(window.location.href)

    runInAction(() => {
      this.history = history

      this.currentStorekeeperId = url.searchParams.get('storekeeper-id')
      this.nameSearchValue = url.searchParams.get('search-text')
    })

    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.boxesMy,
      () => {
        runInAction(() => {
          this.currentData = this.getCurrentData()
        })
      },
    )

    reaction(
      () => this.currentStorekeeperId,
      () => this.getClientDestinations(),
    )
  }

  async getDestinations() {
    try {
      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations
      })
    } catch (error) {
      console.log(error)
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
      // this.paginationModel = { ...model, page: 0 }
    })

    this.setDataGridState()
    this.getBoxesMy()
  }

  onChangeUnitsOption(option) {
    runInAction(() => {
      this.unitsOption = option
    })
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
    this.getBoxesMy()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_WAREHOUSE_BOXES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_WAREHOUSE_BOXES]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
    this.requestStatus = loadingStatuses.isLoading
    this.getBoxesMy().then(() => {
      this.requestStatus = loadingStatuses.success
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedBoxes = model
    })

    const selectedRows = model.map(id => this.boxesMy.find(row => row.id === id))

    this.selectedRows = selectedRows
  }

  getCurrentData() {
    return toJS(this.boxesMy)
  }

  getCurrentTaskData() {
    return toJS(this.tasksMy)
  }

  onClickStorekeeperBtn(currentStorekeeperId) {
    runInAction(() => {
      this.selectedBoxes = []

      this.currentStorekeeperId = currentStorekeeperId
    })

    this.getBoxesMy()
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK)

      runInAction(() => {
        this.storekeepersData = result

        this.currentStorekeeperId = this.currentStorekeeperId
          ? result.find(storekeeper => storekeeper._id === this.currentStorekeeperId)?._id
          : result
              .filter(storekeeper => storekeeper.boxesCount !== 0)
              .sort((a, b) => a.name?.localeCompare(b.name))?.[0]?._id
      })

      this.getDataGridState()
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitChangeBoxFields(data, inModal) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, { images: data.tmpTrackNumberFile, type: 'uploadedFiles' })
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: [...data.trackNumberFile, ...this.uploadedFiles],

        prepId: data.prepId,
      })

      this.getBoxesMy()

      !inModal && this.onTriggerOpenModal('showBoxViewModal')

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data saved successfully']),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  setSelectedBox(item) {
    runInAction(() => {
      this.selectedBox = item
    })
  }

  onClickShippingLabel(item) {
    this.setSelectedBox(item)

    this.onTriggerOpenModal('showSetShippingLabelModal')
  }

  onClickReturnBoxesToStockBtn() {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: true,
        confirmMessage: t(TranslationKey['Are you sure you want to return the boxes to the warehouse?']),
        onClickConfirm: () => this.returnBoxesToStock(),
        onClickCancelBtn: () => this.onTriggerOpenModal('showConfirmModal'),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async returnBoxesToStock() {
    try {
      await ClientModel.returnBoxFromBatch(this.selectedBoxes.map(boxId => ({ boxId })))
      runInAction(() => {
        this.selectedBoxes = []
      })

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })

      this.onTriggerOpenModal('showConfirmModal')

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey.Error),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    }
  }

  onDoubleClickShippingLabel = item => {
    this.setSelectedBox(item)

    // if (!item.fbaShipment) {
    //   runInAction(() => {
    //     this.warningInfoModalSettings = {
    //       isWarning: true,
    //       title: t(TranslationKey['Before you fill out the Shipping label, you need to fill out the FBA Shipment']),
    //     }
    //   })

    //   this.onTriggerOpenModal('showWarningInfoModal')

    //   this.onTriggerOpenModal('showSetChipValueModal')
    // }

    this.onTriggerOpenModal('showSetShippingLabelModal')
  }

  onChangeIsFormed(value) {
    runInAction(() => {
      // this.isFormed = value

      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        isFormedData: {
          ...this.columnMenuSettings.isFormedData,
          isFormed: value,
        },
      }
    })

    this.getBoxesMy()
  }

  async onChangeIsFormedInBox(box) {
    try {
      await BoxesModel.editIsFormed(box._id, {
        isFormed: !box.isFormed,
      })

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onDeleteShippingLabel(box) {
    try {
      await BoxesModel.editBoxAtClient(box._id, {
        shippingLabel: '',
        isShippingLabelAttachedByStorekeeper: false,
      })

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  checkAndOpenFbaShipmentEdit() {
    if (
      !this.selectedBox.fbaShipment &&
      !this.destinations.find(el => el._id === this.selectedBox.destination?._id)?.storekeeper
    ) {
      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey['Before you fill out the Shipping label, you need to fill out the FBA Shipment']),
        }
      })
      this.onTriggerOpenModal('showWarningInfoModal')
      this.onTriggerOpenModal('showSetChipValueModal')
    }
  }

  async onClickSaveShippingLabel(tmpShippingLabel) {
    runInAction(() => {
      this.uploadedFiles = []
    })

    if (tmpShippingLabel.length) {
      await onSubmitPostImages.call(this, { images: tmpShippingLabel, type: 'uploadedFiles' })
    }

    if (this.selectedBox.shippingLabel === null) {
      await ClientModel.editShippingLabelFirstTime(this.selectedBox._id, { shippingLabel: this.uploadedFiles[0] })

      this.checkAndOpenFbaShipmentEdit()

      this.loadData()
    } else {
      runInAction(() => {
        this.confirmModalSettings = {
          isWarning: false,
          confirmMessage: t(
            TranslationKey['Shipping label has been stamped, a warehouse task will be created for labeling.'],
          ),
          onClickConfirm: () => this.onSaveShippingLabelInTableSubmit(),
          onClickCancelBtn: () => this.onTriggerOpenModal('showConfirmModal'),
        }
      })

      this.onTriggerOpenModal('showConfirmModal')

      this.checkAndOpenFbaShipmentEdit()
    }

    this.onTriggerOpenModal('showSetShippingLabelModal')
  }

  async onSaveShippingLabelInTableSubmit() {
    try {
      const boxData = { ...this.selectedBox, shippingLabel: this.uploadedFiles[0] }

      const sourceData = this.selectedBox

      const newItems = boxData.items.map(el => ({
        ...getObjectFilteredByKeyArrayBlackList(el, ['order', 'product', 'tmpBarCode', 'changeBarCodInInventory']),
        amount: el.amount,
        orderId: el.order._id,
        productId: el.product._id,

        barCode: el.barCode,
        isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier,
        isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper,
      }))

      const requestBox = getObjectFilteredByKeyArrayWhiteList(
        {
          ...boxData,
          isShippingLabelAttachedByStorekeeper:
            sourceData.shippingLabel !== boxData.shippingLabel ? false : boxData.isShippingLabelAttachedByStorekeeper,
          items: newItems,
          shippingLabel: this.uploadedFiles.length ? this.uploadedFiles[0] : boxData.shippingLabel,
          destinationId: boxData.destination?._id,
          logicsTariffId: boxData.logicsTariff?._id,
        },
        updateBoxWhiteList,
      )

      const editBoxesResult = await this.editBox(this.selectedBox._id, requestBox)

      await this.postTask({
        idsData: [editBoxesResult.guid],
        idsBeforeData: [this.selectedBox._id],
        type: TaskOperationType.EDIT,
        clientComment: boxData.clientComment,
      })

      runInAction(() => {
        this.modalEditSuccessMessage = `${t(TranslationKey['Formed a task for storekeeper'])} ${
          this.selectedBox?.storekeeper?.name
        } ${t(TranslationKey['to change the Box'])} № ${this.selectedBox?.humanFriendlyId}`
      })

      this.onTriggerOpenModal('showSuccessInfoModal')
      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickConfirmCreateSplitTasks(id, updatedBoxes, type, isMasterBox, comment, sourceBox, priority, reason) {
    this.onTriggerOpenModal('showConfirmModal')

    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        confirmMessage: `${t(TranslationKey['The task for the warehouse will be formed'])} ${
          sourceBox?.storekeeper?.name
        } ${t(TranslationKey['to redistribute the Box'])} № ${sourceBox?.humanFriendlyId}`,
        onClickConfirm: () =>
          this.onRedistribute(id, updatedBoxes, type, isMasterBox, comment, sourceBox, priority, reason),
        onClickCancelBtn: () => this.onTriggerOpenModal('showConfirmModal'),
      }
    })
  }

  onClickConfirmCreateChangeTasks(id, boxData, sourceData, priority, priorityReason) {
    this.onTriggerOpenModal('showConfirmModal')

    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        confirmMessage:
          !boxData.clientTaskComment &&
          boxData.items.every(item => !item.tmpBarCode.length) &&
          // (boxData.shippingLabel === null || boxData.shippingLabel === sourceData.shippingLabel)
          (sourceData.shippingLabel === null || !boxData.tmpShippingLabel.length)
            ? `${t(TranslationKey['Change the box'])}: № ${boxData?.humanFriendlyId}`
            : `${t(TranslationKey['The task for the warehouse will be formed'])} ${boxData?.storekeeper?.name} ${t(
                TranslationKey['to change the Box'],
              )} № ${boxData?.humanFriendlyId}`,
        onClickConfirm: () => this.onEditBoxSubmit(id, boxData, sourceData, undefined, priority, priorityReason),
        onClickCancelBtn: () => this.onTriggerOpenModal('showConfirmModal'),
      }
    })
  }

  onClickConfirmCreateMergeTasks(boxBody, comment, priority, priorityReason) {
    this.onTriggerOpenModal('showConfirmModal')

    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        confirmMessage: `${t(TranslationKey['The task for the warehouse will be formed'])} ${
          this.storekeepersData.find(el => el._id === boxBody.storekeeperId)?.name
        } ${t(TranslationKey['to merge boxes'])}`,
        onClickConfirm: () => this.onClickMerge(boxBody, comment, priority, priorityReason),
        onClickCancelBtn: () => this.onTriggerOpenModal('showConfirmModal'),
      }
    })
  }

  onClickFbaShipment(item) {
    this.setSelectedBox(item)
    this.onTriggerOpenModal('showSetChipValueModal')
  }

  onDoubleClickFbaShipment = item => {
    this.setSelectedBox(item)
    this.onTriggerOpenModal('showSetChipValueModal')
  }

  async onDeleteFbaShipment(box) {
    try {
      await BoxesModel.editBoxAtClient(box._id, { fbaShipment: '' })

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSaveFbaShipment(fbaShipment) {
    try {
      await BoxesModel.editBoxAtClient(this.selectedBox._id, { fbaShipment })

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data saved successfully']),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')

      this.onTriggerOpenModal('showSetChipValueModal')
      this.loadData()

      runInAction(() => {
        this.selectedBox = { ...this.selectedBox, fbaShipment }
      })
    } catch (err) {
      console.log(err)
    }
  }

  onClickRemoveBoxFromBatch(boxId) {
    runInAction(() => {
      this.selectedBoxes = this.selectedBoxes.filter(el => el !== boxId)
    })
  }

  onChangeFullFieldMenuItem(value, field) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        [field]: {
          ...this.columnMenuSettings[field],
          currentFilterData: value,
        },
      }
    })
  }

  async onClickSavePrepId(itemId, value) {
    try {
      await BoxesModel.editAdditionalInfo(itemId, {
        prepId: value,
      })

      this.getBoxesMy()
    } catch (error) {
      console.log(error)
    }
  }

  onCloseShippingLabelModal() {
    this.showSetShippingLabelModal = false
  }

  onClickDestinationBtn(curDestinationId) {
    runInAction(() => {
      this.curDestinationId = curDestinationId
    })

    this.requestStatus = loadingStatuses.isLoading
    this.getBoxesMy().then(() => {
      this.requestStatus = loadingStatuses.success
    })
  }

  openModalAndClear() {
    this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
    this.changeItem = null
    this.isCurrentTarrifsButton = false
  }

  async getClientDestinations() {
    try {
      if (this.currentStorekeeperId) {
        const clientDestinations = await ClientModel.getClientDestinations({
          status: BoxStatus.IN_STOCK,
          storekeeperId: this.currentStorekeeperId,
        })

        runInAction(() => {
          this.clientDestinations = clientDestinations
        })
      }

      this.getDataGridState()
    } catch (error) {
      console.log(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getStorekeepers()
      this.getDestinations()
      this.getClientDestinations()
      this.getShops()
      this.getBoxesMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onClickSaveHsCode(hsCode) {
    await ProductModel.editProductsHsCods([
      {
        productId: hsCode._id,
        chinaTitle: hsCode.chinaTitle || null,
        hsCode: hsCode.hsCode || null,
        material: hsCode.material || null,
        productUsage: hsCode.productUsage || null,
      },
    ])

    this.onTriggerOpenModal('showEditHSCodeModal')
    this.loadData()

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async onClickHsCode(id) {
    this.hsCodeData = await ProductModel.getProductsHsCodeByGuid(id)

    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  onModalRedistributeBoxAddNewBox(value) {
    runInAction(() => {
      this.modalRedistributeBoxAddNewBox = value
    })
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })

    this.requestStatus = loadingStatuses.isLoading
    this.getBoxesMy().then(() => {
      this.requestStatus = loadingStatuses.success
    })
  }

  async onRedistribute(id, updatedBoxes, type, isMasterBox, comment, sourceBox, priority, reason) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.selectedBoxes = []
      })

      if (this.selectedBoxes.length === updatedBoxes.length && !isMasterBox) {
        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: true,
            title: t(TranslationKey['The box is not split!']),
          }
        })

        this.onTriggerOpenModal('showWarningInfoModal')
      } else {
        const resBoxes = []

        for (let i = 0; i < updatedBoxes.length; i++) {
          runInAction(() => {
            this.uploadedFiles = []
          })

          if (updatedBoxes[i].tmpShippingLabel.length) {
            await onSubmitPostImages.call(this, { images: updatedBoxes[i].tmpShippingLabel, type: 'uploadedFiles' })
          }

          const boxToPush = {
            boxBody: {
              shippingLabel: this.uploadedFiles.length ? this.uploadedFiles[0] : updatedBoxes[i].shippingLabel,
              destinationId: updatedBoxes[i].destinationId,
              logicsTariffId: updatedBoxes[i].logicsTariffId,
              variationTariffId: updatedBoxes[i].variationTariffId,
              fbaShipment: updatedBoxes[i].fbaShipment,
              isBarCodeAlreadyAttachedByTheSupplier: updatedBoxes[i].isBarCodeAlreadyAttachedByTheSupplier,
              isBarCodeAttachedByTheStorekeeper: updatedBoxes[i].isBarCodeAttachedByTheStorekeeper,
            },
            boxItems: [
              ...updatedBoxes[i].items.map(item => ({
                amount: item.amount,
                productId: item.product._id,
                orderId: item.order._id,
              })),
            ],
          }

          resBoxes.push(boxToPush)
        }

        const splitBoxesResult = await this.splitBoxes(id, resBoxes)

        await this.postTask({
          idsData: splitBoxesResult,
          idsBeforeData: [id],
          type,
          clientComment: comment,
          priority,
          reason,
        })
        this.setRequestStatus(loadingStatuses.success)

        if (splitBoxesResult) {
          runInAction(() => {
            this.modalEditSuccessMessage = `${t(TranslationKey['Formed a task for storekeeper'])} ${
              this.storekeepersData.find(el => el._id === sourceBox.storekeeper?._id)?.name
            } ${t(TranslationKey['to redistribute the Box'])} № ${sourceBox.humanFriendlyId}`
          })

          this.onTriggerOpenModal('showSuccessInfoModal')
        } else {
          runInAction(() => {
            this.warningInfoModalSettings = {
              isWarning: true,
              title: t(TranslationKey['The box is not split!']),
            }
          })

          this.onTriggerOpenModal('showWarningInfoModal')
        }
        this.onTriggerOpenModal('showConfirmModal')
        this.onTriggerOpenModal('showRedistributeBoxModal')
        this.onModalRedistributeBoxAddNewBox(null)
      }
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onHoverColumnField(field) {
    this.onHover = field
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  async onClickGroupingBtn() {
    try {
      const firstBox = this.boxesMy.find(box => box._id === this.selectedBoxes[0])

      const boxesWithDifferentStorekeepers = this.selectedBoxes.filter(boxId => {
        const findBox = this.boxesMy.find(box => box._id === boxId)
        return findBox?.storekeeper !== firstBox?.storekeeper
      })

      if (boxesWithDifferentStorekeepers.length) {
        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: false,
            title: t(TranslationKey['Boxes with identical storekeeper must be selected']),
          }
        })

        this.onTriggerOpenModal('showWarningInfoModal')

        return
      }

      const [destinations, result] = await Promise.all([ClientModel.getDestinations(), UserModel.getPlatformSettings()])

      runInAction(() => {
        this.destinations = destinations

        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showGroupingBoxesModal')
    } catch (err) {
      console.log(err)
    }
  }

  async onClickEditBtn() {
    try {
      const firstBox = this.boxesMy.find(box => box._id === this.selectedBoxes[0])

      const boxesWithDifferentStorekeepers = this.selectedBoxes.filter(boxId => {
        const findBox = this.boxesMy.find(box => box._id === boxId)
        return findBox?.storekeeper !== firstBox?.storekeeper
      })

      if (boxesWithDifferentStorekeepers.length) {
        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: false,
            title: t(TranslationKey['Boxes with identical storekeeper must be selected']),
          }
        })

        this.onTriggerOpenModal('showWarningInfoModal')

        return
      }

      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations
      })

      if (this.selectedBoxes.length === 1) {
        const result = await UserModel.getPlatformSettings()

        runInAction(() => {
          this.volumeWeightCoefficient = result.volumeWeightCoefficient
        })

        this.onTriggerOpenModal('showEditBoxModal')
      } else {
        this.onTriggerOpenModal('showEditMultipleBoxesModal')
      }
    } catch (error) {
      console.log(error)
    }
  }

  onRemoveBoxFromSelected(boxId) {
    runInAction(() => {
      this.selectedBoxes = this.selectedBoxes.filter(id => id !== boxId)
    })

    if (this.selectedBoxes.length < 2) {
      this.onTriggerOpenModal('showMergeBoxModal')
    }
  }

  async updateOneBarCodeInInventory(id, data) {
    try {
      await ClientModel.updateProductBarCode(id, { barCode: data })
    } catch (error) {
      console.log(error)
    }
  }

  async updateBarCodesInInventory(dataToBarCodeChange) {
    try {
      for (let i = 0; i < dataToBarCodeChange.length; i++) {
        const item = dataToBarCodeChange[i]

        if (item.changeBarCodInInventory) {
          this.updateOneBarCodeInInventory(item.productId, item.newData[0])
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSubmitEditMultipleBoxes(newBoxes, selectedBoxes) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.onTriggerOpenModal('showEditMultipleBoxesModal')

      const uploadedShippingLabeles = []

      const uploadedBarcodes = []

      runInAction(() => {
        this.boxesIdsToTask = []
      })

      for (let i = 0; i < newBoxes.length; i++) {
        const newBox = { ...newBoxes[i] }
        const sourceBox = selectedBoxes[i]
        const isMultipleEdit = true

        if (newBox.tmpShippingLabel?.length) {
          runInAction(() => {
            this.uploadedFiles = []
          })

          const findUploadedShippingLabel = uploadedShippingLabeles.find(
            el => el.strKey === JSON.stringify(newBox.tmpShippingLabel[0]),
          )

          if (!findUploadedShippingLabel) {
            await onSubmitPostImages.call(this, {
              images: newBox.tmpShippingLabel,
              type: 'uploadedFiles',
              withoutShowProgress: true,
            })

            uploadedShippingLabeles.push({
              strKey: JSON.stringify(newBox.tmpShippingLabel[0]),
              link: this.uploadedFiles[0],
            })
          }

          newBox.shippingLabel = findUploadedShippingLabel ? findUploadedShippingLabel.link : this.uploadedFiles[0]
        }

        const dataToBarCodeChange = newBox.items
          .map(el =>
            el.tmpBarCode?.length
              ? {
                  changeBarCodInInventory: el.changeBarCodInInventory,
                  productId: el.product._id,
                  tmpBarCode: el.tmpBarCode,
                  newData: [],
                }
              : null,
          )
          .filter(el => el !== null)

        if (dataToBarCodeChange?.length) {
          for (let j = 0; j < dataToBarCodeChange.length; j++) {
            const findUploadedBarcode = uploadedBarcodes.find(
              el => el.strKey === JSON.stringify(dataToBarCodeChange[j].tmpBarCode[0]),
            )

            if (!findUploadedBarcode) {
              await onSubmitPostImages.call(this, {
                images: dataToBarCodeChange[j].tmpBarCode,
                type: 'uploadedFiles',
                withoutShowProgress: true,
              })

              uploadedBarcodes.push({
                strKey: JSON.stringify(dataToBarCodeChange[j].tmpBarCode[0]),
                link: this.uploadedFiles[0],
              })
            }

            dataToBarCodeChange[j].newData = findUploadedBarcode ? [findUploadedBarcode.link] : [this.uploadedFiles[0]]
          }
        }

        newBox.items = newBox.items.map(el => {
          const prodInDataToUpdateBarCode = dataToBarCodeChange.find(item => item.productId === el.product._id)
          return {
            ...getObjectFilteredByKeyArrayBlackList(el, [
              'order',
              'product',
              /* 'tmpBarCode',*/ 'changeBarCodInInventory',
            ]),
            amount: el.amount,
            orderId: el.order._id,
            productId: el.product._id,

            barCode: prodInDataToUpdateBarCode?.newData?.length ? prodInDataToUpdateBarCode?.newData[0] : el.barCode,
            isBarCodeAlreadyAttachedByTheSupplier: prodInDataToUpdateBarCode?.newData?.length
              ? false
              : el.isBarCodeAlreadyAttachedByTheSupplier,
            isBarCodeAttachedByTheStorekeeper: prodInDataToUpdateBarCode?.newData?.length
              ? false
              : el.isBarCodeAttachedByTheStorekeeper,
          }
        })

        await this.onEditBoxSubmit(sourceBox._id, newBox, sourceBox, isMultipleEdit)
      }

      runInAction(() => {
        this.modalEditSuccessMessage = this.boxesIdsToTask.length
          ? `${t(TranslationKey['Editing completed'])}, ${t(
              TranslationKey['Tasks were created for the following boxes'],
            )}: ${this.boxesIdsToTask.join(', ')}`
          : t(TranslationKey['Editing completed'])

        this.boxesIdsToTask = []
      })

      this.onTriggerOpenModal('showSuccessInfoModal')

      this.loadData()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async editDestination(id, boxData) {
    try {
      await BoxesModel.editBoxAtClient(id, boxData)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
      })
    }
  }

  async editTariff(id, boxData, isSelectedDestinationNotValid) {
    try {
      if (isSelectedDestinationNotValid) {
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: true,
            title: t(TranslationKey.Attention),
            confirmMessage: t(TranslationKey['Wish to change a destination?']),
            onClickConfirm: async () => {
              await BoxesModel.editBoxAtClient(id, {
                logicsTariffId: boxData.logicsTariffId,
                variationTariffId: boxData.variationTariffId,
                destinationId: boxData.destinationId,
              })
              this.onTriggerOpenModal('showConfirmModal')
              await this.getBoxesMy()
              this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
            },
            onClickCancelBtn: async () => {
              await BoxesModel.editBoxAtClient(id, {
                destinationId: null,
              })
              await BoxesModel.editBoxAtClient(id, {
                logicsTariffId: boxData.logicsTariffId,
                variationTariffId: boxData.variationTariffId,
              })
              this.onTriggerOpenModal('showConfirmModal')
              await this.getBoxesMy()
              this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
            },
          }
        })
        this.onTriggerOpenModal('showConfirmModal')
      } else {
        await BoxesModel.editBoxAtClient(id, {
          logicsTariffId: boxData.logicsTariffId,
          variationTariffId: boxData.variationTariffId,
        })

        await this.getBoxesMy()

        this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
      }
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onEditBoxSubmit(id, boxData, sourceData, isMultipleEdit, priority, priorityReason) {
    try {
      !isMultipleEdit && this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.selectedBoxes = []

        this.uploadedFiles = []
      })

      if (!isMultipleEdit && boxData.tmpShippingLabel?.length) {
        await onSubmitPostImages.call(this, {
          images: boxData.tmpShippingLabel,
          type: 'uploadedFiles',
          withoutShowProgress: true,
        })
      }

      if (
        !boxData.clientTaskComment &&
        boxData.items.every(item => !item.tmpBarCode?.length) &&
        // (sourceData.shippingLabel === null ||
        //   (boxData.shippingLabel === sourceData.shippingLabel && sourceData.shippingLabel !== null))
        (sourceData.shippingLabel === null || !boxData.tmpShippingLabel.length)
      ) {
        await BoxesModel.editBoxAtClient(id, {
          fbaShipment: boxData.fbaShipment,
          destinationId: boxData.destinationId,
          logicsTariffId: boxData.logicsTariffId,
          variationTariffId: boxData.variationTariffId,
          shippingLabel: this.uploadedFiles?.length ? this.uploadedFiles[0] : boxData.shippingLabel,
          isShippingLabelAttachedByStorekeeper:
            boxData.shippingLabel !== sourceData.shippingLabel
              ? false
              : sourceData.isShippingLabelAttachedByStorekeeper,
          clientComment: boxData.clientComment,
          referenceId: boxData.referenceId,
          fbaNumber: boxData.fbaNumber,
          prepId: boxData.prepId,
        })

        runInAction(() => {
          this.modalEditSuccessMessage = `${t(TranslationKey.Box)} № ${sourceData.humanFriendlyId} ${t(
            TranslationKey['has been changed'],
          )}`
        })

        !isMultipleEdit && this.onTriggerOpenModal('showSuccessInfoModal')
      } else {
        let dataToBarCodeChange = boxData.items
          .map(el =>
            el.tmpBarCode?.length
              ? {
                  changeBarCodInInventory: el.changeBarCodInInventory,
                  productId: el.product?._id,
                  tmpBarCode: el.tmpBarCode,
                  newData: [],
                }
              : null,
          )
          .filter(el => el !== null)

        if (!isMultipleEdit && dataToBarCodeChange?.length) {
          dataToBarCodeChange = await onSubmitPostFilesInData({
            dataWithFiles: dataToBarCodeChange,
            nameOfField: 'tmpBarCode',
          })
        }

        const getNewItems = () => {
          const newItems = boxData.items.map(el => {
            const prodInDataToUpdateBarCode = dataToBarCodeChange.find(item => item.productId === el.product._id)
            return {
              ...getObjectFilteredByKeyArrayBlackList(el, [
                'order',
                'product',
                'tmpBarCode',
                'changeBarCodInInventory',
              ]),
              amount: el.amount,
              orderId: el.order._id,
              productId: el.product._id,

              barCode: prodInDataToUpdateBarCode?.newData?.length ? prodInDataToUpdateBarCode?.newData[0] : el.barCode,
              isBarCodeAlreadyAttachedByTheSupplier: prodInDataToUpdateBarCode?.newData?.length
                ? false
                : el.isBarCodeAlreadyAttachedByTheSupplier,
              isBarCodeAttachedByTheStorekeeper: prodInDataToUpdateBarCode?.newData?.length
                ? false
                : el.isBarCodeAttachedByTheStorekeeper,
            }
          })

          return newItems
        }

        const requestBox = getObjectFilteredByKeyArrayWhiteList(
          {
            ...boxData,
            isShippingLabelAttachedByStorekeeper:
              sourceData.shippingLabel !== boxData.shippingLabel ? false : boxData.isShippingLabelAttachedByStorekeeper,
            items: isMultipleEdit
              ? boxData.items.map(el => getObjectFilteredByKeyArrayBlackList(el, ['tmpBarCode']))
              : getNewItems(),
            shippingLabel: this.uploadedFiles?.length ? this.uploadedFiles[0] : boxData.shippingLabel,
          },
          updateBoxWhiteList,
        )

        const editBoxesResult = await this.editBox(id, requestBox)

        await this.updateBarCodesInInventory(dataToBarCodeChange)

        await this.postTask({
          idsData: [editBoxesResult.guid],
          idsBeforeData: [id],
          type: TaskOperationType.EDIT,
          clientComment: boxData.clientTaskComment,
          priority,
          reason: priorityReason,
        })

        runInAction(() => {
          this.modalEditSuccessMessage = `${t(TranslationKey['Formed a task for storekeeper'])} ${
            sourceData.storekeeper?.name
          } ${t(TranslationKey['to change the Box'])} № ${sourceData.humanFriendlyId}`
        })

        !isMultipleEdit
          ? this.onTriggerOpenModal('showSuccessInfoModal')
          : (this.boxesIdsToTask = this.boxesIdsToTask.concat(sourceData.humanFriendlyId))
      }

      !isMultipleEdit && this.loadData()
      !isMultipleEdit && this.onTriggerOpenModal('showEditBoxModal')
      !isMultipleEdit && this.onTriggerOpenModal('showConfirmModal')

      !isMultipleEdit && this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      !isMultipleEdit && this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error
      })

      if (!isMultipleEdit) {
        this.loadData()

        this.onTriggerOpenModal('showEditBoxModal')
      }
      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey['The box is unchanged']),
        }
      })
      this.onTriggerOpenModal('showWarningInfoModal')
    }
  }

  async onClickMerge(boxBody, comment, priority, priorityReason) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const selectedIds = this.selectedBoxes

      runInAction(() => {
        this.uploadedFiles = []
      })

      if (boxBody.tmpShippingLabel.length) {
        await onSubmitPostImages.call(this, { images: boxBody.tmpShippingLabel, type: 'uploadedFiles' })
      }

      const newBoxBody = getObjectFilteredByKeyArrayBlackList(
        { ...boxBody, shippingLabel: this.uploadedFiles.length ? this.uploadedFiles[0] : boxBody.shippingLabel },
        ['tmpShippingLabel', 'storekeeperId', 'humanFriendlyId'],
        undefined,
        undefined,
        true,
      )

      const mergeBoxesResult = await this.mergeBoxes(selectedIds, newBoxBody)

      if (mergeBoxesResult) {
        runInAction(() => {
          this.modalEditSuccessMessage = `${t(TranslationKey['Formed a task for storekeeper'])} ${
            this.storekeepersData.find(el => el._id === boxBody.storekeeperId)?.name
          } ${t(TranslationKey['to merge boxes'])} `
        })
        this.onTriggerOpenModal('showSuccessInfoModal')
      } else {
        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: true,
            title: t(TranslationKey['The boxes are not joined!']),
          }
        })

        this.onTriggerOpenModal('showWarningInfoModal')
      }

      this.onTriggerOpenModal('showMergeBoxModal')
      this.onTriggerOpenModal('showConfirmModal')

      await this.postTask({
        idsData: [mergeBoxesResult.guid],
        idsBeforeData: [...selectedIds],
        type: operationTypes.MERGE,
        clientComment: comment,
        priority,
        reason: priorityReason,
      })

      this.setRequestStatus(loadingStatuses.success)

      await this.getBoxesMy()

      runInAction(() => {
        this.selectedBoxes = []

        this.tmpClientComment = ''
      })
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickSubmitGroupingBoxes({ oldBoxes, newBoxes }) {
    try {
      const createdBoxes = await BoxesModel.regroupBoxes({
        boxIds: oldBoxes.map(el => el._id),
        newAmounts: newBoxes.map(el => Number(el.amount)).filter(num => num >= 1),
      })

      const patchPrepIds = createdBoxes.map((el, index) => ({
        boxId: el,
        prepId: newBoxes[index].prepId || '',
      }))

      await BoxesModel.updatePrepId(patchPrepIds)

      runInAction(() => {
        this.selectedBoxes = []

        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data was successfully saved']),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')

      this.loadData()

      this.onTriggerOpenModal('showGroupingBoxesModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })

      this.onTriggerOpenModal('showGroupingBoxesModal')

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey['Boxes are not regrouped']),
        }
      })
      this.onTriggerOpenModal('showWarningInfoModal')
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

  async postTask({ idsData, idsBeforeData, type, clientComment, priority, reason }) {
    try {
      const res = await ClientModel.createTask({
        taskId: 0,
        boxes: [...idsData],
        boxesBefore: [...idsBeforeData],
        operationType: type,
        clientComment: clientComment || '',
        priority,
        reason,
      })

      runInAction(() => {
        this.editPriorityData = {
          taskId: res.guid,
          newPriority: null,
        }
      })

      // this.onTriggerOpenModal('showEditPriorityData')
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

  async onClickCurrentTariffsBtn() {
    await this.getStorekeepers()
    await ClientModel.getDestinations()

    this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')

    runInAction(() => {
      this.isCurrentTarrifsButton = true
    })
  }

  async editBox(guid, body) {
    try {
      const result = await BoxesModel.editBox(guid, body)

      return result
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async mergeBoxes(ids, boxBody) {
    try {
      const result = await BoxesModel.mergeBoxes(ids, boxBody)

      return result
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async splitBoxes(id, data) {
    try {
      const result = await BoxesModel.splitBoxes(id, data)

      await this.getBoxesMy()
      return result
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async updateBox(id, data) {
    try {
      await BoxesModel.updateBox(id, data)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  setFilterRequestStatus(requestStatus) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        filterRequestStatus: requestStatus,
      }
    })
  }

  onClickResetFilters() {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,

        ...filtersFields.reduce(
          (ac, cur) =>
            (ac = {
              ...ac,
              [cur]: {
                filterData: [],
                currentFilterData: [],
              },
            }),
          {},
        ),
      }
    })

    this.getBoxesMy()
    this.getDataGridState()
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.isLoading)

      const curShops = this.columnMenuSettings.shopIds.currentFilterData?.map(shop => shop._id).join(',')
      const shopFilter = this.columnMenuSettings.shopIds.currentFilterData && column !== 'shopIds' ? curShops : null

      const isFormedFilter = this.columnMenuSettings.isFormedData.isFormed

      const curStatus = this.columnMenuSettings.status.currentFilterData.length
        ? this.columnMenuSettings.status.currentFilterData.join(',')
        : `${BoxStatus.NEW},${BoxStatus.IN_STOCK},${BoxStatus.REQUESTED_SEND_TO_BATCH},${BoxStatus.ACCEPTED_IN_PROCESSING},${BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE},${BoxStatus.NEED_TO_UPDATE_THE_TARIFF}`

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'boxes'),
        column,

        `boxes/pag/clients_light?status=${curStatus}&filters=;${this.getFilter(column)}${
          shopFilter ? ';&' + '[shopIds][$eq]=' + shopFilter : ''
        }${isFormedFilter ? ';&' + 'isFormed=' + isFormedFilter : ''}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setFilterRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.failed)

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShopNames()
      runInAction(() => {
        this.shopsData = result
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  getFilter(exclusion) {
    const humanFriendlyIdFilter =
      exclusion !== 'ashumanFriendlyIdin' && this.columnMenuSettings.humanFriendlyId.currentFilterData.join(',')
    const idFilter = exclusion !== 'id' && this.columnMenuSettings.id.currentFilterData.join(',')
    const itemFilter = exclusion !== 'item' && this.columnMenuSettings.item.currentFilterData.join(',')

    const asinFilter = exclusion !== 'asin' && this.columnMenuSettings.asin.currentFilterData.join(',')
    const skusByClientFilter =
      exclusion !== 'skusByClient' && this.columnMenuSettings.skusByClient.currentFilterData.join(',')
    const amazonTitleFilter =
      exclusion !== 'amazonTitle' &&
      this.columnMenuSettings.amazonTitle.currentFilterData.map(el => `"${el}"`).join(',')

    const destinationFilter =
      exclusion !== 'destination' && this.columnMenuSettings.destination.currentFilterData.map(el => el._id).join(',')
    const logicsTariffFilter =
      exclusion !== 'logicsTariff' && this.columnMenuSettings.logicsTariff.currentFilterData.map(el => el._id).join(',')

    const createdAtFilter = exclusion !== 'createdAt' && this.columnMenuSettings.createdAt.currentFilterData.join(',')
    const updatedAtFilter = exclusion !== 'updatedAt' && this.columnMenuSettings.updatedAt.currentFilterData.join(',')

    const amountFilter = exclusion !== 'amount' && this.columnMenuSettings.amount.currentFilterData.join(',')
    const prepIdFilter = exclusion !== 'prepId' && this.columnMenuSettings.prepId.currentFilterData.join(',')
    const subFilter = exclusion !== 'sub' && this.columnMenuSettings.sub.currentFilterData.map(el => el._id).join(',')

    const storekeeperIdFilter =
      exclusion !== 'storekeeper' && this.columnMenuSettings.storekeeper.currentFilterData.map(el => el._id).join(',')

    const filter = objectToUrlQs({
      or: [
        { asin: { $contains: this.nameSearchValue } },
        { amazonTitle: { $contains: this.nameSearchValue } },
        { skusByClient: { $contains: this.nameSearchValue } },
        { id: { $eq: this.nameSearchValue } },
        { item: { $eq: this.nameSearchValue } },
        { productId: { $eq: this.nameSearchValue } },
        { humanFriendlyId: { $eq: this.nameSearchValue } },
        { prepId: { $contains: this.nameSearchValue } },
        // { sub: { $contains: this.nameSearchValue } },
      ].filter(
        el =>
          ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) &&
            !el.id &&
            !el.humanFriendlyId) ||
          !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
      ),

      ...(humanFriendlyIdFilter && {
        humanFriendlyId: { $eq: humanFriendlyIdFilter },
      }),
      ...(idFilter && {
        id: { $eq: idFilter },
      }),

      ...(itemFilter && {
        item: { $eq: itemFilter },
      }),

      ...(asinFilter && {
        asin: { $eq: asinFilter },
      }),
      ...(skusByClientFilter && {
        skusByClient: { $eq: skusByClientFilter },
      }),
      ...(amazonTitleFilter && {
        amazonTitle: { $eq: amazonTitleFilter },
      }),

      ...(destinationFilter && {
        destinationId: { $eq: destinationFilter },
      }),
      ...(logicsTariffFilter && {
        logicsTariffId: { $eq: logicsTariffFilter },
      }),

      ...(createdAtFilter && {
        createdAt: { $eq: createdAtFilter },
      }),
      ...(updatedAtFilter && {
        updatedAt: { $eq: updatedAtFilter },
      }),

      ...(amountFilter && {
        amount: { $eq: amountFilter },
      }),

      ...(prepIdFilter && {
        prepId: { $eq: prepIdFilter },
      }),

      ...(storekeeperIdFilter && {
        storekeeperId: { $eq: storekeeperIdFilter },
      }),

      ...(subFilter && {
        sub: { $eq: subFilter },
      }),
    })

    return filter
  }

  async getBoxesMy() {
    try {
      const curShops = this.columnMenuSettings.shopIds.currentFilterData?.map(shop => shop._id).join(',')

      const curStatus = this.columnMenuSettings.status.currentFilterData.length
        ? this.columnMenuSettings.status.currentFilterData.join(',')
        : `${BoxStatus.NEW},${BoxStatus.IN_STOCK},${BoxStatus.REQUESTED_SEND_TO_BATCH},${BoxStatus.ACCEPTED_IN_PROCESSING},${BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE},${BoxStatus.NEED_TO_UPDATE_THE_TARIFF}`

      const result = await BoxesModel.getBoxesForCurClientLightPag({
        status: curStatus,
        filters: this.getFilter() /* this.nameSearchValue ? filter : null */,
        storekeeperId: this.currentStorekeeperId,
        destinationId: this.curDestinationId,
        shopIds: this.columnMenuSettings.shopIds.currentFilterData ? curShops : null,
        isFormed: this.columnMenuSettings.isFormedData.isFormed,
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        hasBatch: false,
      })

      const res = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.baseBoxesMy = result.rows

        this.volumeWeightCoefficient = res.volumeWeightCoefficient

        this.rowCount = result.count

        this.boxesMy = clientWarehouseDataConverter(result.rows, res.volumeWeightCoefficient, this.shopsData)
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })

      runInAction(() => {
        this.boxesMy = []

        this.baseBoxesMy = []
      })
    }
  }

  triggerRequestToSendBatchModal() {
    runInAction(() => {
      this.showRequestToSendBatchModal = !this.showRequestToSendBatchModal
    })
  }

  async updateTaskPriority(taskId, priority, reason) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickRequestToSendBatch() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const boxesWithoutTariffOrDestinationIds = this.selectedBoxes.filter(boxId => {
        const findBox = this.boxesMy.find(box => box._id === boxId)
        return !findBox?.originalData?.logicsTariff || !findBox?.originalData?.destination
      })

      if (boxesWithoutTariffOrDestinationIds.length) {
        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: false,
            title: `${t(
              TranslationKey['Boxes do not have enough fare or destination. The following boxes will not be counted'],
            )}: ${boxesWithoutTariffOrDestinationIds
              .map(el => this.boxesMy.find(box => box._id === el).humanFriendlyId)
              .join(', ')} `,
          }
        })

        this.onTriggerOpenModal('showWarningInfoModal')

        this.setRequestStatus(loadingStatuses.failed)

        return
      }

      runInAction(() => {
        this.selectedBoxes = this.selectedBoxes.filter(el => !boxesWithoutTariffOrDestinationIds.includes(el))
      })

      const [boxesDeliveryCosts, result] = await Promise.all([
        BatchesModel.calculateBoxDeliveryCostsInBatch(toJS(this.selectedBoxes)),
        UserModel.getPlatformSettings(),
      ])

      runInAction(() => {
        this.boxesDeliveryCosts = boxesDeliveryCosts

        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.setRequestStatus(loadingStatuses.success)
      this.triggerRequestToSendBatchModal()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickSendBoxesToBatch() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const boxesSendToBatch = this.selectedBoxes.filter(
        selectedBoxId => this.boxesDeliveryCosts.find(priceObj => priceObj.guid === selectedBoxId)?.deliveryCost,
      )
      await BatchesModel.requestSendBoxToBatch(boxesSendToBatch)
      runInAction(() => {
        this.showRequestToSendBatchModal = false
        this.selectedBoxes = []
      })
      this.setRequestStatus(loadingStatuses.success)
      this.updateUserInfo()
      this.loadData()

      this.triggerRequestToSendBatchModal()
    } catch (error) {
      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: error.body.message,
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')

      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickMergeBtn() {
    try {
      const isMasterBoxSelected = this.selectedBoxes.some(boxId => {
        const findBox = this.boxesMy.find(box => box._id === boxId)
        return findBox?.originalData?.amount && findBox.originalData?.amount > 1
      })

      if (isMasterBoxSelected) {
        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: false,
            title: t(TranslationKey['Cannot be merged with a Superbox']),
          }
        })

        this.onTriggerOpenModal('showWarningInfoModal')

        return
      }

      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations
      })

      this.onTriggerOpenModal('showMergeBoxModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSplitBtn() {
    try {
      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations
      })

      this.onTriggerOpenModal('showRedistributeBoxModal')
    } catch (error) {
      console.log(error)
    }
  }
}
