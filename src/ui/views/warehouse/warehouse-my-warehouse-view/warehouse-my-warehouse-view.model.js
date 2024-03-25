import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { Errors } from '@constants/errors'
import { BatchStatus } from '@constants/statuses/batch-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { GeneralModel } from '@models/general-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { warehouseBoxesViewColumns } from '@components/table/table-columns/warehouse/warehouse-boxes-columns'

import { warehouseBatchesDataConverter, warehouseBoxesDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostFilesInData, onSubmitPostImages } from '@utils/upload-files'

import { filtersFields, updateBoxWhiteList } from './warehouse-my-warehouse-view.constants'

export class WarehouseMyWarehouseViewModel {
  requestStatus = undefined

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

  unitsOption = unitsOfChangeOptions.EU

  selectedBoxes = []

  curOpenedTask = {}
  toCancelData = {}

  hsCodeData = {}

  showEditHSCodeModal = false

  showBoxViewModal = false
  showBoxMoveToBatchModal = false
  showAddBatchModal = false
  showAddOrEditHsCodeInBox = false
  showEditBoxModal = false
  showFullEditBoxModal = false
  showSuccessInfoModal = false
  showWarningInfoModal = false
  showMergeBoxModal = false
  showRedistributeBoxModal = false
  showGroupingBoxesModal = false

  showEditBoxModalR = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  showEditMultipleBoxesModal = false

  modalEditSuccessMessage = ''

