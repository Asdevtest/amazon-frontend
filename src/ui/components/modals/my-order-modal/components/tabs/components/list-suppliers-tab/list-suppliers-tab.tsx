/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, memo } from 'react'

import { GridRowClassNameParams } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { PaymentMethodsForm } from '@components/forms/payment-methods-form'
import { GalleryModal } from '@components/modals/gallery-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { suppliersOrderColumn } from '@components/table/table-columns/shared/suppliers-order-column'

import { t } from '@utils/translations'

import { IDestinationStorekeeper } from '@typings/destination'
import { IPlatformSettings } from '@typings/patform-settings'

import { useStyles } from './list-suppliers-tab.style'

import { Toolbar } from './toolbar'
import { useListSuppliersTab } from './use-list-suppliers-tab'

interface ListSuppliersTabProps {
  order: any
  storekeepers: IDestinationStorekeeper[]
  platformSettings: IPlatformSettings
}

export const ListSuppliersTab: FC<ListSuppliersTabProps> = memo(props => {
  const { order, storekeepers, platformSettings } = props

  const { classes: styles } = useStyles()

  const {
    paginationModel,
    setPaginationModel,

    selectionModel,
    setSelectionModel,

    currentSupplier,
    suppliers,

    galleryFiles,
    showGalleryModal,
    setShowGalleryModal,
    onToggleGalleryModal,

    showAddOrEditSupplierModal,
    onToggleAddOrEditSupplierModal,

    showPaymentMethodsModal,
    onTogglePaymentMethodsModal,

    currentOrderPaymentMethods,
    paymentMethods,
    onClickPaymentMethodsCell,
  } = useListSuppliersTab(order)

  const showVisibilityButton = selectionModel.length > 0
  const getRowClassName = ({ id }: GridRowClassNameParams) =>
    id === order?.product?.currentSupplier?._id && styles.currentSupplierBackground

  return (
    <>
      <div className={styles.wrapper}>
        <CustomDataGrid
          disableColumnMenu
          sortingMode="client"
          paginationMode="client"
          rows={suppliers}
          getRowClassName={getRowClassName}
          rowCount={suppliers.length}
          columnHeaderHeight={40}
          getRowHeight={() => 'auto'}
          columns={suppliersOrderColumn({
            order,
            platformSettings,
            onToggleGalleryModal,
            onClickPaymentMethodsCell,
          })}
          paginationModel={paginationModel}
          rowSelectionModel={selectionModel}
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
                  onAddOrEditSupplierModal={onToggleAddOrEditSupplierModal}
                />
              ),
            },
          }}
          onPaginationModelChange={setPaginationModel}
          onRowSelectionModelChange={setSelectionModel}
        />
      </div>

      {showGalleryModal && (
        <GalleryModal
          files={galleryFiles}
          isOpenModal={showGalleryModal}
          onOpenModal={() => setShowGalleryModal(!showGalleryModal)}
        />
      )}

      {showAddOrEditSupplierModal && (
        <Modal openModal={showAddOrEditSupplierModal} setOpenModal={onToggleAddOrEditSupplierModal}>
          {/* @ts-ignore */}
          <AddOrEditSupplierModalContent
            onlyRead
            product={order?.product}
            supplier={currentSupplier}
            storekeepersData={storekeepers}
            sourceYuanToDollarRate={platformSettings?.yuanToDollarRate}
            volumeWeightCoefficient={platformSettings?.volumeWeightCoefficient}
            title={t(TranslationKey['Adding and editing a supplier'])}
            onTriggerShowModal={onToggleAddOrEditSupplierModal}
          />
        </Modal>
      )}

      {showPaymentMethodsModal && (
        <Modal openModal={showPaymentMethodsModal} setOpenModal={onTogglePaymentMethodsModal}>
          <PaymentMethodsForm
            readOnly
            orderPayments={currentOrderPaymentMethods}
            allPayments={paymentMethods}
            onClickCancelButton={onTogglePaymentMethodsModal}
          />
        </Modal>
      )}
    </>
  )
})
