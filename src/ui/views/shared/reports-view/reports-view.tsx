import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './reports-view.style'

import { ReportsViewModel } from './reports-view.model'

interface ReportsViewProps {
  product: IProduct
}

export const ReportsView: FC<ReportsViewProps> = observer(({ product }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ReportsViewModel())

  console.log('product', product)

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoContainer}>
        <SlideshowGallery slidesToShow={2} files={product.images} />
      </div>

      <div className={styles.buttonsContainer}>
        <Button>{t(TranslationKey['New report'])}</Button>

        <Button styleType={ButtonStyle.SUCCESS}>
          <CustomPlusIcon />
          {t(TranslationKey['New report'])}
        </Button>
      </div>

      <div className={styles.tableContainer}>
        <CustomDataGrid
          rows={viewModel.rows}
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          columns={viewModel.columnsModel}
          filterModel={viewModel.filterModel}
          pinnedColumns={viewModel.pinnedColumns}
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
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>
    </div>
  )
})
