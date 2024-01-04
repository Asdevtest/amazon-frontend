import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

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
      <ProductAsinCell withoutImage withoutTitle asin={params.row?.asin} skuByClient={params.row?.sku} />
    ),
    width: 185,
    sortable: false,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.client.SHOP_REPORT,
  },

  {
    field: 'periodStart',
    headerName: 'periodStart',
    renderHeader: () => <MultilineTextHeaderCell text={'Start of Period'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
    width: 118,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'periodEnd',
    headerName: 'periodEnd',
    renderHeader: () => <MultilineTextHeaderCell text={'End of Period'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell dateWithoutTime value={params.value} />,
    width: 118,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'week',
    headerName: 'week',
    renderHeader: () => <MultilineTextHeaderCell text={'Week'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'acos',
    headerName: 'acos',
    renderHeader: () => <MultilineTextHeaderCell text={'ACOS'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcImpressions',
    headerName: 'ppcImpressions',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC Impressions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 110,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'clicks',
    headerName: 'clicks',
    renderHeader: () => <MultilineTextHeaderCell text={'Clicks'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'spend',
    headerName: 'spend',
    renderHeader: () => <MultilineTextHeaderCell text={'Spend'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcOrders',
    headerName: 'ppcOrders',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC Orders'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcUnits',
    headerName: 'ppcUnits',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC Units'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcSales',
    headerName: 'ppcSales',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC sales'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'orderSalesCost',
    headerName: 'orderSalesCost',
    renderHeader: () => <MultilineTextHeaderCell text={'Order sales cost'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'unitSalesCost',
    headerName: 'unitSalesCost',
    renderHeader: () => <MultilineTextHeaderCell text={'Unit sales cost'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicSessions',
    headerName: 'organicSessions',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic sessions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicOrders',
    headerName: 'organicOrders',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic orders'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicUnits',
    headerName: 'organicUnits',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic units'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicSales',
    headerName: 'organicSales',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic sales'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicAvgOrderPrice',
    headerName: 'organicAvgOrderPrice',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic average price order'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 113,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicAvgUnitPrice',
    headerName: 'organicAvgUnitPrice',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic average price unit'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 113,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'impressions',
    headerName: 'impressions',
    renderHeader: () => <MultilineTextHeaderCell text={'Impressions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'sessions',
    headerName: 'sessions',
    renderHeader: () => <MultilineTextHeaderCell text={'Sessions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ctr',
    headerName: 'ctr',
    renderHeader: () => <MultilineTextHeaderCell text={'CTR'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'orders',
    headerName: 'orders',
    renderHeader: () => <MultilineTextHeaderCell text={'Orders'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'units',
    headerName: 'units',
    renderHeader: () => <MultilineTextHeaderCell text={'Units'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'avgUnitsInPerOrder',
    headerName: 'avgUnitsInPerOrder',
    renderHeader: () => <MultilineTextHeaderCell text={'Average units per order'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'sales',
    headerName: 'sales',
    renderHeader: () => <MultilineTextHeaderCell text={'Sales'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'avgPriceOrder',
    headerName: 'avgPriceOrder',
    renderHeader: () => <MultilineTextHeaderCell text={'Average price order'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'avgUnitPrice',
    headerName: 'avgUnitPrice',
    renderHeader: () => <MultilineTextHeaderCell text={'Average price unit'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'buyBox',
    headerName: 'buyBox',
    renderHeader: () => <MultilineTextHeaderCell text={'Buy Box, %'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ppcSale',
    headerName: 'ppcSale',
    renderHeader: () => <MultilineTextHeaderCell text={'РРС Sale, %'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'organicSale',
    headerName: 'organicSale',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic Sale, %'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'conversion',
    headerName: 'conversion',
    renderHeader: () => <MultilineTextHeaderCell text={'Conversion'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'conversionPpc',
    headerName: 'conversionPpc',
    renderHeader: () => <MultilineTextHeaderCell text={'РРС сonversion'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'conversionOrganic',
    headerName: 'conversionOrganic',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic сonversion'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,

    table: DataGridFilterTables.PPC_SALES_WEEKS,
    columnKey: columnnsKeys.shared.QUANTITY,
  },
]
