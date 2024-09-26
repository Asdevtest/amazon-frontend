/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioChangeEvent } from 'antd'
import { makeObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { GridColDef } from '@mui/x-data-grid-premium'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { operationTypes } from '@constants/keys/operation-types'
import { BoxStatus } from '@constants/statuses/box-status'
import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'
import { createOrderRequestWhiteList } from '@constants/white-list'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OrderModel } from '@models/order-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { MyOrderModalSwitcherConditions } from '@components/modals/my-order-modal/components/tabs/tabs.type'
import { ProductAndBatchModalSwitcherConditions } from '@components/modals/product-and-batch-modal/product-and-batch-modal.type'

import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostFilesInData, onSubmitPostImages } from '@utils/upload-files'

import { Dimensions } from '@typings/enums/dimensions'
import { loadingStatus } from '@typings/enums/loading-status'
import { IBatch } from '@typings/models/batches/batch'
import { IBox } from '@typings/models/boxes/box'
import { IOrder } from '@typings/models/orders/order'
import { IProduct } from '@typings/models/products/product'
import { IShop } from '@typings/models/shops/shop'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'
import { IDestination } from '@typings/shared/destinations'
import { ILogicTariff } from '@typings/shared/logic-tariff'
import { IUploadFile } from '@typings/shared/upload-file'

import { clientBoxesViewColumns } from './client-boxes-columns'
import { fieldsForSearch, filtersFields, updateBoxWhiteList } from './client-in-stock-boxes-view.constants'
import { observerConfig } from './observer-config'

export class ClientInStockBoxesViewModel extends DataGridFilterTableModel {
  selectedBox: IBox | null = null

  baseBoxesMy = []

  unitsOption = Dimensions.EU

  curBox: string = ''
  isCurrentTarrifsButton = false

  curOpenedTask = {}
  toCancelData = {}
  currentStorekeeperId = ''
  storekeepersData: IStorekeeper[] = []
  destinations: IDestination[] = []
  clientDestinations: IDestination[] = []

  productBatches: IBatch[] = []
  activeProductGuid = undefined

  myOrderModalSwitcherCondition = MyOrderModalSwitcherConditions.BASIC_INFORMATION
  productAndBatchModalSwitcherCondition = ProductAndBatchModalSwitcherConditions.ORDER_INFORMATION

  currentBatch: IBatch | null = null
  selectedWarehouseOrderProduct: IProduct | null = null
  order: IOrder | null = null
  existingProducts: any = undefined
  reorderOrdersData: IOrder[] = []
  selectedProduct: IProduct | null = null

  curDestinationId: string | null = 'all'

  boxesIdsToTask = []
  shopsData: IShop[] = []

  onAmazon = false
  uploadedFiles: string[] = []

  showBoxViewModal = false
  showMergeBoxModal = false
  showSendOwnProductModal = false
  showEditBoxModal = false
  showConfirmModal = false
  showRedistributeBoxModal = false
  showProductModal = false
  showMyOrderModal = false
  showCheckPendingOrderFormModal = false
  showOrderModal = false
  showProductDataModal = false
  showRequestToSendBatchModal = false
  showEditMultipleBoxesModal = false
  showGroupingBoxesModal = false
  showSetShippingLabelModal = false
  showSetChipValueModal = false
  showSelectionStorekeeperAndTariffModal = false
  showEditPriorityData = false

  showProgress = false

  boxesDeliveryCosts = undefined

  changeItem: ILogicTariff | null = null

  editPriorityData = {
    taskId: null,
    newPriority: null,
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get isChoosenOnlySendToBatchBoxes() {
    if (!this.selectedRows.length) {
      return false
    }

    return this.currentData
      .filter((el: any) => this.selectedRows.includes(el._id))
      .every((el: any) => el.status === BoxStatus.REQUESTED_SEND_TO_BATCH)
  }

  get isHaveRequestSendToBatch() {
    if (!this.selectedRows.length) {
      return false
    }

    return this.currentData
      .filter((el: any) => this.selectedRows.includes(el._id))
      .some((el: any) => el.status === BoxStatus.REQUESTED_SEND_TO_BATCH)
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  constructor(history: any) {
    const rowHandlers = {
      onClickFbaShipment: (item: IBox) => this.onClickFbaShipment(item),
      onDeleteFbaShipment: (item: IBox) => this.onDeleteFbaShipment(item),

      onClickShippingLabel: (item: IBox) => this.onClickShippingLabel(item),
      onDeleteShippingLabel: (item: IBox) => this.onDeleteShippingLabel(item),
      onChangeIsFormedInBox: (item: IBox) => this.onChangeIsFormedInBox(item),

      onClickSetDestinationFavourite: (item: string) => SettingsModel.setDestinationsFavouritesItem(item),
      onSelectDestination: (id: string, boxData: IBox) => this.editDestination(id, boxData),
      setShowSelectionStorekeeperAndTariffModal: () =>
        this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal'),
      onClickSetTariff: (item: ILogicTariff) => this.setChangeItem(item),

      onClickSavePrepId: (item: string, value: string) => this.onClickSavePrepId(item, value),

      onChangeUnitsOption: (option: RadioChangeEvent) => this.onChangeUnitsOption(option),
      onClickSaveClientComment: (itemId: string, value: string) => this.onClickSaveClientComment(itemId, value),
    }

    const columnsModel = clientBoxesViewColumns(
      rowHandlers,
      () => this.storekeepersData,
      () => this.destinations,
      () => SettingsModel.destinationsFavourites,
      () => this.unitsOption,
    ) as GridColDef[]

    const defaultGetCurrentDataOptions = () => {
      const curShops = this.columnMenuSettings.shopId.currentFilterData?.map((shop: any) => shop._id).join(',')

      return {
        destinationId: this.curDestinationId === 'all' ? undefined : this.curDestinationId,
        shopId: this.columnMenuSettings.shopId.currentFilterData ? curShops : null,

        hasBatch: false,
      }
    }

    const additionalPropertiesColumnMenuSettings = {
      isFormedData: { isFormed: undefined, onChangeIsFormed: (value: boolean) => this.onChangeIsFormed(value) },
    }

    const additionalPropertiesGetFilters = () => {
      const isFormedFilter = this.columnMenuSettings.isFormedData.isFormed

      return {
        isFormed: {
          $eq: isFormedFilter,
        },

        ...(this.currentStorekeeperId && {
          storekeeper: {
            $eq: this.currentStorekeeperId,
          },
        }),
      }
    }

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: 'inStock',
      },
    })

