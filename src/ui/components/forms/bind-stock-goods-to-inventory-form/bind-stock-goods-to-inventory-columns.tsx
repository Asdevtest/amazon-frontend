import { GridCellParams } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, ProductCell } from '@components/data-grid/data-grid-cells'
import { CustomButton } from '@components/shared/custom-button'
import { DeleteIcon } from '@components/shared/svg-icons'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

export const chosenGoodsColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'asin',
      headerName: `${t(TranslationKey.Product)} / ASIN / SKU`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.Product)} / ASIN / SKU`} />,
      renderCell: (params: GridCellParams) => (
        <ProductCell title={params.row.title} asin={params.row.asin} sku={params.row.sku} />
      ),
      width: 150,
    },

    {
      field: 'marketplace',
      headerName: 'Marketplace',
      renderHeader: () => <MultilineTextHeaderCell text="Marketplace" />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 100,
    },

    {
      field: 'fbaFbmStock',
      headerName: 'FBA/FBM Stock',
      renderHeader: () => <MultilineTextHeaderCell text="FBA/FBM Stock" />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 100,
    },

    {
      field: 'reserved',
      headerName: t(TranslationKey.Reserved),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reserved)} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 70,
    },

    {
      field: 'roi',
      headerName: t(TranslationKey.ROI),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ROI)} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 60,
    },

    {
      field: ' ',
      headerName: '',
      // renderCell: params => <CustomButton icon={<DeleteIcon />} onClick={() => handlers.onClickTrash(params.row.asin)} />,
      width: 40,
    },
  ]
  for (const column of columns) {
    column.sortable = false
    column.filterable = false
    column.disableColumnMenu = true
  }

  return columns
}

export const stockGoodsColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'asin',
      headerName: '',

      renderCell: (params: GridCellParams) => (
        <ProductCell title={params.row.amazonTitle} asin={params.row.asin} sku={params.row.skuByClient} />
      ),
      flex: 1,
      sortable: false,
      filterable: false,
    },
  ]

  return columns
}
