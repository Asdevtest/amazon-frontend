/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { GridRowClassNameParams, GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

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
}

export const ListSuppliers: FC<ListSuppliersProps> = observer(props => {
  const { formFields, storekeepers, platformSettings } = props

  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ListSuppliersModel(extractProduct(formFields)))

  const getRowClassName = ({ id }: GridRowClassNameParams) =>
    id === extractProduct(formFields)?.currentSupplier?._id && styles.currentSupplierBackground
  const showVisibilityButton = viewModel.selectionModel.length > 0
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
                  showVisibilityButton={showVisibilityButton}
                  onAddOrEditSupplierModal={() => viewModel.onToggleModal(ModalNames.SUPPLIER)}
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
            onlyRead
            product={extractProduct(formFields)}
            supplier={viewModel.currentSupplier}
            storekeepersData={storekeepers}
            sourceYuanToDollarRate={platformSettings?.yuanToDollarRate}
            volumeWeightCoefficient={platformSettings?.volumeWeightCoefficient}
            title={t(TranslationKey['Adding and editing a supplier'])}
            onTriggerShowModal={() => viewModel.onToggleModal(ModalNames.SUPPLIER)}
          />
        </Modal>
      ) : null}
    </>
  )
})
