/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

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
import { IDestinationStorekeeper } from '@typings/shared/destinations'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { useStyles } from './list-suppliers.style'

import { extractProduct } from './helpers/extract-product'
import { suppliersOrderColumn } from './list-suppliers.column'
import { ListSuppliersModel } from './list-suppliers.model'
import { ModalNames } from './list-suppliers.type'
import { Toolbar } from './toolbar'

interface ListSuppliersProps {
  formFields: IOrderWithAdditionalFields | IProduct
  storekeepers: IDestinationStorekeeper[]
  platformSettings: IPlatformSettings
  readOnly?: boolean
  onClickSaveSupplier?: () => void
  onSaveProduct?: () => void
  onRemoveSupplier?: () => void
}

export const ListSuppliers: FC<ListSuppliersProps> = observer(props => {
  const { formFields, storekeepers, platformSettings, readOnly, onClickSaveSupplier, onSaveProduct, onRemoveSupplier } =
    props

  const { classes: styles } = useStyles()

  const [viewModel] = useState(
    () => new ListSuppliersModel(extractProduct(formFields), onSaveProduct, onRemoveSupplier),
  )

  const getRowClassName = ({ id }: GridRowClassNameParams) =>
    id === extractProduct(formFields)?.currentSupplier?._id && styles.currentSupplierBackground
  const showViewButtons = viewModel.selectionModel.length > 0
  const listSuppliersColumns = suppliersOrderColumn({
    orderCreatedAt: 'product' in formFields ? formFields?.createdAt : '',
    orderSupplierId: 'orderSupplier' in formFields ? formFields?.orderSupplier?._id : '',
    platformSettings,
    onClickFilesCell: viewModel.onClickFilesCell,
  })

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
                  showViewButtons={showViewButtons}
                  supplier={viewModel.currentSupplier}
                  onSupplierApproximateCalculationsModal={() => viewModel.onToggleModal(ModalNames.CALCULATION)}
                  onClickTooltipButton={viewModel.onClickTooltipButton}
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
          isOpenModal={viewModel.showGalleryModal}
          onOpenModal={() => viewModel.onToggleModal(ModalNames.GALLERY)}
        />
      ) : null}

      {viewModel.showAddOrEditSupplierModal ? (
        <Modal
          openModal={viewModel.showAddOrEditSupplierModal}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.SUPPLIER)}
        >
          <AddOrEditSupplierModalContent
            // remove memo from the modal or add types to the modal
            /* @ts-ignore */
            onlyRead={viewModel.supplierModalReadOnly}
            paymentMethods={viewModel.paymentMethods}
            product={extractProduct(formFields)}
            storekeepersData={storekeepers}
            requestStatus={viewModel.requestStatus}
            volumeWeightCoefficient={platformSettings?.volumeWeightCoefficient}
            supplier={viewModel.currentSupplier}
            sourceYuanToDollarRate={platformSettings?.yuanToDollarRate}
            title={t(TranslationKey['Adding and editing a supplier'])}
            onClickSaveBtn={onClickSaveSupplier}
            onTriggerShowModal={() => viewModel.onToggleModal(ModalNames.SUPPLIER)}
          />
        </Modal>
      ) : null}

      {viewModel.showSupplierApproximateCalculationsModal ? (
        <Modal
          openModal={viewModel.showSupplierApproximateCalculationsModal}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.CALCULATION)}
        >
          <SupplierApproximateCalculationsForm
            // remove memo from the modal or add types to the modal
            /* @ts-ignore */
            product={extractProduct(formFields)}
            supplier={viewModel.currentSupplier}
            volumeWeightCoefficient={platformSettings?.volumeWeightCoefficient}
            storekeepers={storekeepers}
            onClose={() => viewModel.onToggleModal(ModalNames.CALCULATION)}
          />
        </Modal>
      ) : null}

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
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
