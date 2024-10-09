import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCell } from '@components/data-grid/data-grid-cells'
import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './product-data-form.style'

import { ProductDataFormModel } from './product-data-form.model'

interface ProductDataFormProps {
  product: IProduct
  onAmazon: boolean
  isBatches?: boolean
}

export const ProductDataForm: FC<ProductDataFormProps> = observer(({ product, onAmazon, isBatches }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new ProductDataFormModel({ product, onAmazon, isBatches }), [])

  const title = isBatches
    ? 'Product batches data'
    : onAmazon
    ? 'Data of product boxes inbound'
    : 'Data of product boxes in transfer'

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexRow}>
        <p className={styles.title}>{t(TranslationKey[title])}</p>

        <CustomInputSearch allowClear placeholder="Batch number and FBA" onSearch={viewModel.onSearchSubmit} />
      </div>

      <div className={styles.flexRow}>
        <ProductCell
          isCell={false}
          image={product?.images?.[0]}
          title={product?.amazonTitle}
          asin={product?.asin}
          sku={product?.skuByClient}
        />

        <CustomButton size="large" onClick={viewModel.onToggleArchive}>
          {t(TranslationKey[viewModel.batchArchive ? 'Actual batches' : 'Archive'])}
        </CustomButton>
      </div>

      <CustomDataGrid
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        pinnedColumns={viewModel.pinnedColumns}
        rowSelectionModel={viewModel.selectedRows}
        paginationModel={viewModel.paginationModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        getRowId={({ _id }: GridRowModel) => _id}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          columnMenu: viewModel.columnMenuSettings,
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
            sortSettings: {
              sortModel: viewModel.sortModel,
              columnsModel: viewModel.columnsModel,
              onSortModelChange: viewModel.onChangeSortingModel,
            },
          },
        }}
        rowCount={viewModel.rowCount}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
      />

      {viewModel.showBatchInfoModal ? (
        // @ts-ignore
        <BatchInfoModal
          openModal={viewModel.showBatchInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBatchInfoModal')}
          batch={viewModel.batch}
          patchActualShippingCostBatch={viewModel.patchActualShippingCostBatch}
        />
      ) : null}
    </div>
  )
})
