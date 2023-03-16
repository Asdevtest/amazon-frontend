/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BoxStatus} from '@constants/box-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {operationTypes} from '@constants/operation-types'
import {TaskOperationType} from '@constants/task-operation-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {GeneralModel} from '@models/general-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {ShopModel} from '@models/shop-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientBoxesViewColumns} from '@components/table-columns/client/client-boxes-columns'

import {clientWarehouseDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {getTableByColumn, objectToUrlQs} from '@utils/text'
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
  'referenceId',
  'trackNumberFile',
  'trackNumberText',
  'fbaNumber',
  'prepId',
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
]

export class ClientInStockBoxesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  selectedBox = undefined

  boxesMy = []
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
  clientDestinations = []
  // isFormed = null

  curDestination = undefined
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

    isFormedData: {isFormed: null, onChangeIsFormed: value => this.onChangeIsFormed(value)},

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

  changeItem = null

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
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
  }

  setChangeItem(item) {
    this.changeItem = item
  }

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  rowCount = 0
  sortModel = []
  filterModel = {items: []}

  curPage = 0
  rowsPerPage = 15

  curPageForTask = 0
  rowsPerPageForTask = 15

  densityModel = 'compact'
  columnsModel = clientBoxesViewColumns(
    this.rowHandlers,
    this.storekeepersData,
    this.destinations,
    SettingsModel.destinationsFavourites,
    this.columnMenuSettings,
    this.onHover,
  )

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  constructor({history}) {
    const url = new URL(window.location.href)

    runInAction(() => {
      this.history = history

      this.currentStorekeeper = {_id: url.searchParams.get('storekeeper-id')}
      this.nameSearchValue = url.searchParams.get('search-text')
    })

    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.boxesMy,
      () => {
        runInAction(() => {
          this.currentData = this.getCurrentData()
        })
      },
    )

    reaction(
      () => this.currentStorekeeper,
      () => this.getClientDestinations(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      runInAction(() => {
        this.boxesMy = clientWarehouseDataConverter(this.baseBoxesMy, this.volumeWeightCoefficient, this.shopsData)
      })

      this.getDataGridState()
    }
  }

  async getDestinations() {
    this.destinations = await ClientModel.getDestinations()
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_WAREHOUSE)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_WAREHOUSE]

    runInAction(() => {
      if (state) {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = clientBoxesViewColumns(
          this.rowHandlers,
          this.storekeepersData,
          this.destinations,
          SettingsModel.destinationsFavourites,
          this.columnMenuSettings,
          this.onHover,
        ).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = clientBoxesViewColumns(
        this.rowHandlers,
        this.storekeepersData,
        this.destinations,
        SettingsModel.destinationsFavourites,
        this.columnMenuSettings,
        this.onHover,
      ).map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
      this.curPage = 0
    })

    this.getBoxesMy()
  }

  onChangeRowsPerPageForTask(e) {
    runInAction(() => {
      this.rowsPerPageForTask = e
      this.curPageForTask = 0
    })

    this.getBoxesMy()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.getBoxesMy()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedBoxes = model
    })
  }

  getCurrentData() {
    return toJS(this.boxesMy)
  }

  getCurrentTaskData() {
    return toJS(this.tasksMy)
  }

  onClickStorekeeperBtn(storekeeper) {
    runInAction(() => {
      this.selectedBoxes = []

      this.currentStorekeeper = storekeeper ? storekeeper : undefined
    })

    this.getBoxesMy()
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK)

      runInAction(() => {
        this.storekeepersData = result

        this.currentStorekeeper = this.currentStorekeeper
          ? this.currentStorekeeper
          : result.filter(storekeeper => storekeeper.boxesCount !== 0).sort((a, b) => a.name?.localeCompare(b.name))[0]
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
        await onSubmitPostImages.call(this, {images: data.tmpTrackNumberFile, type: 'uploadedFiles'})
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
        prepId: data.prepId,
      })

      // const dataToSubmitHsCode = data.items.map(el => ({productId: el.product._id, hsCode: el.product.hsCode}))
      // await ProductModel.editProductsHsCods(dataToSubmitHsCode)

      this.getBoxesMy()

      // this.loadData()

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
      await onSubmitPostImages.call(this, {images: tmpShippingLabel, type: 'uploadedFiles'})
    }

    if (this.selectedBox.shippingLabel === null) {
      await ClientModel.editShippingLabelFirstTime(this.selectedBox._id, {shippingLabel: this.uploadedFiles[0]})

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
        }
      })

      this.onTriggerOpenModal('showConfirmModal')

      this.checkAndOpenFbaShipmentEdit()
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
          destinationId: boxData.destination?._id,
          logicsTariffId: boxData.logicsTariff?._id,
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
  onClickConfirmCreateSplitTasks(id, updatedBoxes, type, isMasterBox, comment, sourceBox) {
    this.onTriggerOpenModal('showConfirmModal')

    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        confirmMessage: `${t(TranslationKey['The task for the warehouse will be formed'])} ${
          sourceBox?.storekeeper?.name
        } ${t(TranslationKey['to redistribute the Box'])} № ${sourceBox?.humanFriendlyId}`,
        onClickConfirm: () => this.onRedistribute(id, updatedBoxes, type, isMasterBox, comment, sourceBox),
      }
    })
  }
  onClickConfirmCreateChangeTasks(id, boxData, sourceData) {
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
        onClickConfirm: () => this.onEditBoxSubmit(id, boxData, sourceData),
      }
    })
  }

  onClickConfirmCreateMergeTasks(boxBody, comment) {
    this.onTriggerOpenModal('showConfirmModal')

    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        confirmMessage: `${t(TranslationKey['The task for the warehouse will be formed'])} ${
          this.storekeepersData.find(el => el._id === boxBody.storekeeperId)?.name
        } ${t(TranslationKey['to merge boxes'])}`,
        onClickConfirm: () => this.onClickMerge(boxBody, comment),
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
      await BoxesModel.editBoxAtClient(box._id, {fbaShipment: ''})

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSaveFbaShipment(fbaShipment) {
    try {
      await BoxesModel.editBoxAtClient(this.selectedBox._id, {fbaShipment})

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
        this.selectedBox = {...this.selectedBox, fbaShipment}
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

  async onClickSavePrepId(item, value) {
    try {
      await BoxesModel.editAdditionalInfo(item._id, {
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

  onClickDestinationBtn(destination) {
    runInAction(() => {
      this.curDestination = destination ? destination : undefined
    })
    this.getBoxesMy()
  }

  openModalAndClear() {
    this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
    this.changeItem = null
  }

  async getClientDestinations() {
    try {
      const clientDestinations = await ClientModel.getClientDestinations({
        status: BoxStatus.IN_STOCK,
        storekeeperId: this.currentStorekeeper ? this.currentStorekeeper._id : null,
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
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getStorekeepers()
      await this.getDestinations()

      await this.getClientDestinations()

      await this.getShops()

      await this.getBoxesMy()

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

  onTriggerDrawer() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage = e => {
    runInAction(() => {
      this.curPage = e
    })

    this.getBoxesMy()
  }

  onChangeCurPageForTask = e => {
    runInAction(() => {
      this.curPageForTask = e
    })

    this.getBoxesMy()
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getBoxesMy()
  }

  async onRedistribute(id, updatedBoxes, type, isMasterBox, comment, sourceBox) {
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
    this.getDataGridState()
  }

  onLeaveColumnField() {
    this.onHover = null
    this.getDataGridState()
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

      const destinations = await ClientModel.getDestinations()

      const result = await UserModel.getPlatformSettings()

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

      const uploadedShippingLabeles = []

      const uploadedBarcodes = []

      runInAction(() => {
        this.boxesIdsToTask = []
      })

      for (let i = 0; i < newBoxes.length; i++) {
        const newBox = {...newBoxes[i]}
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
      await BoxesModel.editBoxAtClient(id, {
        destinationId: boxData.destinationId,
      })

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
      })
    }
  }

  async editTariff(id, boxData) {
    try {
      await BoxesModel.editBoxAtClient(id, {
        logicsTariffId: boxData.logicsTariffId,
      })

      await this.getBoxesMy()

      this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
      })
    }
  }

  async onEditBoxSubmit(id, boxData, sourceData, isMultipleEdit) {
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

        const editBoxesResult = await this.editBox({id, data: requestBox})

        await this.updateBarCodesInInventory(dataToBarCodeChange)

        await this.postTask({
          idsData: [editBoxesResult.guid],
          idsBeforeData: [id],
          type: TaskOperationType.EDIT,
          clientComment: boxData.clientTaskComment,
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

  async onClickMerge(boxBody, comment) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const selectedIds = this.selectedBoxes

      runInAction(() => {
        this.uploadedFiles = []
      })

      if (boxBody.tmpShippingLabel.length) {
        await onSubmitPostImages.call(this, {images: boxBody.tmpShippingLabel, type: 'uploadedFiles'})
      }

      const newBoxBody = getObjectFilteredByKeyArrayBlackList(
        {...boxBody, shippingLabel: this.uploadedFiles.length ? this.uploadedFiles[0] : boxBody.shippingLabel},
        ['tmpShippingLabel', 'storekeeperId', 'humanFriendlyId'],
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

  async onClickSubmitGroupingBoxes({oldBoxes, newBoxes}) {
    try {
      await BoxesModel.regroupBoxes({
        boxIds: oldBoxes.map(el => el._id),
        newAmounts: newBoxes.map(el => Number(el.amount)).filter(num => num >= 1),
      })

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
      runInAction(() => {
        this.curBox = row
      })
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
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

    this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
  }

  async editBox(box) {
    try {
      const result = await BoxesModel.editBox(box)

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

  // Новый методя для запроса

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

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'boxes'),
        column,

        // `boxes/pag/clients_light?status=IN_STOCK&filters=;${this.getFilter(column)}${
        //   shopFilter ? ';&' + 'shopIds=' + shopFilter : ''
        // }${isFormedFilter ? ';&' + 'isFormed=' + isFormedFilter : ''}`,

        `boxes/pag/clients_light?status=IN_STOCK&filters=;${this.getFilter(column)}${
          shopFilter ? ';&' + '[shopIds][$eq]=' + shopFilter : ''
        }${isFormedFilter ? ';&' + 'isFormed=' + isFormedFilter : ''}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: {...this.columnMenuSettings[column], filterData: data},
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
      const result = await ShopModel.getMyShops()
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

    // const statusFilter =
    //   exclusion !== 'status' &&
    //   this.columnMenuSettings.status.currentFilterData.length &&
    //   this.columnMenuSettings.status.currentFilterData.join(',')

    const filter = objectToUrlQs({
      or: [
        {asin: {$contains: this.nameSearchValue}},
        {amazonTitle: {$contains: this.nameSearchValue}},
        {skusByClient: {$contains: this.nameSearchValue}},
        {id: {$eq: this.nameSearchValue}},
        {item: {$eq: this.nameSearchValue}},
        {productId: {$eq: this.nameSearchValue}},
        {humanFriendlyId: {$eq: this.nameSearchValue}},
        {prepId: {$contains: this.nameSearchValue}},
      ].filter(
        el =>
          ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) &&
            !el.id &&
            !el.humanFriendlyId) ||
          !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
      ),

      ...(humanFriendlyIdFilter && {
        humanFriendlyId: {$eq: humanFriendlyIdFilter},
      }),
      ...(idFilter && {
        id: {$eq: idFilter},
      }),

      ...(itemFilter && {
        item: {$eq: itemFilter},
      }),

      ...(asinFilter && {
        asin: {$eq: asinFilter},
      }),
      ...(skusByClientFilter && {
        skusByClient: {$eq: skusByClientFilter},
      }),
      ...(amazonTitleFilter && {
        amazonTitle: {$eq: amazonTitleFilter},
      }),

      ...(destinationFilter && {
        destinationId: {$eq: destinationFilter},
      }),
      ...(logicsTariffFilter && {
        logicsTariffId: {$eq: logicsTariffFilter},
      }),

      ...(createdAtFilter && {
        createdAt: {$eq: createdAtFilter},
      }),
      ...(updatedAtFilter && {
        updatedAt: {$eq: updatedAtFilter},
      }),

      ...(amountFilter && {
        amount: {$eq: amountFilter},
      }),

      ...(prepIdFilter && {
        prepId: {$eq: prepIdFilter},
      }),

      // ...(statusFilter && {
      //   status: {$eq: statusFilter},
      // }),
    })

    return filter
  }

  async getBoxesMy() {
    try {
      const curShops = this.columnMenuSettings.shopIds.currentFilterData?.map(shop => shop._id).join(',')

      const curStatus = this.columnMenuSettings.status.currentFilterData.length
        ? this.columnMenuSettings.status.currentFilterData.join(',')
        : `${BoxStatus.NEW},${BoxStatus.IN_STOCK},${BoxStatus.REQUESTED_SEND_TO_BATCH},${BoxStatus.ACCEPTED_IN_PROCESSING}`

      const result = await BoxesModel.getBoxesForCurClientLightPag(curStatus, {
        filters: this.getFilter() /* this.nameSearchValue ? filter : null */,

        storekeeperId: this.currentStorekeeper && this.currentStorekeeper._id,

        destinationId: this.curDestination && this.curDestination._id,

        shopIds: this.columnMenuSettings.shopIds.currentFilterData ? curShops : null,

        isFormed: this.columnMenuSettings.isFormedData.isFormed,

        limit: this.rowsPerPage,
        offset: this.curPage * this.rowsPerPage,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
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

      const boxesDeliveryCosts = await BatchesModel.calculateBoxDeliveryCostsInBatch(toJS(this.selectedBoxes))

      const result = await UserModel.getPlatformSettings()

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
