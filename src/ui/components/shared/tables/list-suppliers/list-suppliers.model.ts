import { makeAutoObservable, reaction } from 'mobx'

import { GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'

import { IProduct } from '@typings/models/products/product'
import { ISupplier } from '@typings/models/suppliers/supplier'
import { UploadFileType } from '@typings/shared/upload-file'

import { ModalNames } from './list-suppliers.type'

export class ListSuppliersModel {
  paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  selectionModel: GridRowSelectionModel = []

  suppliers: ISupplier[] = []
  currentSupplier: ISupplier | undefined = undefined
  galleryFiles: UploadFileType[] = []

  showGalleryModal = false
  showAddOrEditSupplierModal = false

  constructor(product: IProduct) {
    this.onGetSuppliers(product)

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

  onGetSuppliers(product: IProduct) {
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

  onClickFilesCell = (files?: UploadFileType[]) => {
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