  rowHandlers = {
    moveBox: item => this.moveBox(item),
    setHsCode: item => this.setHsCode(item),
    setDimensions: item => this.setDimensions(item),
    onEditBox: item => this.onEditBox(item),
    onClickSavePrepId: (item, value) => this.onClickSavePrepId(item, value),
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
  columnsModel = warehouseBoxesViewColumns(
    this.rowHandlers,
    () => this.userInfo,
    () => this.unitsOption,
  )

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_WAREHOUSE)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_WAREHOUSE]

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
    this.nameSearchValue = searchValue

    this.getBoxesMy()
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getBoxesMy()
    } catch (error) {
      console.log(error)
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
      })

      this.getBoxesMy()

      runInAction(() => {
        this.modalEditSuccessMessage = t(TranslationKey['Data saved successfully'])
      })

      this.onTriggerOpenModal('showSuccessInfoModal')

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.log(error)
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
    const hsCodeData = await ProductModel.getProductsHsCodeByGuid(id)
    runInAction(() => {
      this.hsCodeData = hsCodeData
    })
    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  async onClickSubmitEditMultipleBoxes(newBoxes, selectedBoxes) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      this.onTriggerOpenModal('showEditMultipleBoxesModal')

      const uploadedShippingLabeles = []
      const uploadedBarcodes = []

      for (let i = 0; i < newBoxes.length; i++) {
        const newBox = { ...newBoxes[i] }
        const sourceBox = selectedBoxes[i]

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

        const currentBox = []

        for await (const el of newBox.items) {
          const prodInDataToUpdateBarCode = dataToBarCodeChange.find(item => item.productId === el.product._id)
          let transparencyFile

          if (el.tmpTransparencyFile?.length) {
            transparencyFile = await onSubmitPostImages.call(this, {
              images: el?.tmpTransparencyFile,
              type: 'uploadedFiles',
              withoutShowProgress: true,
            })
          }

          const validItem = {
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
            _id: el._id,
            barCode: prodInDataToUpdateBarCode?.newData?.length ? prodInDataToUpdateBarCode?.newData[0] : el.barCode,
            transparencyFile: transparencyFile?.[0] || el.transparencyFile || '',
            isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier,
            isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper,
          }

          currentBox.push(validItem)
        }

        newBox.items = currentBox

        await this.onClickSubmitEditBox({ id: sourceBox._id, boxData: newBox, isMultipleEdit: true })
      }

      runInAction(() => {
        this.modalEditSuccessMessage = t(TranslationKey['Editing completed'])
      })

      this.onTriggerOpenModal('showSuccessInfoModal')

      this.loadData()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async onClickSubmitEditBox({ id, boxData, imagesOfBox, isMultipleEdit }) {
    runInAction(() => {
      this.selectedBoxes = []
      this.uploadedFiles = []
      this.uploadedTrackNumber = []
      this.uploadedImages = []
    })

    if (!isMultipleEdit && boxData.tmpShippingLabel?.length) {
      await onSubmitPostImages.call(this, {
        images: boxData.tmpShippingLabel,
        type: 'uploadedFiles',
        withoutShowProgress: true,
      })
    }

    if (!isMultipleEdit && boxData.tmpTrackNumberFile?.length) {
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

    if (!isMultipleEdit && dataToBarCodeChange?.length) {
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

      const requestBoxItems = isMultipleEdit ? boxData.items : await getNewItems()

      const requestBox = getObjectFilteredByKeyArrayWhiteList(
        {
          ...boxData,
          images: this.uploadedImages?.length ? this.uploadedImages : boxData.images,
          items: requestBoxItems,
          shippingLabel: this.uploadedFiles?.length
            ? this.uploadedFiles[0]
            : boxData?.shippingLabel || boxData.tmpShippingLabel?.[0] || '',
          trackNumberFile: [...boxData.trackNumberFile, ...this.uploadedTrackNumber],
        },
        updateBoxWhiteList,
        undefined,
        undefined,
        true,
      )

      await StorekeeperModel.editBox(id, requestBox)

      if (!isMultipleEdit) {
        this.loadData()
        this.onTriggerOpenModal('showFullEditBoxModal')
        runInAction(() => {
          this.modalEditSuccessMessage = t(TranslationKey['Data saved successfully'])
        })
        this.onTriggerOpenModal('showSuccessInfoModal')
      }
    } catch (error) {
      console.log(error)

      if (error.message === Errors.INVALID_IMAGE) {
        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: true,
            title: t(
              TranslationKey['An error occurred while loading the image from the link. Please replace the image'],
            ),
          }
        })

        this.onTriggerOpenModal('showWarningInfoModal')
        return
      }

      if (!isMultipleEdit) {
        this.loadData()

        this.onTriggerOpenModal('showFullEditBoxModal')
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
      console.log(error)
    }
  }

  async getDataToMoveBatch() {
    try {
      const [batches, result] = await BatchesModel.getBatches(BatchStatus.IS_BEING_COLLECTED)

      runInAction(() => {
        this.batches = warehouseBatchesDataConverter(batches, this.platformSettings?.volumeWeightCoefficient)
      })
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: false,
            title:
              (isMasterBoxSelected && t(TranslationKey['Cannot be merged with a Superbox'])) ||
              (isDifferentClient && t(TranslationKey['Cannot be merged with different clients'])),
          }
        })

        this.onTriggerOpenModal('showWarningInfoModal')

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
      console.log(error)
    }
  }

  async onClickConfirmSplit(id, updatedBoxes, isMasterBox) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
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

          if (updatedBoxes[i]?.tmpImages?.length) {
            await onSubmitPostImages.call(this, {
              images: updatedBoxes[i]?.tmpImages,
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
              images: this.uploadedImages.length
                ? updatedBoxes[i].images.concat(this.uploadedImages)
                : updatedBoxes[i].images,
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

        if (splitBoxesResult) {
          runInAction(() => {
            this.modalEditSuccessMessage = t(TranslationKey['Data saved successfully'])
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
        if (this.showRedistributeBoxModal) {
          this.onTriggerOpenModal('showRedistributeBoxModal')
        }
        this.onModalRedistributeBoxAddNewBox(null)
      }

      this.setRequestStatus(loadingStatuses.SUCCESS)

      await this.getBoxesMy()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
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

  async onClickConfirmMerge(boxBody) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

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
        runInAction(() => {
          this.modalEditSuccessMessage = t(TranslationKey['Data saved successfully'])
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

      this.setRequestStatus(loadingStatuses.SUCCESS)

      await this.getBoxesMy()

      runInAction(() => {
        this.selectedBoxes = []
        this.tmpClientComment = ''
      })
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
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
      console.log(error)
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

      runInAction(() => {
        this.destinations = destinations
      })

      this.onTriggerOpenModal('showGroupingBoxesModal')
    } catch (err) {
      console.log(err)
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
      console.log(error)
    }
  }

  async onSubmitEditBox(id, data) {
    try {
      if (data.tmpImages.length > 0) {
        await onSubmitPostImages.call(this, { images: data.tmpImages, type: 'uploadedFiles' })
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
      console.log(error)
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
      console.log(error)
    }
  }

  async onSubmitAddOrEditHsCode(data) {
    try {
      await ProductModel.editProductsHsCods(data)
      this.loadData()
      this.onTriggerOpenModal('showAddOrEditHsCodeInBox')
    } catch (error) {
      console.log(error)
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
    }
  }

  async setCurrentOpenedBox(row) {
    try {
      const box = await BoxesModel.getBoxById(row._id)

      runInAction(() => {
        this.curBox = box
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      this.setRequestStatus(loadingStatuses.IS_LOADING)

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
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.boxesMy = []
        this.baseBoxesMy = []
      })
      this.setRequestStatus(loadingStatuses.FAILED)
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
      console.log(error)
    }
  }

  onChangeUnitsOption(option) {
    this.unitsOption = option
    this.columnsModel = warehouseBoxesViewColumns(
      this.rowHandlers,
      () => this.userInfo,
      () => this.unitsOption,
    )
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
