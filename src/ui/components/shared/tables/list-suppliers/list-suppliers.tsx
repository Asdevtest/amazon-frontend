import { observer } from 'mobx-react'
import { FC, useEffect, useMemo, useState } from 'react'

import { GridRowClassNameParams } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddSupplierCardModal } from '@components/modals/add-supplier-card-modal'
import { AddSupplierModal } from '@components/modals/add-supplier-modal'
import { BindSupplierCardToProductModal } from '@components/modals/bind-supplier-card-to-product-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './list-suppliers.style'

import { extractProduct } from './helpers/extract-product'
import { suppliersOrderColumn } from './list-suppliers.columns'
import { ListSuppliersModel } from './list-suppliers.model'
import { ModalNames } from './list-suppliers.type'
import { Toolbar } from './toolbar'

interface ListSuppliersProps {
  formFields: IOrderWithAdditionalFields | IProduct
  readOnly?: boolean
  defaultSupplierId?: string
  checkIsPlanningPrice?: boolean
  isNotProductNameForIdea?: boolean
  isIdea?: boolean
  tableWrapperClassName?: string
  onSaveProduct?: () => void
  onRemoveSupplier?: () => void // can be transferred inside the table model
  onClickSaveSupplier?: (suplierCardId?: string) => void // can be transferred inside the table model
}

export const ListSuppliers: FC<ListSuppliersProps> = observer(props => {
  const {
    formFields,
    readOnly,
    defaultSupplierId,
    checkIsPlanningPrice,
    isNotProductNameForIdea,
    isIdea,
    tableWrapperClassName,
    onClickSaveSupplier,
    onSaveProduct,
    onRemoveSupplier,
  } = props

  const { classes: styles, cx } = useStyles()

  const orderSupplier = 'orderSupplierCard' in formFields ? formFields?.orderSupplierCard : undefined

  const viewModel = useMemo(
    // extractProduct - converter for getting product
    // from order(everywhere we work directly with the product)
    () => new ListSuppliersModel(extractProduct(formFields), onSaveProduct, onRemoveSupplier),
    [],
  )

  // needed for additional conditions in the buyer's order
  // view(everywhere we work directly with the product)
  const [orderStatus, setOrderStatus] = useState(0)

  useEffect(() => {
    viewModel.updateSuppliers(extractProduct(formFields))

    // if an order arrives
    if ('product' in formFields) {
      setOrderStatus(formFields?.status)
    }
  }, [formFields])

  const getRowClassName = ({ id }: GridRowClassNameParams) => {
    if (id === extractProduct(formFields).currentSupplierCard?._id) {
      return styles.currentSupplierBackground
    }
  }

  const listSuppliersColumns = suppliersOrderColumn({
    orderCreatedAt: 'product' in formFields ? formFields?.createdAt : '',
    orderSupplierId: orderSupplier?._id || '',
    platformSettings: viewModel.platformSettings,
  })

  const isCurrentSupplierSelected = extractProduct(formFields).currentSupplierCard?._id === viewModel.selectionModel[0]
  const isDefaultSupplier = !!orderStatus && defaultSupplierId === extractProduct(formFields).currentSupplierCard?._id

  return (
    <>
      <div className={cx(styles.wrapper, tableWrapperClassName)}>
        <CustomDataGrid
          disableColumnMenu
          sortingMode="client"
          paginationMode="client"
          rows={viewModel.suppliers}
          getRowClassName={getRowClassName}
          columnHeaderHeight={40}
          getRowHeight={() => 'auto'}
          columns={listSuppliersColumns}
          paginationModel={viewModel.paginationModel}
          rowSelectionModel={viewModel.selectionModel}
          sx={{
            '& .MuiDataGrid-columnHeaderTitleContainer': styles.columnHeaderTitleContainer,
            '& .MuiDataGrid-columnHeaderDraggableContainer': styles.columnHeaderTitleContainer,
            '& .MuiDataGrid-row': styles.row,
          }}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              children: (
                <Toolbar
                  readOnly={readOnly}
                  userInfo={viewModel.userInfo}
                  isNotProductNameForIdea={isNotProductNameForIdea}
                  isDefaultSupplier={isDefaultSupplier}
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

      {viewModel.showBindSupplierCardToProductModal ? (
        <BindSupplierCardToProductModal
          isIdea={isIdea}
          product={extractProduct(formFields)}
          openModal={viewModel.showBindSupplierCardToProductModal}
          handleUpdate={() => viewModel.saveProduct(true)}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.BIND_SUPPLIER_CARD_TO_PRODUCT)}
        />
      ) : null}

      {viewModel.showAddOrEditSupplierModal ? (
        <AddSupplierModal
          hideStatusButton
          openModal={viewModel.showAddOrEditSupplierModal}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.SUPPLIER)}
        />
      ) : null}

      {viewModel.showAddSupplierProductModal ? (
        <AddSupplierCardModal
          hideStatusButton
          disabled={viewModel.supplierModalReadOnly}
          supplierId={viewModel.currentSupplier?.supplier?._id}
          supplierCardId={viewModel.currentSupplier?._id}
          handleUpdate={supplierCardId => {
            let valueToSave = supplierCardId

            if (
              supplierCardId === viewModel.currentSupplier?._id ||
              viewModel.suppliers?.some(supplier => supplier._id === supplierCardId)
            ) {
              valueToSave = undefined
            }

            onClickSaveSupplier?.(valueToSave)
          }}
          openModal={viewModel.showAddSupplierProductModal}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.SUPPLIER_CARD)}
        />
      ) : null}

      {viewModel.showSupplierApproximateCalculationsModal ? (
        <SupplierApproximateCalculationsModal
          openModal={viewModel.showSupplierApproximateCalculationsModal}
          productId={isIdea ? '' : extractProduct(formFields)?._id}
          ideaId={isIdea ? extractProduct(formFields)?._id : ''}
          currentSupplierId={viewModel.currentSupplier?._id || ''}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.CALCULATION)}
        />
      ) : null}

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onToggleModal(ModalNames.CONFIRM)}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={() => viewModel.confirmModalSettings.onClickOkBtn()}
          onClickCancelBtn={() => viewModel.onToggleModal(ModalNames.CONFIRM)}
        />
      ) : null}
    </>
  )
})
