import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const ppcSalesWeeksColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => <ProductAsinCell withoutImage withoutTitle asin={row?.asin} skuByClient={row?.sku} />,

      fields: getProductColumnMenuItems({ withoutTitle: true }),
      columnMenuConfig: getProductColumnMenuValue<ParsingReportsType>({
        isSimpleSku: true,
        table: ParsingReportsType.FYP_SEARCH_SUPPRESSED,
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 210,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <TextCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => <UserLinkCell blackText name={params.row.client?.name} userId={params.row.client?._id} />,
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'dateUpdated',
      headerName: 'Date updated',
      renderHeader: () => <MultilineTextHeaderCell text="Date updated" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'startOfPeriod',
      headerName: 'Start of period',
      renderHeader: () => <MultilineTextHeaderCell text="Start of period" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'endOfPeriod',
      headerName: 'End of period',
      renderHeader: () => <MultilineTextHeaderCell text="End of period" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'week',
      headerName: 'Week',
      renderHeader: () => <MultilineTextHeaderCell text="Week" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcAcos',
      headerName: 'Ppc acos',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc acos" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcImpressions',
      headerName: 'Ppc impressions',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc impressions" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcClicks',
      headerName: 'Ppc clicks',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc clicks" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcSpend',
      headerName: 'Ppc spend',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc spend" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrders',
      headerName: 'Ppc orders',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc orders" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcUnits',
      headerName: 'Ppc units',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc units" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcAvgUnitsPerOrder',
      headerName: 'Ppc avg units per order',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc avg units per order" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcSales',
      headerName: 'Ppc sales',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc sales" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcUsdPerOrder',
      headerName: 'Ppc usd per order',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc usd per order" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcUsdPerUnit',
      headerName: 'Ppc usd per unit',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc usd per unit" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicSessions',
      headerName: 'Organic sessions',
      renderHeader: () => <MultilineTextHeaderCell text="Organic sessions" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicOrders',
      headerName: 'Organic orders',
      renderHeader: () => <MultilineTextHeaderCell text="Organic orders" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicUnits',
      headerName: 'Organic units',
      renderHeader: () => <MultilineTextHeaderCell text="Organic units" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicAvgUnitsPerOrder',
      headerName: 'Organic avg units per order',
      renderHeader: () => <MultilineTextHeaderCell text="Organic avg units per order" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicSales',
      headerName: 'Organic sales',
      renderHeader: () => <MultilineTextHeaderCell text="Organic sales" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicUsdPerOrder',
      headerName: 'Organic usd per order',
      renderHeader: () => <MultilineTextHeaderCell text="Organic usd per order" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicUsdPerUnit',
      headerName: 'Organic usd per unit',
      renderHeader: () => <MultilineTextHeaderCell text="Organic usd per unit" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicImpressions',
      headerName: 'Ppc organic impressions',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic impressions" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicSessions',
      headerName: 'Ppc organic sessions',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic sessions" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicCtr',
      headerName: 'Ppc organic ctr',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic ctr" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicOrders',
      headerName: 'Ppc organic orders',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic orders" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicUnits',
      headerName: 'Ppc organic units',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic units" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicAvgUnitsPerOrder',
      headerName: 'Ppc organic avg units per order',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic avg units per order" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicSales',
      headerName: 'Ppc organic sales',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic sales" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicUsdPerOrder',
      headerName: 'Ppc organic usd per order',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic usd per order" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicUsdPerUnit',
      headerName: 'Ppc organic usd per unit',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic usd per unit" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicBuybox',
      headerName: 'Ppc organic buybox',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic buybox" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'specificWeightPpcPercentage',
      headerName: 'Specific weight ppc percentage',
      renderHeader: () => <MultilineTextHeaderCell text="Specific weight ppc percentage" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'specificWeightOrganic',
      headerName: 'Specific weight organic',
      renderHeader: () => <MultilineTextHeaderCell text="Specific weight organic" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicConversion',
      headerName: 'Ppc organic conversion',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic conversion" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcConversion',
      headerName: 'Ppc conversion',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc conversion" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicConversion',
      headerName: 'Organic conversion',
      renderHeader: () => <MultilineTextHeaderCell text="Organic conversion" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.PPC_SALES_WEEKS
    }

    column.sortable = false
  }

  return columns
}

// {
//   "dateUpdated": "2024-08-10T21:00:00.000Z",
//   "asin": "B082W3XKPT",
//   "sku": "AY-3FZK-LS3O",
//   "month": "MAY",
//   "startOfPeriod": "2024-05-26T21:00:00.000Z",
//   "endOfPeriod": "2024-06-01T21:00:00.000Z",
//   "week": 22,
//   "day": "2024-08-09T21:00:00.000Z",
//   "ppcAcos": 20,
//   "ppcImpressions": 207,
//   "ppcClicks": 3,
//   "ppcSpend": 0.99,
//   "ppcOrders": 1,
//   "ppcUnits": 1,
//   "ppcAvgUnitsPerOrder": 1,
//   "ppcSales": 4.95,
//   "ppcUsdPerOrder": 0.99,
//   "ppcUsdPerUnit": 0.99,
//   "organicSessions": 14,
//   "organicOrders": 1,
//   "organicUnits": 1,
//   "organicAvgUnitsPerOrder": 1,
//   "organicSales": 4.95,
//   "organicUsdPerOrder": 4.95,
//   "organicUsdPerUnit": 4.95,
//   "ppcOrganicImpressions": 0,
//   "ppcOrganicSessions": 17,
//   "ppcOrganicCtr": 0,
//   "ppcOrganicOrders": 2,
//   "ppcOrganicUnits": 2,
//   "ppcOrganicAvgUnitsPerOrder": 1,
//   "ppcOrganicSales": 9.9,
//   "ppcOrganicUsdPerOrder": 4.95,
//   "ppcOrganicUsdPerUnit": 4.95,
//   "ppcOrganicBuybox": 100,
//   "specificWeightPpcPercentage": 100,
//   "specificWeightOrganic": 50,
//   "ppcOrganicConversion": 11.76,
//   "ppcConversion": 33.33,
//   "organicConversion": 7.14,
//   "shop": {
//       "_id": "27ac8677-8d28-4535-8284-747275be7979",
//       "name": "Shop #123"
//   },
//   "client": {
//       "_id": "219c225b-3df0-4047-ac7e-e76e2605a34a",
//       "name": "ClientOS",
//       "rating": 5,
//       "lastSeen": "2024-08-16T13:29:51.943Z"
//   }
// }
