/* eslint-disable @typescript-eslint/no-empty-function */
import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'
import { ISupplier } from '@typings/models/suppliers/supplier'
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

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.selectionModel,
      () => this.onGetCurrentSupplier(),
    )
  }

  onPaginationModelChange(model: GridPaginationModel) {
    this.paginationModel = model
  }

  onRowSelectionModelChange(model: GridRowSelectionModel) {
    this.selectionModel = model
  }

  onGetSuppliers() {
    if (this.product && this.product?.suppliers?.length > 0 && this.product?.currentSupplier) {
      const currentSupplierId: string = this.product?.currentSupplier?._id

      if (currentSupplierId) {
        this.selectionModel = [currentSupplierId, ...this.selectionModel]
      }

      const foundCurrentSupplier = this.product?.suppliers?.find(
        (supplier: ISupplier) => supplier._id === currentSupplierId,
      )

      if (foundCurrentSupplier) {
        this.currentSupplier = foundCurrentSupplier
      }

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

  async onClickTooltipButton(mode: ModalModes) {
    switch (mode) {
      case ModalModes.ADD:
        runInAction(() => {
          this.currentSupplier = undefined
          this.supplierModalReadOnly = false
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

          this.currentSupplier = undefined
        })

        updateProductAutoCalculatedFields.call(this.product)

        this.saveProductIfNeeded()

        break
      case ModalModes.ACCERT_REVOKE:
        runInAction(() => {
          if (this.currentSupplier && this.product) {
            this.product.currentSupplierId = null
            this.product.currentSupplier = undefined
          }

          this.currentSupplier = undefined
        })

        updateProductAutoCalculatedFields.call(this.product)

        this.saveProductIfNeeded()

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

  saveProductIfNeeded() {
    if (this.onSaveProduct && this.product) {
      this.onSaveProduct(this.product)
    }
  }

  removeSupplier() {
    if (this.onRemoveSupplier && this.currentSupplier) {
      this.onRemoveSupplier(this.currentSupplier?._id)
    }
  }

  setRequestStatus(requestStatus: loadingStatuses) {
    this.requestStatus = requestStatus
  }

  onToggleModal(modalName: ModalNames) {
    this[modalName] = !this[modalName]
  }
}
