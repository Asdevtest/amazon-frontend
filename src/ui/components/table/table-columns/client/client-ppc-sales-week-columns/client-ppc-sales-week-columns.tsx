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

export const clientPPCSalesWeekColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridRenderCellParams<Date>) => <NormDateCell value={params.value} />,
    width: 118,

    table: 'ppcSalesWeek',
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

    table: 'ppcSalesWeek',
    columnKey: columnnsKeys.client.SHOP_REPORT,
  },

  {
    field: 'periodStart',
    headerName: 'periodStart',
    renderHeader: () => <MultilineTextHeaderCell text={'Start of Period'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
    width: 118,

    table: 'ppcSalesWeek',
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'periodEnd',
    headerName: 'periodEnd',
    renderHeader: () => <MultilineTextHeaderCell text={'End of Period'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
    width: 118,

    table: 'ppcSalesWeek',
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'week',
    headerName: 'week',
    renderHeader: () => <MultilineTextHeaderCell text={'Week'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,

    table: 'ppcSalesWeek',
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'acos',
    headerName: 'acos',
    renderHeader: () => <MultilineTextHeaderCell text={'ACOS'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,
  },

  {
    field: 'ppcImpressions',
    headerName: 'ppcImpressions',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC Impressions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 110,
  },

  {
    field: 'clicks',
    headerName: 'clicks',
    renderHeader: () => <MultilineTextHeaderCell text={'Clicks'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,
  },

  {
    field: 'spend',
    headerName: 'spend',
    renderHeader: () => <MultilineTextHeaderCell text={'Spend'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,
  },

  {
    field: 'ppcOrders',
    headerName: 'ppcOrders',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC Orders'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,
  },

  {
    field: 'ppcUnits',
    headerName: 'ppcUnits',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC Units'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'ppcSales',
    headerName: 'ppcSales',
    renderHeader: () => <MultilineTextHeaderCell text={'PPC sales'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'orderSalesCost',
    headerName: 'orderSalesCost',
    renderHeader: () => <MultilineTextHeaderCell text={'Order sales cost'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'unitSalesCost',
    headerName: 'unitSalesCost',
    renderHeader: () => <MultilineTextHeaderCell text={'Unit sales cost'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'organicSessions',
    headerName: 'organicSessions',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic sessions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'organicOrders',
    headerName: 'organicOrders',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic orders'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'organicUnits',
    headerName: 'organicUnits',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic units'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'organicSales',
    headerName: 'organicSales',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic sales'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'organicAvgOrderPrice',
    headerName: 'organicAvgOrderPrice',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic average price order'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 113,
  },

  {
    field: 'organicAvgUnitPrice',
    headerName: 'organicAvgUnitPrice',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic average price unit'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 113,
  },

  {
    field: 'impressions',
    headerName: 'impressions',
    renderHeader: () => <MultilineTextHeaderCell text={'Impressions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'sessions',
    headerName: 'sessions',
    renderHeader: () => <MultilineTextHeaderCell text={'Sessions'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'ctr',
    headerName: 'ctr',
    renderHeader: () => <MultilineTextHeaderCell text={'CTR'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'orders',
    headerName: 'orders',
    renderHeader: () => <MultilineTextHeaderCell text={'Orders'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'units',
    headerName: 'units',
    renderHeader: () => <MultilineTextHeaderCell text={'Units'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'avgUnitsInPerOrder',
    headerName: 'avgUnitsInPerOrder',
    renderHeader: () => <MultilineTextHeaderCell text={'Average units per order'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'sales',
    headerName: 'sales',
    renderHeader: () => <MultilineTextHeaderCell text={'Sales'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'avgPriceOrder',
    headerName: 'avgPriceOrder',
    renderHeader: () => <MultilineTextHeaderCell text={'Average price order'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'avgUnitPrice',
    headerName: 'avgUnitPrice',
    renderHeader: () => <MultilineTextHeaderCell text={'Average price unit'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'buyBox',
    headerName: 'buyBox',
    renderHeader: () => <MultilineTextHeaderCell text={'Buy Box, %'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'ppcSale',
    headerName: 'ppcSale',
    renderHeader: () => <MultilineTextHeaderCell text={'РРС Sale, %'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'organicSale',
    headerName: 'organicSale',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic Sale, %'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'conversion',
    headerName: 'conversion',
    renderHeader: () => <MultilineTextHeaderCell text={'Conversion'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'conversionPpc',
    headerName: 'conversionPpc',
    renderHeader: () => <MultilineTextHeaderCell text={'РРС сonversion'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },

  {
    field: 'conversionOrganic',
    headerName: 'conversionOrganic',
    renderHeader: () => <MultilineTextHeaderCell text={'Organic сonversion'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 105,
  },
]
