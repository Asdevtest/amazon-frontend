import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const clientInventoryReportColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridRenderCellParams<Date>) => <NormDateCell value={params.value} />,
    width: 118,

    table: 'inventory',
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'asin',
    headerName: `${t(TranslationKey.ASIN)} / ${t(TranslationKey.SKU)}`,
    renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.ASIN)} / ${t(TranslationKey.SKU)}`} />,

    renderCell: (params: GridRenderCellParams) => (
      <ProductAsinCell withoutImage withoutTitle asin={params.row?.asin} skuByClient={params.row?.sku} />
    ),
    width: 185,
    sortable: false,

    table: 'inventory',
    columnKey: columnnsKeys.client.SHOP_REPORT,
  },

  {
    field: 'price',
    headerName: 'price',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price) + ', $'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: 'inventory',
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'fbaFee',
    headerName: 'fbaFee',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee'])} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: 'inventory',
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'refFee',
    headerName: 'refFee',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Ref fee'])} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: 'inventory',
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'available',
    headerName: 'available',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Available)} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: 'inventory',
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'inbound',
    headerName: 'inbound',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Inbound)} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: 'inventory',
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'reserved',
    headerName: 'reserved',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reserved)} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: 'inventory',
    columnKey: columnnsKeys.shared.QUANTITY,
  },
]
