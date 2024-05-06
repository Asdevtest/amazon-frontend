import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './product-data-form.style'

import { ProductDataFormModel } from './product-data-form.model'

interface ProductDataFormProps {
  product: IProduct
  isBatches: boolean
  onAmazon: boolean
}

export const ProductDataForm: FC<ProductDataFormProps> = observer(({ product, isBatches, onAmazon }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ProductDataFormModel({ product, isBatches, onAmazon }))

  const title = isBatches
    ? 'Product batches data'
    : onAmazon
    ? 'Data of product boxes inbound'
    : 'Data of product boxes in transfer'

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <p className={styles.title}>{t(TranslationKey[title])}</p>

        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.currentSearchValue}
          placeholder={t(TranslationKey['Batch number and FBA'])}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>

      <div className={styles.flexContainer}>
        <div className={styles.product}>
          <img className={styles.image} src={getAmazonImageUrl(product?.images?.[0])} />
          <p className={styles.productTitle}>{product?.amazonTitle}</p>

          <div className={styles.links}>
            <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={product?.asin} />
            <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={product?.skuByClient} />
            <AsinOrSkuLink withCopyValue withAttributeTitle="fnsku" link={''} />
          </div>
        </div>

        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onToggleArchive}>
          {viewModel.batchArchive ? t(TranslationKey['Actual batches']) : t(TranslationKey.Archive)}
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          rows={viewModel.rows}
          rowCount={viewModel.rowCount}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          paginationModel={viewModel.paginationModel}
          rowSelectionModel={viewModel.selectedRows}
          columnVisibilityModel={viewModel.columnVisibilityModel}
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
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

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
