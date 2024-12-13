import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { OrderProductModal } from '@components/modals/order-product-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './orders.style'

import { OrdersModel } from './orders.model'

export interface OrdersProps {
  productId?: string
}

export const Orders: FC<OrdersProps> = observer(props => {
  const { productId } = props

  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new OrdersModel(productId), [])

  return (
    <>
      <div className={styles.mainWrapper}>
        <CustomDataGrid
          sortingMode="client"
          paginationMode="client"
          rowCount={viewModel.rowCount}
          rows={viewModel.filteredData}
          sortModel={viewModel.sortModel}
          columns={viewModel.columnsModel}
          filterModel={viewModel.filterModel}
          pinnedColumns={viewModel.pinnedColumns}
          rowSelectionModel={viewModel.selectedRows}
          paginationModel={viewModel.paginationModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          getRowHeight={() => 'auto'}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              resetFiltersBtnSettings: {
                onClickResetFilters: viewModel.onClickResetFilters,
                isSomeFilterOn: viewModel.isSomeFilterOn,
              },
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onPinnedColumnsChange={viewModel.handlePinColumn}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        />
      </div>

      <Modal missClickModalOn openModal={viewModel.showOrderModal} setOpenModal={viewModel.onToggleOrderModal}>
        <OrderProductModal
          // @ts-ignore
          orderId={viewModel.orderId}
        />
      </Modal>
    </>
  )
})
