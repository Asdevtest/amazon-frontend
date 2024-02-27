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

export const clientPPCSalesWeekColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridRenderCellParams<Date>) => <NormDateCell value={params.value} />,
    width: 118,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value?.name} />,
    width: 150,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
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

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.client.SHOP_REPORT,
  },

  {
    field: 'periodStart',
    headerName: 'Start of Period',
    renderHeader: () => <MultilineTextHeaderCell text={'Start of Period'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
    width: 118,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'periodEnd',
    headerName: 'End of Period',
    renderHeader: () => <MultilineTextHeaderCell text={'End of Period'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
    width: 118,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'week',
    headerName: 'Week',
    renderHeader: () => <MultilineTextHeaderCell text={'Week'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'acos',
    headerName: 'ACOS',
    renderHeader: () => <MultilineTextHeaderCell text={'ACOS'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcImpressions',
    headerName: 'PPC Impressions',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC Impressions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 110,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'clicks',
    headerName: 'Clicks',
    renderHeader: () => <MultilineTextHeaderCell text={'Clicks'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'spend',
    headerName: 'Spend',
    renderHeader: () => <MultilineTextHeaderCell text={'Spend'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcOrders',
    headerName: 'PPC Orders',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC Orders'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcUnits',
    headerName: 'PPC Units',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC Units'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcSales',
    headerName: 'PPC sales',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC sales'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'orderSalesCost',
    headerName: 'Order sales cost',
    renderHeader: () => <MultilineTextHeaderCell text={'Order sales cost'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'unitSalesCost',
    headerName: 'Unit sales cost',
    renderHeader: () => <MultilineTextHeaderCell text={'Unit sales cost'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicSessions',
    headerName: 'Organic sessions',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic sessions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicOrders',
    headerName: 'Organic orders',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic orders'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicUnits',
    headerName: 'Organic units',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic units'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicSales',
    headerName: 'Organic sales',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic sales'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicAvgOrderPrice',
    headerName: 'Organic average price order',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic average price order'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 113,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicAvgUnitPrice',
    headerName: 'Organic average price unit',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic average price unit'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 113,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'impressions',
    headerName: 'Impressions',
    renderHeader: () => <MultilineTextHeaderCell text={'Impressions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'sessions',
    headerName: 'Sessions',
    renderHeader: () => <MultilineTextHeaderCell text={'Sessions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ctr',
    headerName: 'CTR',
    renderHeader: () => <MultilineTextHeaderCell text={'CTR'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'orders',
    headerName: 'Orders',
    renderHeader: () => <MultilineTextHeaderCell text={'Orders'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'units',
    headerName: 'Units',
    renderHeader: () => <MultilineTextHeaderCell text={'Units'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'avgUnitsInPerOrder',
    headerName: 'Average units per order',
    renderHeader: () => <MultilineTextHeaderCell text={'Average units per order'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'sales',
    headerName: 'Sales',
    renderHeader: () => <MultilineTextHeaderCell text={'Sales'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'avgPriceOrder',
    headerName: 'Average price order',
    renderHeader: () => <MultilineTextHeaderCell text={'Average price order'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'avgUnitPrice',
    headerName: 'Average price unit',
    renderHeader: () => <MultilineTextHeaderCell text={'Average price unit'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'buyBox',
    headerName: 'Buy Box',
    renderHeader: () => <MultilineTextHeaderCell text={'Buy Box, %'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcSale',
    headerName: 'РРС Sale',
    renderHeader: () => <MultilineTextHeaderCell text={'РРС Sale, %'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicSale',
    headerName: 'Organic Sale',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic Sale, %'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'conversion',
    headerName: 'Conversion',
    renderHeader: () => <MultilineTextHeaderCell text={'Conversion'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'conversionPpc',
    headerName: 'РРС сonversion',
    renderHeader: () => <MultilineTextHeaderCell text={'РРС сonversion'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'conversionOrganic',
    headerName: 'Organic сonversion',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic сonversion'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },
]
