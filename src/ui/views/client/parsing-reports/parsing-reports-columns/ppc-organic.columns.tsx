import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, ProductCell, UserLinkCell } from '@components/data-grid/data-grid-cells'
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
        table: ParsingReportsType.FYP_SEARCH_SUPPRESSED,
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
      headerName: 'Ppc acos',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc acos" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcImpressions',
      headerName: 'Ppc impressions',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc impressions" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcClicks',
      headerName: 'Ppc clicks',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc clicks" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcSpend',
      headerName: 'Ppc spend',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc spend" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrders',
      headerName: 'Ppc orders',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc orders" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcUnits',
      headerName: 'Ppc units',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc units" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcAvgUnitsPerOrder',
      headerName: 'Ppc avg units per order',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc avg units per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcSales',
      headerName: 'Ppc sales',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc sales" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcUsdPerOrder',
      headerName: 'Ppc usd per order',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc usd per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcUsdPerUnit',
      headerName: 'Ppc usd per unit',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc usd per unit" />,

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
      headerName: 'Organic avg units per order',
      renderHeader: () => <MultilineTextHeaderCell text="Organic avg units per order" />,

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
      headerName: 'Organic usd per order',
      renderHeader: () => <MultilineTextHeaderCell text="Organic usd per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'organicUsdPerUnit',
      headerName: 'Organic usd per unit',
      renderHeader: () => <MultilineTextHeaderCell text="Organic usd per unit" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicImpressions',
      headerName: 'Ppc organic impressions',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic impressions" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicSessions',
      headerName: 'Ppc organic sessions',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic sessions" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicCtr',
      headerName: 'Ppc organic ctr',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic ctr" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicOrders',
      headerName: 'Ppc organic orders',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic orders" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicUnits',
      headerName: 'Ppc organic units',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic units" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicAvgUnitsPerOrder',
      headerName: 'Ppc organic avg units per order',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic avg units per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicSales',
      headerName: 'Ppc organic sales',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic sales" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicUsdPerOrder',
      headerName: 'Ppc organic usd per order',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic usd per order" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicUsdPerUnit',
      headerName: 'Ppc organic usd per unit',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic usd per unit" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcOrganicBuybox',
      headerName: 'Ppc organic buybox',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic buybox" />,

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
      headerName: 'Ppc organic conversion',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc organic conversion" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ppcConversion',
      headerName: 'Ppc conversion',
      renderHeader: () => <MultilineTextHeaderCell text="Ppc conversion" />,

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

      renderCell: params => <UserLinkCell blackText name={params.row.client?.name} userId={params.row.client?._id} />,
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
