import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { Errors } from '@constants/errors'
import { BatchStatus } from '@constants/statuses/batch-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { GeneralModel } from '@models/general-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { warehouseBoxesViewColumns } from '@components/table/table-columns/warehouse/warehouse-boxes-columns'

import { warehouseBatchesDataConverter, warehouseBoxesDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostFilesInData, onSubmitPostImages } from '@utils/upload-files'

import { Dimensions } from '@typings/enums/dimensions'
import { loadingStatus } from '@typings/enums/loading-status'

import {
  filtersFields,
  sharedFieldsWhiteList,
  updateBoxWhiteList,
  updateManyBoxesWhiteList,
} from './warehouse-my-warehouse-view.constants'

export class WarehouseMyWarehouseViewModel {
  requestStatus = undefined

  nameSearchValue = ''
  boxesMy = []
  tasksMy = []
  boxesData = []
  batches = []
  baseBoxesMy = []

  destinations = []

  curBox = ''
  curBoxToMove = undefined
  sourceBoxForBatch = undefined

  unitsOption = Dimensions.EU

  selectedBoxes = []

  curOpenedTask = {}
  toCancelData = {}

  showBoxViewModal = false
  showBoxMoveToBatchModal = false
  showAddBatchModal = false
  showAddOrEditHsCodeInBox = false
  showEditBoxModal = false
  showFullEditBoxModal = false
  showMergeBoxModal = false
  showRedistributeBoxModal = false
  showGroupingBoxesModal = false
  showEditBoxModalR = false
  showEditMultipleBoxesModal = false

  rowHandlers = {
    moveBox: item => this.moveBox(item),
    setHsCode: item => this.setHsCode(item),
    setDimensions: item => this.setDimensions(item),
    onEditBox: item => this.onEditBox(item),
    onClickSavePrepId: (item, value) => this.onClickSavePrepId(item, value),
    onClickSaveStorage: (item, value) => this.onClickSaveStorage(item, value),
    onChangeUnitsOption: option => this.onChangeUnitsOption(option),
  }

  uploadedImages = []
  uploadedFiles = []
  uploadedTransparencyFiles = []

  progressValue = 0
  showProgress = false

