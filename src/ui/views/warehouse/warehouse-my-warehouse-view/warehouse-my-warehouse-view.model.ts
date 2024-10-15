import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { GridColDef } from '@mui/x-data-grid-premium'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { Errors } from '@constants/errors'
import { BatchStatus } from '@constants/statuses/batch-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { warehouseBatchesDataConverter } from '@utils/data-grid-data-converters'
import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostFilesInData, onSubmitPostImages } from '@utils/upload-files'

import { Dimensions } from '@typings/enums/dimensions'
import { loadingStatus } from '@typings/enums/loading-status'
import { IBox } from '@typings/models/boxes/box'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'
import { IDestination } from '@typings/shared/destinations'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { observerConfig } from './warehous-my-warehouse-config'
import { warehouseBoxesViewColumns } from './warehouse-boxes-columns'
import {
  additionalFilterFields,
  fieldsForSearch,
  sharedFieldsWhiteList,
  updateBoxWhiteList,
  updateManyBoxesWhiteList,
} from './warehouse-my-warehouse-view.constants'

export class WarehouseMyWarehouseViewModel extends DataGridFilterTableModel {
  batches = []
  baseBoxesMy = []

  destinations: IDestination[] = []

  uploadedTrackNumber: any[] = []

  curBox: any = undefined
  curBoxToMove: any = undefined
  sourceBoxForBatch: any = undefined
  storekeepersData: IStorekeeper[] = []
  modalRedistributeBoxAddNewBox: any = undefined
  unitsOption = Dimensions.EU
  boxesData: any
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

  uploadedImages = []
  uploadedFiles = []
  uploadedTransparencyFiles = []

