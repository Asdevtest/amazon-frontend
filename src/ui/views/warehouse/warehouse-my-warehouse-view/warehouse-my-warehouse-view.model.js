/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BatchStatus} from '@constants/batch-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {operationTypes} from '@constants/operation-types'
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
  'referenceId',
  'storekeeperTaskComment',
  'trackNumberFile',
  'trackNumberText',
  'upsTrackNumber',
  'fbaNumber',
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

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
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
        runInAction(() => {
          this.currentData = this.getCurrentData()
        })
      },
    )
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
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
    runInAction(() => {
      this.filterModel = model
    })
  }

  setDataGridState(state) {
    runInAction(() => {
      this.firstRowId = state.sorting.sortedRows[0]
    })

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
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = warehouseBoxesViewColumns(this.rowHandlers, this.firstRowId, this.userInfo).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
      this.curPage = 0
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

  // onSelectionModel(model) {
  //   const boxes = this.boxesMy.filter(box => model.includes(box.id))
  //   const res = boxes.reduce((ac, el) => ac.concat(el._id), [])
  //   runInAction(() => {
  //     this.selectedBoxes = res
  //   })
  // }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedBoxes = model
    })
  }

  getCurrentData() {
    return toJS(this.boxesMy)
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
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
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, {images: data.tmpTrackNumberFile, type: 'uploadedFiles'})
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        storekeeperComment: data.storekeeperComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
        upsTrackNumber: data.upsTrackNumber,
      })

      // const dataToSubmitHsCode = data.items.map(el => ({productId: el.product._id, hsCode: el.product.hsCode}))
      // await ProductModel.editProductsHsCods(dataToSubmitHsCode)

      this.getBoxesMy()

      this.onTriggerOpenModal('showBoxViewModal')

      this.modalEditSuccessMessage = t(TranslationKey['Data saved successfully'])

      this.onTriggerOpenModal('showSuccessInfoModal')
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
    this.hsCodeData = await ProductModel.getProductsHsCodeByGuid(id)

    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  async onClickSubmitEditMultipleBoxes(newBoxes, selectedBoxes) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.onTriggerOpenModal('showEditMultipleBoxesModal')

      const uploadedShippingLabeles = []

      const uploadedBarcodes = []

      for (let i = 0; i < newBoxes.length; i++) {
        const newBox = {...newBoxes[i]}
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
            ...getObjectFilteredByKeyArrayBlackList(el, ['order', 'product', 'tmpBarCode', 'changeBarCodInInventory']),
            amount: el.amount,
            orderId: el.order._id,
            productId: el.product._id,

            _id: el._id,

            barCode: prodInDataToUpdateBarCode?.newData?.length ? prodInDataToUpdateBarCode?.newData[0] : el.barCode,

            isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier,

            isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper,
          }
        })

        await this.onClickSubmitEditBox({id: sourceBox._id, boxData: newBox, isMultipleEdit: true})
      }

      runInAction(() => {
        this.modalEditSuccessMessage = t(TranslationKey['Editing completed'])
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

  async onClickSubmitEditBox({id, boxData, imagesOfBox, dataToSubmitHsCode, isMultipleEdit}) {
    try {
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

      const getNewItems = () => {
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
        return newItems
      }

      const requestBox = getObjectFilteredByKeyArrayWhiteList(
        {
          ...boxData,
          images: this.uploadedImages?.length ? [...boxData.images, ...this.uploadedImages] : boxData.images,
          items: isMultipleEdit ? boxData.items : getNewItems(),
          shippingLabel: this.uploadedFiles?.length ? this.uploadedFiles[0] : boxData.shippingLabel,
          trackNumberFile: this.uploadedTrackNumber?.length ? this.uploadedTrackNumber[0] : boxData.trackNumberFile,
        },
        updateBoxWhiteList,
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
      runInAction(() => {
        this.error = error
      })
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
      runInAction(() => {
        this.curBoxToMove = row
      })
      await this.getDataToMoveBatch()

      this.onTriggerOpenModal('showBoxMoveToBatchModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async setHsCode(row) {
    try {
      runInAction(() => {
        this.curBox = row
      })

      this.onTriggerOpenModal('showAddOrEditHsCodeInBox')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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
        runInAction(() => {
          this.curBox = this.boxesMy.find(el => el._id === this.selectedBoxes[0]).originalData
        })

        this.onTriggerOpenModal('showFullEditBoxModal')
      } else {
        this.onTriggerOpenModal('showEditMultipleBoxesModal')
      }
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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
      const storekeepersData = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.destinations = destinations
        this.storekeepersData = storekeepersData
      })

      this.onTriggerOpenModal('showMergeBoxModal')
    } catch (error) {
      console.log(error)
    }
  }

  onClickConfirmCreateMergeTasks(boxBody, boxData, comment) {
    this.onClickMerge(boxBody, comment)
    // this.onTriggerOpenModal('showConfirmModal')
    // runInAction(() => {
    //   this.confirmModalSettings = {
    //     isWarning: false,
    //     confirmMessage: `${t(TranslationKey['The task for the warehouse will be formed'])} ${
    //       boxData?.storekeeper?.name
    //     } ${t(TranslationKey['to merge boxes'])}`,
    //     onClickConfirm: () => this.onClickMerge(boxBody, comment),
    //   }
    // })
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
          this.modalEditSuccessMessage = `${t(TranslationKey['Data saved successfully'])}`
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

      this.setRequestStatus(loadingStatuses.success)

      await this.getBoxesMy()

      runInAction(() => {
        this.selectedBoxes = []
        this.tmpClientComment = ''
      })

      await this.getBoxesMy()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
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

  onRemoveBoxFromSelected(boxId) {
    runInAction(() => {
      this.selectedBoxes = this.selectedBoxes.filter(id => id !== boxId)
    })

    if (this.selectedBoxes.length < 2) {
      this.onTriggerOpenModal('showMergeBoxModal')
    }
  }

  async onClickSplitBtn() {
    try {
      const destinations = await ClientModel.getDestinations()
      const storekeepersData = await StorekeeperModel.getStorekeepers()

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
    runInAction(() => {
      this.modalRedistributeBoxAddNewBox = value
    })
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

  async setDimensions(row) {
    try {
      runInAction(() => {
        this.curBox = row
      })
      this.onTriggerShowEditBoxModal()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitAddBatch({boxesIds, filesToAdd, batchFields}) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (filesToAdd.length) {
        await onSubmitPostImages.call(this, {images: filesToAdd, type: 'uploadedFiles'})
      }

      const batchId = await BatchesModel.createBatch({
        title: batchFields.title,
        boxesIds,
        calculationMethod: batchFields.calculationMethod,
        volumeWeightDivide: batchFields.volumeWeightDivide,
      })

      if (filesToAdd.length) {
        await BatchesModel.editAttachedDocuments(batchId.guid, this.uploadedFiles)
      }

      this.loadData()
      this.onTriggerOpenModal('showAddBatchModal')
      this.onTriggerOpenModal('showBoxMoveToBatchModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitAddOrEditHsCode(data) {
    try {
      await ProductModel.editProductsHsCods(data)

      this.loadData()
      this.onTriggerOpenModal('showAddOrEditHsCodeInBox')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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
      runInAction(() => {
        this.error = error
      })
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

  async onSubmitCreateBatch(box) {
    try {
      const boxes = await BoxesModel.getBoxesReadyToBatchStorekeeper()

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.boxesData = boxes // clientWarehouseDataConverter(boxes, result.volumeWeightCoefficient)

        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.sourceBoxForBatch = box
      })

      this.onTriggerOpenModal('showAddBatchModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onTriggerShowEditBoxModal() {
    runInAction(() => {
      this.showEditBoxModal = !this.showEditBoxModal
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

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  async getBoxesMy() {
    try {
      const filter = isNaN(this.nameSearchValue)
        ? `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][item][$eq]=${this.nameSearchValue};`
        : `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};or[3][id][$eq]=${this.nameSearchValue};or[4][item][$eq]=${this.nameSearchValue};`

      const boxes = await StorekeeperModel.getBoxesMyPag({
        filters: this.nameSearchValue ? filter : null,

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

      runInAction(() => {
        this.error = error
        this.boxesMy = []

        this.baseBoxesMy = []
      })
    }
  }
}