  rowCount = 0

  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  densityModel = 'compact'
  columnsModel = warehouseBoxesViewColumns(this.rowHandlers, () => this.unitsOption)

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getBoxesMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  get currentData() {
    return this.boxesMy
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.unitsOption,
      () => (this.columnsModel = warehouseBoxesViewColumns(this.rowHandlers, () => this.unitsOption)),
    )
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
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

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
    this.setDataGridState()
    this.getBoxesMy()
  }

  onTriggerShowEditBoxModalR(box) {
    this.curBox = box
    this.showEditBoxModalR = !this.showEditBoxModalR
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.CLIENT_WAREHOUSE)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.CLIENT_WAREHOUSE)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
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
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue.trim()

    this.getBoxesMy()
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getBoxesMy()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSavePrepId(itemId, value) {
    try {
      await BoxesModel.editAdditionalInfo(itemId, {
        prepId: value,
      })

      this.getBoxesMy()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveStorage(itemId, value) {
    try {
      await BoxesModel.editAdditionalInfo(itemId, {
        storage: value,
      })

      this.getBoxesMy()
    } catch (error) {
      console.error(error)
    }
  }

  async uploadImageIfNotUploaded(image, cache) {
    const imageKey = JSON.stringify(image)
    const cachedImage = cache.find(el => el.strKey === imageKey)

    if (cachedImage) {
      return cachedImage.link
    } else {
      await onSubmitPostImages.call(this, {
        images: [image],
        type: 'uploadedFiles',
        withoutShowProgress: true,
      })

      const link = this.uploadedFiles[0] || image
      cache.push({ strKey: imageKey, link })
      return link
    }
  }

  async uploadSharedFieldFile(sharedFields, fieldName, uploadedFieldName) {
    if (sharedFields[fieldName]?.length) {
      await onSubmitPostImages.call(this, {
        images: sharedFields[fieldName],
        type: 'uploadedFiles',
        withoutShowProgress: true,
      })
      sharedFields[uploadedFieldName] = this.uploadedFiles[0]
    }
  }

  async onClickSubmitEditMultipleBoxes(newBoxes, sharedFields) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.onTriggerOpenModal('showEditMultipleBoxesModal')

      const uploadedShippingLabels = []
      const uploadedBarcodes = []
      const updatedBoxes = []

      for (const [i, newBox] of newBoxes.entries()) {
        const newBoxCopy = { ...newBox }

        // Upload shipping label if needed
        if (newBoxCopy.tmpShippingLabel?.length) {
          newBoxCopy.shippingLabel = await this.uploadImageIfNotUploaded(
            newBoxCopy.tmpShippingLabel[0],
            uploadedShippingLabels,
          )
        }

        const dataToBarCodeChange = newBoxCopy.items
          .filter(el => el.tmpBarCode?.length)
          .map(el => ({
            changeBarCodInInventory: el.changeBarCodInInventory,
            productId: el.product._id,
            tmpBarCode: el.tmpBarCode,
            newData: [],
          }))

        for (const barcodeChange of dataToBarCodeChange) {
          barcodeChange.newData = [await this.uploadImageIfNotUploaded(barcodeChange.tmpBarCode[0], uploadedBarcodes)]
        }

        const currentBoxItems = []

        for (const el of newBoxCopy.items) {
          const prodInDataToUpdateBarCode = dataToBarCodeChange.find(item => item.productId === el.product._id)
          let transparencyFileLink = el.transparencyFile || ''

          if (el.tmpTransparencyFile?.length) {
            await onSubmitPostImages.call(this, {
              images: el.tmpTransparencyFile,
              type: 'uploadedFiles',
              withoutShowProgress: true,
            })
            transparencyFileLink = this.uploadedFiles[0]
          }

          const validItem = {
            ...getObjectFilteredByKeyArrayBlackList(el, [
              '_id',
              'order',
              'product',
              'tmpBarCode',
              'changeBarCodInInventory',
              'tmpTransparencyFile',
              'amount',
            ]),
            orderId: el.order._id,
            productId: el.product._id,
            barCode: prodInDataToUpdateBarCode?.newData[0] || el.barCode,
            transparencyFile: transparencyFileLink,
            isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier,
            isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper,
          }

          currentBoxItems.push(validItem)
        }

        newBoxCopy.items = currentBoxItems
        updatedBoxes.push(getObjectFilteredByKeyArrayWhiteList(newBoxCopy, updateManyBoxesWhiteList))
      }

      // Upload sharedFields files
      await this.uploadSharedFieldFile(sharedFields, 'tmpShippingLabel', 'shippingLabel')
      await this.uploadSharedFieldFile(sharedFields, 'tmpBarCode', 'barCode')
      await this.uploadSharedFieldFile(sharedFields, 'tmpTransparencyFile', 'transparencyFile')

      const boxesToSend = {
        ...getObjectFilteredByKeyArrayWhiteList(sharedFields, sharedFieldsWhiteList),
        boxes: updatedBoxes,
      }
      await BoxesModel.editManyBoxes(boxesToSend)

      toast.success(t(TranslationKey['Editing completed']))

      this.loadData()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onClickSubmitEditBox({ id, boxData, imagesOfBox }) {
    runInAction(() => {
      this.selectedBoxes = []
      this.uploadedTrackNumber = []
    })

    if (boxData.tmpShippingLabel?.length) {
      await onSubmitPostImages.call(this, {
        images: boxData.tmpShippingLabel,
        type: 'uploadedFiles',
        withoutShowProgress: true,
      })

      boxData.shippingLabel = this.uploadedFiles[0]
    }

    if (boxData.tmpTrackNumberFile?.length) {
      await onSubmitPostImages.call(this, {
        images: boxData.tmpTrackNumberFile,
        type: 'uploadedTrackNumber',
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
              productId: el.product?._id,
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

    try {
      const getNewItems = async () => {
        const newItems = []

        for await (const el of boxData.items) {
          const prodInDataToUpdateBarCode = dataToBarCodeChange.find(item => item.productId === el.product._id)

          if (el.tmpTransparencyFile.length) {
            await onSubmitPostImages.call(this, {
              images: el.tmpTransparencyFile,
              type: 'uploadedTransparencyFiles',
              withoutShowProgress: true,
            })
          }

          const newItem = {
            ...getObjectFilteredByKeyArrayBlackList(
              el,
              ['amount', 'order', 'product', 'tmpBarCode', 'changeBarCodInInventory', 'tmpTransparencyFile'],
              undefined,
              undefined,
              true,
            ),

            _id: el._id,

            transparencyFile: this.uploadedTransparencyFiles?.[0] || el.transparencyFile,
            barCode: prodInDataToUpdateBarCode?.newData?.length ? prodInDataToUpdateBarCode?.newData[0] : el.barCode,
            isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier,
            isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper,
          }
          newItems.push(newItem)
        }

        return newItems
      }

      const requestBoxItems = await getNewItems()

      const requestBox = getObjectFilteredByKeyArrayWhiteList(
        {
          ...boxData,
          images: this.uploadedImages?.length ? this.uploadedImages : boxData.images,
          items: requestBoxItems,
          shippingLabel: boxData?.shippingLabel || boxData.tmpShippingLabel?.[0] || '',
          trackNumberFile: [...boxData.trackNumberFile, ...this.uploadedTrackNumber],
        },
        updateBoxWhiteList,
        undefined,
        undefined,
        true,
      )

      await StorekeeperModel.editBox(id, requestBox)

      this.onTriggerOpenModal('showFullEditBoxModal')
      toast.success(t(TranslationKey['Data saved successfully']))
      this.loadData()
    } catch (error) {
      console.error(error)

      if (error.message === Errors.INVALID_IMAGE) {
        toast.warning(
          t(TranslationKey['An error occurred while loading the image from the link. Please replace the image']),
        )

        return
      }

      this.loadData()

      this.onTriggerOpenModal('showFullEditBoxModal')

      toast.warning(t(TranslationKey['The box is unchanged']))
    }
  }

  async onClickEditBtn() {
    try {
      const [destinations, storekeepersData] = await Promise.all([
        ClientModel.getDestinations(),
        StorekeeperModel.getStorekeepers(),
      ])

      runInAction(() => {
        this.destinations = destinations
        this.storekeepersData = storekeepersData
      })

      this.onTriggerOpenModal('showEditBoxModal')
    } catch (error) {
      console.error(error)
    }
  }

  async getDataToMoveBatch() {
    try {
      const batches = await BatchesModel.getBatches(BatchStatus.IS_BEING_COLLECTED)

      runInAction(() => {
        this.batches = warehouseBatchesDataConverter(batches, this.platformSettings?.volumeWeightCoefficient)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async moveBox(row) {
    try {
      runInAction(() => {
        this.curBoxToMove = row
      })
      await this.getDataToMoveBatch()

      this.onTriggerOpenModal('showBoxMoveToBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  async setHsCode(row) {
    try {
      const box = await BoxesModel.getBoxById(row._id)
      runInAction(() => {
        this.curBox = box
      })

      this.onTriggerOpenModal('showAddOrEditHsCodeInBox')
    } catch (error) {
      console.error(error)
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

      if (this.selectedBoxes.length === 1) {
        runInAction(() => {
          this.curBox = this.boxesMy.find(el => el._id === this.selectedBoxes[0]).originalData
        })

        this.onTriggerOpenModal('showFullEditBoxModal')
      } else {
        this.onTriggerOpenModal('showEditMultipleBoxesModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async onClickMergeBtn() {
    try {
      const selectedBoxes = this.boxesMy
        .filter(box => this.selectedBoxes.includes(box._id))
        ?.map(box => box.originalData)

      const isMasterBoxSelected = selectedBoxes.some(box => box?.amount > 1)
      const isDifferentClient = selectedBoxes.some(box => box?.client?._id !== selectedBoxes[0]?.client?._id)

      if (isMasterBoxSelected || isDifferentClient) {
        toast.warning(
          (isMasterBoxSelected && t(TranslationKey['Cannot be merged with a Superbox'])) ||
            (isDifferentClient && t(TranslationKey['Cannot be merged with different clients'])),
        )

        return
      }

      const [destinations, storekeepersData] = await Promise.all([
        ClientModel.getDestinations(),
        StorekeeperModel.getStorekeepers(),
      ])

      runInAction(() => {
        this.destinations = destinations
        this.storekeepersData = storekeepersData
      })

      this.onTriggerOpenModal('showMergeBoxModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConfirmSplit(id, updatedBoxes, isMasterBox) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      runInAction(() => {
        this.selectedBoxes = []
      })

      if (this.selectedBoxes.length === updatedBoxes.length && !isMasterBox) {
        toast.warning(t(TranslationKey['The box is not split!']))
      } else {
        const resBoxes = []

        for (let i = 0; i < updatedBoxes.length; i++) {
          if (updatedBoxes[i].tmpShippingLabel.length) {
            await onSubmitPostImages.call(this, { images: updatedBoxes[i].tmpShippingLabel, type: 'uploadedFiles' })
          }

          if (updatedBoxes[i]?.images?.length) {
            await onSubmitPostImages.call(this, {
              images: updatedBoxes[i]?.images,
              type: 'uploadedImages',
              withoutShowProgress: true,
            })
          }

          const boxToPush = {
            boxBody: {
              shippingLabel: this.uploadedFiles.length
                ? this.uploadedFiles[0]
                : updatedBoxes[i].tmpShippingLabel?.[0] || updatedBoxes[i].shippingLabel,
              destinationId: updatedBoxes[i].destinationId,
              logicsTariffId: updatedBoxes[i].logicsTariffId,
              fbaShipment: updatedBoxes[i].fbaShipment,
              isBarCodeAlreadyAttachedByTheSupplier: updatedBoxes[i].isBarCodeAlreadyAttachedByTheSupplier,
              isBarCodeAttachedByTheStorekeeper: updatedBoxes[i].isBarCodeAttachedByTheStorekeeper,
              lengthCmWarehouse: updatedBoxes[i].lengthCmWarehouse,
              widthCmWarehouse: updatedBoxes[i].widthCmWarehouse,
              heightCmWarehouse: updatedBoxes[i].heightCmWarehouse,
              weighGrossKgWarehouse: updatedBoxes[i].weighGrossKgWarehouse,
              images: this.uploadedImages.length ? this.uploadedImages : [],
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

          runInAction(() => {
            this.uploadedFiles = []
            this.uploadedImages = []
          })
        }

        const splitBoxesResult = await this.splitBoxes(id, resBoxes)

        if (splitBoxesResult) {
          toast.success(t(TranslationKey['Data saved successfully']))
        } else {
          toast.warning(t(TranslationKey['The box is not split!']))
        }
        this.onTriggerOpenModal('showConfirmModal')
        if (this.showRedistributeBoxModal) {
          this.onTriggerOpenModal('showRedistributeBoxModal')
        }
        this.onModalRedistributeBoxAddNewBox(null)
      }

      this.setRequestStatus(loadingStatus.SUCCESS)

      await this.getBoxesMy()
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async splitBoxes(id, data) {
    try {
      const result = await BoxesModel.splitBoxes(id, data)
      await this.getBoxesMy()
      return result
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConfirmMerge(boxBody) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await onSubmitPostImages.call(this, { images: boxBody.tmpShippingLabel, type: 'uploadedFiles' })
      boxBody = {
        ...boxBody,
        shippingLabel: this.uploadedFiles[0],
      }

      await onSubmitPostImages.call(this, { images: boxBody.images, type: 'uploadedFiles' })
      boxBody = {
        ...boxBody,
        images: this.uploadedFiles,
      }

      const newBoxBody = getObjectFilteredByKeyArrayBlackList(boxBody, [
        'tmpShippingLabel',
        'storekeeperId',
        'humanFriendlyId',
      ])

      const mergeBoxesResult = await this.mergeBoxes(this.selectedBoxes, newBoxBody)

      if (mergeBoxesResult) {
        toast.success(t(TranslationKey['Data saved successfully']))
      } else {
        toast.warning(t(TranslationKey['The boxes are not joined!']))
      }

      this.onTriggerOpenModal('showMergeBoxModal')
      this.onTriggerOpenModal('showConfirmModal')

      this.setRequestStatus(loadingStatus.SUCCESS)

      await this.getBoxesMy()

      runInAction(() => {
        this.selectedBoxes = []
        this.tmpClientComment = ''
      })
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async mergeBoxes(ids, boxBody) {
    try {
      const result = await BoxesModel.mergeBoxes(ids, boxBody)
      return result
    } catch (error) {
      console.error(error)
    }
  }

  onRemoveBoxFromSelected(boxId) {
    this.selectedBoxes = this.selectedBoxes.filter(id => id !== boxId)

    if (this.selectedBoxes.length < 2) {
      this.onTriggerOpenModal('showMergeBoxModal')
    }
  }

  async onClickSplitBtn() {
    try {
      const [destinations, storekeepersData] = await Promise.all([
        ClientModel.getDestinations(),
        StorekeeperModel.getStorekeepers(),
      ])

      runInAction(() => {
        this.destinations = destinations
        this.storekeepersData = storekeepersData
      })

      this.onTriggerOpenModal('showRedistributeBoxModal')
    } catch (error) {
      console.error(error)
    }
  }

  onModalRedistributeBoxAddNewBox(value) {
    this.modalRedistributeBoxAddNewBox = value
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

        toast.success(t(TranslationKey['Data was successfully saved']))
      })

      this.loadData()

      this.onTriggerOpenModal('showGroupingBoxesModal')
    } catch (error) {
      console.error(error)
      this.onTriggerOpenModal('showGroupingBoxesModal')

      toast.error(t(TranslationKey['Boxes are not regrouped']))
    }
  }

  async onClickGroupingBtn() {
    try {
      const firstBox = this.boxesMy.find(box => box._id === this.selectedBoxes[0])

      const boxesWithDifferentStorekeepers = this.selectedBoxes.filter(boxId => {
        const findBox = this.boxesMy.find(box => box._id === boxId)
        return findBox?.storekeeper !== firstBox?.storekeeper
      })

      if (boxesWithDifferentStorekeepers.length) {
        toast.warning(t(TranslationKey['Boxes with identical storekeeper must be selected']))

        return
      }

      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations
      })

      this.onTriggerOpenModal('showGroupingBoxesModal')
    } catch (err) {
      console.error(err)
    }
  }

  async setDimensions(row) {
    try {
      const box = await BoxesModel.getBoxById(row._id)
      runInAction(() => {
        this.curBox = box
      })
      this.onTriggerShowEditBoxModal()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitEditBox(id, data) {
    try {
      if (data.images.length > 0) {
        await onSubmitPostImages.call(this, { images: data.images, type: 'uploadedFiles' })
        data = { ...data, images: [...data.images, ...this.uploadedFiles] }
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
      console.error(error)
    }
  }

  async onSubmitAddBatch({ boxesIds, filesToAdd, batchFields }) {
    try {
      await onSubmitPostImages.call(this, { images: filesToAdd, type: 'uploadedFiles' })

      const batchId = await BatchesModel.createBatch({
        title: batchFields.title,
        boxesIds,
        calculationMethod: batchFields.calculationMethod,
        volumeWeightDivide: batchFields.volumeWeightDivide,
      })

      await BatchesModel.editAttachedDocuments(batchId.guid, this.uploadedFiles)

      this.loadData()
      this.onTriggerOpenModal('showAddBatchModal')
      this.onTriggerOpenModal('showBoxMoveToBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitAddOrEditHsCode(data) {
    try {
      await ProductModel.editProductsHsCods(data)
      this.loadData()
      this.onTriggerOpenModal('showAddOrEditHsCodeInBox')
    } catch (error) {
      console.error(error)
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
      console.error(error)
    }
  }

  async setCurrentOpenedBox(row) {
    try {
      this.curBox = row._id

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateBatch(box) {
    try {
      const boxes = await BoxesModel.getBoxesReadyToBatchStorekeeper()

      runInAction(() => {
        this.boxesData = boxes

        this.sourceBoxForBatch = box
      })

      this.onTriggerOpenModal('showAddBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerShowEditBoxModal() {
    this.showEditBoxModal = !this.showEditBoxModal
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async getBoxesMy() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const boxes = await StorekeeperModel.getBoxesMyPag({
        filters: this.getFilter(),

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.rowCount = boxes.count
        this.baseBoxesMy = boxes.rows
        this.boxesMy = warehouseBoxesDataConverter(boxes.rows, this.platformSettings?.volumeWeightCoefficient)
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.boxesMy = []
        this.baseBoxesMy = []
      })
      this.setRequestStatus(loadingStatus.FAILED)
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

  onLeaveColumnField() {
    this.onHover = null
    this.getDataGridState()
  }

  async onClickFilterBtn(column) {
    const currentColumn =
      column === 'logicsTariffId' ? 'logicsTariff' : column === 'destinationId' ? 'destination' : column

    try {
      const data = await GeneralModel.getDataForColumn(
        // Костылики, если ты это видишь, то Паша обещал решить эту проблему после релиза 11.12.2023
        // Будущий чел, исправь это в следующем релизе, году, десятилетии, в общем разберись
        // Удалить currentColumn и поставить на его место аргумент функции, column
        // Костыли зло ┗( T﹏T )┛
        getTableByColumn(currentColumn, currentColumn === 'redFlags' ? 'products' : 'boxes'),
        currentColumn,
        `storekeepers/pag/boxes?filters=${this.getFilter(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  onChangeUnitsOption(event) {
    const currentValue = event.target.value
    this.unitsOption = currentValue
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  getFilter(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.nameSearchValue, exclusion, filtersFields, [
        'asin',
        'amazonTitle',
        'skuByClient',
        'item',
        'id',
        'humanFriendlyId',
        'prepId',
      ]),
    )
  }
}