  get userInfo() {
    return UserModel.userInfo
  }
  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }
  get platformSettings() {
    return UserModel.platformSettings as unknown as IPlatformSettings
  }

  constructor() {
    const rowHandlers = {
      moveBox: (item: any) => this.moveBox(item),
      setHsCode: (item: any) => this.setHsCode(item),
      setDimensions: (item: any) => this.setDimensions(item),
      onEditBox: () => this.onEditBox(),
      onClickSavePrepId: (item: any, value: any) => this.onClickSavePrepId(item, value),
      onClickSaveStorage: (item: any, value: any) => this.onClickSaveStorage(item, value),
      onChangeUnitsOption: (option: RadioChangeEvent) => this.onChangeUnitsOption(option),
    }
    const columnsModel = warehouseBoxesViewColumns(rowHandlers, () => this.unitsOption) as GridColDef[]

    super({
      getMainDataMethod: StorekeeperModel.getBoxesMyPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, additionalFilterFields),
      fieldsForSearch,
      mainMethodURL: 'storekeepers/pag/boxes?',
      tableKey: DataGridTablesKeys.CLIENT_WAREHOUSE,
      defaultSortModel: [{ field: 'createdAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)
    this.getTableSettingsPreset()
  }

  setDestinationsFavouritesItem(item: any) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  onTriggerShowEditBoxModalR(box: string) {
    this.curBox = box
    this.showEditBoxModalR = !this.showEditBoxModalR
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

  async onClickSaveStorage(itemId: string, value: any) {
    try {
      await BoxesModel.editAdditionalInfo(itemId, {
        storage: value,
      })

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async uploadImageIfNotUploaded(image: any, cache: any[]) {
    const imageKey = JSON.stringify(image)
    const cachedImage = cache.find((el: any) => el.strKey === imageKey)

    if (cachedImage) {
      return cachedImage.link
    } else {
      // @ts-ignore
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

  async uploadSharedFieldFile(sharedFields: any, fieldName: string, uploadedFieldName: string) {
    if (sharedFields[fieldName]?.length) {
      // @ts-ignore
      await onSubmitPostImages.call(this, {
        images: sharedFields[fieldName],
        type: 'uploadedFiles',
        withoutShowProgress: true,
      })
      sharedFields[uploadedFieldName] = this.uploadedFiles[0]
    }
  }

  async onClickSubmitEditMultipleBoxes(newBoxes: any[], selectedBoxes: any[], sharedFields: any) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.onTriggerOpenModal('showEditMultipleBoxesModal')

      const uploadedShippingLabels: never[] = []
      const uploadedBarcodes: { strKey: string; link: never }[] = []
      const uploadedTransparencyFiles: never[] = []
      const updatedBoxes = []

      // Upload sharedFields files
      await this.uploadSharedFieldFile(sharedFields, 'tmpShippingLabel', 'shippingLabel')
      await this.uploadSharedFieldFile(sharedFields, 'tmpBarCode', 'barCode')
      await this.uploadSharedFieldFile(sharedFields, 'tmpTransparencyFile', 'transparencyFile')

      for (let i = 0; i < newBoxes.length; i++) {
        const newBox = { ...newBoxes[i] }
        const selectedBox = { ...selectedBoxes[i] }

        let linkToShippingLabel = newBox.shippingLabel || null
        // Upload shipping label if needed
        const isSameShippingLabel =
          JSON.stringify(newBox?.tmpShippingLabel?.[0]) === JSON.stringify(sharedFields?.tmpShippingLabel?.[0])
        if (!isSameShippingLabel) {
          linkToShippingLabel = await this.uploadImageIfNotUploaded(newBox.tmpShippingLabel[0], uploadedShippingLabels)
        }

        const dataToBarCodeChange = newBox.items
          .map((el: any) => {
            if (el.tmpBarCode?.length) {
              const isSameBarCode =
                JSON.stringify(el?.tmpBarCode?.[0]) === JSON.stringify(sharedFields?.tmpBarCode?.[0])

              return {
                changeBarCodInInventory: el.changeBarCodInInventory,
                productId: el.product._id || el.productId,
                tmpBarCode: el.tmpBarCode,
                newData: [],
                isSameBarCode,
              }
            }
            return null
          })
          .filter((el: null) => el !== null)

        // Upload bar code if needed
        if (dataToBarCodeChange?.length) {
          for (const barcodeChange of dataToBarCodeChange) {
            if (barcodeChange.isSameBarCode) {
              // If barcode is same as shared, skip uploading
              continue
            }
            const findUploadedBarcode = uploadedBarcodes.find(
              el => el.strKey === JSON.stringify(barcodeChange.tmpBarCode[0]),
            )

            if (!findUploadedBarcode) {
              // @ts-ignore
              await onSubmitPostImages.call(this, {
                images: barcodeChange.tmpBarCode,
                type: 'uploadedFiles',
                withoutShowProgress: true,
              })

              uploadedBarcodes.push({
                strKey: JSON.stringify(barcodeChange.tmpBarCode[0]),
                link: this.uploadedFiles[0] || barcodeChange.tmpBarCode[0],
              })
            }

            barcodeChange.newData = findUploadedBarcode
              ? [findUploadedBarcode.link]
              : [this.uploadedFiles[0] || barcodeChange.tmpBarCode[0]]
          }
        }

        const currentBoxItems = []

        for (const el of newBox.items) {
          const prodInDataToUpdateBarCode = dataToBarCodeChange.find(
            (item: { productId: any }) => item.productId === (el?.product?._id || el?.productId),
          )

          let transparencyFileLink = el.transparencyFile || ''
          const isSameTransparencyFile =
            JSON.stringify(el?.tmpTransparencyFile?.[0]) === JSON.stringify(sharedFields.tmpTransparencyFile[0])
          if (!isSameTransparencyFile) {
            transparencyFileLink = await this.uploadImageIfNotUploaded(
              el.tmpTransparencyFile[0],
              uploadedTransparencyFiles,
            )
          }
          const barcodeValue = prodInDataToUpdateBarCode?.newData?.[0] || el.barCode

          const validItem = {
            orderId: el?.order?._id || el?.orderId,
            productId: el?.product?._id || el?.productId,
            isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier,
            isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper,
            isTransparencyFileAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper,
            isTransparencyFileAlreadyAttachedByTheSupplier: el.isTransparencyFileAlreadyAttachedByTheSupplier,
            ...(barcodeValue !== selectedBox.items[0].barCode && { barCode: barcodeValue }),
            ...(transparencyFileLink !== selectedBox.items[0].transparencyFile && {
              transparencyFile: transparencyFileLink,
            }),
          }

          currentBoxItems.push(validItem)
        }

        newBox.items = currentBoxItems

        updatedBoxes.push({
          ...getObjectFilteredByKeyArrayWhiteList(newBox, updateManyBoxesWhiteList),
          ...(linkToShippingLabel !== selectedBox.shippingLabel && { shippingLabel: linkToShippingLabel }),
        })
      }

      const boxesToSend = {
        ...getObjectFilteredByKeyArrayWhiteList(sharedFields, sharedFieldsWhiteList),
        ...(sharedFields.shippingLabel && { shippingLabel: sharedFields.shippingLabel }),
        boxes: updatedBoxes,
      }

      await BoxesModel.editManyBoxes(boxesToSend)

      toast.success(t(TranslationKey['Editing completed']))

      this.getCurrentData()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onClickSubmitEditBox(boxSubmissionData: any) {
    const { id, boxData, imagesOfBox } = boxSubmissionData
    runInAction(() => {
      this.selectedRows = []
      this.uploadedTrackNumber = []
    })

    if (boxData?.tmpShippingLabel?.length) {
      // @ts-ignore
      await onSubmitPostImages.call(this, {
        images: boxData.tmpShippingLabel,
        type: 'uploadedFiles',
        withoutShowProgress: true,
      })

      boxData.shippingLabel = this.uploadedFiles[0]
    }

    if (boxData?.tmpTrackNumberFile?.length) {
      // @ts-ignore
      await onSubmitPostImages.call(this, {
        images: boxData.tmpTrackNumberFile,
        type: 'uploadedTrackNumber',
        withoutShowProgress: true,
      })
    }

    if (imagesOfBox?.length) {
      // @ts-ignore
      await onSubmitPostImages.call(this, {
        images: imagesOfBox,
        type: 'uploadedImages',
        withoutShowProgress: true,
      })
    }

    let dataToBarCodeChange = boxData.items
      .map((el: any) =>
        el.tmpBarCode?.length
          ? {
              changeBarCodInInventory: el.changeBarCodInInventory,
              productId: el.product?._id,
              tmpBarCode: el.tmpBarCode,
              newData: [],
            }
          : null,
      )
      .filter((el: null) => el !== null)

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
          const prodInDataToUpdateBarCode = dataToBarCodeChange.find((item: any) => item.productId === el.product._id)

          if (el.tmpTransparencyFile.length) {
            // @ts-ignore
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
      this.getCurrentData()
    } catch (error: any) {
      console.error(error)

      if (error.message === Errors.INVALID_IMAGE) {
        toast.warning(
          t(TranslationKey['An error occurred while loading the image from the link. Please replace the image']),
        )

        return
      }

      this.getCurrentData()

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
        this.destinations = destinations as IDestination[]
        this.storekeepersData = storekeepersData as IStorekeeper[]
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

  async moveBox(row: undefined) {
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

  async setHsCode(row: any) {
    try {
      const box = await BoxesModel.getBoxById(row._id)
      runInAction(() => {
        this.curBox = box as IBox
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
        this.destinations = destinations as IDestination[]
        this.storekeepersData = storekeepersData as IStorekeeper[]
      })

      if (this.selectedRows.length === 1) {
        runInAction(() => {
          this.curBox = this.currentData.find(el => el._id === this.selectedRows[0])
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
      const selectedBoxes = this.currentData.filter(box => this.selectedRows.includes(box._id))?.map(box => box)

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
        this.destinations = destinations as IDestination[]
        this.storekeepersData = storekeepersData as IStorekeeper[]
      })

      this.onTriggerOpenModal('showMergeBoxModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConfirmSplit(id: string, updatedBoxes: any[], isMasterBox: any) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      runInAction(() => {
        this.selectedRows = []
      })

      if (this.selectedRows.length === updatedBoxes.length && !isMasterBox) {
        toast.warning(t(TranslationKey['The box is not split!']))
      } else {
        const resBoxes = []

        for (let i = 0; i < updatedBoxes.length; i++) {
          if (updatedBoxes[i].tmpShippingLabel.length) {
            // @ts-ignore
            await onSubmitPostImages.call(this, { images: updatedBoxes[i].tmpShippingLabel, type: 'uploadedFiles' })
          }

          if (updatedBoxes[i]?.images?.length) {
            // @ts-ignore
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

      await this.getCurrentData()
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
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

  async onClickConfirmMerge(boxBody: any) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: boxBody.tmpShippingLabel, type: 'uploadedFiles' })
      boxBody = {
        ...boxBody,
        shippingLabel: this.uploadedFiles[0],
      }
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: boxBody.images, type: 'uploadedFiles' })
      boxBody = {
        ...boxBody,
        images: this.uploadedFiles,
      }

      const newBoxBody = getObjectFilteredByKeyArrayBlackList(boxBody, ['tmpShippingLabel', 'storekeeperId', 'xid'])

      const mergeBoxesResult = await this.mergeBoxes(this.selectedRows, newBoxBody)

      if (mergeBoxesResult) {
        toast.success(t(TranslationKey['Data saved successfully']))
      } else {
        toast.warning(t(TranslationKey['The boxes are not joined!']))
      }

      this.onTriggerOpenModal('showMergeBoxModal')
      this.onTriggerOpenModal('showConfirmModal')

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

  async mergeBoxes(ids: string[], boxBody: any) {
    try {
      const result = await BoxesModel.mergeBoxes(ids, boxBody)
      return result
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

  async onClickSplitBtn() {
    try {
      const [destinations, storekeepersData] = await Promise.all([
        ClientModel.getDestinations(),
        StorekeeperModel.getStorekeepers(),
      ])

      runInAction(() => {
        this.destinations = destinations as IDestination[]
        this.storekeepersData = storekeepersData as IStorekeeper[]
      })

      this.onTriggerOpenModal('showRedistributeBoxModal')
    } catch (error) {
      console.error(error)
    }
  }

  onModalRedistributeBoxAddNewBox(value: null) {
    this.modalRedistributeBoxAddNewBox = value
  }

  async onClickSubmitGroupingBoxes({ oldBoxes, newBoxes }: { oldBoxes: any[]; newBoxes: any[] }) {
    try {
      const createdBoxes = await BoxesModel.regroupBoxes({
        boxIds: oldBoxes.map((el: any) => el._id),
        newAmounts: newBoxes.map((el: any) => Number(el.amount)).filter((num: number) => num >= 1),
      })

      const patchPrepIds = createdBoxes.map((el, index) => ({
        boxId: el,
        prepId: newBoxes[index].prepId || '',
      }))

      await BoxesModel.updatePrepId(patchPrepIds)

      runInAction(() => {
        this.selectedRows = []

        toast.success(t(TranslationKey['Data was successfully saved']))
      })

      this.getCurrentData()

      this.onTriggerOpenModal('showGroupingBoxesModal')
    } catch (error) {
      console.error(error)
      this.onTriggerOpenModal('showGroupingBoxesModal')

      toast.error(t(TranslationKey['Boxes are not regrouped']))
    }
  }

  async onClickGroupingBtn() {
    try {
      const firstBox = this.currentData.find(box => box._id === this.selectedRows[0])

      const boxesWithDifferentStorekeepers = this.selectedRows.filter(boxId => {
        const findBox = this.currentData.find(box => box._id === boxId)
        return findBox?.storekeeper !== firstBox?.storekeeper
      })

      if (boxesWithDifferentStorekeepers.length) {
        toast.warning(t(TranslationKey['Boxes with identical storekeeper must be selected']))

        return
      }

      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations as IDestination[]
      })

      this.onTriggerOpenModal('showGroupingBoxesModal')
    } catch (err) {
      console.error(err)
    }
  }

  async setDimensions(row: any) {
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

  async onSubmitEditBox(id: string, data: any) {
    try {
      if (data.images.length > 0) {
        // @ts-ignore
        await onSubmitPostImages.call(this, { images: data.images, type: 'uploadedFiles' })
        data = { ...data, images: [...data.images, ...this.uploadedFiles] }
      }

      const updateBoxData = {
        ...getObjectFilteredByKeyArrayWhiteList(
          data,
          // ['deliveryLength', 'deliveryWidth', 'deliveryHeight', 'deliveryMass', 'fitsInitialDimensions', 'images'],
          ['lengthCmWarehouse', 'widthCmWarehouse', 'heightCmWarehouse', 'weighGrossKgWarehouse', 'images'],
          false,
          (key: string, value: any) => {
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
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitAddBatch(boxesIds: string[], filesToAdd: any, batchFields: any) {
    try {
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: filesToAdd, type: 'uploadedFiles' })

      const batchId = await BatchesModel.createBatch({
        title: batchFields.title,
        boxesIds,
        calculationMethod: batchFields.calculationMethod,
        volumeWeightDivide: batchFields.volumeWeightDivide,
      })

      await BatchesModel.editAttachedDocuments(batchId.guid, this.uploadedFiles)

      this.getCurrentData()
      this.onTriggerOpenModal('showAddBatchModal')
      this.onTriggerOpenModal('showBoxMoveToBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitAddOrEditHsCode(data: any) {
    try {
      await ProductModel.editProductsHsCods(data)
      this.getCurrentData()
      this.onTriggerOpenModal('showAddOrEditHsCodeInBox')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitMoveBoxToBatch(box: any, selectedBatch: any) {
    try {
      if (box.batchId) {
        await BatchesModel.removeBoxFromBatch(box.batchId, [box._id])
      }

      await BatchesModel.addBoxToBatch(selectedBatch.id, [box._id])
      this.getCurrentData()
      this.onTriggerOpenModal('showBoxMoveToBatchModal')
    } catch (error) {
      console.error(error)
    }
  }

  async setCurrentOpenedBox(row: any) {
    try {
      this.curBox = row._id

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateBatch(box: any) {
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

  onChangeUnitsOption(event: RadioChangeEvent) {
    const currentValue = event.target.value
    this.unitsOption = currentValue
  }
}
