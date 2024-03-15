import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import { GridRowClassNameParams, GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { SupplierApproximateCalculationsForm } from '@components/forms/supplier-approximate-calculations-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { GalleryModal } from '@components/modals/gallery-modal'
import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './list-suppliers.style'

import { extractProduct } from './helpers/extract-product'
import { suppliersOrderColumn } from './list-suppliers.column'
import { ListSuppliersModel } from './list-suppliers.model'
import { ModalNames } from './list-suppliers.type'
import { Toolbar } from './toolbar'

interface ListSuppliersProps {
  formFields: IOrderWithAdditionalFields | IProduct
  readOnly?: boolean
  checkIsPlanningPrice?: boolean
  onClickSaveSupplier?: () => void // can be transferred inside the table model
  onSaveProduct?: () => void
  onRemoveSupplier?: () => void // can be transferred inside the table model
}

export const ListSuppliers: FC<ListSuppliersProps> = observer(props => {
  const { formFields, readOnly, checkIsPlanningPrice, onClickSaveSupplier, onSaveProduct, onRemoveSupplier } = props

  const { classes: styles } = useStyles()

  const orderSupplier = 'orderSupplier' in formFields ? formFields?.orderSupplier : undefined

  const [viewModel] = useState(
    () => new ListSuppliersModel(extractProduct(formFields), orderSupplier, onSaveProduct, onRemoveSupplier),
  ) // extractProduct - converter for getting product from order(everywhere we work directly with the product)
  const [orderStatus, setOrderStatus] = useState(0) // needed for additional conditions in the buyer's order view(everywhere we work directly with the product)

  useEffect(() => {
    viewModel.updateSuppliers(extractProduct(formFields))

    // if an order arrives
    if ('product' in formFields) {
      setOrderStatus(formFields?.status)
    }
  }, [formFields])

  const getRowClassName = ({ id }: GridRowClassNameParams) =>
    id === (orderSupplier?._id || extractProduct(formFields).currentSupplierId) && styles.currentSupplierBackground
  const listSuppliersColumns = suppliersOrderColumn({
    orderCreatedAt: 'product' in formFields ? formFields?.createdAt : '',
    orderSupplierId: orderSupplier?._id || '',
    platformSettings: viewModel.platformSettings,
    onClickFilesCell: viewModel.onClickFilesCell,
  })
  const isCurrentSupplierSelected =
    (orderSupplier?._id || extractProduct(formFields).currentSupplierId) === viewModel.selectionModel[0]

  return (
    <>
      <div className={styles.wrapper}>
        <CustomDataGrid
          disableColumnMenu
          sortingMode="client"
          paginationMode="client"
          rows={viewModel.suppliers}
          getRowClassName={getRowClassName}
          columnHeaderHeight={40}
          getRowHeight={() => 'auto'}
          getRowId={(row: GridRowModel) => row._id}
          columns={listSuppliersColumns}
          paginationModel={viewModel.paginationModel}
          rowSelectionModel={viewModel.selectionModel}
          sx={{
            '& .MuiDataGrid-columnHeaderTitleContainer': styles.columnHeaderTitleContainer,
            '& .MuiDataGrid-columnHeaderDraggableContainer': styles.columnHeaderTitleContainer,
            '& .MuiDataGrid-row': styles.row,
          }}
          slotProps={{
            toolbar: {
              children: (
                <Toolbar
                  readOnly={readOnly}
                  userInfo={viewModel.userInfo}
                  isSupplerSelected={viewModel.selectionModel.length > 0}
                  isCurrentSupplierSelected={isCurrentSupplierSelected}
                  status={extractProduct(formFields)?.status}
                  orderStatus={orderStatus}
                  supplier={viewModel.currentSupplier}
                  checkIsPlanningPrice={checkIsPlanningPrice}
                  onSupplierApproximateCalculationsModal={() => viewModel.onToggleModal(ModalNames.CALCULATION)}
                  onSupplierActions={viewModel.onSupplierActions}
                />
              ),
            },
          }}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowSelectionModelChange={viewModel.onRowSelectionModelChange}
        />
      </div>

      {viewModel.showGalleryModal ? (
        <GalleryModal
          files={viewModel.galleryFiles}
          openModal={viewModel.showGalleryModal}
          onOpenModal={() => viewModel.onToggleModal(ModalNames.GALLERY)}
        />
      ) : null}

      <Modal
        openModal={viewModel.showAddOrEditSupplierModal}
        setOpenModal={() => viewModel.onToggleModal(ModalNames.SUPPLIER)}
      >
        <AddOrEditSupplierModalContent
          // @ts-ignore
          onlyRead={viewModel.supplierModalReadOnly}
          paymentMethods={viewModel.paymentMethods}
          product={extractProduct(formFields)}
          storekeepersData={viewModel.storekeepers}
          requestStatus={viewModel.requestStatus}
          supplierId={viewModel.currentSupplier?._id}
          platformSettings={viewModel.platformSettings}
          title={t(TranslationKey['Adding and editing a supplier'])}
          onClickSaveBtn={onClickSaveSupplier}
          onTriggerShowModal={() => viewModel.onToggleModal(ModalNames.SUPPLIER)}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSupplierApproximateCalculationsModal}
        setOpenModal={() => viewModel.onToggleModal(ModalNames.CALCULATION)}
      >
        <SupplierApproximateCalculationsForm
          // @ts-ignore
          product={extractProduct(formFields)}
          supplier={viewModel.currentSupplier}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          storekeepers={viewModel.storekeepers}
          onClose={() => viewModel.onToggleModal(ModalNames.CALCULATION)}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.CONFIRM)}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={() => viewModel.confirmModalSettings.onClickOkBtn()}
          onClickCancelBtn={() => viewModel.onToggleModal(ModalNames.CONFIRM)}
        />
      ) : null}
    </>
  )
})
