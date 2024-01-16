import { makeAutoObservable, reaction } from 'mobx'

import { GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'

import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'

import { ISupplier } from '@typings/product'
import { IUploadFile } from '@typings/upload-file'

import { ModalNames } from './list-suppliers-tab.type'

export class ListSuppliersTabModel {
  paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  selectionModel: GridRowSelectionModel = []

  suppliers: ISupplier[] = []
  currentSupplier: ISupplier | undefined = undefined
  galleryFiles: Array<string | IUploadFile> = []

  showGalleryModal = false
  showAddOrEditSupplierModal = false

  constructor(order: IOrderWithAdditionalFields) {
    this.onGetSuppliers(order)

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

  onGetSuppliers(order: IOrderWithAdditionalFields) {
    const product = order?.product

    if (product?.suppliers?.length > 0) {
      const currentSupplierId: string = product.currentSupplier?._id

      if (currentSupplierId) {
        this.selectionModel = [currentSupplierId, ...this.selectionModel]
      }

      const foundCurrentSupplier = product.suppliers.find((supplier: ISupplier) => supplier._id === currentSupplierId)

      if (foundCurrentSupplier) {
        this.currentSupplier = foundCurrentSupplier
      }

      const filteringSuppliers = product.suppliers.filter((supplier: ISupplier) => supplier._id !== currentSupplierId)
      const resultSuppliers = foundCurrentSupplier ? [foundCurrentSupplier, ...filteringSuppliers] : product.suppliers

      this.suppliers = resultSuppliers.map((supplier: ISupplier) => ({ ...supplier, id: supplier._id }))
    }
  }

  onGetCurrentSupplier() {
    const foundCurrentSupplier = this.suppliers.find((supplier: ISupplier) => supplier._id === this.selectionModel[0])

    if (foundCurrentSupplier) {
      this.currentSupplier = foundCurrentSupplier
    }
  }

  onClickFilesCell = (files?: Array<string | IUploadFile>) => {
    if (files && files.length > 0) {
      this.galleryFiles = files
    } else {
      this.galleryFiles = []
    }

    this.onToggleModal(ModalNames.GALLERY)
  }

  onToggleModal(modalName: ModalNames) {
    this[modalName] = !this[modalName]
  }
}
