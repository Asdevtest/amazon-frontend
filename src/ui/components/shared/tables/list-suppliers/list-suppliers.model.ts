/* eslint-disable @typescript-eslint/no-empty-function */
import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { StorekeeperModel } from '@models/storekeeper-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'
import { ISupplier } from '@typings/models/suppliers/supplier'
import { IDestinationStorekeeper } from '@typings/shared/destinations'
import { IPlatformSettings } from '@typings/shared/patform-settings'
import { IPaymentMethod } from '@typings/shared/payment-method'
import { UploadFileType } from '@typings/shared/upload-file'

import { ModalModes, ModalNames } from './list-suppliers.type'

export class ListSuppliersModel {
  requestStatus: loadingStatuses = loadingStatuses.SUCCESS

  paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  selectionModel: GridRowSelectionModel = []

  product: IProduct | undefined = undefined
  suppliers: ISupplier[] = []
  currentSupplier: ISupplier | undefined = undefined
  galleryFiles: UploadFileType[] = []
  paymentMethods: IPaymentMethod[] = []
  storekeepers: IDestinationStorekeeper[] = []
  platformSettings: IPlatformSettings | undefined = undefined

  supplierModalReadOnly = false
  showGalleryModal = false
  showAddOrEditSupplierModal = false
  showSupplierApproximateCalculationsModal = false
  showConfirmModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    successBtnText: '',
    cancelBtnText: '',
    onClickOkBtn: () => {},
  }

  onSaveProduct?: (product: IProduct) => void
  onRemoveSupplier?: (supplierId: string) => void

  get userInfo() {
    return UserModel.userInfo
  }

  constructor(
    product: IProduct,
    onSaveProduct?: (product: IProduct) => void,
    onRemoveSupplier?: (supplierId: string) => void,
  ) {
    this.product = product
    this.onSaveProduct = onSaveProduct
    this.onRemoveSupplier = onRemoveSupplier

    this.onGetSuppliers()
    this.getPaymentMethods()
    this.getStorekeepers()
    this.getPlatformSettings()

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.selectionModel,
      () => this.onGetCurrentSupplier(),
    )

    reaction(
      () => this.showAddOrEditSupplierModal,
      () => {
        if (!this.showAddOrEditSupplierModal) {
          this.onGetCurrentSupplier()
        }
      },
    )
  }

  onPaginationModelChange(model: GridPaginationModel) {
    this.paginationModel = model
  }

  onRowSelectionModelChange(model: GridRowSelectionModel) {
    if (this.selectionModel[0] === model[0]) {
      this.selectionModel = []
    } else {
      this.selectionModel = model
    }
  }

  onGetSuppliers() {
    if (this.product) {
      const currentSupplierId: string | undefined = this.product?.currentSupplier?._id

      if (currentSupplierId) {
        this.selectionModel = [currentSupplierId, ...this.selectionModel]
      }

      const foundCurrentSupplier = this.product?.suppliers?.find(
        (supplier: ISupplier) => supplier._id === currentSupplierId,
      )
      const filteringSuppliers = this.product?.suppliers?.filter(
        (supplier: ISupplier) => supplier._id !== currentSupplierId,
      )
      const resultSuppliers = foundCurrentSupplier
        ? [foundCurrentSupplier, ...filteringSuppliers]
        : this.product?.suppliers

      this.suppliers = resultSuppliers?.map((supplier: ISupplier) => ({ ...supplier, id: supplier._id }))
    }
  }

  onGetCurrentSupplier() {
    const foundCurrentSupplier = this.suppliers.find((supplier: ISupplier) => supplier._id === this.selectionModel[0])

    if (foundCurrentSupplier) {
      this.currentSupplier = foundCurrentSupplier
    }
  }

  onClickFilesCell = (files?: UploadFileType[]) => {
    if (files && files.length > 0) {
      this.galleryFiles = files
    } else {
      this.galleryFiles = []
    }

    this.onToggleModal(ModalNames.GALLERY)
  }

  async getPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response as IPaymentMethod[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getStorekeepers() {
    try {
      const response = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepers = response as IDestinationStorekeeper[]
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getPlatformSettings() {
    try {
      const response = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.platformSettings = response as IPlatformSettings
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onSupplierActions(mode: ModalModes) {
    switch (mode) {
      case ModalModes.ADD:
        runInAction(() => {
          this.supplierModalReadOnly = false
          this.currentSupplier = undefined
        })

        this.onToggleModal(ModalNames.SUPPLIER)
        break
      case ModalModes.VIEW:
        runInAction(() => {
          this.supplierModalReadOnly = true
        })

        this.onToggleModal(ModalNames.SUPPLIER)
        break
      case ModalModes.EDIT:
        runInAction(() => {
          this.supplierModalReadOnly = false
        })

        this.onToggleModal(ModalNames.SUPPLIER)
        break
      case ModalModes.ACCEPT:
        runInAction(() => {
          if (this.currentSupplier && this.product) {
            this.product.currentSupplierId = this.currentSupplier?._id
            this.product.currentSupplier = this.currentSupplier
          }
        })

        this.saveProduct()
        this.onGetSuppliers()

        break
      case ModalModes.ACCERT_REVOKE:
        runInAction(() => {
          if (this.currentSupplier && this.product) {
            this.product.currentSupplierId = null
            this.product.currentSupplier = undefined
          }
        })

        this.saveProduct()

        break
      case ModalModes.DELETE:
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: true,
            message: t(TranslationKey['Are you sure you want to remove the supplier?']),
            successBtnText: t(TranslationKey.Yes),
            cancelBtnText: t(TranslationKey.Cancel),
            onClickOkBtn: () => {
              this.removeSupplier()
              this.onToggleModal(ModalNames.CONFIRM)
            },
          }
        })

        this.onToggleModal(ModalNames.CONFIRM)
        break
    }
  }

  saveProduct() {
    if (this.onSaveProduct && this.product) {
      this.onSaveProduct(this.product)

      this.onGetSuppliers()
    }
  }

  removeSupplier() {
    if (this.onRemoveSupplier && this.currentSupplier) {
      this.onRemoveSupplier(this.currentSupplier?._id)
    }
  }

  updateSuppliers(product: IProduct) {
    this.product = product

    this.onGetSuppliers()
  }

  setRequestStatus(requestStatus: loadingStatuses) {
    this.requestStatus = requestStatus
  }

  onToggleModal(modalName: ModalNames) {
    this[modalName] = !this[modalName]
  }
}
