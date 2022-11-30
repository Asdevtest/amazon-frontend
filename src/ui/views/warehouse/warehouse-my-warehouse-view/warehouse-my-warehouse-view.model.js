/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BatchStatus} from '@constants/batch-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {warehouseBoxesViewColumns} from '@components/table-columns/warehouse/warehouse-boxes-columns'

import {
  clientWarehouseDataConverter,
  warehouseBatchesDataConverter,
  warehouseBoxesDataConverter,
} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostFilesInData, onSubmitPostImages} from '@utils/upload-files'

const updateBoxWhiteList = [
  'shippingLabel',
  'lengthCmWarehouse',
  'widthCmWarehouse',
  'heightCmWarehouse',
  'weighGrossKgWarehouse',
  'isShippingLabelAttachedByStorekeeper',
  'fbaShipment',
  'images',
  'destinationId',
  'items',
  'storekeeperComment',
  'logicsTariffId',
]

export class WarehouseMyWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  volumeWeightCoefficient = undefined
  nameSearchValue = ''
  boxesMy = []
  tasksMy = []
  boxesData = []
  batches = []
  baseBoxesMy = []

  destinations = []

  curBox = undefined
  curBoxToMove = undefined
  sourceBoxForBatch = undefined

  drawerOpen = false
  selectedBoxes = []
  curOpenedTask = {}
  toCancelData = {}

  currentData = []

  showBoxViewModal = false
  showBoxMoveToBatchModal = false
  showAddBatchModal = false
  showAddOrEditHsCodeInBox = false
  showEditBoxModal = false
  showFullEditBoxModal = false
  showSuccessInfoModal = false

  showEditMultipleBoxesModal = false

  modalEditSuccessMessage = ''

  rowHandlers = {
    moveBox: item => this.moveBox(item),
    setHsCode: item => this.setHsCode(item),
    setDimensions: item => this.setDimensions(item),
    onEditBox: item => this.onEditBox(item),
  }
  uploadedImages = []
  uploadedFiles = []
  progressValue = 0
  showProgress = false

  rowCount = 0

  firstRowId = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = warehouseBoxesViewColumns(this.rowHandlers, this.firstRowId, this.userInfo)

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

    reaction(
      () => this.firstRowId,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.boxesMy,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      runInAction(() => {
        this.boxesMy = warehouseBoxesDataConverter(this.baseBoxesMy, this.volumeWeightCoefficient)
      })

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
    this.firstRowId = state.sorting.sortedRows[0]

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
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = warehouseBoxesViewColumns(this.rowHandlers, this.firstRowId, this.userInfo).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
    this.curPage = 0

    this.getBoxesMy()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.getBoxesMy()
  }

  onSelectionModel(model) {
    const boxes = this.boxesMy.filter(box => model.includes(box.id))
    const res = boxes.reduce((ac, el) => ac.concat(el._id), [])
    this.selectedBoxes = res
  }

  getCurrentData() {
    return toJS(this.boxesMy)
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue
    this.getBoxesMy()
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getBoxesMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      await StorekeeperModel.updateBoxComment(data._id, {storekeeperComment: data.storekeeperComment})

      this.getBoxesMy()

      this.onTriggerOpenModal('showBoxViewModal')

      this.modalEditSuccessMessage = t(TranslationKey['Data saved successfully'])

      this.onTriggerOpenModal('showSuccessInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSubmitEditMultipleBoxes(newBoxes, selectedBoxes) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.onTriggerOpenModal('showEditMultipleBoxesModal')

      for (let i = 0; i < newBoxes.length; i++) {
        const newBox = newBoxes[i]

        const sourceBox = selectedBoxes[i]

        await this.onClickSubmitEditBox({id: sourceBox._id, boxData: newBox, isMultipleEdit: true})
      }

      this.modalEditSuccessMessage = t(TranslationKey['Editing completed'])

      this.onTriggerOpenModal('showSuccessInfoModal')

      this.loadData()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async onClickSubmitEditBox({id, boxData, imagesOfBox, dataToSubmitHsCode, isMultipleEdit}) {
    try {
      this.selectedBoxes = []
      this.uploadedFiles = []
      this.uploadedImages = []

      if (boxData.tmpShippingLabel?.length) {
        await onSubmitPostImages.call(this, {
          images: boxData.tmpShippingLabel,
          type: 'uploadedFiles',
          withoutShowProgress: true,
        })
      }

      if (imagesOfBox?.length) {
        await onSubmitPostImages.call(this, {
          images: imagesOfBox,
          type: 'uploadedImages',
          withoutShowProgress: true,
        })
      }

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
          ...getObjectFilteredByKeyArrayBlackList(el, [
            'amount',
            'order',
            'product',
            'tmpBarCode',
            'changeBarCodInInventory',
          ]),

          _id: el._id,

          barCode: prodInDataToUpdateBarCode?.newData?.length ? prodInDataToUpdateBarCode?.newData[0] : el.barCode,

          isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier,

          isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper,
        }
      })

      const requestBox = getObjectFilteredByKeyArrayWhiteList(
        {
          ...boxData,
          images: this.uploadedImages?.length ? [...boxData.images, ...this.uploadedImages] : boxData.images,
          items: newItems,
          shippingLabel: this.uploadedFiles?.length ? this.uploadedFiles[0] : boxData.shippingLabel,
        },
        updateBoxWhiteList,
      )

      await StorekeeperModel.editBox(id, requestBox)

      if (dataToSubmitHsCode) {
        await ProductModel.editProductsHsCods(dataToSubmitHsCode)
      }

      if (!isMultipleEdit) {
        this.loadData()

        this.onTriggerOpenModal('showFullEditBoxModal')

        this.modalEditSuccessMessage = t(TranslationKey['Data saved successfully'])

        this.onTriggerOpenModal('showSuccessInfoModal')
      }
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickEditBtn() {
    try {
      const destinations = await ClientModel.getDestinations()

      const storekeepersData = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.destinations = destinations

        this.storekeepersData = storekeepersData
      })

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showEditBoxModal')
    } catch (error) {
      console.log(error)
    }
  }

  async getDataToMoveBatch() {
    try {
      const batches = await BatchesModel.getBatches(BatchStatus.IS_BEING_COLLECTED)
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.batches = warehouseBatchesDataConverter(batches, this.volumeWeightCoefficient)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async moveBox(row) {
    try {
      this.curBoxToMove = row
      await this.getDataToMoveBatch()

      this.onTriggerOpenModal('showBoxMoveToBatchModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async setHsCode(row) {
    try {
      this.curBox = row

      this.onTriggerOpenModal('showAddOrEditHsCodeInBox')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onEditBox() {
    try {
      const destinations = await ClientModel.getDestinations()

      const storekeepersData = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.destinations = destinations

        this.storekeepersData = storekeepersData
      })

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      if (this.selectedBoxes.length === 1) {
        this.curBox = this.boxesMy.find(el => el._id === this.selectedBoxes[0]).originalData

        this.onTriggerOpenModal('showFullEditBoxModal')
      } else {
        this.onTriggerOpenModal('showEditMultipleBoxesModal')
      }
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async setDimensions(row) {
    try {
      this.curBox = row
      console.log(row)
      this.onTriggerShowEditBoxModal()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitEditBox(id, data) {
    try {
      if (data.tmpImages.length > 0) {
        await onSubmitPostImages.call(this, {images: data.tmpImages, type: 'uploadedFiles'})

        data = {...data, images: [...data.images, ...this.uploadedFiles]}
      }

      const updateBoxData = {
        ...getObjectFilteredByKeyArrayWhiteList(
          data,
          // ['deliveryLength', 'deliveryWidth', 'deliveryHeight', 'deliveryMass', 'fitsInitialDimensions', 'images'],
          ['lengthCmWarehouse', 'widthCmWarehouse', 'heightCmWarehouse', 'weighGrossKgWarehouse', 'images'],
          false,
          (key, value) => {
            if (key === 'images') {
              return value || []
            } else {
              return value
            }
          },
        ),
      }

      await BoxesModel.editBoxByStorekeeper(id, updateBoxData)

      this.onTriggerShowEditBoxModal()
      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitAddBatch(boxesIds, filesToAdd) {
    try {
      this.uploadedFiles = []

      if (filesToAdd.length) {
        await onSubmitPostImages.call(this, {images: filesToAdd, type: 'uploadedFiles'})
      }

      const batchId = await BatchesModel.createBatch(boxesIds)

      if (filesToAdd.length) {
        await BatchesModel.editAttachedDocuments(batchId.guid, this.uploadedFiles)
      }

      this.loadData()
      this.onTriggerOpenModal('showAddBatchModal')
      this.onTriggerOpenModal('showBoxMoveToBatchModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitAddOrEditHsCode(data) {
    try {
      await ProductModel.editProductsHsCods(data)

      this.loadData()
      this.onTriggerOpenModal('showAddOrEditHsCodeInBox')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitMoveBoxToBatch(box, selectedBatch) {
    try {
      if (box.batchId) {
        await BatchesModel.removeBoxFromBatch(box.batchId, [box._id])
      }

      await BatchesModel.addBoxToBatch(selectedBatch.id, [box._id])

      this.loadData()

      this.onTriggerOpenModal('showBoxMoveToBatchModal')
    } catch (error) {
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

  async onSubmitCreateBatch(box) {
    try {
      const boxes = await BoxesModel.getBoxesReadyToBatchStorekeeper()

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.boxesData = clientWarehouseDataConverter(boxes, result.volumeWeightCoefficient)

        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.sourceBoxForBatch = box
      })

      this.onTriggerOpenModal('showAddBatchModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerShowEditBoxModal() {
    this.showEditBoxModal = !this.showEditBoxModal
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e

    this.getBoxesMy()
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async getBoxesMy() {
    try {
      const productFilter = `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};`

      // const boxFilter = `[humanFriendlyId][$eq]=${this.nameSearchValue};`

      // const orderFilter = `or[0][id][$eq]=${this.nameSearchValue};or[1][item][$eq]=${this.nameSearchValue};`

      // const orderFilter = `[item][$eq]=${this.nameSearchValue};`

      const boxes = await StorekeeperModel.getBoxesMyPag({
        filtersProduct: this.nameSearchValue ? productFilter : null,

        // filtersBox: this.nameSearchValue ? boxFilter :  null,

        // filtersOrders: this.nameSearchValue ? orderFilter : null,

        storekeeperId: this.currentStorekeeper && this.currentStorekeeper._id,

        limit: this.rowsPerPage,
        offset: this.curPage * this.rowsPerPage,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.rowCount = boxes.count

        this.baseBoxesMy = boxes.rows

        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.boxesMy = warehouseBoxesDataConverter(boxes.rows, result.volumeWeightCoefficient)
      })
    } catch (error) {
      console.log(error)
      this.error = error

      runInAction(() => {
        this.boxesMy = []

        this.baseBoxesMy = []
      })
    }
  }
}
