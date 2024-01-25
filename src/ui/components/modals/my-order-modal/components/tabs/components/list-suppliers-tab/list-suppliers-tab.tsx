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

import { IDestinationStorekeeper } from '@typings/destination'
import { IPlatformSettings } from '@typings/patform-settings'

import { useStyles } from './list-suppliers-tab.style'

import { suppliersOrderColumn } from './list-suppliers-tab.column'
import { ListSuppliersTabModel } from './list-suppliers-tab.model'
import { ModalNames } from './list-suppliers-tab.type'
import { Toolbar } from './toolbar'

interface ListSuppliersTabProps {
  formFields: IOrderWithAdditionalFields
  storekeepers: IDestinationStorekeeper[]
  platformSettings: IPlatformSettings
}

export const ListSuppliersTab: FC<ListSuppliersTabProps> = observer(props => {
  const { formFields, storekeepers, platformSettings } = props

  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ListSuppliersTabModel(formFields))

  const getRowClassName = ({ id }: GridRowClassNameParams) =>
    id === formFields?.product?.currentSupplier?._id && styles.currentSupplierBackground
  const showVisibilityButton = viewModel.selectionModel.length > 0

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
          columns={suppliersOrderColumn(formFields, platformSettings, viewModel.onClickFilesCell)}
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
            product={formFields?.product}
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
