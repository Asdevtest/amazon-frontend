import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BoxStatus} from '@constants/box-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {operationTypes} from '@constants/operation-types'
import {TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientBoxesViewColumns} from '@components/table-columns/client/client-boxes-columns'
import {clientTasksViewColumns} from '@components/table-columns/client/client-tasks-columns'

import {clientWarehouseDataConverter, warehouseTasksDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate, sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostFilesInData, onSubmitPostImages} from '@utils/upload-files'

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
]

export class ClientWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  selectedBox = undefined

  boxesMy = []
  tasksMy = []
  baseBoxesMy = []

  nameSearchValue = ''

  curBox = undefined
  showBoxViewModal = false

  drawerOpen = false
  selectedBoxes = []
  curOpenedTask = {}
  toCancelData = {}
  currentStorekeeper = undefined
  storekeepersData = []
  destinations = []

  volumeWeightCoefficient = undefined

  showMergeBoxModal = false
  showTaskInfoModal = false
  showSendOwnProductModal = false
  showEditBoxModal = false
  showConfirmModal = false
  showRedistributeBoxModal = false

  showRequestToSendBatchModal = false

  showEditMultipleBoxesModal = false

  showConfirmWithCommentModal = false

  showProgress = false

  showSuccessInfoModal = false

  boxesDeliveryCosts = undefined

  showSetShippingLabelModal = false

  modalEditSuccessMessage = ''

  showSetChipValueModal = false

  showWarningInfoModal = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  rowHandlers = {
    onClickFbaShipment: item => this.onClickFbaShipment(item),
    onDoubleClickFbaShipment: item => this.onDoubleClickFbaShipment(item),
    onDeleteFbaShipment: item => this.onDeleteFbaShipment(item),

    onClickShippingLabel: item => this.onClickShippingLabel(item),
    onDoubleClickShippingLabel: item => this.onDoubleClickShippingLabel(item),
    onDeleteShippingLabel: item => this.onDeleteShippingLabel(item),
  }

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  densityModel = 'compact'
  columnsModel = clientBoxesViewColumns(this.rowHandlers, this.storekeepersData)

  rowTaskHandlers = {
    onClickTaskInfo: item => this.setCurrentOpenedTask(item),
    onClickCancelBtn: (id, taskId, type) => this.onClickCancelBtn(id, taskId, type),
  }

  taskColumnsModel = clientTasksViewColumns(this.rowTaskHandlers)

  // get isNoDeliverySizes() {
  //   return this.selectedBoxes.some(boxId => {
  //     const findBox = this.boxesMy.find(box => box._id === boxId)
  //     return (
  //       (!findBox?.originalData?.deliveryHeight ||
  //         !findBox?.originalData?.deliveryLength ||
  //         !findBox?.originalData?.deliveryWidth ||
  //         !findBox?.originalData?.deliveryMass) &&
  //       !findBox?.originalData.fitsInitialDimensions
  //     )
  //   })
  // }

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
      this.boxesMy = clientWarehouseDataConverter(this.baseBoxesMy, this.volumeWeightCoefficient).sort(
        sortObjectsArrayByFiledDateWithParseISO('createdAt'),
      )

      this.getDataGridState()
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_WAREHOUSE)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_WAREHOUSE]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientBoxesViewColumns(this.rowHandlers, this.storekeepersData).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
      this.taskColumnsModel = clientTasksViewColumns(this.rowTaskHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
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

  onSelectionModel(model) {
    const boxes = this.boxesMy.filter(box => model.includes(box.id))
    const res = boxes.reduce((ac, el) => ac.concat(el._id), [])
    this.selectedBoxes = res
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.boxesMy).filter(
        el =>
          el.originalData.items.some(item =>
            item.product.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ) ||
          el.originalData.items.some(item =>
            item.product.skusByClient?.some(sku => sku.toLowerCase().includes(this.nameSearchValue.toLowerCase())),
          ) ||
          el.originalData.items.some(item =>
            item.product.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ),
      )
    } else {
      return toJS(this.boxesMy)
    }
  }

  getCurrentTaskData() {
    return toJS(this.tasksMy)
  }

  onClickStorekeeperBtn(storekeeper) {
    this.selectedBoxes = []

    this.currentStorekeeper = storekeeper ? storekeeper : undefined

    this.getBoxesMy()

    this.getTasksMy()
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK)

      this.storekeepersData = result
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

  onDoubleClickShippingLabel = item => {
    this.setSelectedBox(item)
    this.onTriggerOpenModal('showSetShippingLabelModal')
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

  async onClickSaveShippingLabel(tmpShippingLabel) {
    this.uploadedFiles = []

    if (tmpShippingLabel.length) {
      await onSubmitPostImages.call(this, {images: tmpShippingLabel, type: 'uploadedFiles'})
    }

    if (this.selectedBox.shippingLabel === null) {
      await ClientModel.editShippingLabelFirstTime(this.selectedBox._id, {shippingLabel: this.uploadedFiles[0]})
      this.loadData()
    } else {
      this.confirmModalSettings = {
        isWarning: false,
        confirmMessage: t(
          TranslationKey['Shipping label has been stamped, a warehouse task will be created for labeling.'],
        ),
        onClickConfirm: () => this.onSaveShippingLabelInTableSubmit(),
      }

      this.onTriggerOpenModal('showConfirmModal')
    }

    this.onTriggerOpenModal('showSetShippingLabelModal')
  }

  async onSaveShippingLabelInTableSubmit() {
    try {
      const boxData = {...this.selectedBox, shippingLabel: this.uploadedFiles[0]}

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
        },
        updateBoxWhiteList,
      )

      const editBoxesResult = await this.editBox({id: this.selectedBox._id, data: requestBox})

      await this.postTask({
        idsData: [editBoxesResult.guid],
        idsBeforeData: [this.selectedBox._id],
        type: TaskOperationType.EDIT,
        clientComment: boxData.clientComment,
      })

      this.modalEditSuccessMessage = `${t(TranslationKey['Formed a task for storekeeper'])} ${
        this.selectedBox?.storekeeper?.name
      } ${t(TranslationKey['to change the Box'])} № ${this.selectedBox?.humanFriendlyId}`

      this.onTriggerOpenModal('showSuccessInfoModal')
      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
  onClickConfirmCreateSplitTasks(id, updatedBoxes, type, isMasterBox, comment, sourceBox) {
    this.onTriggerOpenModal('showConfirmModal')

    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: `${t(TranslationKey['The task for the warehouse will be formed'])} ${
        sourceBox?.storekeeper?.name
      } ${t(TranslationKey['to redistribute the Box'])} № ${sourceBox?.humanFriendlyId}`,
      onClickConfirm: () => this.onRedistribute(id, updatedBoxes, type, isMasterBox, comment, sourceBox),
    }
  }
  onClickConfirmCreateChangeTasks(id, boxData, sourceData) {
    this.onTriggerOpenModal('showConfirmModal')

    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage:
        !boxData.clientComment &&
        boxData.items.every(item => !item.tmpBarCode.length) &&
        (boxData.shippingLabel === null || boxData.shippingLabel === sourceData.shippingLabel)
          ? `${t(TranslationKey['Change the box'])}: № ${boxData?.humanFriendlyId}`
          : `${t(TranslationKey['The task for the warehouse will be formed'])} ${boxData?.storekeeper?.name} ${t(
              TranslationKey['to change the Box'],
            )} № ${boxData?.humanFriendlyId}`,
      onClickConfirm: () => this.onEditBoxSubmit(id, boxData, sourceData),
    }
  }

  onClickConfirmCreateMergeTasks(boxBody, boxData, comment) {
    this.onTriggerOpenModal('showConfirmModal')

    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: `${t(TranslationKey['The task for the warehouse will be formed'])} ${
        boxData?.storekeeper?.name
      } ${t(TranslationKey['to merge boxes'])}`,
      onClickConfirm: () => this.onClickMerge(boxBody, comment),
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
      await BoxesModel.editBoxAtClient(box._id, {fbaShipment: ''})

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSaveFbaShipment(fbaShipment) {
    await BoxesModel.editBoxAtClient(this.selectedBox._id, {fbaShipment})

    this.onTriggerOpenModal('showSetChipValueModal')
    this.loadData()

    runInAction(() => {
      this.selectedBox = undefined
    })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getStorekeepers()

      this.getDataGridState()

      this.getBoxesMy()

      this.setRequestStatus(loadingStatuses.success)
      this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async setCurrentOpenedTask(item) {
    try {
      const task = await StorekeeperModel.getTaskById(item._id)

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.curOpenedTask = task
      })

      this.onTriggerOpenModal('showTaskInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  onModalRedistributeBoxAddNewBox(value) {
    this.modalRedistributeBoxAddNewBox = value
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e
  }

  async onRedistribute(id, updatedBoxes, type, isMasterBox, comment, sourceBox) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.selectedBoxes = []

      if (this.selectedBoxes.length === updatedBoxes.length && !isMasterBox) {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey['The box is not split!']),
        }

        this.onTriggerOpenModal('showWarningInfoModal')
      } else {
        const resBoxes = []

        for (let i = 0; i < updatedBoxes.length; i++) {
          this.uploadedFiles = []

          if (updatedBoxes[i].tmpShippingLabel.length) {
            await onSubmitPostImages.call(this, {images: updatedBoxes[i].tmpShippingLabel, type: 'uploadedFiles'})
          }

          const boxToPush = {
            boxBody: {
              shippingLabel: this.uploadedFiles.length ? this.uploadedFiles[0] : updatedBoxes[i].shippingLabel,
              destinationId: updatedBoxes[i].destinationId,
              logicsTariffId: updatedBoxes[i].logicsTariffId,
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

        await this.postTask({idsData: splitBoxesResult, idsBeforeData: [id], type, clientComment: comment})
        await this.getTasksMy()

        this.setRequestStatus(loadingStatuses.success)

        if (splitBoxesResult) {
          this.modalEditSuccessMessage = `${t(TranslationKey['Formed a task for storekeeper'])} ${
            this.storekeepersData.find(el => el._id === sourceBox.storekeeper?._id)?.name
          } ${t(TranslationKey['to redistribute the Box'])} № ${sourceBox.humanFriendlyId}`

          this.onTriggerOpenModal('showSuccessInfoModal')
        } else {
          this.warningInfoModalSettings = {
            isWarning: true,
            title: t(TranslationKey['The box is not split!']),
          }

          this.onTriggerOpenModal('showWarningInfoModal')
        }
        this.onTriggerOpenModal('showConfirmModal')
        this.onTriggerOpenModal('showRedistributeBoxModal')
        this.onModalRedistributeBoxAddNewBox(null)
      }
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
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
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Boxes with identical storekeeper must be selected']),
        }

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
      await ClientModel.updateProductBarCode(id, {barCode: data})
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

      this.showProgress = true

      for (let i = 0; i < newBoxes.length; i++) {
        const newBox = newBoxes[i]

        const sourceBox = selectedBoxes[i]

        const isMultipleEdit = true

        await this.onEditBoxSubmit(sourceBox._id, newBox, sourceBox, isMultipleEdit)
      }

      this.modalEditSuccessMessage = t(TranslationKey['Editing completed'])

      this.onTriggerOpenModal('showSuccessInfoModal')

      this.showProgress = false
      this.loadData()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async onEditBoxSubmit(id, boxData, sourceData, isMultipleEdit) {
    try {
      !isMultipleEdit && this.setRequestStatus(loadingStatuses.isLoading)
      this.selectedBoxes = []

      this.uploadedFiles = []

      if (boxData.tmpShippingLabel?.length) {
        await onSubmitPostImages.call(this, {images: boxData.tmpShippingLabel, type: 'uploadedFiles'})
      }

      if (
        !boxData.clientComment &&
        boxData.items.every(item => !item.tmpBarCode?.length) &&
        (boxData.shippingLabel === null || boxData.shippingLabel === sourceData.shippingLabel)
      ) {
        await BoxesModel.editBoxAtClient(id, {
          fbaShipment: boxData.fbaShipment,
          destinationId: boxData.destinationId,
          logicsTariffId: boxData.logicsTariffId,
          shippingLabel: this.uploadedFiles?.length ? this.uploadedFiles[0] : boxData.shippingLabel,
          isShippingLabelAttachedByStorekeeper:
            boxData.shippingLabel !== sourceData.shippingLabel
              ? false
              : sourceData.isShippingLabelAttachedByStorekeeper,
        })

        this.modalEditSuccessMessage = `${t(TranslationKey.Box)} № ${sourceData.humanFriendlyId} ${t(
          TranslationKey['has been changed'],
        )}`

        !isMultipleEdit && this.onTriggerOpenModal('showSuccessInfoModal')
      } else {
        let dataToBarCodeChange = boxData.items
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
          dataToBarCodeChange = await onSubmitPostFilesInData({
            dataWithFiles: dataToBarCodeChange,
            nameOfField: 'tmpBarCode',
          })
        }

        const newItems = boxData.items.map(el => {
          const prodInDataToUpdateBarCode = dataToBarCodeChange.find(item => item.productId === el.product._id)
          return {
            ...getObjectFilteredByKeyArrayBlackList(el, ['order', 'product', 'tmpBarCode', 'changeBarCodInInventory']),
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

        const requestBox = getObjectFilteredByKeyArrayWhiteList(
          {
            ...boxData,
            isShippingLabelAttachedByStorekeeper:
              sourceData.shippingLabel !== boxData.shippingLabel ? false : boxData.isShippingLabelAttachedByStorekeeper,
            items: newItems,
            shippingLabel: this.uploadedFiles?.length ? this.uploadedFiles[0] : boxData.shippingLabel,
          },
          updateBoxWhiteList,
        )

        const editBoxesResult = await this.editBox({id, data: requestBox})

        await this.updateBarCodesInInventory(dataToBarCodeChange)

        await this.postTask({
          idsData: [editBoxesResult.guid],
          idsBeforeData: [id],
          type: TaskOperationType.EDIT,
          clientComment: boxData.clientComment,
        })

        this.modalEditSuccessMessage = `${t(TranslationKey['Formed a task for storekeeper'])} ${
          sourceData.storekeeper?.name
        } ${t(TranslationKey['to change the Box'])} № ${sourceData.humanFriendlyId}`

        !isMultipleEdit && this.onTriggerOpenModal('showSuccessInfoModal')
      }

      !isMultipleEdit && this.loadData()
      !isMultipleEdit && this.onTriggerOpenModal('showEditBoxModal')
      !isMultipleEdit && this.onTriggerOpenModal('showConfirmModal')

      !isMultipleEdit && this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      !isMultipleEdit && this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async onClickMerge(boxBody, comment) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const selectedIds = this.selectedBoxes

      this.uploadedFiles = []

      if (boxBody.tmpShippingLabel.length) {
        await onSubmitPostImages.call(this, {images: boxBody.tmpShippingLabel, type: 'uploadedFiles'})
      }

      const newBoxBody = getObjectFilteredByKeyArrayBlackList(
        {...boxBody, shippingLabel: this.uploadedFiles.length ? this.uploadedFiles[0] : boxBody.shippingLabel},
        ['tmpShippingLabel', 'storekeeperId', 'humanFriendlyId'],
      )

      const mergeBoxesResult = await this.mergeBoxes(selectedIds, newBoxBody)

      if (mergeBoxesResult) {
        this.modalEditSuccessMessage = `${t(TranslationKey['Formed a task for storekeeper'])} ${
          this.storekeepersData.find(el => el._id === boxBody.storekeeperId)?.name
        } ${t(TranslationKey['to merge boxes'])} `
        this.onTriggerOpenModal('showSuccessInfoModal')
      } else {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey['The boxes are not joined!']),
        }

        this.onTriggerOpenModal('showWarningInfoModal')
      }

      this.onTriggerOpenModal('showMergeBoxModal')
      this.onTriggerOpenModal('showConfirmModal')

      await this.postTask({
        idsData: [mergeBoxesResult.guid],
        idsBeforeData: [...selectedIds],
        type: operationTypes.MERGE,
        clientComment: comment,
      })

      this.setRequestStatus(loadingStatuses.success)

      await this.getBoxesMy()

      this.selectedBoxes = []

      this.tmpClientComment = ''
      await this.getTasksMy()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
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

  async postTask({idsData, idsBeforeData, type, clientComment}) {
    try {
      await ClientModel.createTask({
        taskId: 0,
        boxes: [...idsData],
        boxesBefore: [...idsBeforeData],
        operationType: type,
        clientComment: clientComment || '',
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getTasksMy() {
    try {
      const result = await ClientModel.getTasks(this.currentStorekeeper && {storekeeperId: this.currentStorekeeper._id})

      runInAction(() => {
        this.tasksMy = warehouseTasksDataConverter(result).sort(sortObjectsArrayByFiledDate('updatedAt'))
      })
    } catch (error) {
      console.log(error)
      this.error = error

      this.tasksMy = []
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async editBox(box) {
    try {
      const result = await BoxesModel.editBox(box)

      return result
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async mergeBoxes(ids, boxBody) {
    try {
      const result = await BoxesModel.mergeBoxes(ids, boxBody)

      return result
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async splitBoxes(id, data) {
    try {
      const result = await BoxesModel.splitBoxes(id, data)

      await this.getBoxesMy()
      return result
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async updateBox(id, data) {
    try {
      await BoxesModel.updateBox(id, data)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getBoxesMy() {
    try {
      const result = await BoxesModel.getBoxesForCurClientLight(
        BoxStatus.IN_STOCK,
        this.currentStorekeeper && this.currentStorekeeper._id,
      )

      const res = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.baseBoxesMy = result

        this.volumeWeightCoefficient = res.volumeWeightCoefficient

        this.boxesMy = clientWarehouseDataConverter(result, res.volumeWeightCoefficient).sort(
          sortObjectsArrayByFiledDateWithParseISO('createdAt'),
        )
      })
    } catch (error) {
      console.log(error)
      this.error = error

      runInAction(() => {
        this.boxesMy = []
      })
    }
  }

  async cancelTask(taskId, comment) {
    try {
      await ClientModel.cancelTask(taskId, comment)

      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickCancelBtnByAction(actionType, id) {
    switch (actionType) {
      case 'merge':
        return this.cancelMergeBoxes(id)

      case 'split':
        return this.cancelSplitBoxes(id)

      case 'edit':
        return this.cancelEditBoxes(id)
    }
  }

  async onClickCancelBtn(id, taskId, type) {
    try {
      const task = await StorekeeperModel.getTaskById(taskId)

      if (task.status !== mapTaskStatusEmumToKey[TaskStatus.NEW]) {
        this.getTasksMy()

        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey['The warehouse has already taken the task to work']),
        }

        this.onTriggerOpenModal('showWarningInfoModal')
      } else {
        this.toCancelData = {id, taskId, type}

        this.onTriggerOpenModal('showConfirmWithCommentModal')
      }
    } catch (e) {
      console.log(e)
    }
  }

  async onClickCancelAfterConfirm(comment) {
    try {
      await this.onClickCancelBtnByAction(this.toCancelData.type, this.toCancelData.id)

      this.onTriggerOpenModal('showConfirmWithCommentModal')

      await this.cancelTask(this.toCancelData.taskId, {clientComment: comment})

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async cancelEditBoxes(id) {
    try {
      await BoxesModel.cancelEditBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async cancelMergeBoxes(id) {
    try {
      await BoxesModel.cancelMergeBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async cancelSplitBoxes(id) {
    try {
      await BoxesModel.cancelSplitBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  triggerRequestToSendBatchModal() {
    this.showRequestToSendBatchModal = !this.showRequestToSendBatchModal
  }

  async onClickRequestToSendBatch() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const boxesWithoutTariffOrDestinationIds = this.selectedBoxes.filter(boxId => {
        const findBox = this.boxesMy.find(box => box._id === boxId)
        return !findBox?.originalData?.logicsTariff || !findBox?.originalData?.destination
      })

      this.selectedBoxes = this.selectedBoxes.filter(el => !boxesWithoutTariffOrDestinationIds.includes(el))

      const boxesDeliveryCosts = await BatchesModel.calculateBoxDeliveryCostsInBatch(toJS(this.selectedBoxes))

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.boxesDeliveryCosts = boxesDeliveryCosts

        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.setRequestStatus(loadingStatuses.success)
      this.triggerRequestToSendBatchModal()

      if (boxesWithoutTariffOrDestinationIds.length) {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: `${t(
            TranslationKey['Boxes do not have enough fare or destination. The following boxes will not be counted'],
          )}: ${boxesWithoutTariffOrDestinationIds
            .map(el => this.boxesMy.find(box => box._id === el).humanFriendlyId)
            .join(', ')} `,
        }

        this.onTriggerOpenModal('showWarningInfoModal')
      }
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
      this.warningInfoModalSettings = {
        isWarning: true,
        title: error.body.message,
      }

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
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Cannot be merged with a Superbox']),
        }

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
