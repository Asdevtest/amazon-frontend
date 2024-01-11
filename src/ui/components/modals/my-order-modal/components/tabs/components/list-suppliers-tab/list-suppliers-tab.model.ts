import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid'

import { SupplierModel } from '@models/supplier-model'

import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'

import { Payment, PaymentMethod } from '@typings/payments'
import { ISupplier } from '@typings/product'
import { IUploadFile } from '@typings/upload-file'

interface ISupplierState extends ISupplier {
  id: string
}

export class ListSuppliersTabModel {
  suppliers: ISupplierState[] = []
  currentSupplier: ISupplier | undefined = undefined
  paymentMethods: Payment[] = []
  supplierPaymentMethods: Payment[] = []
  galleryFiles: Array<string | IUploadFile> = []

  showGalleryModal = false
  showPaymentMethodsModal = false
  showAddOrEditSupplierModal = false

  paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  selectionModel: GridRowSelectionModel = []

  constructor(order: IOrderWithAdditionalFields) {
    this.onGetSuppliers(order)
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

  async getPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response.map(paymentMethod => ({
          isChecked: false,
          paymentDetails: '',
          paymentImages: [],
          paymentMethod,
        }))
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.paymentMethods = []
      })
    }
  }

  onClickPaymentMethodsCell(paymentMethods: PaymentMethod[]) {
    const supplierPaymentMethodsRow = paymentMethods?.map((paymentMethod: PaymentMethod) => ({
      isChecked: false,
      paymentDetails: '',
      paymentImages: [],
      paymentMethod,
    }))

    if (supplierPaymentMethodsRow.length > 0) {
      this.supplierPaymentMethods = supplierPaymentMethodsRow
    }

    this.onTogglePaymentMethodsModal()
  }

  onClickFilesCell = (files?: Array<string | IUploadFile>) => {
    if (files && files.length > 0) {
      this.galleryFiles = files
    } else {
      this.galleryFiles = []
    }

    this.onToggleGalleryModal()
  }

  onTogglePaymentMethodsModal() {
    this.showPaymentMethodsModal = !this.showPaymentMethodsModal
  }

  onToggleAddOrEditSupplierModal() {
    this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
  }

  onToggleGalleryModal() {
    this.showGalleryModal = !this.showGalleryModal
  }
}
