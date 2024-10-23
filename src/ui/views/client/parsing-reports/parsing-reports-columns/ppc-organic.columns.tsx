import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, ProductCell, UserCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const ppcOrganicColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => <ProductCell asin={row.asin} sku={row.sku} />,

      fields: getProductColumnMenuItems({ withoutTitle: true }),
      columnMenuConfig: getProductColumnMenuValue<ParsingReportsType>({
        isSimpleSku: true,
        // table: ParsingReportsType.FYP_SEARCH_SUPPRESSED,
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 170,
    },

    {
      field: 'month',
      headerName: 'Month',
      renderHeader: () => <MultilineTextHeaderCell text="Month" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
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

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'day',
      headerName: 'Day',
      renderHeader: () => <MultilineTextHeaderCell text="Day" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'ppcAcos',
      headerName: 'PPC  acos',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  acos" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcImpressions',
      headerName: 'PPC  impressions',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  impressions" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcClicks',
      headerName: 'PPC  clicks',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  clicks" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcSpend',
      headerName: 'PPC  spend',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  spend" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrders',
      headerName: 'PPC  orders',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  orders" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcUnits',
      headerName: 'PPC  units',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  units" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcAvgUnitsPerOrder',
      headerName: 'PPC  AVG units per order',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  AVG units per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcSales',
      headerName: 'PPC  sales',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  sales" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcUsdPerOrder',
      headerName: 'PPC  USD per order',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  USD per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcUsdPerUnit',
      headerName: 'PPC  USD per unit',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  USD per unit" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicSessions',
      headerName: 'Organic sessions',
      renderHeader: () => <MultilineTextHeaderCell text="Organic sessions" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicOrders',
      headerName: 'Organic orders',
      renderHeader: () => <MultilineTextHeaderCell text="Organic orders" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicUnits',
      headerName: 'Organic units',
      renderHeader: () => <MultilineTextHeaderCell text="Organic units" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicAvgUnitsPerOrder',
      headerName: 'Organic AVG units per order',
      renderHeader: () => <MultilineTextHeaderCell text="Organic AVG units per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicSales',
      headerName: 'Organic sales',
      renderHeader: () => <MultilineTextHeaderCell text="Organic sales" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicUsdPerOrder',
      headerName: 'Organic USD per order',
      renderHeader: () => <MultilineTextHeaderCell text="Organic USD per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicUsdPerUnit',
      headerName: 'Organic USD per unit',
      renderHeader: () => <MultilineTextHeaderCell text="Organic USD per unit" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicImpressions',
      headerName: 'PPC  organic impressions',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic impressions" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicSessions',
      headerName: 'PPC  organic sessions',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic sessions" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicCtr',
      headerName: 'PPC  organic CTR',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic CTR" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicOrders',
      headerName: 'PPC  organic orders',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic orders" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicUnits',
      headerName: 'PPC  organic units',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic units" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicAvgUnitsPerOrder',
      headerName: 'PPC  organic AVG units per order',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic AVG units per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicSales',
      headerName: 'PPC  organic sales',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic sales" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicUsdPerOrder',
      headerName: 'PPC  organic USD per order',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic USD per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicUsdPerUnit',
      headerName: 'PPC  organic USD per unit',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic USD per unit" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicBuybox',
      headerName: 'PPC  organic buybox',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic buybox" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'specificWeightPpcPercentage',
      headerName: 'Specific weight ppc percentage',
      renderHeader: () => <MultilineTextHeaderCell text="Specific weight ppc percentage" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'specificWeightOrganic',
      headerName: 'Specific weight organic',
      renderHeader: () => <MultilineTextHeaderCell text="Specific weight organic" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicConversion',
      headerName: 'PPC  organic conversion',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  organic conversion" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcConversion',
      headerName: 'PPC  conversion',
      renderHeader: () => <MultilineTextHeaderCell text="PPC  conversion" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicConversion',
      headerName: 'Organic conversion',
      renderHeader: () => <MultilineTextHeaderCell text="Organic conversion" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => (
        <UserCell name={params.row.client?.name} id={params.row.client?._id} email={params.row.client?.email} />
      ),
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.PPC_ORGANIC
    }

    column.sortable = false
  }

  return columns
}
