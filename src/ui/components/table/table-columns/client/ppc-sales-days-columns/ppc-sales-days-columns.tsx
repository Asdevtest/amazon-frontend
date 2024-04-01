import { GridRenderCellParams } from '@mui/x-data-grid-premium'

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

export const ppcSalesDaysColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
    width: 118,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell twoLines text={params.value?.name} />,
    width: 150,

    table: DataGridFilterTables.PPC_SALES_DAYS,
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

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.client.SHOP_REPORT,
  },

  {
    field: 'acos',
    headerName: 'Acos',
    renderHeader: () => <MultilineTextHeaderCell text="Acos" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcImpressions',
    headerName: 'PPC Impressions',
    renderHeader: () => <MultilineTextHeaderCell text="PPC Impressions" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 110,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'clicks',
    headerName: 'Clicks',
    renderHeader: () => <MultilineTextHeaderCell text="Clicks" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'spend',
    headerName: 'Spend',
    renderHeader: () => <MultilineTextHeaderCell text="Spend" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcOrders',
    headerName: 'PPC Orders',
    renderHeader: () => <MultilineTextHeaderCell text="PPC Orders" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcUnits',
    headerName: 'PPC Units',
    renderHeader: () => <MultilineTextHeaderCell text="PPC Units" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcSales',
    headerName: 'PPC Sales',
    renderHeader: () => <MultilineTextHeaderCell text="PPC Sales" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcAvgUnitsOneOrder',
    headerName: 'PPC Avg Units One Order',
    renderHeader: () => <MultilineTextHeaderCell text="PPC Avg Units One Order" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 110,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'orderSalesCost',
    headerName: 'Order Sales Cost',
    renderHeader: () => <MultilineTextHeaderCell text="Order Sales Cost" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'unitSalesCost',
    headerName: 'Unit Sales Cost',
    renderHeader: () => <MultilineTextHeaderCell text="Unit Sales Cost" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicSessions',
    headerName: 'Organic Sessions',
    renderHeader: () => <MultilineTextHeaderCell text="Organic Sessions" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicOrders',
    headerName: 'Organic Orders',
    renderHeader: () => <MultilineTextHeaderCell text="Organic Orders" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicUnits',
    headerName: 'Organic Units',
    renderHeader: () => <MultilineTextHeaderCell text="Organic Units" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicSales',
    headerName: 'Organic Sales',
    renderHeader: () => <MultilineTextHeaderCell text="Organic Sales" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicAvgOrderPrice',
    headerName: 'Organic Avg Order Price',
    renderHeader: () => <MultilineTextHeaderCell text="Organic Avg Order Price" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicAvgUnitPrice',
    headerName: 'Organic Avg Unit Price',
    renderHeader: () => <MultilineTextHeaderCell text="Organic Avg Unit Price" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicAvgUnitsOneOrder',
    headerName: 'Organic Avg Units One Order',
    renderHeader: () => <MultilineTextHeaderCell text="Organic Avg Units One Order" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'sessions',
    headerName: 'Sessions',
    renderHeader: () => <MultilineTextHeaderCell text="Sessions" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'orders',
    headerName: 'Orders',
    renderHeader: () => <MultilineTextHeaderCell text="Orders" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'units',
    headerName: 'Units',
    renderHeader: () => <MultilineTextHeaderCell text="Units" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'avgUnitsInPerOrder',
    headerName: 'Avg Units In Per Order',
    renderHeader: () => <MultilineTextHeaderCell text="Avg Units In Per Order" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'sales',
    headerName: 'Sales',
    renderHeader: () => <MultilineTextHeaderCell text="Sales" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'avgPriceOrder',
    headerName: 'Avg Price Order',
    renderHeader: () => <MultilineTextHeaderCell text="Avg Price Order" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'avgUnitPrice',
    headerName: 'Avg Unit Price',
    renderHeader: () => <MultilineTextHeaderCell text="Avg Unit Price" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'buyBox',
    headerName: 'Buy Box',
    renderHeader: () => <MultilineTextHeaderCell text="Buy Box" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcSale',
    headerName: 'PPC Sale',
    renderHeader: () => <MultilineTextHeaderCell text="PPC Sale" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicSale',
    headerName: 'Organic Sale',
    renderHeader: () => <MultilineTextHeaderCell text="Organic Sale" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 90,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'conversion',
    headerName: 'Conversion',
    renderHeader: () => <MultilineTextHeaderCell text="Conversion" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 100,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'conversionPpc',
    headerName: 'Conversion PPC',
    renderHeader: () => <MultilineTextHeaderCell text="Conversion PPC" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 100,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'conversionOrganic',
    headerName: 'Conversion Organic',
    renderHeader: () => <MultilineTextHeaderCell text="Conversion Organic" />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 100,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
    width: 118,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'dateUpdated',
    headerName: 'Date Updated',
    renderHeader: () => <MultilineTextHeaderCell text="Date Updated" />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
    width: 118,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'day',
    headerName: 'Day',
    renderHeader: () => <MultilineTextHeaderCell text="Day" />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
    width: 118,

    table: DataGridFilterTables.PPC_SALES_DAYS,
    columnKey: columnnsKeys.shared.DATE,
  },
]