    super({
      getMainDataMethod: BoxesModel.getBoxesForCurClientLightPag,
      columnsModel,
      filtersFields,
      mainMethodURL: 'boxes/pag/clients_light?',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.CLIENT_WAREHOUSE_BOXES,
      defaultGetCurrentDataOptions,
      additionalPropertiesColumnMenuSettings,
      additionalPropertiesGetFilters,
      defaultFilterParams,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    this.history = history
    const url = new URL(window.location.href)

    const storekeeperId = url.searchParams.get('storekeeper-id')

    if (storekeeperId) {
      this.currentStorekeeperId = storekeeperId
    }

    const boxId = url.searchParams.get('box-id')

    if (boxId) {
      this.columnMenuSettings?.humanFriendlyId.currentFilterData.push(boxId)
    }

    this.currentSearchValue = url.searchParams.get('search-text') || ''

    if (history.location.state?.dataGridFilter) {
      this.columnMenuSettings?.status.currentFilterData.push(history.location.state?.dataGridFilter)
    }

    this.getTableSettingsPreset()
    this.getStorekeepers()
    this.getCurrentData()
    this.getDestinations()
    this.getShops()
    this.getClientDestinations()

    reaction(
      () => this.currentStorekeeperId,
      () => this.getClientDestinations(),
    )

    reaction(
      () => this.unitsOption,
      () => (this.columnsModel = columnsModel),
    )
  }

  async getDestinations() {
    try {
      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations as IDestination[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  setChangeItem(item: ILogicTariff) {
    this.changeItem = item
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onChangeUnitsOption(event: RadioChangeEvent) {
    const currentValue = event.target.value
    this.unitsOption = currentValue
  }

  onClickStorekeeperBtn(event: RadioChangeEvent) {
    const currentValue = event.target.value
    this.selectedRows = []
    this.currentStorekeeperId = currentValue
    this.onChangeFullFieldMenuItem([], 'storekeeper')
    this.getCurrentData()
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK, undefined)

      runInAction(() => {
        this.storekeepersData = result as IStorekeeper[]
      })

      this.getDataGridState()
    } catch (error) {
      console.error(error)
    }
  }

  setSelectedBox(item: IBox) {
    this.selectedBox = item
  }

  onClickShippingLabel(item: IBox) {
    this.setSelectedBox(item)

    this.onTriggerOpenModal('showSetShippingLabelModal')
  }

  onClickReturnBoxesToStockBtn() {
    this.confirmModalSettings = {
      isWarning: true,
      title: '',
      message: t(TranslationKey['Are you sure you want to return the boxes to the warehouse?']),
      onSubmit: () => this.returnBoxesToStock(),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async returnBoxesToStock() {
    try {
      await ClientModel.returnBoxFromBatch(this.selectedRows.map(boxId => ({ boxId })))
      runInAction(() => {
        this.selectedRows = []
      })

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)

      this.onTriggerOpenModal('showConfirmModal')
    }
  }

  onChangeIsFormed(value: boolean) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      isFormedData: {
        ...this.columnMenuSettings.isFormedData,
        isFormed: value,
      },
    }

    this.getCurrentData()
  }

  async onChangeIsFormedInBox(box: IBox) {
    try {
      await BoxesModel.editIsFormed(box._id, {
        isFormed: !box.isFormed,
      })

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onDeleteShippingLabel(box: IBox) {
    try {
      await BoxesModel.editBoxAtClient(box._id, {
        shippingLabel: '',
        isShippingLabelAttachedByStorekeeper: false,
      })

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  checkAndOpenFbaShipmentEdit() {
    if (
      !this.selectedBox?.fbaShipment &&
      !this.destinations.find(el => el._id === this.selectedBox?.destination?._id)?.storekeeper
    ) {
      toast.warning(t(TranslationKey['Before you fill out the Shipping label, you need to fill out the FBA Shipment']))

      this.onTriggerOpenModal('showSetChipValueModal')
    }
  }

  async onClickSaveShippingLabel(data: IUploadFile[]) {
    if (data.length) {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: data, type: 'uploadedFiles' })
      this.setRequestStatus(loadingStatus.SUCCESS)
    }

    if (this.selectedBox?.shippingLabel === null) {
      await ClientModel.editShippingLabelFirstTime(this.selectedBox._id, {
        shippingLabel: this.uploadedFiles?.[0],
      })

      this.checkAndOpenFbaShipmentEdit()

      this.loadData()
    } else {
      runInAction(() => {
        this.confirmModalSettings = {
          isWarning: false,
          title: '',
          message: t(TranslationKey['Shipping label has been stamped, a warehouse task will be created for labeling.']),
          onSubmit: () => this.onSaveShippingLabelInTableSubmit(),
          onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
        }
      })

      this.onTriggerOpenModal('showConfirmModal')

      this.checkAndOpenFbaShipmentEdit()
    }

    this.onTriggerOpenModal('showSetShippingLabelModal')
  }

  async onSaveShippingLabelInTableSubmit() {
    try {
      // @ts-ignore
      const boxData: IBox = { ...this.selectedBox, shippingLabel: this.uploadedFiles[0] }

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
            this.selectedBox?.shippingLabel !== boxData.shippingLabel
              ? false
              : boxData.isShippingLabelAttachedByStorekeeper,
          items: newItems,
          shippingLabel: this.uploadedFiles.length ? this.uploadedFiles[0] : boxData.shippingLabel,
          destinationId: boxData.destination?._id,
          logicsTariffId: boxData.logicsTariff?._id,
        },
        updateBoxWhiteList,
      )

      const editBoxesResult = await this.editBox(this.selectedBox?._id || '', requestBox as IBox)

      await this.postTask({
        // @ts-ignore
        idsData: [editBoxesResult.guid],
        // @ts-ignore
        idsBeforeData: [this.selectedBox?._id],
        type: TaskOperationType.EDIT,
        clientComment: boxData.clientComment,
      })

      toast.success(
        `${t(TranslationKey['Formed a task for storekeeper'])} ${this.selectedBox?.storekeeper?.name} ${t(
          TranslationKey['to change the Box'],
        )} № ${this.selectedBox?.humanFriendlyId}`,
      )

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickConfirmCreateSplitTasks(
    id: string,
    updatedBoxes: IBox[],
    type: string,
    isMasterBox: boolean,
    comment: string,
    sourceBox: IBox,
    priority: number,
    reason: string,
  ) {
    this.onTriggerOpenModal('showConfirmModal')

    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: `${t(TranslationKey['The task for the warehouse will be formed'])} ${sourceBox?.storekeeper?.name} ${t(
        TranslationKey['to redistribute the Box'],
      )} № ${sourceBox?.humanFriendlyId}`,
      onSubmit: () => this.onRedistribute(id, updatedBoxes, type, isMasterBox, comment, sourceBox, priority, reason),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
  }

  onClickConfirmCreateChangeTasks(
    id: string,
    boxData: any,
    sourceData: IBox,
    priority: number,
    priorityReason: string,
  ) {
    this.onTriggerOpenModal('showConfirmModal')
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message:
        !boxData.clientTaskComment &&
        boxData.items.every((item: any) => !item.tmpBarCode.length) &&
        boxData.items.every((item: any) => !item.tmpTransparencyFile.length) &&
        (sourceData.shippingLabel === null || !boxData.tmpShippingLabel.length)
          ? `${t(TranslationKey['Change the box'])}: № ${boxData?.humanFriendlyId}`
          : `${t(TranslationKey['The task for the warehouse will be formed'])} ${boxData?.storekeeper?.name} ${t(
              TranslationKey['to change the Box'],
            )} № ${boxData?.humanFriendlyId}`,
      onSubmit: () => this.onEditBoxSubmit(id, boxData, sourceData, false, priority, priorityReason),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
  }

  onClickConfirmCreateMergeTasks(boxBody: IBox, comment: string, priority: number, priorityReason: string) {
    this.onTriggerOpenModal('showConfirmModal')

    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: `${t(TranslationKey['The task for the warehouse will be formed'])} ${
        this.storekeepersData.find(el => el._id === boxBody.storekeeperId)?.name
      } ${t(TranslationKey['to merge boxes'])}`,
      onSubmit: () => this.onClickMerge(boxBody, comment, priority, priorityReason),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
  }

  onClickFbaShipment(item: IBox) {
    this.setSelectedBox(item)
    this.onTriggerOpenModal('showSetChipValueModal')
  }

  async onDeleteFbaShipment(box: IBox) {
    try {
      await BoxesModel.editBoxAtClient(box._id, { fbaShipment: '' })

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveFbaShipment(fbaShipment: string) {
    try {
      await BoxesModel.editBoxAtClient(this.selectedBox?._id, { fbaShipment })

      toast.success(t(TranslationKey['Data saved successfully']))

      this.onTriggerOpenModal('showSetChipValueModal')
      this.loadData()

      runInAction(() => {
        // @ts-ignore
        this.selectedBox = { ...this.selectedBox, fbaShipment }
      })
    } catch (err) {
      console.error(err)
    }
  }

  onClickRemoveBoxFromBatch(boxId: string) {
    this.selectedRows = this.selectedRows.filter(el => el !== boxId)
  }

  async onClickSavePrepId(itemId: string, value: string) {
    try {
      await BoxesModel.editAdditionalInfo(itemId, {
        prepId: value,
      })

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  onCloseShippingLabelModal() {
    this.showSetShippingLabelModal = false
  }

  onClickDestinationBtn(value: string) {
    this.curDestinationId = value

    this.requestStatus = loadingStatus.IS_LOADING
    this.onChangeFullFieldMenuItem([], 'destination')

    this.getCurrentData().then(() => {
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
        ...(this.currentStorekeeperId ? { storekeeperId: this.currentStorekeeperId } : {}),
      })

      runInAction(() => {
        this.clientDestinations = clientDestinations as IDestination[]
      })

      this.getDataGridState()
    } catch (error) {
      console.error(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await this.getStorekeepers()
      this.getCurrentData()
      this.getDestinations()
      this.getShops()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onRedistribute(
    id: string,
    updatedBoxes: any,
    type: string,
    isMasterBox: boolean,
    comment: string,
    sourceBox: IBox,
    priority: number,
    reason: string,
  ) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      runInAction(() => {
        this.selectedRows = []
      })

      if (this.selectedRows?.length === updatedBoxes?.length && !isMasterBox) {
        toast.warning(t(TranslationKey['The box is not split!']))
      } else {
        const resBoxes = []

        for (let i = 0; i < updatedBoxes?.length; i++) {
          if (updatedBoxes[i].tmpShippingLabel?.length) {
            // @ts-ignore
            await onSubmitPostImages.call(this, { images: updatedBoxes[i].tmpShippingLabel, type: 'uploadedFiles' })
          }

          const boxToPush = {
            boxBody: {
              shippingLabel: this.uploadedFiles?.length
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
              ...updatedBoxes[i].items.map((item: any) => ({
                amount: item.amount,
                productId: item.product._id,
                orderId: item.order._id,
              })),
            ],
          }

          resBoxes.push(boxToPush)

          runInAction(() => {
            this.uploadedFiles = []
          })
        }

        const splitBoxesResult = await this.splitBoxes(id, resBoxes as any)

        await this.postTask({
          // @ts-ignore
          idsData: splitBoxesResult,
          idsBeforeData: [id],
          type,
          clientComment: comment,
          priority,
          reason,
        })
        this.setRequestStatus(loadingStatus.SUCCESS)

        if (splitBoxesResult) {
          toast.success(
            `${t(TranslationKey['Formed a task for storekeeper'])} ${
              this.storekeepersData.find(el => el._id === sourceBox.storekeeper?._id)?.name
            } ${t(TranslationKey['to redistribute the Box'])} № ${sourceBox.humanFriendlyId}`,
          )
        } else {
          toast.warning(t(TranslationKey['The box is not split!']))
        }
        this.onTriggerOpenModal('showConfirmModal')
        this.onTriggerOpenModal('showRedistributeBoxModal')
      }
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onClickGroupingBtn() {
    try {
      const firstBox = this.currentData.find((box: IBox) => box._id === this.selectedRows[0])

      const boxesWithDifferentStorekeepers = this.selectedRows.filter(boxId => {
        const findBox = this.currentData.find((box: IBox) => box._id === boxId)

        return findBox?.storekeeper?._id !== firstBox?.storekeeper?._id
      })

      if (boxesWithDifferentStorekeepers.length) {
        toast.warning(t(TranslationKey['Boxes with identical storekeeper must be selected']))

        return
      }

      const response = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = response as IDestination[]
      })

      this.onTriggerOpenModal('showGroupingBoxesModal')
    } catch (err) {
      console.error(err)
    }
  }

  async onClickEditBtn() {
    try {
      const firstBox = this.currentData.find((box: IBox) => box._id === this.selectedRows[0])

      const boxesWithDifferentStorekeepers = this.selectedRows.filter(boxId => {
        const findBox = this.currentData.find((box: IBox) => box._id === boxId)

        return findBox?.storekeeper?._id !== firstBox?.storekeeper?._id
      })

      if (boxesWithDifferentStorekeepers.length) {
        toast.warning(t(TranslationKey['Boxes with identical storekeeper must be selected']))

        return
      }

      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations as IDestination[]
      })

      if (this.selectedRows.length === 1) {
        this.onTriggerOpenModal('showEditBoxModal')
      } else {
        this.onTriggerOpenModal('showEditMultipleBoxesModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  onRemoveBoxFromSelected(boxId: string) {
    this.selectedRows = this.selectedRows.filter(id => id !== boxId)

    if (this.selectedRows.length < 2) {
      this.onTriggerOpenModal('showMergeBoxModal')
    }
  }

  async updateOneBarCodeInInventory(id: string, data: any) {
    try {
      await ClientModel.updateProductBarCode(id, { barCode: data })
    } catch (error) {
      console.error(error)
    }
  }

  async updateBarCodesInInventory(dataToBarCodeChange: any) {
    try {
      for (let i = 0; i < dataToBarCodeChange.length; i++) {
        const item = dataToBarCodeChange[i]

        if (item.changeBarCodInInventory) {
          this.updateOneBarCodeInInventory(item.productId, item.newData[0])
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSubmitEditMultipleBoxes(newBoxes: any, selectedRows: IBox[]) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.onTriggerOpenModal('showEditMultipleBoxesModal')

      const uploadedShippingLabeles: { strKey: string; link: string }[] = []

      const uploadedBarcodes: { strKey: string; link: string }[] = []

      runInAction(() => {
        this.boxesIdsToTask = []
      })

      for (let i = 0; i < newBoxes.length; i++) {
        const newBox = { ...newBoxes[i] }
        const sourceBox = selectedRows[i]
        const isMultipleEdit = true

        if (newBox.tmpShippingLabel?.length) {
          const findUploadedShippingLabel = uploadedShippingLabeles.find(
            el => el.strKey === JSON.stringify(newBox.tmpShippingLabel[0]),
          )

          if (!findUploadedShippingLabel) {
            // @ts-ignore
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
          .map((el: any) =>
            el.tmpBarCode?.length
              ? {
                  changeBarCodInInventory: el.changeBarCodInInventory,
                  productId: el.product._id,
                  tmpBarCode: el.tmpBarCode,
                  newData: [],
                }
              : null,
          )
          .filter((el: any) => el !== null)

        if (dataToBarCodeChange?.length) {
          for (let j = 0; j < dataToBarCodeChange.length; j++) {
            const findUploadedBarcode = uploadedBarcodes.find(
              el => el.strKey === JSON.stringify(dataToBarCodeChange[j].tmpBarCode[0]),
            )

            if (!findUploadedBarcode) {
              // @ts-ignore
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

        newBox.items = newBox.items.map((el: any) => {
          const prodInDataToUpdateBarCode = dataToBarCodeChange.find(
            (item: any) => item.productId === el?.product?._id || el?.productId,
          )

          return {
            ...getObjectFilteredByKeyArrayBlackList(el, [
              'order',
              'product',
              /* 'tmpBarCode',*/ 'changeBarCodInInventory',
            ]),
            amount: el.amount,
            orderId: el?.order?._id || el?.orderId,
            productId: el?.product?._id || el?.productId,

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

      toast.success(
        this.boxesIdsToTask.length
          ? `${t(TranslationKey['Editing completed'])}, ${t(
              TranslationKey['Tasks were created for the following boxes'],
            )}: ${this.boxesIdsToTask.join(', ')}`
          : t(TranslationKey['Editing completed']),
      )

      this.boxesIdsToTask = []

      this.loadData()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async editDestination(id: string, boxData: IBox) {
    try {
      await BoxesModel.editBoxAtClient(id, boxData)
      await this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async patchBoxHandler(
    id: string,
    boxData: any,
    acceptAction: boolean,
    spliteAction: boolean,
    notShowConfirmModal: boolean,
  ) {
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
    await this.getCurrentData()

    this.openModalAndClear()

    this.setRequestStatus(loadingStatus.SUCCESS)
  }

  async editTariff(boxData: any) {
    try {
      const boxId = this.changeItem?._id as string

      if (!boxData?.isSameDestination) {
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: false,
            title: t(TranslationKey.Attention),
            message: t(TranslationKey['Wish to change a destination?']),
            // @ts-ignore
            onSubmit: () => this.patchBoxHandler(boxId, boxData, true, false, false),
            // @ts-ignore
            onCancel: () => this.patchBoxHandler(boxId, boxData, false, true, false),
          }
        })

        this.onTriggerOpenModal('showConfirmModal')
      } else {
        this.patchBoxHandler(boxId, boxData, false, false, true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async onEditBoxSubmit(
    id: string,
    boxData: any,
    sourceData: any,
    isMultipleEdit: boolean,
    priority?: number,
    priorityReason?: string,
  ) {
    try {
      !isMultipleEdit && this.setRequestStatus(loadingStatus.IS_LOADING)
      runInAction(() => {
        this.selectedRows = []
      })

      if (!isMultipleEdit && boxData.tmpShippingLabel?.length) {
        // @ts-ignore
        await onSubmitPostImages.call(this, {
          images: boxData.tmpShippingLabel,
          type: 'uploadedFiles',
          withoutShowProgress: true,
        })

        boxData.shippingLabel = this.uploadedFiles?.[0]
      }

      let dataToBarCodeChange = boxData.items
        .map((el: any) =>
          el.tmpBarCode?.length
            ? {
                changeBarCodInInventory: el.changeBarCodInInventory,
                productId: el.product?._id,
                tmpBarCode: el.tmpBarCode || '',
                newData: [],
              }
            : null,
        )
        .filter((el: any) => el !== null)

      if (!isMultipleEdit && dataToBarCodeChange?.length) {
        dataToBarCodeChange = await onSubmitPostFilesInData({
          dataWithFiles: dataToBarCodeChange,
          nameOfField: 'tmpBarCode',
        })
      }

      const getNewItems = async () => {
        const newItems = []

        for await (const el of boxData.items) {
          const prodInDataToUpdateBarCode = dataToBarCodeChange.find(
            (item: any) => item.productId === (el?.product?._id || el?.productId),
          )

          let transparencyFile

          if (el?.tmpTransparencyFile?.length) {
            // @ts-ignore
            transparencyFile = await onSubmitPostImages.call(this, {
              images: el?.tmpTransparencyFile,
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
            amount: el?.amount,
            orderId: el?.order?._id || el?.orderId,
            productId: el?.product?._id || el?.productId,

            transparencyFile: transparencyFile?.[0] || el.transparencyFile || '',
            barCode: prodInDataToUpdateBarCode?.newData?.length
              ? prodInDataToUpdateBarCode?.newData?.[0]
              : el?.barCode || '',
            isBarCodeAlreadyAttachedByTheSupplier: prodInDataToUpdateBarCode?.newData?.length
              ? false
              : el?.isBarCodeAlreadyAttachedByTheSupplier,
            isBarCodeAttachedByTheStorekeeper: prodInDataToUpdateBarCode?.newData?.length
              ? false
              : el?.isBarCodeAttachedByTheStorekeeper,
          }

          newItems.push(newItem)
        }

        return newItems
      }

      const requestBoxItems = await getNewItems()

      const requestBox = getObjectFilteredByKeyArrayWhiteList(
        {
          ...boxData,
          isShippingLabelAttachedByStorekeeper:
            sourceData.shippingLabel !== boxData.shippingLabel ? false : boxData.isShippingLabelAttachedByStorekeeper,
          items: requestBoxItems,
          shippingLabel: boxData.shippingLabel
            ? boxData.shippingLabel
            : boxData.tmpShippingLabel?.[0]
            ? boxData.tmpShippingLabel?.[0]
            : boxData.shippingLabel === null
            ? null
            : '',
          clientComment: boxData.clientComment,
        },
        updateBoxWhiteList,
      )

      const isBarcodeChanged =
        sourceData.items[0].barCode !== boxData.items[0].barCode || boxData.items[0].tmpBarCode.length !== 0
      const isTransparencyFileChanged =
        !!boxData.items[0].tmpTransparencyFile &&
        (sourceData.items[0].transparencyFile !== boxData.items[0].transparencyFile ||
          boxData.items[0].tmpTransparencyFile.length !== 0)
      const isShippingLabelChanged =
        sourceData.shippingLabel && boxData.shippingLabel && boxData.tmpShippingLabel.length > 0

      const editBoxAndPostTask = async (id: string, requestBox: any) => {
        const editBoxesResult = await this.editBox(id, requestBox)
        await this.postTask({
          // @ts-ignore
          idsData: [editBoxesResult.guid],
          idsBeforeData: [id],
          type: TaskOperationType.EDIT,
          clientComment: boxData.clientTaskComment,
          // @ts-ignore
          priority,
          // @ts-ignore
          reason: priorityReason,
        })

        toast.success(
          `${t(TranslationKey['Formed a task for storekeeper'])} ${sourceData.storekeeper?.name} ${t(
            TranslationKey['to change the Box'],
          )} № ${sourceData.humanFriendlyId}`,
        )
      }

      if (boxData.clientTaskComment || isBarcodeChanged || isTransparencyFileChanged) {
        editBoxAndPostTask(id, requestBox)
      } else if (isShippingLabelChanged) {
        editBoxAndPostTask(id, requestBox)
      } else {
        await BoxesModel.editBoxAtClient(id, {
          destinationId: boxData.destinationId,
          logicsTariffId: boxData.logicsTariffId,
          fbaShipment: boxData.fbaShipment,
          fbaNumber: boxData.fbaNumber,
          clientComment: boxData.clientComment,
          referenceId: boxData.referenceId,
          trackNumberText: boxData.trackNumberText,
          trackNumberFile: boxData.trackNumberFile,
          upsTrackNumber: boxData.upsTrackNumber,
          shippingLabel: boxData.shippingLabel
            ? boxData.shippingLabel
            : boxData.tmpShippingLabel?.[0]
            ? boxData.tmpShippingLabel?.[0]
            : boxData.shippingLabel === null
            ? null
            : '',
          isShippingLabelAttachedByStorekeeper:
            sourceData.shippingLabel !== boxData.shippingLabel ? false : boxData.isShippingLabelAttachedByStorekeeper,
          prepId: boxData.prepId,
          variationTariffId: boxData.variationTariffId,
        })
      }

      await this.updateBarCodesInInventory(dataToBarCodeChange)

      isMultipleEdit && (this.boxesIdsToTask = this.boxesIdsToTask.concat(sourceData.humanFriendlyId))

      !isMultipleEdit && this.loadData()
      !isMultipleEdit && this.onTriggerOpenModal('showEditBoxModal')
      !isMultipleEdit && this.onTriggerOpenModal('showConfirmModal')

      !isMultipleEdit && this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      !isMultipleEdit && this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)

      if (!isMultipleEdit) {
        this.loadData()

        this.onTriggerOpenModal('showEditBoxModal')
      }

      toast.warning(t(TranslationKey['The box is unchanged']))
    } finally {
      runInAction(() => {
        this.uploadedFiles = []
      })
    }
  }

  async onClickMerge(boxBody: any, comment: string, priority: number, priorityReason: string) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      if (boxBody.tmpShippingLabel.length) {
        // @ts-ignore
        await onSubmitPostImages.call(this, { images: boxBody.tmpShippingLabel, type: 'uploadedFiles' })
      }

      const newBoxBody = getObjectFilteredByKeyArrayBlackList(
        {
          ...boxBody,
          shippingLabel: this.uploadedFiles?.length
            ? this.uploadedFiles?.[0]
            : boxBody?.tmpShippingLabel?.[0] || boxBody?.shippingLabel,
        },
        [
          'tmpShippingLabel',
          'storekeeperId',
          'humanFriendlyId',
          'storekeeper',
          'destination',
          'logicsTariff',
          'variationTariff',
          'items',
        ],
        undefined,
        undefined,
        true,
      )

      const mergeBoxesResult = await this.mergeBoxes(this.selectedRows, newBoxBody)

      if (mergeBoxesResult) {
        toast.success(
          `${t(TranslationKey['Formed a task for storekeeper'])} ${
            this.storekeepersData.find(el => el._id === boxBody.storekeeperId)?.name
          } ${t(TranslationKey['to merge boxes'])} `,
        )
      } else {
        toast.warning(t(TranslationKey['The boxes are not joined!']))
      }

      this.onTriggerOpenModal('showMergeBoxModal')
      this.onTriggerOpenModal('showConfirmModal')

      await this.postTask({
        // @ts-ignore
        idsData: [mergeBoxesResult.guid],
        idsBeforeData: this.selectedRows,
        type: operationTypes.MERGE,
        clientComment: comment,
        priority,
        reason: priorityReason,
      })

      this.setRequestStatus(loadingStatus.SUCCESS)

      await this.getCurrentData()

      runInAction(() => {
        this.selectedRows = []
      })
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onClickSubmitGroupingBoxes({ oldBoxes, newBoxes }: { oldBoxes: any[]; newBoxes: any[] }) {
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
        this.selectedRows = []
      })

      toast.success(t(TranslationKey['Data was successfully saved']))

      this.loadData()
    } catch (error) {
      console.error(error)

      toast.error(t(TranslationKey['Boxes are not regrouped']))
    } finally {
      this.onTriggerOpenModal('showGroupingBoxesModal')
    }
  }

  async setCurrentOpenedBox(row: IBox) {
    try {
      runInAction(() => {
        this.curBox = row._id
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }

  async postTask({
    idsData,
    idsBeforeData,
    type,
    clientComment,
    priority,
    reason,
  }: {
    idsData: string[]
    idsBeforeData: string[]
    type: string
    clientComment: string
    priority: number
    reason: string
  }) {
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
          // @ts-ignore
          taskId: res.guid,
          newPriority: null,
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickCurrentTariffsBtn() {
    this.changeItem = null
    this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')

    runInAction(() => {
      this.isCurrentTarrifsButton = true
    })
  }

  async editBox(guid: string, body: any) {
    try {
      const result = await BoxesModel.editBox(guid, body)

      return result
    } catch (error) {
      console.error(error)
    }
  }

  async mergeBoxes(ids: string[], boxBody: any) {
    try {
      const result = await BoxesModel.mergeBoxes(ids, boxBody)

      return result
    } catch (error) {
      console.error(error)
    }
  }

  async splitBoxes(id: string, data: any) {
    try {
      const result = await BoxesModel.splitBoxes(id, data)

      await this.getCurrentData()
      return result
    } catch (error) {
      console.error(error)
    }
  }

  async updateBox(id: string, data: IBox) {
    try {
      await BoxesModel.updateBox(id, data)

      await this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShopNames()
      runInAction(() => {
        this.shopsData = result as IShop[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  triggerRequestToSendBatchModal() {
    this.showRequestToSendBatchModal = !this.showRequestToSendBatchModal
  }

  async updateTaskPriority(taskId: string, priority: number, reason: string) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)
    } catch (error) {
      console.error(error)
    }
  }

  async onClickRequestToSendBatch() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const boxesWithoutTariffOrDestinationIds = this.selectedRows.filter(boxId => {
        const findBox = this.currentData.find((box: IBox) => box._id === boxId)
        return !findBox?.logicsTariff || !findBox?.destination
      })

      if (boxesWithoutTariffOrDestinationIds.length) {
        toast.warning(
          `${t(
            TranslationKey['Boxes do not have enough fare or destination. The following boxes will not be counted'],
          )}: ${boxesWithoutTariffOrDestinationIds
            // @ts-ignore
            .map(el => this.currentData?.find(box => box?._id === el)?.humanFriendlyId)
            .join(', ')} `,
        )

        this.setRequestStatus(loadingStatus.FAILED)

        return
      }

      runInAction(() => {
        this.selectedRows = this.selectedRows.filter(el => !boxesWithoutTariffOrDestinationIds.includes(el))
      })

      const response = await BatchesModel.calculateBoxDeliveryCostsInBatch(this.selectedRows)

      runInAction(() => {
        this.boxesDeliveryCosts = response as any
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
      this.triggerRequestToSendBatchModal()
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onClickSendBoxesToBatch() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const boxesSendToBatch = this.selectedRows.filter(
        // @ts-ignore
        selectedBoxId => this.boxesDeliveryCosts.find(priceObj => priceObj.guid === selectedBoxId)?.deliveryCost,
      )
      await BatchesModel.requestSendBoxToBatch(boxesSendToBatch)

      runInAction(() => {
        this.showRequestToSendBatchModal = false
        this.selectedRows = []
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
      this.updateUserInfo()
      this.loadData()
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onClickMergeBtn() {
    try {
      const isMasterBoxSelected = this.selectedRows.some(boxId => {
        const findBox = this.currentData.find((box: any) => box._id === boxId)
        return findBox?.amount && findBox.amount > 1
      })

      if (isMasterBoxSelected) {
        toast.warning(t(TranslationKey['Cannot be merged with a Superbox']))

        return
      }

      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations as IDestination[]
      })

      this.onTriggerOpenModal('showMergeBoxModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSplitBtn() {
    try {
      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations as IDestination[]
      })

      this.onTriggerOpenModal('showRedistributeBoxModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickWarehouseOrderButton(guid: string) {
    const selectedBox = this.currentData?.find((el: any) => el._id === guid)
    const selectedBoxItems = selectedBox?.items

    if (selectedBoxItems?.length > 1) {
      toast.warning(t(TranslationKey['A box contains more than one product']))

      return
    }

    const selectedBoxProductId = selectedBoxItems?.[0]?.product?._id

    try {
      runInAction(() => {
        this.productBatches = []
        this.activeProductGuid = selectedBoxProductId
      })

      const result = await ClientModel.getProductById(selectedBoxProductId)

      runInAction(() => {
        this.selectedWarehouseOrderProduct = { ...result, _id: selectedBoxProductId } as unknown as IProduct
      })

      this.onTriggerOpenModal('showProductModal')

      if (this.showProductModal) {
        this.productAndBatchModalSwitcherCondition = ProductAndBatchModalSwitcherConditions.ORDER_INFORMATION
      }
    } catch (e) {
      console.error(e)

      runInAction(() => {
        this.selectedWarehouseOrderProduct = null
      })
    }
  }

  onClickChangeProductAndBatchModalCondition(value: ProductAndBatchModalSwitcherConditions) {
    this.productAndBatchModalSwitcherCondition = value

    if (value === ProductAndBatchModalSwitcherConditions.BATCH_DATA) {
      this.getBatches()
    }
  }

  async getCurrBatch(guid: string) {
    try {
      const result = await BatchesModel.getBatchesByGuid(guid)

      runInAction(() => {
        this.currentBatch = result as unknown as IBatch
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.currentBatch = null
      })
    }
  }

  async onClickMyOrderModal(id: string) {
    if (window?.getSelection?.()?.toString()) {
      return
    }

    await this.getOrderById(id)

    this.onTriggerOpenModal('showMyOrderModal')

    if (this.showMyOrderModal) {
      this.myOrderModalSwitcherCondition = MyOrderModalSwitcherConditions.BASIC_INFORMATION
    }
  }

  async getOrderById(orderId: string) {
    try {
      const resolve = await ClientModel.getOrderById(orderId)

      runInAction(() => {
        this.order = resolve as unknown as IOrder
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getBatches() {
    try {
      const result = await BatchesModel.getBatchesbyProduct({ guid: this.activeProductGuid, archive: false })

      runInAction(() => {
        this.productBatches = result as unknown as IBatch[]
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.productBatches = []
      })
    }
  }

  onClickOpenNewTab(orderId: string) {
    window
      ?.open(`/client/my-orders/orders/order?orderId=${orderId}&order-human-friendly-id=${orderId}`, '_blank')
      ?.focus()
  }

  onClickChangeMyOrderModalCondition(value: MyOrderModalSwitcherConditions) {
    this.myOrderModalSwitcherCondition = value
  }

  onClickCancelOrder(orderId: string) {
    this.confirmModalSettings = {
      isWarning: true,
      title: t(TranslationKey.Attention),
      message: t(TranslationKey['Are you sure you want to cancel the order?']),
      onSubmit: () => {
        this.onSubmitCancelOrder(orderId)
        this.onTriggerOpenModal('showConfirmModal')
        this.onTriggerOpenModal('showMyOrderModal')
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitCancelOrder(orderId: string) {
    try {
      await ClientModel.cancelOrder(orderId)
    } catch (error) {
      console.error(error)
    }
  }

  async onClickReorder(item: IOrder, isPending: boolean) {
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
      console.error(error)
    }
  }

  async onClickContinueBtn(item: any) {
    try {
      const [storekeepers, destinations, order] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        ClientModel.getOrderById(item._id),
      ])

      runInAction(() => {
        this.storekeepersData = storekeepers as unknown as IStorekeeper[]
        this.destinations = destinations as unknown as IDestination[]
        this.reorderOrdersData = [order] as unknown as IOrder[]
      })

      this.onTriggerOpenModal('showOrderModal')

      if (this.showCheckPendingOrderFormModal) {
        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  onDoubleClickBarcode = (item: IProduct) => {
    this.selectedProduct = item

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  onConfirmSubmitOrderProductModal({ ordersDataState, totalOrdersCost }: any) {
    this.confirmModalSettings = {
      isWarning: false,
      title: t(TranslationKey['You are making an order, are you sure?']),
      message: ordersDataState.some((el: any) => el.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onSubmit: () => this.onSubmitOrderProductModal(ordersDataState),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal(ordersDataState: any) {
    try {
      for (let i = 0; i < ordersDataState.length; i++) {
        let orderObject = ordersDataState[i]
        let uploadedTransparencyFiles = []

        if (orderObject.tmpBarCode.length) {
          // @ts-ignore
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        if (orderObject.tmpTransparencyFile.length) {
          // @ts-ignore
          uploadedTransparencyFiles = await onSubmitPostImages.call(this, {
            images: orderObject.tmpTransparencyFile,
            type: 'uploadedFiles',
          })

          orderObject = {
            ...orderObject,
            transparencyFile: uploadedTransparencyFiles[0],
          }
        }

        await this.createOrder(orderObject)
      }

      this.onTriggerOpenModal('showConfirmModal')

      this.onTriggerOpenModal('showOrderModal')

      this.onTriggerOpenModal('showMyOrderModal')
    } catch (error) {
      console.error(error)
    }
  }

  async createOrder(orderObject: any) {
    try {
      const requestData = getObjectFilteredByKeyArrayWhiteList(orderObject, createOrderRequestWhiteList)

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }

      await this.updateUserInfo()
    } catch (error) {
      console.error(error)
    }
  }

  onClickPandingOrder(id: string) {
    window?.open(`${window.location.origin}/client/my-orders/pending-orders/order?orderId=${id}`, '_blank')?.focus()
  }

  async onSubmitSaveOrder(order: any) {
    try {
      if (order.tmpBarCode.length) {
        // @ts-ignore
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

      // @ts-ignore
      await OrderModel.changeOrderData(this.order._id, dataToRequest)

      toast.success(t(TranslationKey['Data saved successfully']))

      await this.getOrderById(order._id)
    } catch (error) {
      console.error(error)
    }
  }

  onOpenProductDataModal(onAmazon: boolean) {
    this.onAmazon = onAmazon

    this.onTriggerOpenModal('showProductDataModal')
  }

  async onClickSaveClientComment(itemId: string, value: string) {
    try {
      await BoxesModel.editAdditionalInfo(itemId, {
        clientComment: value,
      })

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
