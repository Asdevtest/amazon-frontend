import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

export const clientInventoryReportColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
      width: 118,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value?.name} />,
      width: 150,

      columnKey: columnnsKeys.shared.OBJECT,

      sortable: false,
    },

    {
      field: 'asin',
      headerName: `${t(TranslationKey.ASIN)} / ${t(TranslationKey.SKU)}`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.ASIN)} / ${t(TranslationKey.SKU)}`} />,

      renderCell: (params: GridRenderCellParams) => (
        <ProductAsinCell withoutTitle image={params.row?.image} asin={params.row?.asin} skuByClient={params.row?.sku} />
      ),
      width: 250,
      sortable: false,

      columnKey: columnnsKeys.client.SHOP_REPORT,
    },

    {
      field: 'categoryAbc',
      headerName: 'ABC',
      renderHeader: () => <MultilineTextHeaderCell text="ABC" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 83,

      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'price',
      headerName: t(TranslationKey.Price),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price) + ', $'} />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 83,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'fbaFee',
      headerName: t(TranslationKey['FBA fee']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee'])} />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 83,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'refFee',
      headerName: t(TranslationKey['Ref fee']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Ref fee'])} />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 83,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'available',
      headerName: t(TranslationKey.Available),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Available)} />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 90,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'inbound',
      headerName: t(TranslationKey.Inbound),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Inbound)} />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 83,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'reserved',
      headerName: t(TranslationKey.Reserved),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reserved)} />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 90,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'organicCv',
      headerName: 'Organic Cv',
      renderHeader: () => <MultilineTextHeaderCell text="Organic Cv" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 83,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'cog',
      headerName: 'Cog',
      renderHeader: () => <MultilineTextHeaderCell text="Cog" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 83,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'unitProfit',
      headerName: 'Unit Profit',
      renderHeader: () => <MultilineTextHeaderCell text="Unit Profit" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 83,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'historicalDaysOfSupply',
      headerName: 'Historical days of supply',
      renderHeader: () => <MultilineTextHeaderCell text="Historical days of supply" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'estimatedStorageCost',
      headerName: 'Estimated storage cost',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated storage cost" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'estimatedAgedInventorySurcharge',
      headerName: 'Estimated aged inventory surcharge',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated aged inventory surcharge" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 160,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'age0to90Days',
      headerName: 'Age 0 to 90 days',
      renderHeader: () => <MultilineTextHeaderCell text="Age 0 to 90 days" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'age91to180Days',
      headerName: 'Age 91 to 180 days',
      renderHeader: () => <MultilineTextHeaderCell text="Age 91 to 180 days" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'age181to270Days',
      headerName: 'Age 181 to 270 days',
      renderHeader: () => <MultilineTextHeaderCell text="Age 181 to 270 days" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'age271to365Days',
      headerName: 'Age 271 to 365 days',
      renderHeader: () => <MultilineTextHeaderCell text="Age 271 to 365 days" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'age365plusDays',
      headerName: 'Age 365 plus days',
      renderHeader: () => <MultilineTextHeaderCell text="Age 365 plus days" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'storageVolume',
      headerName: 'Storage volume',
      renderHeader: () => <MultilineTextHeaderCell text="Storage volume" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'lowInventoryLevelFee',
      headerName: 'Low-inventory-level fee',
      renderHeader: () => <MultilineTextHeaderCell text="Low-inventory-level fee" />,
      renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },
  ]

  for (const column of columns) {
    column.table = DataGridFilterTables.INVENTORY
  }

  return columns
}
