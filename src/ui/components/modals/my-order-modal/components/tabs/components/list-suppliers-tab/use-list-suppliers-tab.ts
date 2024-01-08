import { useEffect, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid'

import { SupplierModel } from '@models/supplier-model'

import { Payment, PaymentMethod } from '@typings/payments'
import { ISupplier } from '@typings/product'
import { IUploadFile } from '@typings/upload-file'

interface ISupplierState extends ISupplier {
  id: string
}

export const useListSuppliersTab = (order: any) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 15 })
  const [selectionModel, setSelectionModel] = useState<string[]>([])
  const [suppliers, setSuppliers] = useState<ISupplierState[]>([])
  const [currentSupplier, setCurrentSupplier] = useState<ISupplierState | undefined>(undefined)

  useEffect(() => {
    const product = order?.product

    if (product?.suppliers?.length > 0) {
      const currentSupplierId = product.currentSupplier?._id

      if (currentSupplierId) {
        setSelectionModel(prevState => [currentSupplierId, ...prevState])
      }

      const foundCurrentSupplier = product.suppliers.find((supplier: ISupplier) => supplier._id === currentSupplierId)
      const filteringSuppliers = product.suppliers.filter((supplier: ISupplier) => supplier._id !== currentSupplierId)
      const resultSuppliers = foundCurrentSupplier ? [foundCurrentSupplier, ...filteringSuppliers] : product.suppliers

      setSuppliers(resultSuppliers.map((supplier: ISupplier) => ({ ...supplier, id: supplier._id })))
    }
  }, [order])

  useEffect(() => {
    const foundCurrentSupplier = suppliers.find((supplier: ISupplier) => supplier._id === selectionModel[0])

    if (foundCurrentSupplier) {
      setCurrentSupplier(foundCurrentSupplier)
    }
  }, [selectionModel])

  const [galleryFiles, setGalleryFiles] = useState<Array<string | IUploadFile>>([])
  const [showGalleryModal, setShowGalleryModal] = useState(false)

  const handleToggleGalleryModal = (files?: Array<string | IUploadFile>) => {
    if (files && files.length > 0) {
      setGalleryFiles(files)
    } else {
      setGalleryFiles([])
    }

    setShowGalleryModal(!showGalleryModal)
  }

  const [showAddOrEditSupplierModal, setShowAddOrEditSupplierModal] = useState(false)

  const handleAddOrEditSupplierModal = () => {
    setShowAddOrEditSupplierModal(!showAddOrEditSupplierModal)
  }

  const [currentOrderPaymentMethods, setCurrentOrderPaymentMethods] = useState<Payment[]>([])
  const [showPaymentMethodsModal, setShowPaymentMethodsModal] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<Payment[]>([])

  const handleTogglePaymentMethodsModal = () => {
    setShowPaymentMethodsModal(!showPaymentMethodsModal)
  }

  const onClickPaymentMethodsCell = (row: GridRowModel) => {
    const currentPaymentMethods = row.paymentMethods?.map((paymentMethod: PaymentMethod) => ({
      isChecked: false,
      paymentDetails: '',
      paymentImages: [],
      paymentMethod,
    }))

    if (currentPaymentMethods.length > 0) {
      setCurrentOrderPaymentMethods(currentPaymentMethods)
    }

    handleTogglePaymentMethodsModal()
  }

  const getPaymentMethods = async () => {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      return response.map(paymentMethod => ({
        isChecked: false,
        paymentDetails: '',
        paymentImages: [],
        paymentMethod,
      }))
    } catch (error) {
      console.log(error)
      return []
    }
  }

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const suppliersPaymentMethods: Payment[] = await getPaymentMethods()

        if (suppliersPaymentMethods.length) {
          setPaymentMethods(suppliersPaymentMethods)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchPaymentMethods()
  }, [])

  return {
    paginationModel,
    setPaginationModel,

    selectionModel,
    setSelectionModel,

    currentSupplier,
    suppliers,

    galleryFiles,
    showGalleryModal,
    setShowGalleryModal,
    onToggleGalleryModal: handleToggleGalleryModal,

    showAddOrEditSupplierModal,
    onToggleAddOrEditSupplierModal: handleAddOrEditSupplierModal,

    showPaymentMethodsModal,
    onTogglePaymentMethodsModal: handleTogglePaymentMethodsModal,

    currentOrderPaymentMethods,
    paymentMethods,
    onClickPaymentMethodsCell,
  }
}
