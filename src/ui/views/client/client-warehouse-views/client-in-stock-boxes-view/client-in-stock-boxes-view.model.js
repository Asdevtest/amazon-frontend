import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { operationTypes } from '@constants/keys/operation-types'
import { BoxStatus } from '@constants/statuses/box-status'
import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { GeneralModel } from '@models/general-model'
import { OrderModel } from '@models/order-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { MyOrderModalSwitcherConditions } from '@components/modals/my-order-modal/components/tabs/tabs.type'
import { ProductAndBatchModalSwitcherConditions } from '@components/modals/product-and-batch-modal/product-and-batch-modal.type'
import { clientBoxesViewColumns } from '@components/table/table-columns/client/client-boxes-columns'

import { clientWarehouseDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostFilesInData, onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

import { filtersFields, updateBoxWhiteList } from './client-in-stock-boxes-view.constants'

export class ClientInStockBoxesViewModel {
  history = undefined
  requestStatus = undefined

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

  productBatches = undefined
  activeProductGuid = undefined

  myOrderModalSwitcherCondition = MyOrderModalSwitcherConditions.BASIC_INFORMATION
  productAndBatchModalSwitcherCondition = ProductAndBatchModalSwitcherConditions.ORDER_INFORMATION

  currentBatch = undefined
  selectedWarehouseOrderProduct = undefined
  order = undefined
  batchesData = undefined
  existingProducts = undefined
  reorderOrdersData = undefined
  platformSettings = undefined
  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  curDestinationId = undefined

  boxesIdsToTask = []
  shopsData = []

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getBoxesMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    isFormedData: { isFormed: undefined, onChangeIsFormed: value => this.onChangeIsFormed(value) },

    ...dataGridFiltersInitializer(filtersFields),
  }

  storekeeperFilterData = []
  storekeeperCurrentFilterData = []

  volumeWeightCoefficient = undefined

  hsCodeData = {}

  showEditHSCodeModal = false
  showMergeBoxModal = false
  showSendOwnProductModal = false
  showEditBoxModal = false
  showConfirmModal = false
  showRedistributeBoxModal = false
  showProductLotDataModal = false

  showProductModal = false
  showMyOrderModal = false
  showCheckPendingOrderFormModal = false
  showOrderModal = false

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

  get currentData() {
    return this.boxesMy
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  get isChoosenOnlySendToBatchBoxes() {
    if (!this.selectedBoxes.length) {
      return false
    }

    return this.boxesMy
      .filter(el => this.selectedBoxes.includes(el._id))
      .every(el => el.status === BoxStatus.REQUESTED_SEND_TO_BATCH)
  }

  get isHaveRequestSendToBatch() {
    if (!this.selectedBoxes.length) {
      return false
    }

    return this.boxesMy
      .filter(el => this.selectedBoxes.includes(el._id))
      .some(el => el.status === BoxStatus.REQUESTED_SEND_TO_BATCH)
  }

  constructor({ history }) {
    this.history = history
    const url = new URL(window.location.href)

    this.currentStorekeeperId = url.searchParams.get('storekeeper-id')

    const boxId = url.searchParams.get('box-id')

    if (boxId) {
      this.columnMenuSettings?.humanFriendlyId.currentFilterData.push(boxId)
    }

    this.nameSearchValue = url.searchParams.get('search-text')

    if (history.location.state?.dataGridFilter) {
      this.columnMenuSettings?.status.currentFilterData.push(history.location.state?.dataGridFilter)
    }

    makeAutoObservable(this, undefined, { autoBind: true })

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
    this.filterModel = model

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getBoxesMy()
  }

  onChangeUnitsOption(option) {
    this.unitsOption = option
    this.columnsModel = clientBoxesViewColumns(
      this.rowHandlers,
      () => this.storekeepersData,
      () => this.destinations,
      () => SettingsModel.destinationsFavourites,
      () => this.columnMenuSettings,
      () => this.onHover,
      () => this.unitsOption,
    )
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

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
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getBoxesMy()
  }

  onSelectionModel(model) {
    this.selectedBoxes = model

    const selectedRows = model.map(id => this.boxesMy.find(row => row.id === id))

    this.selectedRows = selectedRows
  }

  onClickStorekeeperBtn(currentStorekeeperId) {
    this.selectedBoxes = []
    this.currentStorekeeperId = currentStorekeeperId
    this.getBoxesMy()
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK, undefined)

      runInAction(() => {
        this.storekeepersData = result

        this.currentStorekeeperId =
          this.currentStorekeeperId === null
            ? undefined
            : this.currentStorekeeperId
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
      await onSubmitPostImages.call(this, { images: data.trackNumberFile, type: 'uploadedFiles' })

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles,
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
    this.selectedBox = item
  }

  onClickShippingLabel(item) {
    this.setSelectedBox(item)

    this.onTriggerOpenModal('showSetShippingLabelModal')
  }

  onClickReturnBoxesToStockBtn() {
    this.confirmModalSettings = {
      isWarning: true,
      confirmMessage: t(TranslationKey['Are you sure you want to return the boxes to the warehouse?']),
      onClickConfirm: () => this.returnBoxesToStock(),
      onClickCancelBtn: () => this.onTriggerOpenModal('showConfirmModal'),
    }

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

    this.onTriggerOpenModal('showSetShippingLabelModal')
  }

  onChangeIsFormed(value) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      isFormedData: {
        ...this.columnMenuSettings.isFormedData,
        isFormed: value,
      },
    }

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
      this.warningInfoModalSettings = {
        isWarning: true,
        title: t(TranslationKey['Before you fill out the Shipping label, you need to fill out the FBA Shipment']),
      }

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
      await ClientModel.editShippingLabelFirstTime(this.selectedBox._id, {
        shippingLabel: this.uploadedFiles?.[0] || tmpShippingLabel?.[0],
      })

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
    }
  }

  onClickConfirmCreateSplitTasks(id, updatedBoxes, type, isMasterBox, comment, sourceBox, priority, reason) {
    this.onTriggerOpenModal('showConfirmModal')

    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: `${t(TranslationKey['The task for the warehouse will be formed'])} ${
        sourceBox?.storekeeper?.name
      } ${t(TranslationKey['to redistribute the Box'])} № ${sourceBox?.humanFriendlyId}`,
      onClickConfirm: () =>
        this.onRedistribute(id, updatedBoxes, type, isMasterBox, comment, sourceBox, priority, reason),
      onClickCancelBtn: () => this.onTriggerOpenModal('showConfirmModal'),
    }
  }

  onClickConfirmCreateChangeTasks(id, boxData, sourceData, priority, priorityReason) {
    this.onTriggerOpenModal('showConfirmModal')

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
  }

  onClickConfirmCreateMergeTasks(boxBody, comment, priority, priorityReason) {
    this.onTriggerOpenModal('showConfirmModal')

    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: `${t(TranslationKey['The task for the warehouse will be formed'])} ${
        this.storekeepersData.find(el => el._id === boxBody.storekeeperId)?.name
      } ${t(TranslationKey['to merge boxes'])}`,
      onClickConfirm: () => this.onClickMerge(boxBody, comment, priority, priorityReason),
      onClickCancelBtn: () => this.onTriggerOpenModal('showConfirmModal'),
    }
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
    this.selectedBoxes = this.selectedBoxes.filter(el => el !== boxId)
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      [field]: {
        ...this.columnMenuSettings[field],
        currentFilterData: value,
      },
    }
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
    this.curDestinationId = curDestinationId

    this.requestStatus = loadingStatus.IS_LOADING
    this.getBoxesMy().then(() => {
      this.requestStatus = loadingStatus.SUCCESS
    })
  }

  openModalAndClear() {
    this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
    this.changeItem = null
    this.isCurrentTarrifsButton = false
  }

  async getClientDestinations() {
    try {
      const clientDestinations = await ClientModel.getClientDestinations({
        status: BoxStatus.IN_STOCK,
        storekeeperId: this.currentStorekeeperId,
      })

      runInAction(() => {
        this.clientDestinations = clientDestinations
      })

      this.getDataGridState()
    } catch (error) {
      console.log(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getDataGridState()
      await this.getStorekeepers()
      this.getBoxesMy()
      this.getDestinations()
      this.getShops()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatus.FAILED)
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
    this.modalRedistributeBoxAddNewBox = value
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.requestStatus = loadingStatus.IS_LOADING
    this.getBoxesMy().then(() => {
      this.requestStatus = loadingStatus.SUCCESS
    })
  }

  async onRedistribute(id, updatedBoxes, type, isMasterBox, comment, sourceBox, priority, reason) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
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
              shippingLabel: this.uploadedFiles.length
                ? this.uploadedFiles[0]
                : updatedBoxes[i].tmpShippingLabel?.[0] || updatedBoxes[i].shippingLabel,
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
        this.setRequestStatus(loadingStatus.SUCCESS)

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
      this.setRequestStatus(loadingStatus.FAILED)
      console.log(error)
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
    this.selectedBoxes = this.selectedBoxes.filter(id => id !== boxId)

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
      this.setRequestStatus(loadingStatus.IS_LOADING)
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

          newBox.shippingLabel = findUploadedShippingLabel
            ? findUploadedShippingLabel.link
            : this.uploadedFiles?.[0] || newBox.tmpShippingLabel?.[0]
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
                link: this.uploadedFiles[0] || dataToBarCodeChange[j].tmpBarCode[0],
              })
            }

            dataToBarCodeChange[j].newData = findUploadedBarcode
              ? [findUploadedBarcode.link]
              : [this.uploadedFiles[0] || dataToBarCodeChange[j].tmpBarCode[0]]
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
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.log(error)
    }
  }

  async editDestination(id, boxData) {
    try {
      await BoxesModel.editBoxAtClient(id, boxData)
      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
    }
  }

  async patchBoxHandler(id, boxData, acceptAction, spliteAction, notShowConfirmModal) {
    this.setRequestStatus(loadingStatus.IS_LOADING)

    spliteAction &&
      (await BoxesModel.editBoxAtClient(id, {
        destinationId: null,
      }))

    await BoxesModel.editBoxAtClient(id, {
      logicsTariffId: boxData.logicsTariffId,
      variationTariffId: boxData.variationTariffId,
      ...(acceptAction && { destinationId: boxData.destinationId }),
    })

    !notShowConfirmModal && this.onTriggerOpenModal('showConfirmModal')
    await this.getBoxesMy()

    this.openModalAndClear()

    this.setRequestStatus(loadingStatus.SUCCESS)
  }

  async editTariff(id, boxData, isSelectedDestinationNotValid, isSetCurrentDestination) {
    try {
      if (isSelectedDestinationNotValid) {
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: false,
            title: t(TranslationKey.Attention),
            confirmMessage: t(TranslationKey['Wish to change a destination?']),
            onClickConfirm: () => this.patchBoxHandler(id, boxData, true, false, false),
            onClickCancelBtn: () => this.patchBoxHandler(id, boxData, false, true, false),
          }
        })
        this.onTriggerOpenModal('showConfirmModal')
      } else {
        if (!isSetCurrentDestination) {
          runInAction(() => {
            this.confirmModalSettings = {
              isWarning: false,
              title: t(TranslationKey.Attention),
              confirmMessage: t(TranslationKey['Wish to set a destination?']),
              onClickConfirm: () => this.patchBoxHandler(id, boxData, true, false, false),
              onClickCancelBtn: () => this.patchBoxHandler(id, boxData, false, false, false),
            }
          })
          this.onTriggerOpenModal('showConfirmModal')
        } else {
          this.patchBoxHandler(id, boxData, false, false, true)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async onEditBoxSubmit(id, boxData, sourceData, isMultipleEdit, priority, priorityReason) {
    try {
      !isMultipleEdit && this.setRequestStatus(loadingStatus.IS_LOADING)
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
        boxData.items.every(
          item => !item.tmpBarCode?.length && item.tmpBarCode !== '' && !item.tmpTransparencyFile?.length,
        ) &&
        (sourceData.shippingLabel === null || !boxData.tmpShippingLabel.length)
      ) {
        await BoxesModel.editBoxAtClient(id, {
          fbaShipment: boxData.fbaShipment,
          destinationId: boxData.destinationId,
          logicsTariffId: boxData.logicsTariffId,
          variationTariffId: boxData.variationTariffId,
          shippingLabel: this.uploadedFiles?.length
            ? this.uploadedFiles[0]
            : boxData.shippingLabel || boxData.tmpShippingLabel?.[0] || '',

          isShippingLabelAttachedByStorekeeper:
            boxData.shippingLabel !== sourceData.shippingLabel
              ? false
              : sourceData.isShippingLabelAttachedByStorekeeper,
          clientComment: boxData.clientComment,
          referenceId: boxData.referenceId,
          fbaNumber: boxData.fbaNumber,
          prepId: boxData.prepId,
          transparencyFile: boxData.transparencyFile,
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
                  tmpBarCode: el.tmpBarCode || '',
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

        const getNewItems = async () => {
          const newItems = []

          for await (const el of boxData.items) {
            const prodInDataToUpdateBarCode = dataToBarCodeChange.find(item => item.productId === el.product._id)
            let transparencyFile

            if (el.tmpTransparencyFile.length) {
              transparencyFile = await onSubmitPostImages.call(this, {
                images: el.tmpTransparencyFile,
                type: 'uploadedTransparencyFiles',
                withoutShowProgress: true,
              })
            }

            const newItem = {
              ...getObjectFilteredByKeyArrayBlackList(el, [
                'order',
                'product',
                'tmpBarCode',
                'changeBarCodInInventory',
                'tmpTransparencyFile',
              ]),
              amount: el.amount,
              orderId: el.order._id,
              productId: el.product._id,

              transparencyFile: transparencyFile?.[0] || el.transparencyFile || '',
              barCode: prodInDataToUpdateBarCode?.newData?.length
                ? prodInDataToUpdateBarCode?.newData[0]
                : el.barCode || '',
              isBarCodeAlreadyAttachedByTheSupplier: prodInDataToUpdateBarCode?.newData?.length
                ? false
                : el.isBarCodeAlreadyAttachedByTheSupplier,
              isBarCodeAttachedByTheStorekeeper: prodInDataToUpdateBarCode?.newData?.length
                ? false
                : el.isBarCodeAttachedByTheStorekeeper,
            }

            newItems.push(newItem)
          }

          return newItems
        }

        const requestBoxItems = isMultipleEdit
          ? boxData.items.map(el => getObjectFilteredByKeyArrayBlackList(el, ['tmpBarCode']))
          : await getNewItems()

        const requestBox = getObjectFilteredByKeyArrayWhiteList(
          {
            ...boxData,
            isShippingLabelAttachedByStorekeeper:
              sourceData.shippingLabel !== boxData.shippingLabel ? false : boxData.isShippingLabelAttachedByStorekeeper,
            items: requestBoxItems,
            shippingLabel: this.uploadedFiles?.length
              ? this.uploadedFiles[0]
              : boxData.shippingLabel || boxData.tmpShippingLabel?.[0] || '',
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

          !isMultipleEdit
            ? this.onTriggerOpenModal('showSuccessInfoModal')
            : (this.boxesIdsToTask = this.boxesIdsToTask.concat(sourceData.humanFriendlyId))
        })
      }

      !isMultipleEdit && this.loadData()
      !isMultipleEdit && this.onTriggerOpenModal('showEditBoxModal')
      !isMultipleEdit && this.onTriggerOpenModal('showConfirmModal')

      !isMultipleEdit && this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      !isMultipleEdit && this.setRequestStatus(loadingStatus.FAILED)
      console.log(error)

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
      this.setRequestStatus(loadingStatus.IS_LOADING)

      if (boxBody.tmpShippingLabel.length) {
        await onSubmitPostImages.call(this, { images: boxBody.tmpShippingLabel, type: 'uploadedFiles' })
      }

      const newBoxBody = getObjectFilteredByKeyArrayBlackList(
        {
          ...boxBody,
          shippingLabel: this.uploadedFiles?.length
            ? this.uploadedFiles?.[0]
            : boxBody?.tmpShippingLabel?.[0] || boxBody?.shippingLabel,
        },
        ['tmpShippingLabel', 'storekeeperId', 'humanFriendlyId'],
        undefined,
        undefined,
        true,
      )

      const mergeBoxesResult = await this.mergeBoxes(this.selectedBoxes, newBoxBody)

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
        idsBeforeData: this.selectedBoxes,
        type: operationTypes.MERGE,
        clientComment: comment,
        priority,
        reason: priorityReason,
      })

      this.setRequestStatus(loadingStatus.SUCCESS)

      await this.getBoxesMy()

      runInAction(() => {
        this.selectedBoxes = []

        this.tmpClientComment = ''
      })
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.log(error)
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
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
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
    }
  }

  async mergeBoxes(ids, boxBody) {
    try {
      const result = await BoxesModel.mergeBoxes(ids, boxBody)

      return result
    } catch (error) {
      console.log(error)
    }
  }

  async splitBoxes(id, data) {
    try {
      const result = await BoxesModel.splitBoxes(id, data)

      await this.getBoxesMy()
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async updateBox(id, data) {
    try {
      await BoxesModel.updateBox(id, data)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
    }
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      filterRequestStatus: requestStatus,
    }
  }

  onClickResetFilters() {
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

    this.getBoxesMy()
    this.getDataGridState()
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

      const curShops = this.columnMenuSettings.shopId.currentFilterData?.map(shop => shop._id).join(',')
      const shopFilter = this.columnMenuSettings.shopId.currentFilterData && column !== 'shopId' ? curShops : null

      const isFormedFilter = this.columnMenuSettings.isFormedData.isFormed

      const curStatus = this.columnMenuSettings.status.currentFilterData.length
        ? this.columnMenuSettings.status.currentFilterData.join(',')
        : `${BoxStatus.NEW},${BoxStatus.IN_STOCK},${BoxStatus.REQUESTED_SEND_TO_BATCH},${BoxStatus.ACCEPTED_IN_PROCESSING},${BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE},${BoxStatus.NEED_TO_UPDATE_THE_TARIFF}`

      const currentColumn =
        column === 'logicsTariffId' ? 'logicsTariff' : column === 'destinationId' ? 'destination' : column

      const data = await GeneralModel.getDataForColumn(
        // Костылики, если ты это видишь, то Паша обещал решить эту проблему после релиза 27.11.2023
        // Будущий чел, исправь это в следующем релизе, году, десятилетии, в общем разберись
        // Удалить currentColumn и поставить на его место аргумент функции, column
        // Костыли зло ┗( T﹏T )┛
        getTableByColumn(currentColumn, currentColumn === 'redFlags' ? 'products' : 'boxes'),
        currentColumn,

        `boxes/pag/clients_light?status=${curStatus}&filters=;${this.getFilter(column)}${
          shopFilter ? ';&' + '[shopId][$eq]=' + shopFilter : ''
        }${isFormedFilter ? ';&' + 'isFormed=' + isFormedFilter : ''}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setFilterRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatus.FAILED)

      console.log(error)
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
    }
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(
        this.columnMenuSettings,
        this.nameSearchValue,
        exclusion,
        filtersFields,
        ['asin', 'amazonTitle', 'skuByClient', 'id', 'item', 'productId', 'humanFriendlyId', 'prepId'],
        {
          ...(!!this.currentStorekeeperId &&
            exclusion !== 'storekeeper' &&
            !this.columnMenuSettings?.storekeeper?.currentFilterData?.length && {
              storekeeper: {
                $eq: this.currentStorekeeperId,
              },
            }),
        },
      ),
    )
  }

  async getBoxesMy() {
    try {
      const curShops = this.columnMenuSettings.shopId.currentFilterData?.map(shop => shop._id).join(',')

      const curStatus = this.columnMenuSettings.status.currentFilterData.length
        ? this.columnMenuSettings.status.currentFilterData.join(',')
        : `${BoxStatus.NEW},${BoxStatus.IN_STOCK},${BoxStatus.REQUESTED_SEND_TO_BATCH},${BoxStatus.ACCEPTED_IN_PROCESSING},${BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE},${BoxStatus.NEED_TO_UPDATE_THE_TARIFF}`

      const result = await BoxesModel.getBoxesForCurClientLightPag({
        status: curStatus,
        filters: this.getFilter(),
        destinationId: this.curDestinationId,
        shopId: this.columnMenuSettings.shopId.currentFilterData ? curShops : null,
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
        this.boxesMy = []

        this.baseBoxesMy = []
      })
    }
  }

  triggerRequestToSendBatchModal() {
    this.showRequestToSendBatchModal = !this.showRequestToSendBatchModal
  }

  async updateTaskPriority(taskId, priority, reason) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)
    } catch (error) {
      console.log(error)
    }
  }

  async onClickRequestToSendBatch() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

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

        this.setRequestStatus(loadingStatus.FAILED)

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

      this.setRequestStatus(loadingStatus.SUCCESS)
      this.triggerRequestToSendBatchModal()
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.log(error)
    }
  }

  async onClickSendBoxesToBatch() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const boxesSendToBatch = this.selectedBoxes.filter(
        selectedBoxId => this.boxesDeliveryCosts.find(priceObj => priceObj.guid === selectedBoxId)?.deliveryCost,
      )
      await BatchesModel.requestSendBoxToBatch(boxesSendToBatch)
      runInAction(() => {
        this.showRequestToSendBatchModal = false
        this.selectedBoxes = []
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
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

      this.setRequestStatus(loadingStatus.FAILED)
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

  async onClickWarehouseOrderButton(guid) {
    const selectedBox = this.currentData?.find(el => el._id === guid)
    const selectedBoxItems = selectedBox?.originalData?.items

    if (selectedBoxItems?.length > 1) {
      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey['A box contains more than one product']),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')

      return
    }

    const selectedBoxProductId = selectedBoxItems?.[0]?.product?._id

    try {
      runInAction(() => {
        this.productBatches = undefined
        this.activeProductGuid = selectedBoxProductId
      })

      const result = await ClientModel.getProductById(selectedBoxProductId)

      runInAction(() => {
        this.selectedWarehouseOrderProduct = { ...result, _id: selectedBoxProductId }
      })

      this.onTriggerOpenModal('showProductModal')

      if (this.showProductModal) {
        this.productAndBatchModalSwitcherCondition = ProductAndBatchModalSwitcherConditions.ORDER_INFORMATION
      }
    } catch (e) {
      console.log(e)

      runInAction(() => {
        this.selectedWarehouseOrderProduct = undefined
      })
    }
  }

  onClickChangeProductAndBatchModalCondition(value) {
    this.productAndBatchModalSwitcherCondition = value

    if (value === ProductAndBatchModalSwitcherConditions.BATCH_DATA) {
      this.getBatches()
    }
  }

  async getCurrBatch(guid) {
    try {
      const result = await BatchesModel.getBatchesByGuid(guid)

      runInAction(() => {
        this.currentBatch = result
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.currentBatch = undefined
      })
    }
  }

  async onClickMyOrderModal(id) {
    if (window.getSelection().toString()) {
      return
    }

    await this.getOrderById(id)

    this.onTriggerOpenModal('showMyOrderModal')

    if (this.showMyOrderModal) {
      this.myOrderModalSwitcherCondition = MyOrderModalSwitcherConditions.BASIC_INFORMATION
    }
  }

  async getOrderById(orderId) {
    try {
      const resolve = await ClientModel.getOrderById(orderId)

      runInAction(() => {
        this.order = resolve
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getBatches() {
    try {
      const result = await BatchesModel.getBatchesbyProduct(this.activeProductGuid, false)

      runInAction(() => {
        this.productBatches = result
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.productBatches = undefined
      })
    }
  }

  async onClickInTransfer(productId) {
    try {
      const result = await BoxesModel.getBoxesInTransfer(productId)

      runInAction(() => {
        this.batchesData = result
      })

      this.onTriggerOpenModal('showProductLotDataModal')
    } catch (error) {
      console.log(error)
    }
  }

  onClickOpenNewTab(orderId) {
    window
      .open(`/client/my-orders/orders/order?orderId=${orderId}&order-human-friendly-id=${orderId}`, '_blank')
      .focus()
  }

  onClickChangeMyOrderModalCondition(value) {
    this.myOrderModalSwitcherCondition = value
  }

  onClickCancelOrder(orderId) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmTitle: t(TranslationKey.Attention),
      confirmMessage: t(TranslationKey['Are you sure you want to cancel the order?']),
      onClickConfirm: () => {
        this.onSubmitCancelOrder(orderId)
        this.onTriggerOpenModal('showConfirmModal')
        this.onTriggerOpenModal('showMyOrderModal')
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitCancelOrder(orderId) {
    try {
      await ClientModel.cancelOrder(orderId)
    } catch (error) {
      console.log(error)
    }
  }

  async onClickReorder(item, isPending) {
    try {
      if (isPending) {
        await this.onClickContinueBtn(item)
        return
      }

      this.setRequestStatus(loadingStatus.IS_LOADING)

      const res = await OrderModel.checkPendingOrderByProductGuid(item?.product?._id)

      const resultWithoutCurrentOrder = res?.filter(order => order?._id !== item?._id)

      if (resultWithoutCurrentOrder?.length) {
        runInAction(() => {
          this.existingProducts = [
            {
              _id: item?._id,
              asin: item?.product?.asin,
              orders: resultWithoutCurrentOrder,
            },
          ]
        })

        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      } else {
        await this.onClickContinueBtn(item)
      }
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.log(error)
    }
  }

  async onClickContinueBtn(item) {
    try {
      const [storekeepers, destinations, result, order] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        UserModel.getPlatformSettings(),
        ClientModel.getOrderById(item._id),
      ])

      runInAction(() => {
        this.storekeepersData = storekeepers

        this.destinations = destinations

        this.platformSettings = result

        this.reorderOrdersData = [order]
      })

      this.onTriggerOpenModal('showOrderModal')

      if (this.showCheckPendingOrderFormModal) {
        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      }
    } catch (error) {
      console.log(error)
    }
  }

  onDoubleClickBarcode = item => {
    this.selectedProduct = item

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  onConfirmSubmitOrderProductModal({ ordersDataState, totalOrdersCost }) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onClickConfirm: () => this.onSubmitOrderProductModal(ordersDataState),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal(ordersDataState) {
    try {
      runInAction(() => {
        this.error = undefined
      })

      for (let i = 0; i < ordersDataState.length; i++) {
        let orderObject = ordersDataState[i]
        let uploadedTransparencyFiles = []

        runInAction(() => {
          this.uploadedFiles = []
        })

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        if (orderObject.tmpTransparencyFile.length) {
          uploadedTransparencyFiles = await onSubmitPostImages.call(this, {
            images: orderObject.tmpTransparencyFile,
            type: 'uploadedFiles',
          })

          orderObject = {
            ...orderObject,
            transparencyFile: uploadedTransparencyFiles[0],
          }
        }

        if (this.isPendingOrdering) {
          const dataToRequest = getObjectFilteredByKeyArrayWhiteList(orderObject, [
            'amount',
            'orderSupplierId',
            'images',
            'totalPrice',
            'item',
            'needsResearch',
            'deadline',
            'priority',
            'expressChinaDelivery',
            'clientComment',

            'destinationId',
            'storekeeperId',
            'logicsTariffId',
            'transparencyFile',
          ])

          await OrderModel.changeOrderData(orderObject._id, dataToRequest)

          await ClientModel.updateOrderStatusToReadyToProcess(orderObject._id)
        } else {
          await this.createOrder(orderObject)
        }
      }

      if (!this.error) {
        runInAction(() => {
          this.alertShieldSettings = {
            showAlertShield: true,
            alertShieldMessage: t(TranslationKey['The order has been created']),
          }

          setTimeout(() => {
            this.alertShieldSettings = {
              ...this.alertShieldSettings,
              showAlertShield: false,
            }

            setTimeout(() => {
              this.alertShieldSettings = {
                showAlertShield: false,
                alertShieldMessage: '',
              }
            }, 1000)
          }, 3000)
        })
      }
      this.onTriggerOpenModal('showConfirmModal')

      this.onTriggerOpenModal('showOrderModal')

      this.onTriggerOpenModal('showMyOrderModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async createOrder(orderObject) {
    try {
      const requestData = getObjectFilteredByKeyArrayBlackList(orderObject, [
        'barCode',
        'tmpBarCode',
        'tmpIsPendingOrder',
        '_id',
        'tmpTransparencyFile',
        'transparency',
      ])

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }

      await this.updateUserInfo()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickPandingOrder(id) {
    window.open(`${window.location.origin}/client/my-orders/pending-orders/order?orderId=${id}`, '_blank').focus()
  }

  async onSubmitSaveOrder(order) {
    try {
      if (order.tmpBarCode.length) {
        await onSubmitPostImages.call(this, { images: order.tmpBarCode, type: 'uploadedFiles' })

        await ClientModel.updateProductBarCode(order.product._id, { barCode: this.uploadedFiles[0] })
      } else if (!order.product.barCode) {
        await ClientModel.updateProductBarCode(order.product._id, { barCode: null })
      }

      const dataToRequest = getObjectFilteredByKeyArrayWhiteList(
        {
          ...order,
          totalPrice:
            order.amount *
            (order.orderSupplier?.price + order.orderSupplier?.batchDeliveryCostInDollar / order.orderSupplier?.amount),
        },
        [
          'amount',
          'orderSupplierId',
          'images',
          'totalPrice',
          'item',
          'needsResearch',
          'deadline',
          'priority',
          'expressChinaDelivery',
          'clientComment',
          'destinationId',
          'storekeeperId',
          'logicsTariffId',
          'variationTariffId',
        ],
        undefined,
        undefined,
        true,
      )

      await OrderModel.changeOrderData(this.order._id, dataToRequest)

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data saved successfully']),
        }
      })

      await this.getOrderById(order._id)

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.log(error)
    }
  }
}
